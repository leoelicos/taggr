const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!tagData) {
      res.status(404).json({ message: 'No tags found with that id!' })
      return
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "Basketball",
      productIds: [2, 3, 4]
    }
  */
  try {
    const tag = await Tag.create(req.body)

    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.productIds.length) {
      /* array of pairings 
        [
          {product_id: 1, tag_id: 1},
          {product_id: 2, tag_id: 1},
          {product_id: 3, tag_id: 1},
          {product_id: 4, tag_id: 1},
        ]
        */
      const productTagIdArr = await req.body.productIds.map((product_id) => {
        return {
          tag_id: tag.id,
          product_id
        }
      })
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr)
      res.status(200).json(productTagIds)
      return
    }

    // if no product tags, just respond
    res.status(200).json(tag)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // e.g. /api/tags/1
  try {
    await Tag.update(req.body, { where: { id: req.params.id } })

    const databaseProductTags = await ProductTag.findAll({
      where: { tag_id: req.params.id }
    })

    const databaseProductTagIds = databaseProductTags.map(({ product_id }) => product_id)

    const newProductTags = req.body.productIds
      .filter((product_id) => !databaseProductTagIds.includes(product_id))
      .map((product_id) => {
        return { tag_id: req.params.id, product_id }
      })

    const productTagsToRemove = databaseProductTags.filter(({ product_id }) => !req.body.productIds.includes(product_id)).map(({ id }) => id)

    const updatedProductTags = await Promise.all([ProductTag.destroy({ where: { id: productTagsToRemove } }), ProductTag.bulkCreate(newProductTags)])

    res.json(updatedProductTags)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  // delete one tag by its `id` value
  try {
    const tagData = await Tag.destroy({ where: { id: req.params.id } })

    if (!tagData) {
      res.status(404).json({ message: 'No tags found with that id!' })
      return
    }

    const databaseProductTags = await ProductTag.findAll({
      where: { tag_id: req.params.id }
    })

    const productTagsToRemove = databaseProductTags.map(({ product_id }) => product_id)

    const updatedProductTags = await ProductTag.destroy({
      where: { id: productTagsToRemove }
    })

    res.status(200).json(updatedProductTags)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

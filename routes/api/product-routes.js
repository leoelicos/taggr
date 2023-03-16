const router = require('express').Router()
const { Product, Category, Tag, ProductTag } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }]
    })
    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }]
    })
    if (!productData) {
      res.status(404).json({ message: 'No products found with that id!' })
      return
    }
    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    if (req.body.tagIds.length) {
      const productTagIdArr = await req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id
        }
      })
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr)
      res.status(200).json(productTagIds)
      return
    }

    res.status(200).json(product)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } })
    const databaseProductTags = await ProductTag.findAll({
      where: { product_id: req.params.id }
    })

    const databaseProductTagIds = databaseProductTags.map(({ tag_id }) => tag_id)

    const newProductTags = req.body.tagIds
      .filter((tag_id) => !databaseProductTagIds.includes(tag_id))
      .map((tag_id) => {
        return { product_id: req.params.id, tag_id }
      })

    const productTagsToRemove = databaseProductTags.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id)).map(({ id }) => id)

    const updatedProductTags = await Promise.all([ProductTag.destroy({ where: { id: productTagsToRemove } }), ProductTag.bulkCreate(newProductTags)])

    res.json(updatedProductTags)
  } catch (err) {
    res.status(400).json(err)
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({ where: { id: req.params.id } })

    if (!productData) {
      res.status(404).json({ message: 'No products found with that id!' })
      return
    }

    const databaseProductTags = await ProductTag.findAll({
      where: { product_id: req.params.id }
    })

    const productTagsToRemove = databaseProductTags.map(({ tag_id }) => tag_id)

    const updatedProductTags = await ProductTag.destroy({
      where: { id: productTagsToRemove }
    })

    res.status(200).json(updatedProductTags)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

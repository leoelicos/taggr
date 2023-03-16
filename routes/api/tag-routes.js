import { Router } from 'express'
const router = Router()
import { Tag, Product, ProductTag } from '../../models/index.js'

router.get('/', async (req, res) => {
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
  try {
    const tag = await Tag.create(req.body)
    if (req.body.productIds.length) {
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

    res.status(200).json(tag)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
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

export default router

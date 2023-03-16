const router = require('express').Router()
const { ProductTag } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const productTagData = await ProductTag.findAll({
      order: [['tag_id', 'ASC']]
    })
    console.log(JSON.stringify(productTagData))
    res.status(200).json(productTagData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

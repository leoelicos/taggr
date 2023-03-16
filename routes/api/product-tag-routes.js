import { Router } from 'express'
const router = Router()
import { ProductTag } from '../../models/index.js'

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

export default router

import { Router } from 'express'
const router = Router()
import categoryRoutes from './category-routes.js'
import productRoutes from './product-routes.js'
import tagRoutes from './tag-routes.js'
import productTagRoutes from './product-tag-routes.js'

router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)
router.use('/tags', tagRoutes)
router.use('/product_tags', productTagRoutes)

export default router

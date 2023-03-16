import Product from './Product.js'
import Category from './Category.js'
import Tag from './Tag.js'
import ProductTag from './ProductTag.js'

Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
})

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
})

export { Product, Category, Tag, ProductTag }

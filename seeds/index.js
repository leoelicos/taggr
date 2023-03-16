import seedCategories from './category-seeds'
import seedProducts from './product-seeds'
import seedTags from './tag-seeds'
import seedProductTags from './product-tag-seeds'

import sequelize from '../config/connection.js'

const seedAll = async () => {
  await sequelize.sync({ force: true })
  await seedCategories()
  await seedProducts()
  await seedTags()
  await seedProductTags()
  console.log('\n----- PRODUCT TAGS SEEDED -----\n')
  await sequelize.close()
  process.exit(0)
}

seedAll()

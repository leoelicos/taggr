const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }]
    });
    if (!productData) {
      res.status(404).json({ message: 'No products found with that id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const product = await Product.create(req.body);

    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      /* array of pairings 
      [
        {product_id: 1, tag_id: 1},
        {product_id: 1, tag_id: 2},
        {product_id: 1, tag_id: 3},
        {product_id: 1, tag_id: 4},
      ]
      */
      const productTagIdArr = await req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id
        };
      });
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json(productTagIds);
      return;
    }

    // if no product tags, just respond
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // e.g. /api/products/1
  try {
    /* update Product 
    { tagIds: [1, 2, 3, 4] }
    */
    await Product.update(req.body, { where: { id: req.params.id } });

    // update ProductTag

    /* find database product tags with product_id === 1
    databaseProductTags = 
    [
      {product_id: 1, tag_id: 6},
      {product_id: 1, tag_id: 7},
      {product_id: 1, tag_id: 8}
    ]
    */
    const databaseProductTags = await ProductTag.findAll({
      where: { product_id: req.params.id }
    });

    /* get array of tag_id only
      databaseProductTags = [6, 7, 8]  
    */
    const databaseProductTagIds = databaseProductTags.map(
      ({ tag_id }) => tag_id
    );

    /* out of [1, 2, 3, 4], filter if not in [6, 7, 8]
     [1, 2, 3, 4]
     newProductTags = [
      {product_id: 1, tag_id: 1}, 
      {product_id: 1, tag_id: 2}, 
      {product_id: 1, tag_id: 3}, 
      {product_id: 1, tag_id: 4}
      ]
    */
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !databaseProductTagIds.includes(tag_id))
      .map((tag_id) => {
        return { product_id: req.params.id, tag_id };
      });

    /* out of [6, 7, 8], filter if not in [1, 2, 3, 4]
      productTagsToRemove = [6, 7, 8]
      ]
    */
    const productTagsToRemove = databaseProductTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // run both actions
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags)
    ]);

    res.json(updatedProductTags);
  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({ where: { id: req.params.id } });

    if (!productData) {
      res.status(404).json({ message: 'No products found with that id!' });
      return;
    }

    // also delete product tags referencing this product id

    /* find database product tags with product_id === 1
    databaseProductTags = 
    [
      {product_id: 1, tag_id: 6},
      {product_id: 1, tag_id: 7},
      {product_id: 1, tag_id: 8}
    ]
    */
    const databaseProductTags = await ProductTag.findAll({
      where: { product_id: req.params.id }
    });

    /* get array of tag_id only
      databaseProductTags = [6, 7, 8]  
    */
    const productTagsToRemove = databaseProductTags.map(({ tag_id }) => tag_id);

    const updatedProductTags = await ProductTag.destroy({
      where: { id: productTagsToRemove }
    });

    res.status(200).json(updatedProductTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

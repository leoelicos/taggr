const router = require('express').Router();
const { ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all product tags
router.get('/', async (req, res) => {
  // find all product tags

  try {
    const productTagData = await ProductTag.findAll();
    console.log(JSON.stringify(productTagData));
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

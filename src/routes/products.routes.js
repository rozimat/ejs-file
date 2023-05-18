const { Router } = require("express");
const { addProducts } = require('../controllers/product.controller');

const router = Router();


router.post('/products', addProducts);




module.exports = router;
const Products = require('../models/Products');
const Io = require('../utils/Io');
const dataProducts = new Io('./database/products.json');
const { v4 : uuid } = require('uuid');


const addProducts = async (req,res)=>{
  const { name, count, price } =req.body;
  const productsData = await dataProducts.read();
  const id = uuid();

  console.log(req.body);

  res.redirect('/products')

}


module.exports = {
  addProducts,

}









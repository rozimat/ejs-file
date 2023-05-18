require('dotenv').config();
const express = require("express");
const cookie = require('cookie-parser');
const router = require('./routes/auth.routes');
const fileUpload = require('express-fileupload');
const Io = require('./utils/Io');
const dataUsers = new  Io('./database/users.json')
const data =  dataUsers.read();
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(cookie());
app.use(express.static(process.cwd() + "/uploads"));
app.set('view engine', 'ejs');

app.get('/', async(_, res) =>{
  
  res.render('index', {
    data
  });
})
app.get('/auth/register', (_, res) =>{
  res.render('register');
})
app.get('/auth/login', (_, res) =>{
  res.render('login');
})
app.get('/api/products', (_, res) =>{
  res.render('products');
})

app.use(router)



const PORT = process.env.PORT || 3000;

app.listen(3000, ()=>{
  console.log(PORT);
})
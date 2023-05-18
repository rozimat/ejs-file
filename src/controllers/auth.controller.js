const { v4 :uuid } = require("uuid");
const bcrypt = require("bcrypt");
const Io = require('../utils/Io');
const dataUsers = new Io('./database/users.json')
const Users = require('../models/Users');
const jwt = require('../jwt/jwt');


const login = async (req, res, next) => {
  try {
    const usersData = await dataUsers.read();
    const { username, password } = req.body;

   const findUser = usersData.find(data=> data.username == username);
   const compaireBcrypt = await bcrypt.compare(password, findUser.password);

   console.log(compaireBcrypt);

    if(! findUser){
      res.redirect("/auth/login");
      res.status(403).json({message: "Incorrect password or username!"})
    }
    if(! compaireBcrypt){
      res.redirect("/auth/login");
      res.status(403).json({message: "Incorrect password or username!"})
    }
    else{
      const token = jwt.sign({ id : findUser.id});
      res.cookie("cookie", token);
      res.redirect("/");
      res.status(200).json({message: "Succsessfully"})
    }
    next();
    
  } catch (error) {
    console.log(error);
  }
}

const register = async (req, res, next) => {
  try {
  const usersData = await dataUsers.read();
  const { username, password, name } = req.body;
  const { image } = req.files;
  const id = uuid();
  const hashedPassword = await bcrypt.hash(password, 12);
  const imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;
  image.mv(`${process.cwd()}/uploads/${imageName}`);

  const findUser = usersData.find(( user) => user.username === username);

  if (findUser) {
    res.redirect('/auth/register');
    res.status(403).json({ message: "User already existed!"});
  }
  else{
    const newUser = new Users(id, username, hashedPassword, name, imageName);
    const data = usersData.length ? [...usersData , newUser] : [newUser];
    dataUsers.write(data)
    const token = jwt.sign({ id : newUser.id});
    res.cookie("cookie", token);
    res.redirect('/');
    res.status(201).json({ message: "succsesss"})
  
   }
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  login,
   register

}
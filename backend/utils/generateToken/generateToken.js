const jwt = require('jsonwebtoken');
require("dotenv").config()
const token_key = process.env.JWT_SECRET;
const generateToken = (id) => {
  return jwt.sign({ id }, token_key, { expiresIn: '1h' });
};
module.exports=generateToken
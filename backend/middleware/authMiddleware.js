const Student = require("../models/student");
const jwt = require("jsonwebtoken")

exports.protect = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  // const token = req.cookie.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const veryfyToken = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findByPk(veryfyToken.id);

    if (!student) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.student = student;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
}


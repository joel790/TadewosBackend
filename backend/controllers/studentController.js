const Student = require('../models/student');
require("dotenv").config();
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken/generateToken');


exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};


exports.createStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate request body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    // Check if the student already exists
    const student = await Student.findOne({ where: { email } });
    if (student) {
      return res.status(400).json({ error: 'Student already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the student
    const newStudent = await Student.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = generateToken(newStudent._id);

    // Set the JWT as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      secure: process.env.NODE_ENV, // Set secure flag in production
      sameSite: 'none'
    });

    res.status(201).json({
      message: 'Student created successfully',
      newStudent,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create student' });
  }
};


//login user
exports.loginStudent = async (req, res) => {
  try {
    // Take inputs from the user
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter an email and a password" });
    }

    // Check if student exists
    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, student.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Enter correct password" });
    }

    // Generate token
    const token = generateToken(student.id);

    // Set tokens as cookies
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 60 * 1000), // 1 minute
      secure: process.env.NODE_ENV , // Set to true in production
      sameSite: 'none'
    });
    // Respond with student data and token
    res.status(200).json({ student, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    // Validate request body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'please fill all fields' });
    }
    // Find the student by ID
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update student details
    student.name = name
    student.email = email;
    student.password = hashedPassword;
    const updatedStudent = await student.save();
    res.status(200).json({
      message: 'Student updated successfully',
      updatedStudent
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
}

exports.getSingleStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id)
    if (!student) {
      res.status(404).json("there is no student with this id")
    }
    res.status(200).json({ message: "successfull", student })

  } catch (error) {
    res.status(500).json('server error')
  }
}

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id)
    if (!student) {
      res.status(404).json("there is no student with this id")
    }
    await Student.destroy({ where: { id: id } });
    res.status(403).json(`the student with id ${id} deleted successfully`)
  } catch (error) {
    res.status(500).json('server error')
  }
}
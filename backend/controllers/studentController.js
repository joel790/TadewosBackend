const { where } = require('sequelize');
const Student = require('../models/student');
const bcrypt = require('bcryptjs');

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
    const studentExist = await Student.findOne({ email })
    if (studentExist) {
      res.status(400).json("student already exist")
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = {
      name,
      email,
      password: hashedPassword,
    };
    // Create the student
    const newStudent = await Student.create(student);
    res.status(201).json({
      message: 'Student created successfully',
      student: newStudent
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
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
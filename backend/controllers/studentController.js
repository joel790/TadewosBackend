const Student = require('../models/student');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
    console.log(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};
exports.createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newStudent = await User.create({ name, email });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};
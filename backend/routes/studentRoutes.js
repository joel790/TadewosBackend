const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.get('/:id', studentController.getSingleStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;

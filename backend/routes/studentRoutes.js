const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect,studentController.getAllStudents);
router.post('/register', studentController.createStudent);
router.post('/login', studentController.loginStudent);
router.put('/:id', studentController.updateStudent);
router.get('/:id', studentController.getSingleStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;

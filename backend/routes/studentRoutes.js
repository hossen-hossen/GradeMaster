const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware(), studentController.getAllStudents);
router.get('/getOneCourse/:id', authMiddleware(), studentController.getStudentById);
router.post('/create', authMiddleware(), studentController.createStudent);
router.put('/update/:id', authMiddleware(), studentController.updateStudent);
router.delete('/delete/:id', authMiddleware(), studentController.deleteStudent);
router.get('/:id/courses', authMiddleware(), studentController.studentMultipleCourseGet);
router.post('/:id/courses', authMiddleware(), studentController.studentMultipleCourseCreate);

module.exports = router;

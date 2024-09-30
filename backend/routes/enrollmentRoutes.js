const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');

// CRUD routes for enrollments
router.post('/create', authMiddleware(), enrollmentController.createEnrollment);
router.get('/', authMiddleware(), enrollmentController.getAllEnrollments);
router.get('/getOneEnrollment/:id', authMiddleware(), enrollmentController.getEnrollmentById);
router.put('/update/:id', authMiddleware(), enrollmentController.updateEnrollment);
router.delete('/delete/:id', authMiddleware(), enrollmentController.deleteEnrollment);

module.exports = router;

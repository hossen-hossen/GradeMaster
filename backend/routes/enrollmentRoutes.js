const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');

const router = express.Router();

router.post('/enroll', enrollmentController.enrollStudent);
router.get('/', enrollmentController.getEnrollments);

module.exports = router;

const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved enrollments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   student_id:
 *                     type: integer
 *                     example: 101
 *                   course_id:
 *                     type: integer
 *                     example: 202
 *                   enrollment_date:
 *                     type: string
 *                     format: date
 *                     example: "2023-10-12"
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(), enrollmentController.getEnrollments);


/**
 * @swagger
 * /api/enrollments/create:
 *   post:
 *     summary: Enroll a student in a course
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *               course_id:
 *                 type: integer
 *             example:
 *               student_id: 1
 *               course_id: 2
 *     responses:
 *       201:
 *         description: Student enrolled successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student or course not found
 *       500:
 *         description: Internal server error
 */
router.post('/create', authMiddleware(), enrollmentController.enrollStudent);

/**
 * @swagger
 * /api/enrollments/delete/{id}:
 *   delete:
 *     summary: Unenroll a student from a course
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', authMiddleware(), enrollmentController.unenrollStudent);

/**
 * @swagger
 * /api/enrollments/course/{courseId}:
 *   get:
 *     summary: Get enrollments by course ID
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Successfully retrieved enrollments
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.get('/course/:courseId', authMiddleware(), enrollmentController.getEnrollmentsByCourse);

module.exports = router;

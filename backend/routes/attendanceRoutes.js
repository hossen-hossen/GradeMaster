const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/attendances/create:
 *   post:
 *     summary: Record a new attendance
 *     tags:
 *       - Attendance
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
 *                 description: ID of the student
 *               course_id:
 *                 type: integer
 *                 description: ID of the course
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of attendance
 *               status:
 *                 type: string
 *                 enum: [Present, Absent, Late]
 *                 description: Attendance status
 *             example:
 *               student_id: 1
 *               course_id: 101
 *               date: "2023-03-15"
 *               status: "Present"
 *     responses:
 *       201:
 *         description: Attendance recorded successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create', authMiddleware(), attendanceController.markAttendance);

/**
 * @swagger
 * /api/attendances/update/{id}:
 *   put:
 *     summary: Update an attendance record
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The attendance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: ID of the student
 *               course_id:
 *                 type: integer
 *                 description: ID of the course
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of attendance
 *               status:
 *                 type: string
 *                 enum: [Present, Absent, Late]
 *                 description: Attendance status
 *             example:
 *               student_id: 1
 *               course_id: 101
 *               date: "2023-03-15"
 *               status: "Absent"
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       404:
 *         description: Attendance not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', authMiddleware(), attendanceController.updateAttendance);

/**
 * @swagger
 * /api/attendances/delete/{id}:
 *   delete:
 *     summary: Delete an attendance record
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The attendance ID
 *     responses:
 *       204:
 *         description: Attendance deleted successfully
 *       404:
 *         description: Attendance not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', authMiddleware(), attendanceController.deleteAttendance);

/**
 * @swagger
 * /api/attendances:
 *   get:
 *     summary: Search attendance records
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: integer
 *         description: Student ID
 *       - in: query
 *         name: course_id
 *         schema:
 *           type: integer
 *         description: Course ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date of attendance
 *     responses:
 *       200:
 *         description: Successfully retrieved attendance records
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(), attendanceController.getAttendance);

module.exports = router;

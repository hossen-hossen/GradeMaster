const express = require('express');
const router = express.Router();
const gradeWeightController = require('../controllers/gradeWeightController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/gradeWeights:
 *   get:
 *     summary: Get all grade weights with optional filtering
 *     tags:
 *       - GradeWeight
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: course_id
 *         schema:
 *           type: integer
 *         description: Course ID
 *       - in: query
 *         name: item_type
 *         schema:
 *           type: string
 *           enum: [Assignment, Exam, Attendance]
 *         description: Type of the grading item
 *     responses:
 *       200:
 *         description: Successfully retrieved grade weights
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(), gradeWeightController.getGradeWeights);

/**
 * @swagger
 * /api/gradeWeights/create:
 *   post:
 *     summary: Set a new grade weight for a course
 *     tags:
 *       - GradeWeight
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: integer
 *                 description: ID of the course
 *                 example: 101
 *               item_type:
 *                 type: string
 *                 enum: [Assignment, Exam, Attendance]
 *                 description: Type of the grading item
 *                 example: Assignment
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: Weight of the grading item
 *                 example: 20.0
 *     responses:
 *       201:
 *         description: Grade weight set successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create', authMiddleware(), gradeWeightController.createGradeWeight);

/**
 * @swagger
 * /api/gradeWeights/update/{id}:
 *   put:
 *     summary: Update an existing grade weight
 *     tags:
 *       - GradeWeight
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The grade weight ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: integer
 *                 description: ID of the course
 *               item_type:
 *                 type: string
 *                 enum: [Assignment, Exam, Attendance]
 *                 description: Type of the grading item
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: Weight of the grading item
 *             example:
 *               course_id: 102
 *               item_type: Exam
 *               weight: 30.0
 *     responses:
 *       200:
 *         description: Grade weight updated successfully
 *       404:
 *         description: Grade weight not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', authMiddleware(), gradeWeightController.updateGradeWeight);

/**
 * @swagger
 * /api/gradeWeights/delete/{id}:
 *   delete:
 *     summary: Delete a grade weight
 *     tags:
 *       - GradeWeight
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The grade weight ID
 *     responses:
 *       204:
 *         description: Grade weight deleted successfully
 *       404:
 *         description: Grade weight not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', authMiddleware(), gradeWeightController.deleteGradeWeight);

module.exports = router;

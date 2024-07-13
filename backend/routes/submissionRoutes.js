const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/submissions:
 *   get:
 *     summary: Search submissions
 *     tags:
 *       - Submission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: task_id
 *         schema:
 *           type: integer
 *         description: Task ID
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: integer
 *         description: Student ID
 *       - in: query
 *         name: submission_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date of the submission
 *     responses:
 *       200:
 *         description: Successfully retrieved submissions
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(), submissionController.getSubmissions);

/**
 * @swagger
 * /api/submissions/create:
 *   post:
 *     summary: Record a new task submission
 *     tags:
 *       - Submission
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_id:
 *                 type: integer
 *                 description: ID of the task
 *                 example: 201
 *               student_id:
 *                 type: integer
 *                 description: ID of the student
 *                 example: 301
 *               grade:
 *                 type: number
 *                 format: float
 *                 description: Grade of the submission
 *                 example: 95.0
 *               submission_date:
 *                 type: string
 *                 format: date
 *                 description: Date of the submission
 *                 example: "2023-08-01T14:00:00Z"
 *               feedback:
 *                 type: string
 *                 description: Teacher's feedback on the submission
 *                 example: "Well done!"
 *     responses:
 *       201:
 *         description: Submission recorded successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create', authMiddleware(), submissionController.createSubmission);

/**
 * @swagger
 * /api/submissions/update/{id}:
 *   put:
 *     summary: Update an existing task submission
 *     tags:
 *       - Submission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The submission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_id:
 *                 type: integer
 *                 description: ID of the task
 *               student_id:
 *                 type: integer
 *                 description: ID of the student
 *               grade:
 *                 type: number
 *                 format: float
 *                 description: Grade of the submission
 *               submission_date:
 *                 type: string
 *                 format: date
 *                 description: Date of the submission
 *               feedback:
 *                 type: string
 *                 description: Teacher's feedback on the submission
 *             example:
 *               task_id: 202
 *               student_id: 302
 *               grade: 90.0
 *               submission_date: "2023-08-02T16:00:00Z"
 *               feedback: "Good job but can improve"
 *     responses:
 *       200:
 *         description: Submission updated successfully
 *       404:
 *         description: Submission not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', authMiddleware(), submissionController.updateSubmission);

/**
 * @swagger
 * /api/submissions/delete/{id}:
 *   delete:
 *     summary: Delete a submission
 *     tags:
 *       - Submission
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The submission ID
 *     responses:
 *       204:
 *         description: Submission deleted successfully
 *       404:
 *         description: Submission not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', authMiddleware(), submissionController.deleteSubmission);

module.exports = router;

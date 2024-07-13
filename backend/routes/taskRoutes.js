const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Search tasks
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: course_id
 *         schema:
 *           type: integer
 *         description: Course ID
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Assignment, Exam]
 *         description: Type of the task
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date of the task
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(), taskController.getTasks);

/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the task
 *                 example: "Final Exam"
 *               description:
 *                 type: string
 *                 description: Description of the task
 *                 example: "This is the final exam for the course."
 *               course_id:
 *                 type: integer
 *                 description: ID of the course
 *                 example: 101
 *               type:
 *                 type: string
 *                 enum: [Assignment, Exam]
 *                 description: Type of the task
 *                 example: "Exam"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the task
 *                 example: "2023-05-01T10:00:00Z"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Due date of the task
 *                 example: "2023-06-01T17:00:00Z"
 *               max_score:
 *                 type: number
 *                 format: float
 *                 description: Maximum score of the task
 *                 example: 100.0
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create', authMiddleware(), taskController.createTask);

/**
 * @swagger
 * /api/tasks/update/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the task
 *               description:
 *                 type: string
 *                 description: Description of the task
 *                 example: "This is the final exam for the course."
 *               course_id:
 *                 type: integer
 *                 description: ID of the course
 *               type:
 *                 type: string
 *                 enum: [Assignment, Exam]
 *                 description: Type of the task
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the task
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Due date of the task
 *               max_score:
 *                 type: number
 *                 format: float
 *                 description: Maximum score of the task
 *             example:
 *               name: "Updated Exam"
 *               course_id: 102
 *               type: "Exam"
 *               date: "2023-05-02T10:00:00Z"
 *               due_date: "2023-06-02T17:00:00Z"
 *               max_score: 100.0
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', authMiddleware(), taskController.updateTask);

/**
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', authMiddleware(), taskController.deleteTask);

module.exports = router;

const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The auto-generated ID of the course
 *                   name:
 *                     type: string
 *                     description: The name of the course
 *                   description:
 *                     type: string
 *                     description: The description of the course
 *                   user_id:
 *                     type: integer
 *                     description: The ID of the user who created the course
 *                 example:
 *                   id: 1
 *                   name: "Introduction to Programming"
 *                   description: "A beginner-level course on programming."
 *                   user_id: 10
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(), courseController.getAllCourses);
/**
 * @swagger
 * /api/courses/getOneCourse/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: A single course object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The auto-generated ID of the course
 *                 name:
 *                   type: string
 *                   description: The name of the course
 *                 description:
 *                   type: string
 *                   description: The description of the course
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the user who created the course
 *               example:
 *                 id: 1
 *                 name: "Introduction to Programming"
 *                 description: "A beginner-level course on programming."
 *                 user_id: 10
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.get('/getOneCourse/:id', authMiddleware(), courseController.getCourseById);
/**
 * @swagger
 * /api/courses/create:
 *   post:
 *     summary: Create a new course
 *     tags:
 *       - Courses
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
 *                 description: The name of the course
 *               description:
 *                 type: string
 *                 description: The description of the course
 *             example:
 *               name: "Introduction to Programming"
 *               description: "A beginner-level course on programming."
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The auto-generated ID of the course
 *                 name:
 *                   type: string
 *                   description: The name of the course
 *                 description:
 *                   type: string
 *                   description: The description of the course
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the user who created the course
 *               example:
 *                 id: 1
 *                 name: "Introduction to Programming"
 *                 description: "A beginner-level course on programming."
 *                 user_id: 10
 *       500:
 *         description: Internal server error
 */

router.post('/create', authMiddleware(), courseController.createCourse);
/**
 * @swagger
 * /api/courses/update/{id}:
 *   put:
 *     summary: Update an existing course
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the course
 *               description:
 *                 type: string
 *                 description: The description of the course
 *             example:
 *               name: "Introduction to Programming"
 *               description: "A beginner-level course on programming."
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The auto-generated ID of the course
 *                 name:
 *                   type: string
 *                   description: The name of the course
 *                 description:
 *                   type: string
 *                   description: The description of the course
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the user who created the course
 *               example:
 *                 id: 1
 *                 name: "Introduction to Programming"
 *                 description: "A beginner-level course on programming."
 *                 user_id: 10
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', authMiddleware(), courseController.updateCourse);
/**
 * @swagger
 * /api/courses/delete/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course ID
 *     responses:
 *       204:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', authMiddleware(), courseController.deleteCourse);

module.exports = router;

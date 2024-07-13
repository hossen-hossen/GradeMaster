const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The auto-generated ID of the student
 *                   name:
 *                     type: string
 *                     description: The name of the student
 *                   email:
 *                     type: string
 *                     description: The email of the student
 *                   phone:
 *                     type: string
 *                     description: The phone number of the student
 *                   gender:
 *                     type: string
 *                     enum: [Male, Female, Other]
 *                     description: The gender of the student
 *                   date_of_birth:
 *                     type: string
 *                     format: date
 *                     description: The birth date of the student
 *                   address:
 *                     type: string
 *                     description: The address of the student
 *                 example:
 *                   id: 1
 *                   name: John Doe
 *                   email: johndoe@example.com
 *                   phone: '1234567890'
 *                   gender: Male
 *                   date_of_birth: '1990-01-01'
 *                   address: '123 Main St, Anytown, USA'
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(), studentController.getAllStudents);

/**
 * @swagger
 * /api/students/getOneCourse/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student ID
 *     responses:
 *       200:
 *         description: A single student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The auto-generated ID of the student
 *                 name:
 *                   type: string
 *                   description: The name of the student
 *                 email:
 *                   type: string
 *                   description: The email of the student
 *                 phone:
 *                   type: string
 *                   description: The phone number of the student
 *                 gender:
 *                   type: string
 *                   enum: [Male, Female, Other]
 *                   description: The gender of the student
 *                 date_of_birth:
 *                   type: string
 *                   format: date
 *                   description: The birth date of the student
 *                 address:
 *                   type: string
 *                   description: The address of the student
 *               example:
 *                 id: 1
 *                 name: John Doe
 *                 email: johndoe@example.com
 *                 phone: '1234567890'
 *                 gender: Male
 *                 date_of_birth: '1990-01-01'
 *                 address: '123 Main St, Anytown, USA'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get('/getOneCourse/:id', authMiddleware(), studentController.getStudentById);

/**
 * @swagger
 * /api/students/create:
 *   post:
 *     summary: Create a new student
 *     tags:
 *       - Students
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
 *                 description: The name of the student
 *               email:
 *                 type: string
 *                 description: The email of the student
 *               phone:
 *                 type: string
 *                 description: The phone number of the student
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 description: The gender of the student
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: The birth date of the student
 *               address:
 *                 type: string
 *                 description: The address of the student
 *             example:
 *               name: Jane Doe
 *               email: janedoe@example.com
 *               phone: '0987654321'
 *               gender: Female
 *               date_of_birth: '1992-02-02'
 *               address: '456 Maple Ave, Anytown, USA'
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/create', authMiddleware(), studentController.createStudent);

/**
 * @swagger
 * /api/students/update/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the student
 *               email:
 *                 type: string
 *                 description: The email of the student
 *               phone:
 *                 type: string
 *                 description: The phone number of the student
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 description: The gender of the student
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: The birth date of the student
 *               address:
 *                 type: string
 *                 description: The address of the student
 *             example:
 *               name: Jane Doe
 *               email: janedoe@example.com
 *               phone: '0987654321'
 *               gender: Female
 *               date_of_birth: '1992-02-02'
 *               address: '456 Maple Ave, Anytown, USA'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', authMiddleware(), studentController.updateStudent);

/**
 * @swagger
 * /api/students/delete/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', authMiddleware(), studentController.deleteStudent);

/**
 * @swagger
 * /api/students/{id}/courses:
 *   get:
 *     summary: Get courses for a specific student
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student ID
 *     responses:
 *       200:
 *         description: An array of courses for the specified student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The course ID
 *                   name:
 *                     type: string
 *                     description: The name of the course
 *                   description:
 *                     type: string
 *                     description: The description of the course
 *               example:
 *                 id: 1
 *                 name: "Introduction to Programming"
 *                 description: "A beginner-level course on programming."
 *       404:
 *         description: Student or courses not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/courses', authMiddleware(), studentController.studentMultipleCourseGet);

/**
 * @swagger
 * /api/students/{id}/courses:
 *   post:
 *     summary: Add courses for a specific student
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: An array of course IDs to add
 *             example:
 *               course_id: [1, 3, 5]
 *     responses:
 *       201:
 *         description: Courses added successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student or courses not found
 *       500:
 *         description: Internal server error
 */

router.post('/:id/courses', authMiddleware(), studentController.studentMultipleCourseCreate);

module.exports = router;

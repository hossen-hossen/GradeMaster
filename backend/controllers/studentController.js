const { Student, Course } = require('../models');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { Op } = require('sequelize');

exports.getAllStudents = async (req, res) => {
    try {
        const searchQuery = req.query.q ? req.query.q : '';  // Extract search query from the request

        // Define filter for searching students by name
        const studentFilter = {
            [Op.or]: [
                { name: { [Op.like]: `%${searchQuery}%` } }  // Search in student name
            ]
        };

        // Fetch students that match the filter and include their associated courses
        const students = await Student.findAll({
            where: studentFilter,
        });

        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                id: req.params.id,
            }
        });

        if (!student) {
            return res.status(404).send({ status: 'error', message: 'Student not found' });
        }

        return res.status(200).send(student);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
};

exports.createStudent = async (req, res) => {
    const { name, email, phone, gender, date_of_birth, address } = req.body;
    try {
        const student = await Student.create({ name, email, phone, gender, date_of_birth, address });
        return res.status(201).send(student);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, gender, date_of_birth, address } = req.body;
    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).send({ status: 'error', message: "Student not found" });
        }

        await student.update({ name, email, phone, gender, date_of_birth, address });
        res.status(200).send(student);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).send({ status: 'error', message: 'Student not found' });

        await student.destroy();
        res.status(204).send({ status: 'error', message: "Student deleted successfully!" });
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
};

exports.studentMultipleCourseCreate = async (req, res) => {
    try {
        console.log(req.body.course_id)
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).send({ status: 'error', message: 'Student not found' });

        await student.addCourses(req.body.course_id);
        return res.status(201).send({ message: 'Courses associated successfully' });
    } catch (error) {
        return res.status(400).send({ status: 'error', message: error.message });
    }
};

exports.studentMultipleCourseGet = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id, {
            include: [{
                model: Course,
                as: 'courses'
            }]
        });
        if (!student) return res.status(404).send({ status: 'error', message: 'Student not found' });

        return res.send(student.courses);
    } catch (error) {
        return res.status(400).send({ status: 'error', message: error.message });
    }
};

exports.importStudentCSV = async (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'student', req.file.filename);
    const students = [];
    const success = [];
    const errors = [];

    fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', (row) => {
            students.push(row);
        })
        .on('end', async () => {
            try {
                for (const studentData of students) {
                    try {
                        const { name, email, phone, gender, date_of_birth, address } = studentData;
                        var dateOfBirth = moment(date_of_birth, "M/D/YYYY");
                        const [student, created] = await Student.findOrCreate({
                            where: { email }, 
                            defaults: { name, phone, gender, date_of_birth: dateOfBirth.format("YYYY-MM-DD"), address }
                        });

                        if (created) {
                            success.push(student);
                        } else {
                            errors.push({ student: studentData, message: 'Email already exists' });
                        }
                    } catch (error) {
                        errors.push({ student: studentData, message: error.message });
                    }
                }

                fs.unlinkSync(filePath);

                res.status(200).json({
                    message: 'Students import process completed',
                    successCount: success.length,
                    errorCount: errors.length,
                    errors
                });
            } catch (error) {
                res.status(500).json({ message: 'Error processing CSV', error });
            }
        });
};


const { Student } = require('../models');

exports.getAllStudents = async (req, res) => {
    try {
        let where = {};
        if (req.query.name) where.name = req.query.name;
        if (req.query.email) where.email = req.query.email;

        const students = await Student.findAll({ where });
        return res.status(200).send(students);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
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
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).send({ status: 'error', message: 'Student not found' });

        await student.addCourses(req.body.courseIds);
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


const { Enrollment, Student, Course } = require('../models');

exports.enrollStudent = async (req, res) => {
    const { student_id, course_id, enrollment_date } = req.body;
    try {
        const enrollment = await Enrollment.create({ student_id, course_id, enrollment_date });
        return res.status(201).send(enrollment);
    } catch (error) {
        return res.status(400).send({ status: 'error', message: error.message });
    }
};

exports.unenrollStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const enrollment = await Enrollment.destroy({ where: { id } });
        if (enrollment) {
            return res.status(200).send({ status: 'success', message: 'Enrollment deleted successfully' });
        } else {
            return res.status(404).send({ status: 'error', message: 'Enrollment not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Enrollment not found' });
    }
};

exports.getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll({
            include: [
                { model: Student },
                { model: Course }
            ]
        });
        return res.status(200).json(enrollments);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Enrollment not found' });
    }
};

exports.getEnrollmentsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const enrollments = await Enrollment.findAll({ where: { course_id: courseId } });
        return res.status(200).json(enrollments);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Enrollment not found' });
    }
};


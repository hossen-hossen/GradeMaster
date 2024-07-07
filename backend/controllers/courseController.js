const { Course } = require('../models');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({ where: { user_id: req.user.id }});
        return res.status(200).send(courses);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({ 
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        });

        if (!course) {
            return res.status(404).send({ status: 'error', message: 'Course not found' });
        }

        return res.status(200).send(course);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
};

exports.createCourse = async (req, res) => {
    const { name, description } = req.body;
    try {
        const course = await Course.create({ name, description, user_id: req.user.id });
        return res.status(201).send(course);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).send({ status: 'error', message: "Course not found" });
        }

        await course.update({ name, description });
        return res.status(200).send(course);
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const deleted = await Course.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).send({ status: 'error', message: 'Course not found' });
        }
        return res.status(204).send({ status: 'error', message: "Course deleted successfully!" });
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
};

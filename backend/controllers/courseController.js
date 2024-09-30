const { Course } = require('../models');
const { Op } = require('sequelize');

exports.getAllCourses = async (req, res) => {
    try {
        const searchQuery = req.query.q ? req.query.q : '';  // Search query from the request
        const userId = req.user.id;  // Assuming the user ID is stored in req.user
        // Construct filter based on search query
        const filterParams = {
            user_id: userId,
            [Op.or]: [
                { name: { [Op.like]: `%${searchQuery}%` } },  // Search in name
                { description: { [Op.like]: `%${searchQuery}%` } }  // Search in description
            ]
        };

        // Fetch courses that match the user and search query
        const courses = await Course.findAll({ where: filterParams });

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Error fetching courses', error });
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

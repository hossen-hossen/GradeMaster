const { Enrollment, Student, Course } = require('../models');

// Create an enrollment
exports.createEnrollment = async (req, res) => {
    const { course_id, student_ids } = req.body;
    console.log(req.body)
    try {
        // Find the course by ID
        const course = await Course.findByPk(course_id);

        if (!course) {
            return res.status(404).json({ status: 'error', message: 'Course not found' });
        }

        // Find students by their IDs
        const students = await Student.findAll({
            where: {
                id: student_ids
            }
        });

        if (students.length === 0) {
            return res.status(404).json({ status: 'error', message: 'No students found' });
        }

        // Enroll all students in the course
        await course.addEnrolledStudents(students);

        return res.status(201).json({
            status: 'success',
            message: 'Students enrolled successfully',
            course_id,
            student_ids
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error enrolling students',
            error: error.message,
        });
    }
};

// Get all enrollments (showing one record per course with multiple students)
exports.getAllEnrollments = async (req, res) => {
    try {
        // Find all courses with their enrolled students
        const enrollments = await Course.findAll({
            include: [
                {
                    model: Student,
                    as: 'enrolledStudents',
                    attributes: ['id', 'name', 'email', 'phone'],
                }
            ]
        });

        if (enrollments.length === 0) {
            return res.status(404).json({ status: 'error', message: 'No enrollments found' });
        }

        // Format response so each course has its students
        const formattedEnrollments = enrollments.map(course => ({
            course_id: course.id,
            course_name: course.name,
            course_description: course.description,
            students: course.enrolledStudents.map(student => ({
                student_id: student.id,
                student_name: student.name,
                student_email: student.email,
                student_phone: student.phone,
            }))
        }));

        return res.status(200).json(formattedEnrollments);
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error fetching enrollments',
            error: error.message,
        });
    }
};


// Get enrollment by ID (return one course with multiple students)
exports.getEnrollmentById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the course with its enrolled students
        const course = await Course.findByPk(id, {
            include: [
                {
                    model: Student,
                    as: 'enrolledStudents',
                    attributes: ['id', 'name', 'email', 'phone'],
                }
            ]
        });

        if (!course) {
            return res.status(404).json({ status: 'error', message: 'Enrollment not found' });
        }

        const enrollmentData = {
            course_id: course.id,
            course_name: course.name,
            course_description: course.description,
            students: course.enrolledStudents.map(student => ({
                student_id: student.id,
                student_name: student.name,
                student_email: student.email,
                student_phone: student.phone,
            }))
        };

        return res.status(200).json(enrollmentData);
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error fetching the enrollment',
            error: error.message,
        });
    }
};


// Update enrollment by ID (update course or student associations)
exports.updateEnrollment = async (req, res) => {
    const { id } = req.params;
    const { course_id, student_ids } = req.body;

    try {
        // Find the course by ID
        const course = await Course.findByPk(course_id);

        if (!course) {
            return res.status(404).json({ status: 'error', message: 'Course not found' });
        }

        // Find students by their IDs
        const students = await Student.findAll({
            where: {
                id: student_ids
            }
        });

        if (students.length === 0) {
            return res.status(404).json({ status: 'error', message: 'No students found' });
        }

        // Update the students in the course enrollment
        await course.setEnrolledStudents(students);

        return res.status(200).json({
            status: 'success',
            message: 'Enrollment updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error updating enrollment',
            error: error.message,
        });
    }
};


// Delete enrollment by ID
exports.deleteEnrollment = async (req, res) => {
    const { id } = req.params;

    try {
        // Find enrollment (course-student associations) by course ID
        const course = await Course.findByPk(id);

        if (!course) {
            return res.status(404).json({ status: 'error', message: 'Enrollment not found' });
        }

        // Remove all enrolled students for the course
        await course.setEnrolledStudents([]);

        return res.status(200).json({
            status: 'success',
            message: 'Enrollment deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error deleting enrollment',
            error: error.message,
        });
    }
};












const { Enrollment, Student, Course } = require('../models');

exports.enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    const enrollment = await Enrollment.create({ studentId, courseId });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Implement the deleteEnrollment method similarly.

const { Attendance, Student, Course } = require('../models');
const { Op } = require('sequelize');

exports.getAttendance = async (req, res) => {
  try {
    const searchQuery = req.query.q ? req.query.q : '';
    const statusFilter = req.query.status || '';
    const startDate = req.query.startDate || '';
    const endDate = req.query.endDate || '';

    const attendanceWhere = {};

    if (startDate && endDate) {
      attendanceWhere.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    if (statusFilter) {
      attendanceWhere.status = statusFilter;
    }

    const attendanceRecords = await Attendance.findAll({
      where: attendanceWhere,
      include: [
        {
          model: Student,  // Include student data
          attributes: ['id', 'name', 'email'],  // Select fields to include
          where: {
            name: {
              [Op.like]: `%${searchQuery}%`  // Apply search query to student name
            }
          }
        },
        {
          model: Course,  // Include course data
        }
      ]
    });
    return res.status(200).json(attendanceRecords);
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!attendance) {
      return res.status(404).send({ status: 'error', message: 'Attendance not found' });
    }

    return res.status(200).send(attendance);
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};

exports.markAttendance = async (req, res) => {
  const { student_id, course_id, date, status } = req.body;

  try {
    // Check if an attendance record already exists for this student, course, and date
    const existingRecord = await Attendance.findOne({
      where: { student_id, course_id, date }
    });

    if (existingRecord) {
      return res.status(400).json({ message: 'Attendance record for this student in the specified course on the given date already exists.' });
    }

    // Create a new attendance record if none exists
    const attendance = await Attendance.create({ student_id, course_id, date, status });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Attendance.update(req.body, { where: { id } });
    if (updated) {
      const updatedAttendance = await Attendance.findOne({ where: { id } });
      return res.status(200).json(updatedAttendance);
    }
    return res.status(404).send({ status: 'error', message: 'Attendance not found' });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Attendance.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).send({ status: 'error', message: 'Attendance not found' });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

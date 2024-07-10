const { Attendance } = require('../models');

exports.markAttendance = async (req, res) => {
  const { studentId, courseId, date, status } = req.body;
  try {
    const attendance = await Attendance.create({ studentId, courseId, date, status });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  const { courseId } = req.params;
  try {
    const attendanceRecords = await Attendance.findAll({ where: { courseId } });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

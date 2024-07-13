const { Attendance } = require('../models');

exports.getAttendance = async (req, res) => {
  try {
    const { student_id, course_id, date } = req.query;
    const conditions = {};
    if (student_id) conditions.student_id = student_id;
    if (course_id) conditions.course_id = course_id;
    if (date) conditions.date = date;

    const attendance = await Attendance.findAll({ where: conditions });
    return res.status(200).json(attendance);
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

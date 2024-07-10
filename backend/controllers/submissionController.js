const { Submission, Task, Student } = require('../models');

exports.submitTask = async (req, res) => {
  const { taskId, studentId, content } = req.body;
  try {
    const submission = await Submission.create({ taskId, studentId, content });
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSubmissions = async (req, res) => {
  const { taskId } = req.params;
  try {
    const submissions = await Submission.findAll({ where: { taskId }, include: [Student] });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

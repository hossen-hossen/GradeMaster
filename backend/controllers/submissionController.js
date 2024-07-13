const { Submission, Student } = require('../models');

exports.createSubmission = async (req, res) => {
  const { task_id, student_id, grade, submission_date, feedback } = req.body;
  try {
    const submission = await Submission.create({ task_id, student_id, grade, submission_date, feedback });
    res.status(201).send(submission);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update an existing submission
exports.updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    await submission.update(req.body);
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update submission' });
  }
};

// Delete a submission
exports.deleteSubmission = async (req, res) => {
  try {
    const result = await Submission.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete submission' });
  }
};

exports.getSubmissions = async (req, res) => {
  const { task_id } = req.params;
  try {
    const submissions = await Submission.findAll({ where: { task_id }, include: [Student] });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const { Task } = require('../models');

exports.createTask = async (req, res) => {
  const { name, description, course_id, type, date, dueDate, max_score } = req.body;
  try {
    const task = await Task.create({ name, description, course_id, type, date, dueDate, max_score });
    return res.status(201).send(task);
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, course_id, type, date, dueDate, max_score } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).send({ status: 'error', message: "Task not found" });
    }

    await task.update({ name, description, course_id, type, date, dueDate, max_score });
    return res.status(200).send(task);
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const result = await Task.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      return res.status(404).send({ status: 'error', message: 'Task not found' });
    }
    return res.status(204).send({ status: 'error', message: "Task deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};

// Get tasks with filtering options
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: req.query
    });
    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};

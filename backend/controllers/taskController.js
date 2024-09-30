const { Task } = require('../models');
const { Op } = require('sequelize');

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
    const searchQuery = req.query.q ? req.query.q : '';  // Extract search query from the request

    // Search tasks by name using the search query
    const tasks = await Task.findAll({
      where: {
        name: {
          [Op.like]: `%${searchQuery}%`  // Apply search query to task name
        }
      }
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
      }
    });

    if (!task) {
      return res.status(404).send({ status: 'error', message: 'Task not found' });
    }

    return res.status(200).send(task);
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};

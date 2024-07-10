const { Task, Course } = require('../models');

exports.createTask = async (req, res) => {
  const { title, description, dueDate, courseId } = req.body;
  try {
    const task = await Task.create({ title, description, dueDate, courseId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.update({ title, description, dueDate });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Implement the deleteTask and getTasks methods similarly.

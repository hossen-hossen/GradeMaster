const { Weight, Course } = require('../models');

exports.setWeights = async (req, res) => {
  const { component, percentage, courseId } = req.body;
  try {
    const weight = await Weight.create({ component, percentage, courseId });
    res.status(201).json(weight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWeights = async (req, res) => {
  const { courseId } = req.params;
  try {
    const weights = await Weight.findAll({ where: { courseId } });
    res.status(200).json(weights);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

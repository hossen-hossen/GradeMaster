const { Weight } = require('../models');

// Create a new grade weight
exports.createGradeWeight = async (req, res) => {
  const { course_id, item_type, weight } = req.body;
  try {
    const gradeWeight = await Weight.create({ course_id, item_type, weight });
    res.status(201).send(gradeWeight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to set grade weight' });
  }
};

// Update an existing grade weight
exports.updateGradeWeight = async (req, res) => {
  try {
    const gradeWeight = await Weight.findByPk(req.params.id);
    if (!gradeWeight) {
      return res.status(404).json({ error: 'Grade weight not found' });
    }
    await gradeWeight.update(req.body);
    res.status(200).json(gradeWeight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grade weight' });
  }
};

// Delete a grade weight
exports.deleteGradeWeight = async (req, res) => {
  try {
    const result = await Weight.destroy({ where: { weight_id: req.params.id } });
    if (result === 0) {
      return res.status(404).json({ error: 'Grade weight not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete grade weight' });
  }
};

// Get grade weights with filtering options
exports.getGradeWeights = async (req, res) => {
  try {
    const gradeWeights = await Weight.findAll({
      where: req.query
    });
    res.status(200).json(gradeWeights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve grade weights' });
  }
};

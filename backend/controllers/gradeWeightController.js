const { Weight, Course } = require('../models');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

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
    const result = await Weight.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      return res.status(404).json({ error: 'Grade weight not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get grade weights with filtering options
exports.getGradeWeights = async (req, res) => {
  try {
    const gradeWeights = await Weight.findAll({
      include: [
        {
          model: Course, // Include course information
        }
      ]
    });
    res.status(200).json(gradeWeights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve grade weights' });
  }
};

exports.getGradeWeightById = async (req, res) => {
  try {
    const weight = await Weight.findOne({
      where: {
        id: req.params.id,
      }
    });

    if (!weight) {
      return res.status(404).send({ status: 'error', message: 'Weight not found' });
    }

    return res.status(200).send(weight);
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};


exports.importGradeCSV = async (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'grade', req.file.filename);
  const gradeWeights = [];
  const success = [];
  const errors = [];

  fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on('data', (row) => {
      gradeWeights.push(row);
    })
    .on('end', async () => {
      try {
        for (const gradeWeightData of gradeWeights) {
          try {
            const { course_id, item_type, weight } = gradeWeightData;

            const gradeWeight = await Weight.create({
              course_id,
              item_type,
              weight
            });

            success.push(gradeWeight);
          } catch (error) {
            errors.push({ gradeWeight: gradeWeightData, message: error.message });
          }
        }

        fs.unlinkSync(filePath);  // Clean up the uploaded file

        res.status(200).json({
          message: 'Grade weights import completed',
          successCount: success.length,
          errorCount: errors.length,
          errors
        });
      } catch (error) {
        res.status(500).json({ message: 'Error processing CSV', error });
      }
    });
};

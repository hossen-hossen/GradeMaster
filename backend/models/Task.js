const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,  // Description can be nullable as it's not explicitly marked as NOT NULL
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Courses', // 'Courses' refers to table name
      key: 'id',
    },
  },
  type: {
    type: DataTypes.ENUM('Assignment', 'Exam'),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,  // adjust if you don't want it to be nullable
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true,  // adjust if you don't want it to be nullable
  },
  max_score: {
    type: DataTypes.FLOAT,
    allowNull: true,  // adjust if you don't want it to be nullable
  },
});

module.exports = Task;

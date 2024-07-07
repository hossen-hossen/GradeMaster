const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Students', // 'Students' refers to table name
      key: 'id',
    },
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Courses', // 'Courses' refers to table name
      key: 'id',
    },
  },
  enrollment_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,  // adjust if you don't want it to be nullable
  },
});

module.exports = Enrollment;

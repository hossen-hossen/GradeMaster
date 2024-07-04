
const User = require('./User');
const Course = require('./Course');
const Student = require('./Student');
const Enrollment = require('./Enrollment');
const Attendance = require('./Attendance');
const Task = require('./Task');
const Submission = require('./Submission');
const Weight = require('./Weight');

// User and Courses
User.hasMany(Course, { foreignKey: 'user_id' });
Course.belongsTo(User, { foreignKey: 'user_id' });

// Course and Student
Student.belongsToMany(Course, { through: 'StudentCourses', as: 'courses', foreignKey: 'student_id' });
Course.belongsToMany(Student, { through: 'StudentCourses', as: 'students', foreignKey: 'course_id' });

// Student and Enrollments
Student.hasMany(Enrollment, { foreignKey: 'student_id' });
Enrollment.belongsTo(Student, { foreignKey: 'student_id' });

// Course and Enrollments
Course.hasMany(Enrollment, { foreignKey: 'course_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

// Course and Tasks
Course.hasMany(Task, { foreignKey: 'course_id' });
Task.belongsTo(Course, { foreignKey: 'course_id' });

// Student and Attendance
Student.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(Student, { foreignKey: 'student_id' });

// Course and Attendance
Course.hasMany(Attendance, { foreignKey: 'course_id' });
Attendance.belongsTo(Course, { foreignKey: 'course_id' });

// Task and Submissions
Task.hasMany(Submission, { foreignKey: 'task_id' });
Submission.belongsTo(Task, { foreignKey: 'task_id' });

// Student and Submissions
Student.hasMany(Submission, { foreignKey: 'student_id' });
Submission.belongsTo(Student, { foreignKey: 'student_id' });

// Course and Weights
Course.hasMany(Weight, { foreignKey: 'course_id' });
Weight.belongsTo(Course, { foreignKey: 'course_id' });

module.exports = {
    User,
    Course,
    Student,
    Enrollment,
    Attendance,
    Task,
    Submission,
    Weight,
};

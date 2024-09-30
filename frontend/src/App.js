import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequiredUser from "./components/RequiredUser";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { getUserData } from "./utils/Utils";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Course from "./pages/course/Course";
import 'react-toastify/dist/ReactToastify.css';
import CourseCreate from "./pages/course/CourseCreate";
import CourseUpdate from "./pages/course/CourseUpdate";
import Students from "./pages/student/Student";
import StudentCreate from "./pages/student/StudentCreate";
import StudentUpdate from "./pages/student/StudentUpdate";
import Tasks from "./pages/tasks/Tasks";
import TaskCreate from "./pages/tasks/TaskCreate";
import TaskUpdate from "./pages/tasks/TaskUpdate";
import Enrollments from "./pages/enrollment/Enrollments";
import EnrollmentCreate from "./pages/enrollment/EnrollmentCreate";
import TaskSubmissions from "./pages/submission/TaskSubmission";
import SubmissionCreate from "./pages/submission/SubmissionCreate";
import SubmissionUpdate from "./pages/submission/SubmissionUpdate";
import EnrollmentUpdate from "./pages/enrollment/EnrollmentUpdate";
import Attendances from "./pages/attendance/Attendances";
import AttendanceCreate from "./pages/attendance/AttendanceCreate";
import AttendanceUpdate from "./pages/attendance/AttendanceUpdate";
import GradeWeights from "./pages/grade/GradeWeight";
import GradeWeightCreate from "./pages/grade/GradeWeightCreate";
import GradeWeightUpdate from "./pages/grade/GradeWeightUpdate";

function App() {
  const getHomeRoute = () => {
    const user = getUserData();
    if (user) {
      return <Navigate to="courses" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }
  return (
    <Suspense fallback={null}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={getHomeRoute()} />
          <Route element={<RequiredUser />}>
            <Route path="courses" element={<Course />} />
            <Route path="courses/course-create" element={<CourseCreate />} />
            <Route path="courses/course-update/:id" element={<CourseUpdate />} />

            <Route path="students" element={<Students />} />
            <Route path="students/student-create" element={<StudentCreate />} />
            <Route path="students/student-update/:id" element={<StudentUpdate />} />

            <Route path="enrollments" element={<Enrollments />} />
            <Route path="enrollments/enrollment-create" element={<EnrollmentCreate />} />
            <Route path="enrollments/enrollment-update/:id" element={<EnrollmentUpdate />} />

            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/task-create" element={<TaskCreate />} />
            <Route path="tasks/task-update/:id" element={<TaskUpdate />} />

            <Route path="attendances" element={<Attendances />} />
            <Route path="attendances/attendance-create" element={<AttendanceCreate />} />
            <Route path="attendances/attendance-update/:id" element={<AttendanceUpdate />} />

            <Route path="task-submissions" element={<TaskSubmissions />} />
            <Route path="task-submissions/task-submission-create" element={<SubmissionCreate />} />
            <Route path="task-submissions/task-submission-update/:id" element={<SubmissionUpdate />} />

            <Route path="gradeweights" element={<GradeWeights />} />
            <Route path="gradeweights/create-gradeweight" element={<GradeWeightCreate />} />
            <Route path="gradeweights/update-gradeweight/:id" element={<GradeWeightUpdate />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Suspense>
  );
}

export default App;

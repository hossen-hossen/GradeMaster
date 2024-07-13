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
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Suspense>
  );
}

export default App;

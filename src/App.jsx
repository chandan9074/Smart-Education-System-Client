import "./index.css";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import NavarSection from "./components/NavbarSection";
import SignIn from "./pages/Authentication/Signin";
import SignUp from "./pages/Authentication/SignUp";
import PageNotFound from "./components/NotFound";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import CourseDetails from "./pages/Courses/CourseDetails";
import Progrecesses from "./pages/Progresses";
import CheckProgresses from "./pages/Progresses/CheckProgresses";
import ProgressDetails from "./pages/Progresses/ProgressDetails";

function App() {
  return (
    <div className='bg-gray-50'>
      <NavarSection />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/check-progresses' element={<CheckProgresses />} />
        <Route path='/progresses/:username' element={<Progrecesses />} />
        <Route path='/progress-details/:id' element={<ProgressDetails />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/' element={<Welcome />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

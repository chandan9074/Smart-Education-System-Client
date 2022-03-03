import "./index.css";
import { Route, Routes } from "react-router-dom";
import NavarSection from "./components/NavbarSection";
import SignIn from "./pages/Authentication/Signin";
import SignUp from "./pages/Authentication/SignUp";
import PageNotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <NavarSection />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

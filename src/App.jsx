import "./index.css";
import NavarSection from "./components/NavbarSection";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/Authentication/SignUp";

function App() {
  return (
    <div>
      <NavarSection />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;

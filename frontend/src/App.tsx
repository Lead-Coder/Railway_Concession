import { Navbar } from "./components/Navbar"
import Landing from "./pages/Landing"
import OfficerDashboard from "./pages/OfficerDashboard"
import OfficerLogin from "./pages/OfficerLogin"
import OfficerSignup from "./pages/OfficerSignup"
import StudentApply from "./pages/StudentApply"
import StudentDashboard from "./pages/StudentDashboard"
import StudentLogin from "./pages/StudentLogin"
import StudentSignup from "./pages/StudentSignup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="absolute -z-50">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/officer/login" element={<OfficerLogin />} />
          <Route path="/officer/signup" element={<OfficerSignup />} />
          <Route path="/officer/dashboard" element={<OfficerDashboard />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/apply" element={<StudentApply />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

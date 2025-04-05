import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"; 
import Challenges from "./pages/Challenges";
import Courses from "./pages/Courses"
function App() {
  return (
    <Router basename="/">
       <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />  {/* Default landing page */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

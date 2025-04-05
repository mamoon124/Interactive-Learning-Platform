import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css"; // Import the custom CSS for styling

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/Home"); // Redirect after login
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <h2 className="navbar-brand fw-bold">My Learning Platform</h2>
          <input type="text" className="form-control mx-3 w-50" placeholder="Search for courses..." />
          <div>
            {!user ? (
              <button className="btn btn-primary" onClick={handleGoogleLogin}>Signup</button>
            ) : (
              <button className="btn btn-danger" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section text-center text-white d-flex align-items-center">
        <div className="container">
          <h1 className="fw-bold">Learn Anytime, Anywhere</h1>
          <p className="fs-5">Unlock the power of learning with thousands of courses</p>
          {!user ? (
            <button className="btn btn-warning btn-lg" onClick={handleGoogleLogin}>
              Signup with Google
            </button>
          ) : (
            <button className="btn btn-success btn-lg" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Categories Section */}
      <section className="container mt-5">
        <h3 className="mb-4">Top Categories</h3>
        <div className="row">
          {["Development", "Business", "Design", "Marketing"].map((category) => (
            <div key={category} className="col-md-3">
              <div className="card p-3 text-center shadow-sm">
                <h5>{category}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mt-5">
        <h3 className="mb-4">Featured Courses</h3>
        <div className="row">
          {[
            { title: "React for Beginners", instructor: "John Doe" },
            { title: "Python Bootcamp", instructor: "Jane Smith" },
            { title: "UI/UX Design", instructor: "David Miller" },
          ].map((course) => (
            <div key={course.title} className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">Instructor: {course.instructor}</p>
                  <button className="btn btn-primary">Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>© 2025 My Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

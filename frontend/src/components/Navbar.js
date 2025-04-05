import { Link } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useState, useEffect } from "react";
<Link className="nav-link" to="/courses">Courses</Link>


export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.href = "/"; // Force refresh to clear Firebase session
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Learning Platform</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              {user ? (
                <>
                  <span className="nav-link">{user.displayName}</span>
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleGoogleLogin}>Signup</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

import { useEffect, useState } from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import axios from "axios"; // Import Axios to make API calls

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0); // Initially 0%
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchProgress(); // Fetch progress from backend
      } else {
        handleGoogleLogin(); // Redirect to login if not authenticated
      }
    });
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/progress/");
      setProgress(response.data.progress); // Update progress dynamically
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const handleGoogleLogin = async () => {
    if (auth.currentUser) return; // Prevent multiple popups
  
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/Home"); // Reload dashboard after login
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      {user ? (
        <>
          <h1 className="text-success">Dashboard</h1>
          <p>Welcome, {user.displayName}!</p>

          {/* Progress Bar Section */}
          <div className="card p-4 shadow-sm">
            <h4>Course Progress</h4>
            <ProgressBar now={progress} label={`${progress}%`} variant="success" />
          </div>
        </>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}

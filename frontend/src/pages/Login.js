import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      navigate("/Home"); 
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Welcome! Please Sign in</h2>
      <button className="btn btn-danger mt-3" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}

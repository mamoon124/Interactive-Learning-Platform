import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJO9eVul0wI9NCrZH3oZZ3oIJ87H7ZRck",
  authDomain: "interactuve-learning.firebaseapp.com",
  projectId: "interactuve-learning",
  storageBucket: "interactuve-learning.firebasestorage.app",
  messagingSenderId: "830096106576",
  appId: "1:830096106576:web:ef363809c1c34518151d55",
  measurementId: "G-H6EG1V1GQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // ✅ Correctly exported
export const provider = new GoogleAuthProvider();
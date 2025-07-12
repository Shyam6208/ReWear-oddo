// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF4oqOy8Zc4IlEv208SL4MlSkHywvGDEU",
  authDomain: "rewear-9dcbd.firebaseapp.com",
  projectId: "rewear-9dcbd",
  storageBucket: "rewear-9dcbd.firebasestorage.app",
  messagingSenderId: "1040001780833",
  appId: "1:1040001780833:web:5a44d7ba1cc8c4529d2e20",
  measurementId: "G-GBX7FRLK58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider }; 
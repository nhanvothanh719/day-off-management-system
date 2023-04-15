import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD5DSqDtpQS2eJ8pCTC0ZoB3J20vDvxaC0",
  authDomain: "devplus-logoff-management.firebaseapp.com",
  projectId: "devplus-logoff-management",
  storageBucket: "devplus-logoff-management.appspot.com",
  messagingSenderId: "450149343557",
  appId: "1:450149343557:web:10953c4daeee4e33aa1e2c",
  measurementId: "G-E9JDT7F2B9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
 
export {auth, provider};
//const analytics = getAnalytics(app);
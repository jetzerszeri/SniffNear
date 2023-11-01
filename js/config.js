// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6pwopVjq0YE2mBuHxMNeg_roeDwySSpE",
  authDomain: "sniffnear.firebaseapp.com",
  projectId: "sniffnear",
  storageBucket: "sniffnear.appspot.com",
  messagingSenderId: "107536013939",
  appId: "1:107536013939:web:a571f3fa47133ac1e8e806"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
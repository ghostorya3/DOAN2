// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuvbmbWRvFA5hiUgV_mjT7Tw8AC-Bbbcg",
  authDomain: "test-grql-d9a0d.firebaseapp.com",
  projectId: "test-grql-d9a0d",
  storageBucket: "test-grql-d9a0d.appspot.com",
  messagingSenderId: "639584124554",
  appId: "1:639584124554:web:3b3e97d8d1ed3e2b02f773",
  measurementId: "G-S6F24KYX6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }
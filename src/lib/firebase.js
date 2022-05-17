import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDcmzNhSuXqVyUn_PQlTjAm8z_Abu6Evyo",
  authDomain: "test-todo-9dbef.firebaseapp.com",
  projectId: "test-todo-9dbef",
  storageBucket: "test-todo-9dbef.appspot.com",
  messagingSenderId: "576712065650",
  appId: "1:576712065650:web:76d3730a7cd8fcad5538eb",
  measurementId: "G-2J6RP0Q4Q2",
};

const app = initializeApp(firebaseConfig);
export default app;

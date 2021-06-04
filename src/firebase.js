import firebase from "firebase/app";
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDD4rJYHRnXZeg_Kx8CIMU3kqBOY_I6Tqk",
  authDomain: "auth-development-d06b2.firebaseapp.com",
  projectId: "auth-development-d06b2",
  storageBucket: "auth-development-d06b2.appspot.com",
  messagingSenderId: "297577807852",
  appId: "1:297577807852:web:85ecee3b36c8408fed4ac9" 
});

export const auth = app.auth();

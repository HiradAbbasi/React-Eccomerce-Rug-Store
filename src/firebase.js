import firebase from "firebase";
//we dont want to import everything, so we only import what we are planning on using here
//in this case, auth and firestore
//import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDD4rJYHRnXZeg_Kx8CIMU3kqBOY_I6Tqk",
  authDomain: "auth-development-d06b2.firebaseapp.com",
  projectId: "auth-development-d06b2",
  appId: "1:297577807852:web:85ecee3b36c8408fed4ac9" 
});

//auth and firestore references
const db = app.firestore();
const auth = app.auth();

export {auth, db, firebase};




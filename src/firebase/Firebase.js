import firebase from "firebase";

const config = {
  apiKey: "AIzaSyARNrwb18GzW8wiJiE586XdvXhJ_YMbOOw",
  authDomain: "cresulant.firebaseapp.com",
  databaseURL: "https://cresulant.firebaseio.com",
  projectId: "cresulant",
  storageBucket: "cresulant.appspot.com",
  messagingSenderId: "28328385190"
};

const fire = firebase.initializeApp(config);

export default fire;

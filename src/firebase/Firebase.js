import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCbSFjXeItOtkf81LcDpJIw5riGbm0GOT8",
  authDomain: "gaming-2e781.firebaseapp.com",
  databaseURL: "https://gaming-2e781.firebaseio.com",
  projectId: "gaming-2e781",
  storageBucket: "gaming-2e781.appspot.com",
  messagingSenderId: "518129799135"
};

const fire = firebase.initializeApp(config);

export default fire;

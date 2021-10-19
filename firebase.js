import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFgC8sxraflB0a8EkdF6bfRC6eaPtjfBw",
  authDomain: "signal-clone-1111.firebaseapp.com",
  projectId: "signal-clone-1111",
  storageBucket: "signal-clone-1111.appspot.com",
  messagingSenderId: "783486381045",
  appId: "1:783486381045:web:3db583f2194fc109a68ebc",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

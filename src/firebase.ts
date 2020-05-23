import * as firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAd7TYjTpzqlmXtGZvwNiuFEG_N5yAzzb8",
  authDomain: "do2gether-57493.firebaseapp.com",
  databaseURL: "https://do2gether-57493.firebaseio.com",
  projectId: "do2gether-57493",
  storageBucket: "do2gether-57493.appspot.com",
  messagingSenderId: "119136473843",
};

firebase.initializeApp(config);

export default firebase;

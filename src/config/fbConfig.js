import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


var config = {
  apiKey: "AIzaSyAqK2CMzCSgXmVMbeBhSDHN9b-YPEccWAk",
    authDomain: "castfb-d51e7.firebaseapp.com",
    databaseURL: "https://castfb-d51e7.firebaseio.com",
    projectId: "castfb-d51e7",
    storageBucket: "castfb-d51e7.appspot.com",
    messagingSenderId: "311630395628"
};

firebase.initializeApp(config);
firebase.firestore()

export default firebase;
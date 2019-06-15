import firebase from 'firebase/app'; //importing core functionalities of firebase and not everything about firebase that is needed in development version o firebase (you will see a warning in console about this if you remove      '/app').
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB8Q2kdhp4PfSqDKA4VMi27_d4LP5Z98a0",
    authDomain: "react-projectmanager-dcffe.firebaseapp.com",
    databaseURL: "https://react-projectmanager-dcffe.firebaseio.com",
    projectId: "react-projectmanager-dcffe",
    storageBucket: "react-projectmanager-dcffe.appspot.com",
    messagingSenderId: "1008211250998",
    appId: "1:1008211250998:web:a2925e851fe0b530"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;  //entire .js file ( from which we are importing anything )is bundled into the end JS file, when its corresp. import is encountered by webpack. Means, fbconfig.js will be in the bundle whenever firebase will be imported. 
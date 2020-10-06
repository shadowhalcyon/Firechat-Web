import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAb5mbbM0KL1nHFoTwH0osn5PqZH1copOQ",
  authDomain: "firechat-fd607.firebaseapp.com",
  databaseURL: "https://firechat-fd607.firebaseio.com",
  projectId: "firechat-fd607",
  storageBucket: "firechat-fd607.appspot.com",
  messagingSenderId: "9082388597",
  appId: "1:9082388597:web:f6372277443455a440783c"
})

const auth = app.auth();
const database = app.database();
const firestore = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { auth, database, firestore, googleProvider, facebookProvider }

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  //You can enter your firebase configuration 
  // setting here
});

const db = firebaseApp.firestore();

export default db;
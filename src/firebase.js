import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyC6-QPLFsIO1cToENvhacgXZTp2D9q2lmo",
    authDomain: "instavueeo.firebaseapp.com",
    databaseURL: "https://instavueeo.firebaseio.com",
    projectId: "instavueeo",
    storageBucket: "instavueeo.appspot.com",
    messagingSenderId: "399997419800",
    appId: "1:399997419800:web:043b1f088fde7a1e3cde6d"
}

const db = firebase.firestore();
const auth = firebase.auth();
const user = auth.currentUser;
const storage = firebase.storage();

const entriesCollection = db.collection('entries');
const usersCollection = db.collection('users');
const likesCollection = db.collection('likes');

export default {
    db,
    auth,
    user,
    storage,
    entriesCollection,
    usersCollection,
    likesCollection
}
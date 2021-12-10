import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyB1huIOk0WpvYCbSb1xqd4RBD3Dt8PYe-s",
        authDomain: "random-people-a5f14.firebaseapp.com",
        projectId: "random-people-a5f14",
        storageBucket: "random-people-a5f14.appspot.com",
        messagingSenderId: "425238964552",
        appId: "1:425238964552:web:1e1a0b21a05a6fced02b7d"
    });
} else {
    firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const db = firebase.firestore();

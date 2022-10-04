import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDjH52srL4Mzf9jrdAbNvFWBXOqjdSiUEA",
    authDomain: "jts-ecommers.firebaseapp.com",
    projectId: "jts-ecommers",
    storageBucket: "jts-ecommers.appspot.com",
    messagingSenderId: "70431237273",
    appId: "1:70431237273:web:b63eae819265982606c408",
    measurementId: "G-K1E5L5G75L"
};
const app = firebase.initializeApp(firebaseConfig);

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore(app);
}

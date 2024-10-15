import * as firebase from 'firebase/app';

const loginRequest = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};
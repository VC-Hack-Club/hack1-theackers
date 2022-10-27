import app from './firebase-config';
import {
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from 'firebaseui';


var authStore = {
    get: function get() {
        return JSON.parse(localStorage.getItem('auth'));
    },
    set: function set(auth) {
        localStorage.setItem('auth', JSON.stringify(auth));
    },
    login_: function login(email, password) {
        const auth = getAuth(app);
        return signInWithEmailAndPassword(auth, email, password);
    },
    register_: function register(email, password) {
        const auth = getAuth(app);
        return createUserWithEmailAndPassword(auth, email, password);
    },
    login: function login(email, password) {
        return this.login_(email, password).then(function (userCredential) {
            var user = userCredential.user;
            const auth = getAuth(app);
            auth.currentUser.getIdToken().then(function (idToken) {
                authStore.set({
                    email: user.email,
                    uid: user.uid,
                    authToken: idToken,
                    authRT: user.response._tokenResponse
                });
            });
            return user;
        });
    }


}

export default authStore;
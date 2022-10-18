import { app } from './firebase-config';
import {
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword
} from "firebase/auth";


var authStore = {
    get: function get() {
        return localStorage.getItem('auth');
    },
    set: function set(auth) {
        localStorage.setItem('auth', auth);
    },
    login: function login(email, password) {
        const auth = getAuth(app);
        return signInWithEmailAndPassword(auth, email, password);
    },
    register: function register(email, password) {
        const auth = getAuth(app);
        return createUserWithEmailAndPassword(auth, email, password);
    }
}

export default authStore;
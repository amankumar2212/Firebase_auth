import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAr3_UhPGNMuzlHjw775L2KH28nrG2u_4E",
    authDomain: "fir-auth-3c5af.firebaseapp.com",
    projectId: "fir-auth-3c5af",
    storageBucket: "fir-auth-3c5af.appspot.com",
    messagingSenderId: "1095179107298",
    appId: "1:1095179107298:web:983e4e43038651033c57bb",
    measurementId: "G-73DH27GPZK"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
export { app, auth };
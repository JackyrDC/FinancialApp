import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkbyvpYlEv61t05rgLs2byzXx2W1SyBRQ",
  authDomain: "loginfinancialapp.firebaseapp.com",
  projectId: "loginfinancialapp",
  storageBucket: "loginfinancialapp.appspot.com",
  messagingSenderId: "799588713428",
  appId: "1:799588713428:web:abc76ff008564b92418c41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
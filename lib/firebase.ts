import { initializeApp } from "firebase/app";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDvsF4CgiQiqKQ1_M9Xk8GvZR2G-oBkgAs",

  authDomain:
    "connect-loans-warangal.firebaseapp.com",

  projectId:
    "connect-loans-warangal",

  storageBucket:
    "connect-loans-warangal.firebasestorage.app",

  messagingSenderId:
    "463227273171",

  appId:
    "1:463227273171:web:00c1d825caf237f485b926",

};

const app =
  initializeApp(firebaseConfig);

export const db =
  getFirestore(app);
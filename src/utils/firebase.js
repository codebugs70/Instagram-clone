import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn5wnLJ0FzeLqf7WwCjfjlucovM7tn3WQ",
  authDomain: "instagram-clone-31e89.firebaseapp.com",
  projectId: "instagram-clone-31e89",
  storageBucket: "instagram-clone-31e89.appspot.com",
  messagingSenderId: "737235723158",
  appId: "1:737235723158:web:5d6d1b4d5e5c6f1330b3b7",
  measurementId: "G-CMJCS2NXZY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

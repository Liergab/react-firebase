import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDym5Z5TszefBG9plzgSdCnpieEvQgj4GY",
  authDomain: "fir-course-3c7fd.firebaseapp.com",
  projectId: "fir-course-3c7fd",
  storageBucket: "fir-course-3c7fd.appspot.com",
  messagingSenderId: "15485978006",
  appId: "1:15485978006:web:3c5bf3d23e62b11cea89b7",
  measurementId: "G-KJDQX7YZ6G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app)
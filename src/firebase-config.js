import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAX_c5Sq5e10XoIXlpHspQLdOYAS7uyquU",
  authDomain: "rekrutacja-97060.firebaseapp.com",
  projectId: "rekrutacja-97060",
  storageBucket: "rekrutacja-97060.appspot.com",
  messagingSenderId: "109216656502",
  appId: "1:109216656502:web:970ad907e6e92be0f04357",
  measurementId: "G-4SXL7XK4RB",
};

export const app = initializeApp(firebaseConfig);
export default getFirestore();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

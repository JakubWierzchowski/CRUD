import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {};

export const app = initializeApp(firebaseConfig);
export default getFirestore();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

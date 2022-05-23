import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPv_IsQRTMAfZ5Wi-1S_hVcSvhvll1FUQ",
  authDomain: "usereducer-e3916.firebaseapp.com",
  projectId: "usereducer-e3916",
  storageBucket: "usereducer-e3916.appspot.com",
  messagingSenderId: "863384668982",
  appId: "1:863384668982:web:9a65053d2befc1593e4197",
  measurementId: "G-WBNEK8DPC3",
};

export const app = initializeApp(firebaseConfig);
export default getFirestore();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

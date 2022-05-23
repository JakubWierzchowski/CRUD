import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
<<<<<<< HEAD

const firebaseConfig = {
  apiKey: "AIzaSyCPv_IsQRTMAfZ5Wi-1S_hVcSvhvll1FUQ",
  authDomain: "usereducer-e3916.firebaseapp.com",
  projectId: "usereducer-e3916",
  storageBucket: "usereducer-e3916.appspot.com",
  messagingSenderId: "863384668982",
  appId: "1:863384668982:web:9a65053d2befc1593e4197",
  measurementId: "G-WBNEK8DPC3",
=======
const firebaseConfig = {
  apiKey: "AIzaSyAX_c5Sq5e10XoIXlpHspQLdOYAS7uyquU",
  authDomain: "rekrutacja-97060.firebaseapp.com",
  projectId: "rekrutacja-97060",
  storageBucket: "rekrutacja-97060.appspot.com",
  messagingSenderId: "109216656502",
  appId: "1:109216656502:web:970ad907e6e92be0f04357",
  measurementId: "G-4SXL7XK4RB",
>>>>>>> 91d247eb0f46e70abde7428ef3e2cafbd1e48a83
};

export const app = initializeApp(firebaseConfig);
export default getFirestore();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

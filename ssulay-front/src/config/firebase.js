import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD76VdS6HtXMkxeY1JXWsGRnijGB2TyUrU",
  authDomain: "ssulay-5dc0a.firebaseapp.com",
  databaseURL:
    "https://ssulay-5dc0a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ssulay-5dc0a",
  storageBucket: "ssulay-5dc0a.appspot.com",
  messagingSenderId: "51922478256",
  appId: "1:51922478256:web:9034c91691bd33bb7c0775",
  measurementId: "G-B6KHY2R9FY",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

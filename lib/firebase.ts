// lib/firebase.ts

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDHg_PRt2uVM3jPhtfb-twf6XDABeZXq6w",
  authDomain: "realdemo-ec30a.firebaseapp.com",
  databaseURL: "https://realdemo-ec30a-default-rtdb.firebaseio.com",
  projectId: "realdemo-ec30a",
  storageBucket: "realdemo-ec30a.firebasestorage.app",
  messagingSenderId: "718989023469",
  appId: "1:718989023469:web:476a94dba4f348989fd4e4",
  measurementId: "G-22JNK55G2T",
};

const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const db = getDatabase(app);

export { db };


import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVFglXTzAHPwbuorlt0dnIX4-PKNtu8Gk",
  authDomain: "photofolio-f5cca.firebaseapp.com",
  projectId: "photofolio-f5cca",
  storageBucket: "photofolio-f5cca.appspot.com",
  messagingSenderId: "523880968775",
  appId: "1:523880968775:web:0a2a36e85ecd3c0867f762"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);

export {db};

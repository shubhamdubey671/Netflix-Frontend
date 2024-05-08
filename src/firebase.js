import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHS1CdNQPV4A8cw4HXzVVrGhpA56UlPJY",
  authDomain: "new-netflix-ffe47.firebaseapp.com",
  projectId: "new-netflix-ffe47",
  storageBucket: "new-netflix-ffe47.appspot.com",
  messagingSenderId: "445835091589",
  appId: "1:445835091589:web:33a7c307ff5212fb15d3ec",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth };
export default db;

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-7xG1TTllRRyMldk4mS7k_8BcjMTAWi8",
  authDomain: "biblio-cc84b.firebaseapp.com",
  projectId: "biblio-cc84b",
  storageBucket: "biblio-cc84b.firebasestorage.app",
  messagingSenderId: "823617403574",
  appId: "1:823617403574:web:e579c9bd1788f137c24417",
  measurementId: "G-PWEJXF3Q4M"
  //apiKey: "AIzaSyAycPH0e54OEuQKZHJlJVBzrl8PJwE5eEw",
  //authDomain: "test-b1637.firebaseapp.com",
  //projectId: "test-b1637",
  //storageBucket: "test-b1637.appspot.com",
  //messagingSenderId: "912702084020",
  //appId: "1:912702084020:web:7c4470b95d458da35558e1",
  //measurementId: "G-PWEJXF3Q4M"
};



const app = initializeApp(firebaseConfig);

// Initialisation simple de l'authentification sans persistance
const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

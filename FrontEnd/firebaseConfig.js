import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnQ_QcQ3qsyyH3uyEkzVnt4CcDQAMuK2s",
  authDomain: "myeventz-69f5f.firebaseapp.com",
  projectId: "myeventz-69f5f",
  storageBucket: "myeventz-69f5f.appspot.com",
  messagingSenderId: "930852908193",
  appId: "1:930852908193:web:d17ecd67ed0e83f0d914e0",
  measurementId: "G-53X5XHP6CS"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
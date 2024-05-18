import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCRDWKUOU8sOd-sdNqCJP4MqtrP-KngBgM",
  authDomain: "myeventz-c81d3.firebaseapp.com",
  projectId: "myeventz-c81d3",
  storageBucket: "myeventz-c81d3.appspot.com",
  messagingSenderId: "756001772782",
  appId: "1:756001772782:web:d4a41e3a4f6cc2982f4fff",
  measurementId: "G-SE7Q22NBG3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { storage, auth };
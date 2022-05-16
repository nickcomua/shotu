import { initializeApp } from "firebase/app";
import { getAuth , initializeAuth} from "firebase/auth";
import { getDatabase } from "firebase/database" 
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");
import {getReactNativePersistence} from 'firebase/auth/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC05cqm2RzJTFl__4kb-zSpTD5BWtYviVU",
  authDomain: "shotu-d1d38.firebaseapp.com",
  databaseURL: "https://shotu-d1d38-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shotu-d1d38",
  storageBucket: "shotu-d1d38.appspot.com",
  messagingSenderId: "617899277925",
  appId: "1:617899277925:web:cf2b57be2659e47ca5508c",
  measurementId: "G-N714QKP9MR"
};

  

const app = initializeApp(firebaseConfig); 
const auth = initializeAuth(app,{persistence: getReactNativePersistence(AsyncStorage)});
const db = getDatabase(app); 

export {
  app,
  auth,
  db
}

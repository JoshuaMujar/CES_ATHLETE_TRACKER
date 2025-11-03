// FireBaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqDmuAMpc7y8cmPweE-tcP6k4wqxq6CXM",
  authDomain: "athletetracker-38518.firebaseapp.com",
  projectId: "athletetracker-38518",
  storageBucket: "athletetracker-38518.appspot.com",
  messagingSenderId: "194752397241",
  appId: "1:194752397241:web:79420d4961f4484c2c4068"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

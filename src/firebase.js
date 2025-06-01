import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCDr9HtiBE5vsYyr6NorJk_cqz5InCfncM",
  authDomain: "poop-health-app.firebaseapp.com",
  projectId: "poop-health-app",
  storageBucket: "poop-health-app.appspot.com",
  messagingSenderId: "296624290447",
  appId: "1:296624290447:web:3966fc3d0ce2c1e6fc8efa",
  measurementId: "G-1ZWH8KP34C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

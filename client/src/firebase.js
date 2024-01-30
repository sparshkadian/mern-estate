import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-adb9d.firebaseapp.com',
  projectId: 'mern-estate-adb9d',
  storageBucket: 'mern-estate-adb9d.appspot.com',
  messagingSenderId: '299026148388',
  appId: '1:299026148388:web:838ef60457b1a9dbffbcb1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

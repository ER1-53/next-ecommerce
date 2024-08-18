
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8UW9eBoWZE5vMv85G9abh0TTNxFOQwm4",
  authDomain: "dans-mon-panier-ff667.firebaseapp.com",
  projectId: "dans-mon-panier-ff667",
  storageBucket: "dans-mon-panier-ff667.appspot.com",
  messagingSenderId: "92602219764",
  appId: "1:92602219764:web:7a665c829d90215e3172a1",
  measurementId: "G-SGF6G40MMF"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

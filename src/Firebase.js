import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjNA_dmkvOFr5XKpZBy7RLTGnnrirDdnA",
  authDomain: "trendify-2ed18.firebaseapp.com",
  projectId: "trendify-2ed18",
  storageBucket: "trendify-2ed18.firebasestorage.app",
  messagingSenderId: "118852778142",
  appId: "1:118852778142:web:c35cb40aeb5ebd81e6238f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    console.log("User info:", user);
    console.log("Access token:", token);

    return user;
  } catch (error) {
    console.error("Error during Google sign-in:", error.message);
    throw error;
  }
};

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDfx1XaG5MUIJkJwMTmsWPvi20LRqrOrrw",
  authDomain: "be-a-weeb-db.firebaseapp.com",
  projectId: "be-a-weeb-db",
  storageBucket: "be-a-weeb-db.appspot.com",
  messagingSenderId: "424270794132",
  appId: "1:424270794132:web:851f0c855a99d4ba73d381",
  measurementId: "G-4CEYBR323M",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.error('Error creating user', error)
    }
  }

  return userDocRef
}
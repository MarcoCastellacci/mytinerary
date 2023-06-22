// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  // eslint-disable-next-line
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  // eslint-disable-next-line
  deleteDoc,
} from 'firebase/firestore';
import {
  getStorage,
  // eslint-disable-next-line
  ref,
  // eslint-disable-next-line
  uploadBytes,
  // eslint-disable-next-line
  getDownloadURL,
  // eslint-disable-next-line
  getBytes
} from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: "app-mytinerary",
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MESSUREMENTID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
// eslint-disable-next-line
const storage = getStorage(app);


export async function userExist(uid) {
  try {
    const docRef = doc(db, 'users', uid);
    const res = await getDoc(docRef);
    // console.log(res);
    return res.exists();
  } catch (err) {
    console.error(err);
  }
}

export async function userNameExist(username) {
  const users = [];
  try {
    const docsRef = collection(db, 'users')
    const q = query(docsRef, where('displayName', '==', username));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });

    return users.length > 0 ? users[0].uid : null;
  } catch (error) {
    console.error(error);
  }

}

export async function ConfirmEmail(email) {
  const users = [];
  try {
    const docsRef = collection(db, 'users')
    const q = query(docsRef, where('email_confirmed', '==', email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });

    return users.length > 0 ? users[0].uid : null;
  } catch (error) {
    console.error(error);
  }
}


export async function RegsiterNewUser(user) {
  try {
    const collectionRef = collection(db, 'users')
    const docRef = doc(collectionRef, user.uid)
    await setDoc(docRef, user)
  } catch (error) {
    console.error(error);
  }
}

export async function UpdateUser(user) {
  try {
    const collectionRef = collection(db, 'users')
    const docRef = doc(collectionRef, user.uid)
    await setDoc(docRef, user)
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db, "users", uid)
    const document = await getDoc(docRef)
    return document.data();
  } catch (error) {
    console.error(error);
  }
}

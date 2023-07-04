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

export async function logout() {
  await auth.signOut();
}

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

export async function ConfirmEmail() {
  const users = [];
  try {
    const docsRef = collection(db, 'users')
    const q = query(docsRef, where('emailVerified', '==', true));
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
    console.log(document);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}

export async function getCities() {
  const cities = []
  try {
    const collectionRef = collection(db, "cities")
    const querySnapshot = await getDocs(collectionRef)
    querySnapshot.forEach(doc => {
      const city = { ...doc.data() }
      // console.log(doc);
      city.docId = doc.id
      cities.push(city)
    })
    return cities
  } catch (error) {
    console.error(error);
  }
}

export async function getCitiesById(docId) {
  const cities = []
  try {
    const docRef = collection(db, "cities")
    const q = query(docRef, where('_id', '==', docId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      cities.push(doc.data());
    });

    return cities.length > 0 ? cities[0] : null;
  } catch (error) {
    console.error(error);
  }
}

export async function getItineraryByCities(docId) {
  const itinerary = []
  try {
    const docRef = collection(db, "itineraries")
    const q = query(docRef, where('city', '==', docId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      itinerary.push(doc.data());
    });

    return itinerary.length > 0 ? itinerary[0] : null;
  } catch (error) {
    console.error(error);
  }
}

export async function getItineraries() {
  const itineraries = []
  try {
    const collectionRef = collection(db, "itineraries")
    const querySnapshot = await getDocs(collectionRef)
    querySnapshot.forEach(doc => {
      const itinerary = { ...doc.data() }
      // console.log(doc);
      itinerary.docId = doc.id
      itineraries.push(itinerary)
    })
    return itineraries
  } catch (error) {
    console.error(error);
  }
}

export async function getActivitiesByItinerary(docId) {
  const activity = []
  try {
    const docRef = collection(db, "activities")
    const q = query(docRef, where('itinerary', '==', docId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      activity.push(doc.data());
    });

    return activity.length > 0 ? activity : null;
  } catch (error) {
    console.error(error);
  }
}

export async function getActivities() {
  const activities = []
  try {
    const collectionRef = collection(db, "activities")
    const querySnapshot = await getDocs(collectionRef)
    querySnapshot.forEach(doc => {
      const activity = { ...doc.data() }
      // console.log(doc);
      activity.docId = doc.id
      activities.push(activity)
    })
    return activities
  } catch (error) {
    console.error(error);
  }
}
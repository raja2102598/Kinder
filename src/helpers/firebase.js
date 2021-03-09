import firebase from "firebase/app"
import "firebase/storage"
import "firebase/analytics"

var firebaseConfig = {
  apiKey: "AIzaSyDbxHPYv8yLwQDjk0p6hcH38YEB_QtaSK8",
  authDomain: "privacynet-faafb.firebaseapp.com",
  projectId: "privacynet-faafb",
  storageBucket: "privacynet-faafb.appspot.com",
  messagingSenderId: "687721075393",
  appId: "1:687721075393:web:bafe88b78017afdb7b7a40",
  measurementId: "G-VX4DJJ4PWG",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//analytics is optional for this tutoral
firebase.analytics()
const storage = firebase.storage()
export { storage, firebase as default }

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAjI4ybodxUIjP2Q_NZOdSjyMB8gLqZzvU",
    appId: "1:456680698935:web:c35a68c11f739cbe117bb2",
    projectId: "auth-zavrsni-rad-35575",
    authDomain: "auth-zavrsni-rad-35575.firebaseapp.com",
    storageBucket: "auth-zavrsni-rad-35575.appspot.com",
    messagingSenderId: "456680698935",
    databaseURL: "https://auth-zavrsni-rad-35575-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getDatabase(firebaseApp);
export const firebaseDbRef = ref(firebaseDb);

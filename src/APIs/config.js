// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    getMetadata,
    deleteObject,
    uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
const firebaseConfig = {
    apiKey: "AIzaSyAz-cFJIUrVrjEel_8YU9bTJJAtSTa05iw",
    authDomain: "nocablesneeded-beb23.firebaseapp.com",
    projectId: "nocablesneeded-beb23",
    storageBucket: "nocablesneeded-beb23.appspot.com",
    messagingSenderId: "815904026808",
    appId: "1:815904026808:web:47cb772459c97caae0444d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadImage(file, extension, onProgress) {
    //let extension = file.type === "image/jpeg" ? "jpg" : "png";
    const storageRef = ref(storage, `${v4()}.${extension}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on("state_changed", (snapshot) => {
    //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   onProgress(progress);
    // });

    await uploadTask;

    const url = await getDownloadURL(storageRef);
    const metaData = await getMetadata(storageRef);
    return { url, metaData };
}

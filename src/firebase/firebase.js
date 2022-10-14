// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSEGING_SENDER_ID,
  appId: REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize the firestore
const db = getFirestore(app)

export const collRef = collection(db, 'todos')

// adding the todo to the firestore
export const addTodo = async (todo) => {
    try{
        const docRef = await addDoc(collRef, {
            name: todo,
        })
        console.log("new doc inserted", docRef.id)
    }
    catch(e){
        console.log("Error: ", e)
    }
}

// fetching the todos
export const getTodos = async () => {
    try{
        const snapshot = await getDocs(collRef)
    }
    catch(e){
        console.log("Error: ", e)
    }
}

//deleting the todos

export const removeTodo = async (todo) => {
    try {
        const docRef = await deleteDoc(doc(collRef, todo))
        console.log("deleted doc:", todo)
    }
    catch(e) {
        console.log(e)
    }
}
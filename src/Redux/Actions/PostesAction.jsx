

import { useDispatch } from 'react-redux'


import { ref, uploadBytes, listAll, list, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp,getDocs ,arrayUnion } from "firebase/firestore"; 
import { auth, db, storage } from "../../firebase/firebase-config"


import { v4 } from 'uuid';





//get images from firebase
export const GetAllPosts  =  ()=> async (dispatch) =>{

  try{
    const data = await getDocs(collection(db, "Posts"));
    dispatch({type:"YES_POSTS" ,data:data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))})
  console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
  localStorage.setItem("Loading",true),
  console.log(Array.isArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
  }
  catch(e){
    dispatch({type:"NO_POSTS" ,data:"error"+e,})
  
  }
  }
  
  


//create Post to firebase
export const AddUserToDB  =  (email,userName,photo)=> async (dispatch) =>{


  const docRef = await addDoc(collection(db, "Users" ,  `${email}`), {

    Email: email,
    Name: userName,
    Photo: photo,



  });
 console.log('added user')


    }














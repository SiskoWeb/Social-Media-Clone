import React from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import {provider} from '../../firebase/firebase-config'
import { getAuth, signInWithPopup, GoogleAuthProvider ,signOut } from "firebase/auth";
import { useEffect ,useState } from 'react'

import './Login.scss'
import { collection, addDoc, Timestamp,getDocs ,arrayUnion, updateDoc } from "firebase/firestore"; 
import { auth, db, storage } from "../../firebase/firebase-config"
export default function Login() {


    const Auth = useSelector(state => state.Login.isAuth)
   const [ilogin ,setIsLogin] =useState(Auth)
    const Dispatch = useDispatch()
        
    useEffect(()=>{
    
      setIsLogin(localStorage.getItem('isAuth'))

    },[])

    
        const login= async(e)  =>  {
            e.preventDefault();
            //check if user ar login
            const auth = getAuth();

                   //function to login
            signInWithPopup(auth, provider)
              .then(async(result) => {

                 // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
           
                localStorage.setItem("isAuth", true);
                localStorage.setItem('email',user.email)
               
                localStorage.setItem('name',user.displayName)
                localStorage.setItem('name',user.uid)


                Dispatch({
                  type:"INFO",
                  payload:{
                   email: user.email,
                   name:user.displayName,
                   avatar:user.photoURL,
                   isAuth:true,
                   userID:user.uid
                  }
                })



             await Promise.all(
               await addDoc(collection(db, "Users" ,  `${user.email}`,`${user.email}` ), {

                Email: user.email,
                Name: user.displayName,
                Photo: user.photoURL,
                uid:user.uid ,
              test:"testo2"  })
             )
              
         
             
              }).catch((error) => {
                // Handle Errors here.
                console.log(`false login`)
       
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
              });
          
          }

 

  return (
    <div className='login'>Don’t miss what’s happening
    People on Twitter are the first to know.
    <a onClick={(e)=>login(e)}>Login</a></div>
  )
}

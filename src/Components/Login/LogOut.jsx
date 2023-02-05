import React from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import {provider} from '../../firebase/firebase-config'
import { getAuth, signInWithPopup, GoogleAuthProvider ,signOut } from "firebase/auth";
import { useEffect ,useState } from 'react'
export default function LogOut() {
    const Auth = useSelector(state => state.Login.isAuth)
  
    const [ilogin ,setIsLogin] =useState(Auth)
    const Dispatch = useDispatch()

    const signOut3=(e)=>{
        e.preventDefault();
        const auth = getAuth();
        signOut(auth, provider)  .then((result) => {
            console.log(result),
      
            localStorage.removeItem('isAuth')
            localStorage.removeItem('email')
            localStorage.removeItem('name')
            localStorage.removeItem('avatar')
            Dispatch({
              type:"INFO",
              payload:{
               email: null,
               name:null,
               avatar:null,
               isAuth:false,
              }
            })
            console.log('log out done')
            location.reload(); 
    
        }).catch((error) => {
    
            console.log(error)
        })
        
    }
    
    
          useEffect(()=>{
    
            setIsLogin(localStorage.getItem('isAuth'))
    
          },[])
  return (
    <div>{localStorage.getItem("isAuth")?<a onClick={(e)=>signOut3(e)}>log Out</a>:null}</div>
  )
}

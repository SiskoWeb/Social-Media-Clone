import { useState ,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import NavBar from './Components/NavBar/NavBar'
import FeedCard from './Components/FeedCard/FeedCard'
import SideBar from './Components/SideBar/SideBar'
import Msg from './Components/Msg/Msg'
import Feed from './Components/Feed/Feed'
import { useSelector ,useDispatch } from 'react-redux'

import CreatPost from './Components/CreatPost/CreatPost'
import { ref ,uploadBytes, getDownloadURL  } from "firebase/storage";
import { collection, addDoc, arrayUnion, updateDoc, doc , setDoc ,Timestamp,getDocs  } from "firebase/firestore"; 
import { auth, db, storage } from "./firebase/firebase-config"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from './Components/Login/Login'
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import SavedPost from './Pages/Saved/SavedPost'
import ProfilPage from './Pages/ProfilPage/ProfilPage'
import UserPage from './Pages/UserPage/UserPage'
function App() {


 
  const [userId, setUserId] = useState('')  ;
const [update, setUpdate] = useState(false)

const isAuth = useSelector(state => state.Login.isAuth)
const Dispatch = useDispatch()  //get data and info user from fireStore using redux
  useEffect(() => {


    onAuthStateChanged(auth, (user) => {
      if (user) {
 
        setUserId(user.uid)
        localStorage.setItem('email',user.email)
        localStorage.setItem('name',user.displayName)
        localStorage.setItem('avatar',user.photoURL)
      
        localStorage.setItem("isAuth", true);
  
        console.log('yes ther is user')
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

      } else {
        localStorage.removeItem('isAuth')


        setUserId('')
        console.log('there is no user')
      }
    });
  }, [update])




  return (
    <div className="App">
    <BrowserRouter>
    <NavBar/>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/saved" element={<SavedPost/>}/>
<Route path="/profil" element={<ProfilPage/>}/>
<Route path="/:id" element={<UserPage/>}/>
</Routes>
</BrowserRouter>

{userId?null:<Login/>}

    </div>
  )
}

export default App

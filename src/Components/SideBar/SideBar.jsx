import React from 'react'
import Avatar from '../Avatar/Avatar'
import './SideBar.scss'
import avatar from '../../assets/profile-1.jpg'
import { useSelector ,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LogOut from '../Login/LogOut'
import { useEffect } from 'react'
import { useState } from 'react'
import { auth, db, storage } from "../../firebase/firebase-config"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavLink } from 'react-router-dom'

export default function SideBar() {


    const userID = useSelector(state => state.Login.userID)
    const info = useSelector(state => state.Login.info)

  const [userId, setUserId] = useState('')  ;
  const [user, setUser] = useState()  ;

    useEffect(() => {

    
          onAuthStateChanged(auth, (user) => {
            if (user) {

              setUserId(user.uid)
              setUser(user)
      
            } else {
              localStorage.removeItem('isAuth')
      
      
              setUserId('')
              console.log('there is no user')
            }
          });
        }, [])

  return (
<div>

<div className='sidebar'>


<div className='bar-links'>
<NavLink to="/"><i class="fa-solid fa-house-user"></i>Home</NavLink>
<NavLink to="/saved"><i class="fa-solid fa-bookmark"></i>Saved</NavLink>


</div>

</div>
{localStorage.getItem("isAuth")? <div className='logout-btn'><a><i class="fa-solid fa-arrow-right-from-bracket"></i><LogOut/></a></div>:null}
</div>
  )
}

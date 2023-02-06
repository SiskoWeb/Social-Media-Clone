import React from 'react'

import './SideBar.scss'

import LogOut from '../Login/LogOut'

import { NavLink } from 'react-router-dom'

export default function SideBar() {


  // {localStorage.getItem("isAuth")? <div className='logout-btn'><a><i class="fa-solid fa-arrow-right-from-bracket"></i><LogOut/></a></div>:null}


  return (


<div className='sidebar'>

<div className='bar-links'>
<div className='profile-card'></div>
<NavLink to="/"><i class="fa-solid fa-house-user"></i><p>Home</p></NavLink>
<NavLink to="/saved"><i class="fa-solid fa-bookmark"></i><p>Saved</p></NavLink>
</div>

</div>

  )
}

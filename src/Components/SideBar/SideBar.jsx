import React from 'react'

import './SideBar.scss'

import LogOut from '../Login/LogOut'

import { NavLink } from 'react-router-dom'

export default function SideBar() {




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

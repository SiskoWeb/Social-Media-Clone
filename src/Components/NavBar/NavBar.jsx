import React ,{useState}from 'react'

import './NavBar.scss'
import { useSelector ,useDispatch } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom'
import LogOut from '../Login/LogOut'

export default function NavBar() {


    const info = useSelector(state => state.Login.info)

  return (
  <nav className='nav'>


<Link to='/'><h1>Sisko</h1></Link>
  <div className='input-search'><i class="fa-solid fa-magnifying-glass"></i><input id='search-bar' type='text' placeholder='Search For Creatores'></input></div>


<div className='btn-and-avatar'>
{info.isAuth?  <Link to={`/profil`}><Avatar avatarImg={info?.avatar}  name={info?.name} subText={''}/></Link>:null}
<div className='logout-btn-navbar'>{localStorage.getItem("isAuth")? <a><LogOut/></a>:null}</div>

</div>




 
  </nav>
  )
}

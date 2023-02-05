import React from 'react'
import './Avatar.scss'
import { useSelector ,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Avatar({avatarImg,name,subText,email}) {

  return (
    <div className='autor'>

    <img srcSet={avatarImg}></img>
    <p>{name} <br></br><span>{subText}</span></p>
    </div>
  )
}

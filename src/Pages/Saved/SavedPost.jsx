import React from 'react'
import '../../App.scss'
import Feed from '../../Components/Feed/Feed'
import Msg from '../../Components/Msg/Msg'
import SideBar from '../../Components/SideBar/SideBar'
export default function SavedPost() {
  return (
    <div className='body-home'>
    <SideBar/>
  <p className='feed'>helloo Page Saved Posts</p>
    <Msg/>
    </div>
  )
}

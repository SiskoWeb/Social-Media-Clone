import React from 'react'
import '../../App.scss'
import Feed from '../../Components/Feed/Feed'
import Msg from '../../Components/Msg/Msg'
import SideBar from '../../Components/SideBar/SideBar'
export default function Home() {
  return (
    <div className='body-home'>
    <SideBar/>
    <Feed/>
    <Msg/>
    </div>
  )
}

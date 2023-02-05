import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { collection, addDoc, Timestamp, getDocs, arrayUnion, query, orderBy, onSnapshot, } from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebase-config"
import FeedCard from '../../Components/FeedCard/FeedCard';
import SideBar from '../../Components/SideBar/SideBar';
import Msg from '../../Components/Msg/Msg';
import '../../Components/FeedCard/FeedCard.scss'
import './ProfilPage.scss'
import '../../App.scss'
import p from '../../assets/profile-1.jpg'
import cover from '../../assets/bg.jpg'
import { useSelector } from 'react-redux';
export default function ProfilPage() {
    const [postsList, setPostsList] = useState([])


    const [update, setUpdate] = useState(false)
    const isAuth = useSelector(state => state.Login.name)
    const info = useSelector(state => state.Login.info)
    const parmas = useParams()


    useEffect(() => {




        const ordersRef = collection(db, "Posts");

        const q = query(ordersRef, orderBy('time', 'desc'))
        const unsbscribe = onSnapshot(q, (querySnapshot) => {

            setPostsList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, Timestamp: doc.data().Timestamp?.toDate().getTime() })))
        }); return unsbscribe




    }, [])

    console.log(info)


    return (
        <div className='body-home'>

       
            <SideBar />
 <div className='feed'> <div className='profil-card'>
                        <div className='cover-profil'><img src={cover}></img></div>
                        <div className='profil-text'>  <img className='avatar-profil' src={info.avatar}></img>   <div className='text-info'> <p>{info.name}</p> <p className='userid'>@{info.userID}</p> </div></div>

                    </div>

                    {postsList?.map((o) => {
                        if (o.uid === info.userID) {
                            return (<FeedCard email={o.email} data={o} key={o.id} PostImg={o.image} avatar={o.avatar} name={o.name} time={o.time?.seconds} setUpdate={setUpdate} update={update} />
                                
                            )
                        }
                        else {
                            return null
                        }

                    })}
                    
                    
                    </div>


            <Msg/>
        </div>
    )

}

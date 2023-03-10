import React from 'react'
import CreatPost from '../CreatPost/CreatPost'
import FeedCard from '../FeedCard/FeedCard'
import feed2 from '../../assets/feed/feed-2.jpg'
import feed3 from '../../assets/feed/feed-3.jpg'
import './Feed.scss'
import p2 from '../../assets/profile-2.jpg'
import p3 from '../../assets/profile-3.jpg'

import { useEffect ,useState } from 'react'


import { collection, addDoc, Timestamp,getDocs ,arrayUnion, query, orderBy, onSnapshot,  } from "firebase/firestore"; 
import { auth, db, storage } from "../../firebase/firebase-config"
export default function Feed() {

const [update, setUpdate] = useState(false)
  

    const [postsList ,setPostsList] =useState([])


      useEffect( () =>{
 


 
        const ordersRef =  collection(db, "Posts");
      
        const q = query(ordersRef,orderBy('time', 'desc'))
const unsbscribe = onSnapshot(q,(querySnapshot)=>{

    setPostsList(querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, Timestamp:doc.data().Timestamp?.toDate().getTime() })))
}); return  unsbscribe



   
      },[update])

   
  return (
    <div className='feed'>

    {localStorage.getItem("isAuth")?<CreatPost/>:null}
   

<div className='listFeed' >

{postsList?.map(o=>{
  if(o.body === '' & o.image === '')return;
  else{
    return  <FeedCard email={o.email} data={o} key={o.id} PostImg={o.image} avatar={o.avatar} name={o.name} time={o.time?.seconds} setUpdate={setUpdate} update={update}/>
   
  }
})}
<FeedCard PostImg={feed2} avatar={p2} time={'no Time'}/>
<FeedCard PostImg={feed3} avatar={p3} time={'no Time'}/>

</div>
    </div>
  )
}

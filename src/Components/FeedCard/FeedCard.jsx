import React,{useState} from 'react'
import './FeedCard.scss'
import  moment  from 'moment'

import p2 from '../../assets/profile-2.jpg'
import { doc ,deleteDoc} from "firebase/firestore"; 
import { auth, db, storage } from "../../firebase/firebase-config"
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom';
export default function FeedCard({PostImg,avatar,name,time,data,setUpdate,update,email}) {
    const timestamp = time * 1000;
    const date = new Date(timestamp);
const currnt = moment(date.toString()).fromNow()
console.log(moment(date.toString()).fromNow())

//Delet img
const deletPost  = async(id)=>{
    const pathimg = doc(db, "Posts",id)
    await deleteDoc(pathimg)
    setUpdate(!update)

    
    }
    const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className='feed-card'>
    
<div className='feed-col1'>


<Link to={`/${data?.uid}`}>
<Avatar avatarImg={avatar || p2} name={name || 'Sisko Web'} subText={ currnt === isNaN?'No Time':currnt}  email={email}/>
</Link>



{email === localStorage.getItem('email')?<div className='toggle'>


<button  onClick={toggleOptions}>...</button>
      {showOptions && (
        <ul >
        <li className='dropbtn' onClick={()=>deletPost(data.id)}>Remove</li>
         
       
        </ul>
      )}

</div>:null}


</div>
{data?.body.length >+ 1 ?<p>{data?.body}</p>:null}
<img srcSet={PostImg}></img>
<div className="btns-reaction"><div><i class="fa-regular fa-heart"></i><i class="fa-regular fa-comment-dots"></i></div> <i class="fa-regular fa-bookmark"></i></div>
    </div>
  )
}

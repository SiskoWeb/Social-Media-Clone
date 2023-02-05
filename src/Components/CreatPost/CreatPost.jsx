import React,{useState ,useEffect} from 'react'
import './CreatPost.scss'
import avatar from '../../assets/profile-1.jpg'
import {provider} from '../../firebase/firebase-config'
    
import { useSelector ,useDispatch } from 'react-redux'
import { ref ,uploadBytes, getDownloadURL  } from "firebase/storage";
import { collection, addDoc, arrayUnion, updateDoc, doc , setDoc ,Timestamp,getDocs, serverTimestamp  } from "firebase/firestore"; 
import { auth, db, storage } from "../../firebase/firebase-config"
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function CreatPost() {

    const [imageUploaded ,setImageUploaded] =useState()
    const [user ,setUser] =useState()
    const [userId, setUserId] = useState('')  ;


const Dispatch =useDispatch()

useEffect(() => {



  }, [])

    const avatar = useSelector(state => state.Login.avatar)
    const email = useSelector(state => state.Login.email)
    const name = useSelector(state => state.Login.name)


    const [postText ,setPostText] =useState('')
    const [postImg ,setPostImg] =useState()

const updateFeed = ()=>{
    Dispatch({
        type:'LOADING',
        data:localStorage.setItem("Loading",!localStorage.getItem("Loading"))
    })
}

// single image
const UploadImg=  async(e)=>{
    e.preventDefault();

    if(imageUploaded === null &  postText === ''  ) return;
    onAuthStateChanged(auth, async(user) => {
        if (user) {
    
       
       
          setUserId(user.uid)

          localStorage.setItem("isAuth", true);
    
          console.log('yes ther is user')
          const docRef =  await addDoc(collection(db, "Posts"), {
            avatar:user.photoURL,
        name:user.displayName,
        uid:user.uid,
          body: postText,
          email:user.email,
          time:serverTimestamp(), 
            },
            console.log('added post text'),
           
        
            )
        
         const imgeref = ref(storage, `1/${imageUploaded.name}`);
         const uploimg = await uploadBytes(imgeref , imageUploaded).then(async()=>{
             const downUrl = await getDownloadURL(imgeref)
             await updateDoc(docRef, {
              image:arrayUnion(downUrl)
               })
            },
            console.log('added post image'),
            removeImgUploaded(),
            setPostText(''),
             )
             
        
          
            console.log('added post ')
          
        
          await Promise.all(uploimg)
        
        
        
  
        } else {
          localStorage.removeItem('isAuth')
  
  
          setUserId('')
          console.log('there is no user')
        }
      });



 }







const removeImgUploaded = ()=>{
    setImageUploaded(null)
}





  return (
<div className='add-post'>
<div className='create-post'>
<div className='create-item1'>
<img srcSet={avatar}></img>
<input onChange={(e)=>setPostText(e.target.value)} value={postText} maxLength={50} type='text' placeholder={`What is in your mind ? max 100 letter Yassine`}></input>
<label className='input-image' for='img-upload'><i class="fa-regular fa-image"></i> <input onChange={(e)=>setImageUploaded(e.target.files[0])} className='img-upload' id='img-upload' type='file' ></input></label>
</div>
 <button className='create-btn' onClick={(e)=>UploadImg(e)}>Post</button>
 
 </div>
{imageUploaded?<div className='img-for-uploading'>
<div onClick={removeImgUploaded} className='remove-uploaded-image'><i class="fa-solid fa-xmark"></i></div>
<img src={URL.createObjectURL(imageUploaded)}></img>
</div> :null}

</div>
  )
}

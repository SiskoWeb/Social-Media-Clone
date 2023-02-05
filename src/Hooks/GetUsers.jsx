


export const  getData = ()=>{

 


 
        const ordersRef =  collection(db, "Posts");
      
        const q = query(ordersRef,orderBy('time', 'desc'))
const unsbscribe = onSnapshot(q,(querySnapshot)=>{

   return querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, Timestamp:doc.data().Timestamp?.toDate().getTime() }))
}); return unsbscribe




}
import React,{useEffect} from 'react';
import "./CompletePage.css";
import { Link } from 'react-router-dom';
import { collection, getDocs,query, where, collectionGroup } from 'firebase/firestore';
import { db } from '../config/firebase';


export default function CompletePage() {


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const usersCollection = collection(db, 'fakeUser','test');
  //     const docRef= collection(db,"interestTags");
  //     const interestTags = query(usersCollection, where('interestTag','==',docRef));
  //     const userSnapshot = await getDocs(usersCollection);
  //     const userList = userSnapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       return {
  //         test:data.test,
  //         interestTag: interestTags,
  //       };
  //     });

  //     console.log(userList);
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="container">
        <div className="explain-container">
        Thank you for submitting the form. You’ll be notified when we’re ready for you to be matched with buddy.
        </div>
        <Link to="/"><button className="submit-btn">Confirm
        </button></Link>
      </div>
      
    </>
  )
}

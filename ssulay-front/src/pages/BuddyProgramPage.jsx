import React, { useEffect,useState } from 'react'
import {getAuth} from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import {db} from "../config/firebase"
import BuddyForm from "../components/BuddyForm";
import BuddySearch from "../components/BuddySearch";



export default function BuddyProgramPage() {
  //isSubmitedForm :false -> 버디 매칭 폼작성 컴포넌트
  //isSubmitedForm: true-> 버디 매칭 검색 컴포넌트
  const [userData, setUserData] = useState(null);
  const authInstance = getAuth();
  const user = authInstance.currentUser;
  //현재 로그인 중인 유저의 uid를 가지고 users firestore접근
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          //console.log('Document data:', docSnap.data());
          setUserData(docSnap.data())
        } else {
          //console.log('No such document!');
        }
      } else {
        //console.log('User is null.');
        setUserData(null);
      }
    };
    fetchUserData();
  },[user]);

    
  return (
    <>
      {userData!==null && userData.isSubmitedForm ?(
        <BuddySearch/> //유저가 버디폼을 제출한 상태
      ):(
        <BuddyForm/> //유저가 버디폼을 제출하지 않은 상태면 폼작성 페이지로 
      )}
    </>
    ); 
}

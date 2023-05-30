import React, {useEffect, useState}from 'react'
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from '../config/firebase';
//interestTag의 문서명은 uid이다. 
//interestTag를 불러주고. 필드명은 카테고리임. 
//user값을 불러오긴해야함.-> 읽어야할 값은 부분우선순위. 
//유저 한 명씩 반복문을 돌면서 부분선호도 우선순위를 확인하고 그 uid로 그 유저의 interestTags들을 가져와서 배열에 담는다.
//nonPreferedList []= interestTags의 문서중 문서명이 현재유저, 부분선호도에 있는 유저들을 제거
//nonPreferedList의 uid를 돌면서 interestTags 단어 유사도를 분석함. 
// 유사도가 개수에 영향을 받지 않도록 해야 하는 로직이 필요함 -> gpt한테 물어봐야지. 
// 나온 유사도를 similarity []에 담아주는데 이걸 {유사도:index} 이렇게 담음
//유사도 순으로 내림차순 정렬
//index를 보고 nonPreferedList의 uid와 매칭
// uid를 user의 preferedList에 담아주면 된다.


export default function AutoPreferPriority() {
  const [users, setUsers] = useState([]);// db users
  const [interestTag,setInterestTag]  = useState([]); //db interestTag
    useEffect(() => { //컴포넌트 마운트 될 때 컬렉션 문서 읽어오기
      const fetchData = async () => {
        try{
          //DB에서 users 가져오기
          const userSnapshot= await getDocs(collection(db,'users')); 
          const userList= userSnapshot.docs.map(doc=>{
            const data= doc.data();
            return{
              uid:data.uid,
              preferedList:data.preferedBuddy,
            };
          });
          setUsers(userList);
          console.log("UserList:",userList);

          const interestTagSnapshot= await getDocs(collection(db,'interestTag'));
          const interestTagList= interestTagSnapshot.docs.map(doc =>{
            const data=doc.data();
            const interests = Object.values(data).flat(); //각 필드의 하위 데이터 값들만 담음
            return{
              owner:doc.id, //해당 interests항목의 주인
              interests:interests, //const firstInterest = interestTagList[0].interests[0];
            };
          });
          setInterestTag(interestTagList);
          console.log("InterestList:",interestTagList);
        } catch (error) {
          console.error('Error fetching documents:', error);
        }        
      };
      fetchData();
    }, []);
  

}

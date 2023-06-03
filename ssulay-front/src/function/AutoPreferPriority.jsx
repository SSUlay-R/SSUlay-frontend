// import React, {useEffect, useState}from 'react'
// import { collection, getDocs, doc, setDoc } from "firebase/firestore";
// import { db } from '../config/firebase';
// //interestTag의 문서명은 uid이다. 
// //interestTag를 불러주고. 필드명은 카테고리임. 
// //user값을 불러오긴해야함.-> 읽어야할 값은 부분우선순위. 
// //유저 한 명씩 반복문을 돌면서 부분선호도 우선순위를 확인하고 그 uid로 그 유저의 interestTags들을 가져와서 배열에 담는다.
// //nonPreferedList []= interestTags의 문서중 문서명이 현재유저, 부분선호도에 있는 유저들을 제거
// //nonPreferedList의 uid를 돌면서 interestTags 단어 유사도를 분석함. 
// // 유사도가 개수에 영향을 받지 않도록 해야 하는 로직이 필요함 -> gpt한테 물어봐야지. 
// // 나온 유사도를 similarity []에 담아주는데 이걸 {uid: 유사도} 이렇게 담음
// //유사도 순으로 내림차순 정렬
// // uid를 user의 preferedList에 담아주면 된다.


// export default function AutoPreferPriority() {
//   const [users, setUsers] = useState([]);// db users
//   const [interestTag,setInterestTag]  = useState([]); //db interestTag
//     useEffect(() => { //컴포넌트 마운트 될 때 컬렉션 문서 읽어오기
//       const fetchData = async () => {
//         try{
//           //DB에서 users 가져오기
//           const userSnapshot= await getDocs(collection(db,'users')); 
//           const userList= userSnapshot.docs.map(doc=>{
//             const data= doc.data();
//             return{
//               uid:data.id, //uid
//               preferedList:data.preferedBuddy, //배열 값
//             };
//           });
//           setUsers(userList);
//           console.log("UserList:",userList);

//           const interestTagSnapshot= await getDocs(collection(db,'interestTag'));
//           const interestTagList= interestTagSnapshot.docs.map(doc =>{
//             const data=doc.data();
//             const interests = Object.values(data).flat(); //각 필드의 하위 데이터 값들만 담음
//             return{
//               owner:doc.id, //해당 interests항목의 주인
//               interests:interests, //const firstInterest = interestTagList[0].interests[0];
//             };
//           });
//           setInterestTag(interestTagList);
//           console.log("InterestList:",interestTagList);

//           //실행할 로직들
//           userList.forEach(async (user)=>{
//             const nonPreferedList = setNonPreferedList(user); //부분선호도에 선택되지 않은 uid 담기 
//             const preferedInterests= setPreferedInterests(user.preferedList); //preferedList에 있는 유저들의 interest태그들만 모으도록 설정
//             const similarityArr= getSimilarity(preferedInterests, nonPreferedList); //부분선호 우선순위와 유사도 구하기 
//             const sortedSimilarity= sortSimilarity(similarityArr); //유사도 순으로 내림차순 정렬한 배열 -uid만 담김
//             const updatedPreferedBuddy = [...user.preferedBuddy, ...sortedSimilarity]; //완성된 우선순위배열
//             await setDoc(doc(db, 'users', user.uid),{ //db에 업데이트
//               preferedBuddy:updatedPreferedBuddy
//             })
        
            
//             //db에 올리기 
//           });

//           const setNonPreferedList =(user)=>{
//             const { uid, preferedList } = user; //uid= 인자로 들어온 유저의 uid, preferedList= 인자로 들어온 유저의 preferedList
//             const nonPreferedList= []
//             users.forEach((otherUser) => {
//               if (otherUser.uid !== uid && !preferedList.includes(otherUser.uid)) {
//                 nonPreferedList.push(otherUser.uid);
//               }
//             });
//             return nonPreferedList;
//           };

//           const setPreferedInterests =(preferedList)=>{
//             const preferedInterests=[];
//             preferedList.forEach ((uid) => {
//               const interestTag= interestTagList.find((tag)=> tag.owner===uid);
//               if (interestTag){
//                 preferedInterests.push(...interestTag.interests);
//               }
//             });
//             return preferedInterests;
            

//           };

//           const getSimilarity=(preferedInterests, nonPreferedList)=>{
//             const similarityArr=[];
//             nonPreferedList.forEach((nonPreferedUser, index)=>{
//               let avgSimilarity=0;
//               const tagArr= interestTagList.find((tag)=>tag.owner===nonPreferedUser);
//               //배열의 길이에 따라 가중치 설정
//               const count=preferedInterests.length * tagArr.interests.length; //총 비교횟수
//               const weight = 1/Math.sqrt(count); //길이가 길수록 가중치를 작게 설정

//               preferedInterests.forEach((preferedInterest)=>{
//                 tagArr.interests.forEach((tagInterest)=>{
//                   const similarity = function_for_get_similarity(preferedInterest, tagInterest); //단어유사도 함수 불러야 할 부분
//                   const weightedSimilarity= similarity* weight
//                   avgSimilarity+=weightedSimilarity;
//                 });
//               })
//               avgSimilarity/=count;
//               similarityArr.push({ uid: nonPreferedUser, similarity: avgSimilarity }); // key-value pair로 저장
//             });
//             return similarityArr;
//           };

//           const sortSimilarity=(arr)=>{
//             const sortedSimilarity = arr.sort((a, b) => b.similarity - a.similarity); //유사도 기준으로 내림차순 정렬
//             console.log("sortedSimilarity:",sortedSimilarity);
//             const sortedUIDs = sortedSimilarity.map((item) => item.uid); //uid값만 빼서 리턴
//             return sortedUIDs;
//           };
//         } catch (error) {
//           console.error('Error fetching documents:', error);
//         }        
//       };
//       fetchData();
//     }, []);

    
    
// }
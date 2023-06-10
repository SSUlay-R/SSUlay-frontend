import React, {useEffect, useState}from 'react'
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import axios from 'axios';


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
              uid:doc.id, //uid
              preferedList:data.preferedBuddy, 
              name:data.userName,
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
              charity: data.Charity,
              creativity: data.creativity,
              ent: data.Ent,
              fitness: data.Fitness,
              food:data.Food,
              music: data.Music,
              interests:interests,
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

    useEffect (()=>{
      // 실행할 로직들
      users.forEach(async (user)=>{
        const nonPreferedList = setNonPreferedList(user); //부분선호도에 선택되지 않은 uid 담기 
        const preferedInterests= setPreferedInterests(user.preferedList); //preferedList에 있는 유저들의 interest태그들만 모으도록 설정
        const similarityArr= getSimilarity(preferedInterests, nonPreferedList); //부분선호 우선순위와 유사도 구하기 
        if( similarityArr.length !==0) {
          console.log(`${user.name}-similarityArr:`,similarityArr);
          const sortedSimilarity= sortSimilarity(similarityArr); //유사도 순으로 내림차순 정렬한 배열 -uid만 담김
          console.log("sortedSimilartiy",sortedSimilarity);
          const updatedPreferedBuddy = [...user.preferedList, ...sortedSimilarity]; //완성된 우선순위배열
          console.log('updatedPreferedBuddy',updatedPreferedBuddy);
        // await setDoc(doc(db, 'users', user.uid),{ //db에 업데이트
        //   preferedBuddy:updatedPreferedBuddy
        // })
        }
      });

        function setNonPreferedList(user){ 
          const { uid, preferedList } = user; //uid= 인자로 들어온 유저의 uid, preferedList= 인자로 들어온 유저의 preferedList
          const nonPreferedList= []
          users.forEach((otherUser) => {
            if (otherUser.uid !== uid && !preferedList.includes(otherUser.uid)) {
              nonPreferedList.push(otherUser.uid);
            }
          });
          return nonPreferedList;
        };
        function setPreferedInterests (preferedList){ //부분선호도에 있는 유저들의 interestTag concat
          const preferedInterests=[];
          preferedList.forEach ((uid) => {
            const targetInterest= interestTag.find((tag)=> tag.owner===uid);
            if (targetInterest){
              preferedInterests.push(...targetInterest.interests);
            }
          });
          return preferedInterests;
        }

        async function getSimilarity(preferedInterests, nonPreferedList) {
          const similarityArr = []; // 부분선호도에 없던 유저들에 대한 유사도 리스트
          const preferedInterestsStr = preferedInterests.join(','); // params에 넣기위해 타입변환
        
          await Promise.all(
            nonPreferedList.map(async (nonPreferedUser) => {
              try {
                const targetUser = interestTag.find((tag) => tag.owner === nonPreferedUser);
                const targetInterests = targetUser.interests.join(','); // 비교할 사람의 interestTags
        
                const response = await axios.get('/similarity', {
                  params: { keyword1: preferedInterestsStr, keyword2: targetInterests },
                });
        
                const similarity = response.data.similarity; // number 타입
                similarityArr.push({ uid: targetUser.owner, similarity: similarity });
              } catch (error) {
                console.error(error);
              }
            })
          );
        
          return similarityArr;
        }
        

        function sortSimilarity(arr) {
          const sortedSimilarity = arr.sort((a, b) => b.similarity - a.similarity);
          const sortedUIDs = sortedSimilarity.map((item) => item.uid);
          return sortedUIDs;
        }

    },[interestTag,users]);        


}
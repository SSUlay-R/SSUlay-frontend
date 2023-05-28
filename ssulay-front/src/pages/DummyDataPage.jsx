import React from 'react';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";

export default function DummyDataCreator() {
  const nationality = ['USA', 'Japan', 'China', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Sweden', 'Netherlands', 'Finland'];
  const interests = [
    "Sports",
    "Music",
    "Art",
    "Reading",
    "Cooking",
    "Travel",
    "Photography",
    "Technology",
    "Fashion",
  ];

  const lifestyles = [
    "Fitness",
    "Healthy",
    "Adventure",
    "Wellness",
    "YOLO",
    "Sustainability",
    "Meditation",
    "Cafe-hoppoing",
  ];

  const KoreanNames =[
    "윤성준",
    "조승효",
    "양조은",
    "홍길동"
  ];

  const names = [
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "Isabella",
    "Sophia",
    "Mia",
    "Charlotte",
    "Amelia"
  ];

  const getRandomSubarray = (arr, size) => {
    const shuffled = arr.slice(0);
    let i = arr.length;
    const min = i - size;
    while (i-- > min) {
      const index = Math.floor((i + 1) * Math.random());
      const temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }



  // Dummy data creation function 여기 외국인 더미 발생기
  const createForeignDummyData = async () => {
    for (let i = 1; i <= 10; i++) { // create 10 dummy data
      const dummyEmail = `dummy${i}@test.com`;
      const dummyPassword = `dummyPassword${i}`;
      const dummyStudentNumber = `1234567${i}`;
      const dummyUserName = names[i-1];
      const dummyNationality = nationality[Math.floor(Math.random() * nationality.length)];
      const dummyPhoneNumber = `123456789${i}`;
      const dummyKakaoId = `dummyKakaoId${i}`;
      const dummyInstagramId = `dummyInstagramId${i}`;
      const dummyBuddyNum = "1";
      const dummyInterestTags = getRandomSubarray(interests, 3);
      const dummyLifestyleTags = getRandomSubarray(lifestyles, 3);
      const preferedBuddy = getRandomSubarray(KoreanNames,4); 

      try {
        // Create user
        //const res = await createUserWithEmailAndPassword(auth, dummyEmail, dummyPassword);
        // Create user on firestore
        //await setDoc(doc(db, "users", res.user.uid), {
        await setDoc(doc(db, "users", dummyUserName), {
          uid: dummyUserName,
          email: dummyEmail,
          studentNumber: dummyStudentNumber,
          userName: dummyUserName,
          nationality: dummyNationality,
          password: dummyPassword,
          phoneNumber: dummyPhoneNumber,
          kakaoId: dummyKakaoId,
          instagramId: dummyInstagramId,
          // other dummy data
          isSubmitedForm: false,
          isMatched: false,
          buddyNum: dummyBuddyNum,
          interestTags: dummyInterestTags,
          lifestyleTags: dummyLifestyleTags,
          preferedBuddy: preferedBuddy,
        });
      } catch (err) {
        console.log(err);
      }
    }
    alert("Foreign Dummy data created");
  };
    // Dummy data creation function 여기 외국인 더미 발생기
    const createKoreanDummyData = async () => {
      for (let i = 0; i < 4; i++) { // create 10 dummy data
        const dummyEmail = `kdummy${i}@test.com`;
        const dummyPassword = `kdummyPassword${i}`;
        const dummyStudentNumber = `k1234567${i}`;
        const dummyUserName = KoreanNames[i];
        const dummyNationality = 'Korea';
        const dummyPhoneNumber = `82123456789${i}`;
        const dummyKakaoId = `kdummyKakaoId${i}`;
        const dummyInstagramId = `kdummyInstagramId${i}`;
        const dummyBuddyNum = i+1;
        const dummyInterestTags = getRandomSubarray(interests, 3);
        const dummyLifestyleTags = getRandomSubarray(lifestyles, 3);
        const preferedBuddy = getRandomSubarray(names,i+1); 
  
        try {
          // Create user
          //const res = await createUserWithEmailAndPassword(auth, dummyEmail, dummyPassword);
          // Create user on firestore
          //await setDoc(doc(db, "users", res.user.uid), {
          await setDoc(doc(db, "users", dummyUserName), {
            uid: dummyUserName,
            email: dummyEmail,
            studentNumber: dummyStudentNumber,
            userName: dummyUserName,
            nationality: dummyNationality,
            password: dummyPassword,
            phoneNumber: dummyPhoneNumber,
            kakaoId: dummyKakaoId,
            instagramId: dummyInstagramId,
            // other dummy data
            isSubmitedForm: false,
            isMatched: false,
            buddyNum: dummyBuddyNum,
            interestTags: dummyInterestTags,
            lifestyleTags: dummyLifestyleTags,
            preferedBuddy: preferedBuddy,
          });
        } catch (err) {
          console.log(err);
        }
      }
      alert("Dummy data created");
    };
  return (
    <div>
      <button onClick={createForeignDummyData}>Create Foreign Dummy Data</button>
      <button onClick={createKoreanDummyData}>Create Korean Dummy Data</button>
    </div>
    
  );
}

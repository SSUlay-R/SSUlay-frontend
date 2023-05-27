import React from 'react';
import {doc,setDoc} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from "../config/firebase";

export default function DummyDataCreator() {
    const nationality=['Korea','USA','Japan','China','UK','Canada','Australia','Germany','France','Spain','Sweden','Netherlands','Finland'];
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

  const lifestyles=[
    "Fitness",
    "Healthy",
    "Adventure",
    "Wellness",
    "YOLO",
    "Sustainability",
    "Meditation",
    "Cafe-hoppoing",
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

  // Dummy data creation function
  const createDummyData = async () => {
    for(let i=1; i<=10; i++){ // create 10 dummy data
      const dummyEmail = `dummy${i}@test.com`;
      const dummyPassword = `dummyPassword${i}`;
      const dummyStudentNumber = `1234567${i}`;
      const dummyUserName = `DummyUser${i}`;
      const dummyNationality = getRandomSubarray(nationality, 1);
      const dummyPhoneNumber = `123456789${i}`;
      const dummyKakaoId = `dummyKakaoId${i}`;
      const dummyInstagramId = `dummyInstagramId${i}`;
      const dummyBuddyNum = "1";
      const dummyInterestTags = getRandomSubarray(interests, 3);
      const dummyLifestyleTags = getRandomSubarray(lifestyles, 3);
    
      try {
          // Create user
          const res = await createUserWithEmailAndPassword(auth, dummyEmail, dummyPassword);
          // Create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                email: dummyEmail,
                studentNumber: dummyStudentNumber,
                userName:dummyUserName,
                nationality:dummyNationality,
                password:dummyPassword,
                phoneNumber: dummyPhoneNumber,
                kakaoId: dummyKakaoId,
                instagramId: dummyInstagramId,
                // other dummy data
                isSubmitedForm: false,
                isMatched: false,
                buddyNum: dummyBuddyNum,
                interestTags: dummyInterestTags,
                lifestyleTags: dummyLifestyleTags,
                preferedBuddy: null,
          });
      } catch (err) {
          console.log(err);
      }
    }
    alert("Dummy data created");
  };

  return (
    <div>
      <button onClick={createDummyData}>Create Dummy Data</button>
    </div>
  );
}

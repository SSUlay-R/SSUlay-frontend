import React from 'react';
import { doc, setDoc ,collection, getDocs, updateDoc,getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import ent1 from '../form/ent/ent1.json';
import fitness1 from '../form/fitness/fitness1.json';
import food1 from '../form/food/food1.json';
import music1 from '../form/music/music1.json';
import ent2 from '../form/ent/ent2.json';
import ent3 from '../form/ent/ent3.json';
import ent4 from '../form/ent/ent4.json';
import ent5 from '../form/ent/ent5.json';
import fitness2 from '../form/fitness/fitness2.json';
import food2 from '../form/food/food2.json';
import food3 from '../form/food/food3.json';
import food4 from '../form/food/food4.json';
import music2 from '../form/music/music2.json';
import music3 from '../form/music/music3.json';

export default function DummyDataCreator() {
  const nationality = ['USA', 'Japan', 'China', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Sweden', 'Netherlands', 'Finland'];
  
  const fitness = [
    "Fitness",
    "Sports",
    "Basketball",
    "Soccer",
    "Football",
    "Baseball",
    "Volleyball",
    "Tennis",
    "Golf",
    "Martial Arts",
    "Swimming",
    "Track and Field",
    "Gymnastics",
    "Surfing",
    "Paddleboarding",
    "Kayaking",
    "Rafting",
    "Scuba Diving",
    "Snorkeling",
    "Skiing",
    "Snowboarding",
    "Ice Skating",
    "CrossFit",
    "Barre",
    "Zumba",
    "Yoga/Pilates",
    "Running/Jogging",
    "Cycling",
    "Rock Climbing",
    "Mountaineering",
    "Surfing",
    "Hiking",
    "Backpacking",
    "Camping",
    "Fishing",
    "Hunting",
    "Gardening",
    "Social Activities",
    "Travel",
    "Backpacking",
    "International Travel",
    "Road Trips",
    "Food Tourism",
    "Place",
    "Gyeongbokgung Palace",
    "Namsan Tower",
    "Han-gang",
    "Han River",
    "Bukchon Hanok Village",
    "Gangnam District",
    "Jeju",
    "Gyeongju",
    "Busan",
    "Cheonggyecheon Stream",
    "Hongdae",
    "Cultural Immersion",
    "Homestays",
    "Language Immersion Programs",
    "Cooking Classes",
    "Art Classes"
  ];

  const creativity = [
    "Creativity",
    "Arts",
    "Painting",
    "Drawing",
    "Sculpture",
    "Pottery",
    "Graphic Design",
    "Design",
    "Fashion Design",
    "Makeup Artistry",
    "Fine Arts",
    "Three-dimensional Arts",
    "Tattoo Artistry",
    "Tattoo",
    "Literature",
    "Creative Writing",
    "Novel Writing",
    "Poetry Writing",
    "Journalism",
    "Screenwriting",
    "Memoir Writing",
    "Blogging",
    "Photography",
    "Landscape",
    "Portrait",
    "Wildlife",
    "Street",
    "Nature",
    "Fashion",
    "DIY",
    "Sewing"
  ];

  const food = [
  "Food",
  "Cooking",
  "Baking",
  "Grilling",
  "Cuisine",
  "Food Blogging",
  "Food Vlogging",
  "Kimchi",
  "Bulgogi",
  "Bibimbap",
  "Ramen",
  "Beer",
  "Wine",
  "Soju"
  ];

  const tech = [
    "Tech",
    "Programming",
    "Web Development",
    "App Development",
    "Game Development",
    "Software Engineering",
    "Gaming",
    "Video Games",
    "Board Games",
    "Card Games",
    "Electronics",
    "Tinkering with Gadgets",
    "Building Robots",
    "Digital Art",
    "Graphic Design",
    "Animation",
    "Video Editing"
  ];
  
  const charity = [
    "Charity",
    "Environmental Conservation Efforts",
    "Tree Planting",
    "Beach Cleanups",
    "Recycling Programs",
    "Animal Conservation",
    "Political Activism",
    "Lobbying",
    "Protesting",
    "Campaigning",
    "Phone Banking",
    "Disaster Relief Efforts",
    "Emergency Response",
    "Recovery Efforts",
    "Supply Distribution",
    "Medical Assistance",
    "Elderly Care",
    "Assisted Living Volunteering",
    "Home Health Care Volunteering",
    "Nursing Home",
    "Health and Wellness",
    "Volunteering at Hospitals",
    "Senior Centers",
    "Community Centers",
    "Animal Welfare",
    "Volunteering at Shelters",
    "Rescuing Animals"
  ];
  
  const music = [
    "Music",
    "Musical Instrument",
    "Guitar",
    "Piano",
    "Drums",
    "Violin",
    "Flute",
    "Cello",
    "Trombone",
    "Saxophone",
    "Trumpet",
    "Oboe",
    "Harmonica",
    "Bass Guitar",
    "Clarinet",
    "Pop",
    "Hip-Hop",
    "Classical",
    "Jazz",
    "Blues",
    "Country",
    "Folk",
    "Electronic",
    "Indie",
    "EDM",
    "Singer",
    "Orchestra",
    "Symphony",
    "Choir",
    "Songwriting",
    "Concerts",
    "Karaoke",
    "Singing",
    "Listening to Music",
    "Playing an Instrument",
    "Music Composition",
    "DJing"
  ];

  const entertainment = [
    "Entertainment",
    "Drama",
    "Movie",
    "Watching Movies",
    "Classic Films",
    "Indie Films",
    "Documentaries",
    "Documentary",
    "Theater",
    "Musicals",
    "Stand-up Comedy",
    "Comedy"
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
      //const preferedBuddy = getRandomSubarray(KoreanNames,4); 
      try {
        // Create user
        const res = await createUserWithEmailAndPassword(auth, dummyEmail, dummyPassword);
        // Create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
        //await setDoc(doc(db, "users", dummyUserName), {
          uid: res.user.uid,
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
          preferedBuddy: [],
        });
              //interestTag 문서 생성
      await setDoc(doc(db, "interestTag", res.user.uid),{
        Fitness: [],
        Creativity: [],
        Food:[],
        Tech:[],
        Charity:[],
        Music:[],
        Ent:[],
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
        //const preferedBuddy = getRandomSubarray(names,i+1); //여기 고쳐야함
  
        try {
          // Create user
          const res = await createUserWithEmailAndPassword(auth, dummyEmail, dummyPassword);
          // Create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
          //await setDoc(doc(db, "users", dummyUserName), {
            uid: res.user.uid,
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
            preferedBuddy: [],
          });
          await setDoc(doc(db, "interestTag", res.user.uid),{
            Fitness: [],
            Creativity: [],
            Food:[],
            Tech:[],
            Charity:[],
            Music:[],
            Ent:[],
          });
        } catch (err) {
          console.log(err);
        }
      }
      alert("Korean Dummy data created");
    };

    const createPreferedBuddy = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const uidList = [];
      const foreignUidList = [];
      const koreanUidList = [];
    
      usersSnapshot.forEach((doc) => {
        uidList.push(doc.id);
        const user = doc.data();
        if (user.nationality === 'Korea') {
          koreanUidList.push(doc.id);
        } else {
          foreignUidList.push(doc.id);
        }
      });
      console.log(koreanUidList);
      // Handle Korean users - prefer buddies from foreignUidList
      for(let i = 0; i < koreanUidList.length; i++){
        const userRef = doc(db, 'users', koreanUidList[i]);
        const userSnapshot = await getDoc(userRef);
        const user = userSnapshot.data();
    
        const preferedBuddy = getRandomSubarray(foreignUidList, user.buddyNum);
    
        // Update the user's document with the preferred buddy list
        await updateDoc(userRef, {
          preferedBuddy: preferedBuddy
        });
      }
    
      // Handle foreign users - prefer buddies from koreanUidList
      for(let i = 0; i < foreignUidList.length; i++){
        const userRef = doc(db, 'users', foreignUidList[i]);
        const preferedBuddy = getRandomSubarray(koreanUidList, 4);
    
        // Update the user's document with the preferred buddy list
        await updateDoc(userRef, {
          preferedBuddy: preferedBuddy
        });
      }
    
      alert("Preferred buddies created for each user");
    };
    
    const createDummyForm = async () => {
      const koreanFormPaths = [
        ent1,
        fitness1,
        food1,
        music1,
      ];
      const foreignFormPaths = [
        ent2,
        ent3,
        ent4,
        ent5,
        fitness2,
        food2,
        food3,
        food4,
        music2,
        music3,
      ];
      const usersSnapshot = await getDocs(collection(db, 'users'));
        const uidList = [];
        const foreignUidList = []; //외국인 애들
        const koreanUidList = [];//한국인 애들
        //한국인 외국인 나누기
        
        usersSnapshot.forEach((doc) => {
          uidList.push(doc.id);
          const user = doc.data();
          if (user.nationality === 'Korea') {
            koreanUidList.push(doc.id);
          } else {
            foreignUidList.push(doc.id);
          }
        });
        //console.log(koreanUidList);
        //한국인 학생들 form 만들기
        for(let i = 0; i < koreanUidList.length; i++){
          const userRef = doc(db, 'users', koreanUidList[i]);
          const userSnapshot = await getDoc(userRef);
          const userData = userSnapshot.data();
          const form = koreanFormPaths[i];
          //create form on firestore
          await setDoc(doc(db, "form", userData.uid), {
            name: userData.userName,
            form: form.form,
          });
          
          await updateDoc(userRef, {
            isSubmitedForm: true,
          });
          /*axios 통신을 통해 interestTags 입력 코드*/
        }
        //외국인 학생들 form 만들기
        for(let i = 0; i < foreignUidList.length; i++){
          const userRef = doc(db, 'users', foreignUidList[i]);
          const userSnapshot = await getDoc(userRef);
          const userData = userSnapshot.data();
          const form = foreignFormPaths[i];
          //create form on firestore
          await setDoc(doc(db, "form", userData.uid), {
            name: userData.userName,
            form: form.form,
          });
          
          await updateDoc(userRef, {
            isSubmitedForm: true,
          });
          /*axios 통신을 통해 interestTags 입력 코드*/
        }
        
    } 

  return (
    <div>
      <button onClick={createForeignDummyData}>Create Foreign Dummy Data</button>
      <button onClick={createKoreanDummyData}>Create Korean Dummy Data</button>
      <button onClick={createPreferedBuddy}>Create Prefered Buddy</button>
      <button onClick={createDummyForm}>Create Dummy Form</button>
    </div>
    
  );
}

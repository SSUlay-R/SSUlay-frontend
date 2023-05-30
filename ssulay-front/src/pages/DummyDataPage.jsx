import React from 'react';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";

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
          preferedBuddy: preferedBuddy,
        });
              //interestTag 문서 생성
      await setDoc(doc(db, "interestTag", dummyUserName),{
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
            preferedBuddy: preferedBuddy,
          });
          await setDoc(doc(db, "interestTag", dummyUserName),{
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
  return (
    <div>
      <button onClick={createForeignDummyData}>Create Foreign Dummy Data</button>
      <button onClick={createKoreanDummyData}>Create Korean Dummy Data</button>
    </div>
    
  );
}

import React,{useMemo, useState} from 'react'
import "./BuddySearch.css";
import ResultTag from './ResultTag';
import TagBlock from './TagBlock';
import Table from './Table';
import faker from 'faker';



export default function BuddySearch() {
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
  ]
  const columns= useMemo(
    ()=>[
      {
        accessor:"userName",
        Header:"User name",
      },
      {
        accessor:"interests",
        Header:"Interests",
      },
      {
        accessor:"lifestyle",
        Header:"Lifestyle",
      }
    ],[]
  );
 //테스트용 가짜데이터
  const data=useMemo(
    ()=>
    Array(30)
    .fill()
    .map(()=> ({
      userName: faker.name.firstName(),
      interests:faker.lorem.words(10),
      lifestyle: faker.lorem.words(10),
    })),[]
  );

  const [selectedTags,setSelectedTags]=useState([]);
  
  const handleSelectedTag= (tag)=>{
    if(selectedTags.includes(tag)){
      setSelectedTags(selectedTags.filter((selectedTag)=>selectedTag!==tag)); //이미 존재하면 해당 태그만 제외하고 다시 배열을 만듦
    } else{
      setSelectedTags([...selectedTags, tag]);
    }
  }
  

  return (
    <>
      <div className="buddy-page-container">
        <h1 className="buddy-page-title">Choose your preferred buddies</h1>
        <hr/>
        <div className="box-container">
        The list below is Soongsil students who applied for the Buddy program. Please read the information about the students, select 3 students who you want to be matched as a buddy and submit. Please make sure that the matching will be done based on your preference
        </div>
        <div className="tag-container"> 
          <div className="semi-title">
            Interests
          </div>
          <div className="tags">
            {interests.map((interest, index)=> (
              <TagBlock key={index}
              isSelected={selectedTags.includes(interest)}
              onClick={handleSelectedTag}>{interest}</TagBlock>
            ))}
          </div>
        </div>
        <div className="tag-container"> 
          <div className="semi-title">
            Lifestyle & Value
          </div>
          <div className="tags">
            {lifestyles.map((lifestyle, index)=> (
              <TagBlock key={index} 
              isSelected={selectedTags.includes(lifestyle)}
              onClick={handleSelectedTag}>{lifestyle}</TagBlock>
            ))}
          </div>
        </div>
        <div className="search-result">
          <div className="semi-title">Search result</div>
          <hr/>
          <div className="selected-tags">
            {selectedTags.map((tag, index)=>(
              <ResultTag key={index} onRemoveTag={handleSelectedTag}>{tag}</ResultTag>
            ))}
            <button className="search-btn">Search</button>
          </div> 
          <div className="result-table-container">
            <div className="result-counter"></div>
            <div className="result-table">
              <Table columns={columns} data={data}/>;
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

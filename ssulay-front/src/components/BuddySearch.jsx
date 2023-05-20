import React from 'react'
import "./BuddySearch.css";
import ResultTag from './ResultTag';
import TagBlock from './TagBlock';




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
          <div className="interest-tags">
            {interests.map((interest, index)=> (
              <TagBlock key={index}>{interest}</TagBlock>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

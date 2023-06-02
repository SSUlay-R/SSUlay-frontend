import React,{useEffect, useState} from 'react';
import "./CompletePage.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CompletePage() {
  const[similarity, setsimilarity] =useState(null);
  const keyword1= 'apple';
  const keyword2= 'orange';

  useEffect(()=>{
    axios.get('/similarity',{
      params:{ keyword1 : keyword1,
        keyword2: keyword2}
    })
    .then(response=>setsimilarity(response.data.similarity))
    .catch(error=>console.error(error));
  })
  return (
    <>
      <div className="container">
        <div className="explain-container">
        Thank you for submitting the form. You’ll be notified when we’re ready for you to be matched with buddy.
        </div>
        <Link to="/"><button className="submit-btn">Confirm
        </button></Link>
        {similarity !==null ? (
          <p> Similarity: {similarity}</p>
        ):(
          <p>Loading</p>
        )}
      </div>
      
    </>
  )
}

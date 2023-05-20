import React from 'react';
import "./CompletePage.css";
import { Link } from 'react-router-dom';
import TagBlock from '../components/TagBlock';

export default function CompletePage() {
  return (
    <>
      <div className="container">
        <div className="explain-container">
        Thank you for submitting the form. You’ll be notified when we’re ready for you to be matched with buddy.
        </div>
        <Link to="/"><button className="submit-btn">Confirm
        </button></Link>
        <TagBlock></TagBlock>
      </div>
      
    </>
  )
}

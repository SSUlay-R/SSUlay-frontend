import React, { useState, useContext } from 'react';
import './BuddyForm.css';
import { db } from "../config/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

export default function BuddyForm(props) {
  const [answer_1, setAnswer_1] = useState('');
  const [answer_2, setAnswer_2] = useState('');
  const [answer_3, setAnswer_3] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const MAX_LENGTH = 4000;
  
  const onChangeAnswer_1 = (event) => {
    setAnswer_1(event.target.value);
  };
  
  const onChangeAnswer_2 = (event) => {
    setAnswer_2(event.target.value);
  };
  
  const onChangeAnswer_3 = (event) => {
    setAnswer_3(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const form = answer_1 + answer_2 + answer_3;
      
      // Send form to API for keyword extraction
      await axios.post('http://3.130.14.102/keyword_extraction', { form });
      
      // Save form in Firestore
      await setDoc(doc(db, "form", currentUser.uid), {
        uid: currentUser.uid,
        form: answer_1 + answer_2 + answer_3,
      });
      
      const userRef = doc(db, 'users', currentUser.uid);
      
      // Update user's document with the form submission status
      await updateDoc(userRef, {
        isSubmittedForm: true,
      });
      
      // Navigate to the complete page
      navigate("/buddyform/complete");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="buddy-page-container">
      <h1 className="buddy-page-title">Buddy Program Registration Form</h1>
      <hr />
      <div className="explain-box">
        {/* Explanation text */}
      </div>
      <form className="buddy-form" onSubmit={handleSubmit}>
        {/* Form fields */}
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

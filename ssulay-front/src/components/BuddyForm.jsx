import React,{useState, useContext} from 'react'
import './BuddyForm.css';
import {db} from "../config/firebase"
import {doc,setDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export default function BuddyForm(props) {
  const[answer_1, setAnswer_1]=useState('');
  const[answer_2, setAnswer_2]= useState('');
  const[answer_3, setAnswer_3] = useState('');
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
    console.log(currentUser);
    e.preventDefault(); 
    try {
        //create form on firestore
        await setDoc(doc(db, "form", currentUser.uid), {
              uid: currentUser.uid,
              form: answer_1+answer_2+answer_3,
        });
        navigate("/buddyform/complete");
        } catch (err) {
          console.log(err);
        }
  };
  return (
    <>
      <div className="buddy-page-container">
        <h1 className="buddy-page-title">Buddy Program Registeration Form</h1>
        <hr/>
        <div className="explain-box">
        While the purpose of the program is to help you with the adjustment to life in Korea, there are also a few responsibilities on your part. Soongsil stuents in the program are generously donating their time of making friends with exchange students, so please ensure that you are also making an effort to respond to their communications. You are also encouraged to spend time with your buddy as friend after you are matched! 
<br/><br/>These Korean students volunteer to help incoming exchange stuent with advice and assistance. They also plan some events throughout the semester.
Please answer the questions below so that you can be matched with a budy. The answers will be showed to Korean stuents who volunteer this program. Give us as much information as possible so that we can make the best match! 
The deadline is {props.date}!
        </div>
        <form className="buddy-form" onSubmit={handleSubmit}>
          <div className="question-container">
            <div className="buddy-form-question">
              1. What are three things(or more) you like to do in your free time? Describe things that recently you are interested in
            </div>
            <textarea value={answer_1} onChange={onChangeAnswer_1} placeholder='write down least 1000 letters'/>
            <div className="char-count">{answer_1.length}/{MAX_LENGTH}</div>
          </div>

          <div className="question-container">
            <div className="buddy-form-question">
              2. What are some things you expecting to do or experience during your exchange in Korea?
            </div>
            <textarea value={answer_2} onChange={onChangeAnswer_2} placeholder='write down least 1000 letters'/>
            <div className="char-count">{answer_2.length}/{MAX_LENGTH}</div>
          </div>

          <div className="question-container">
            <div className="buddy-form-question">
              3. Describe about your lifestyle and value
            </div>
            <textarea value={answer_3} onChange={onChangeAnswer_3} placeholder='write down least 1000 letters'/>
            <div className="char-count">{answer_3.length}/{MAX_LENGTH}</div>
          </div>

          <div className="notification">
            *Please visit this website again and make sure to select your preferred buddy after {props.date} for buddy matching.
          </div>
          <label>
            <input className="checkbox" type="checkbox"/>
            Accept
          </label>
          <button className="submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}
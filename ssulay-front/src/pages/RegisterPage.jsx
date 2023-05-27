import React, {useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import {auth,db} from "../config/firebase"
import {doc,setDoc} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage(props) {

  const nationalityOptions=['Korea','USA','Japan','China','UK','Canada','Australia','Germany','France','Spain','Sweden','Netherlands','Finland']
  //초기값- 학번, 닉네임, 이름, 이메일, 이메일검증여부, 비밀번호, 비밀번호 확인, 국적, 전화번호, 
  const[studentNumber, setStudentNumber]=useState('');
  const[userNickname, setUserNickName]= useState('');
  const[userName, setUserName]= useState('');
  const[nationality,setNationality]= useState('Korea'); //한국 디폴트값으로 해둠
  const[email, setEmail]=useState('');
  // const[isVerified,setIsVerified]=useState(false);
  const[password,setPassword]=useState('');
  const[confirmPassword,setConfrimPassword]= useState('');
  const[isPwMatched,setIsPwMatched]=useState(true);
  //옵션으로 받는 곳
  const[phoneNumber,setPhoneNumber]=useState('');
  const[kakaoId,setKakaoId]=useState('');
  const[instagramId,setInstagramId]= useState('');
  const [buddyNum, setBuddyNum] = useState('1'); //매치될 버디 수 디폴트는 1

  //사용자에게 받지않는 정보
  const isSubmitedForm=false; //폼제출여부 확인
  const isMatched=false; //버디와 매치여부
  const interestTags=[]; //관심사 태그 모음
  const lifestyleTags = []; //라이프스타일 태그 모음
  const preferedBuddy=[]; //선호버디 목록


  //이벤트핸들러
  const onChangeStdId=(e)=>{
    setStudentNumber(e.currentTarget.value);
  } //학번
  const onChangeNickName=(e)=>{
    setUserNickName(e.currentTarget.value);    
  }
  const onChangeName=(e)=>{
    setUserName(e.currentTarget.value);
  }
  const onChangeEmail=(e)=>{
    setEmail(e.currentTarget.value);
  }
  const onChangePassword=(e)=>{
    setPassword(e.currentTarget.value);
  }
  const onChangeConfirmPassword=(e)=>{
    const currentPW=e.currentTarget.value;
    setConfrimPassword(currentPW);
    if (password!==currentPW){
        setIsPwMatched(false);
    }else{
      setIsPwMatched(true);
    }
  }
  const onChangeNationality = (e) => {
    const selectedNationality = e.currentTarget.value;
    setNationality(selectedNationality);
  }
  const onChangeBuddyNum=(e) =>{
    setBuddyNum(e.currentTarget.value);
  }
  const onChangePhoneNumber=(e)=>{
    setPhoneNumber(e.currentTarget.value);
  }
  const onChangeKakao=(e)=>{
    setKakaoId(e.currentTarget.value);
  }
  const onChangeInsta=(e)=>{
    setInstagramId(e.currentTarget.value);
  }
  
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); 
    try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);
        //create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              email: email,
              studentNumber: studentNumber,
              userName:userName,
              nationality:nationality,
              password:password,
              phoneNumber: phoneNumber,
              kakaoId: kakaoId,
              instagramId: instagramId,
              //여기는 사용자에게 안보이는 속성영역
              isSubmitedForm: isSubmitedForm,
              isMatched:isMatched,
              buddyNum:buddyNum,
              interestTags:interestTags,
              lifestyleTags:lifestyleTags,
              preferedBuddy:preferedBuddy,
        });
        navigate("/login");
        } catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
        }
  };

  return (
    <>
      <div className="register-container">
        <h1 className="page-title">Register</h1>
        <span>If you have an account with us. Please
        <span>   </span><Link className="link" to="/login">log in</Link> 
        </span>
        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            Student ID:
            <input className="input-bar" type="text" value={studentNumber} onChange={onChangeStdId}/>
          </label>
          <label>
            User name:
            <input className="input-bar" type="text" value={userNickname} onChange={onChangeNickName}/>
          </label>
          <label>
            Name:
            <input className="input-bar" type="text" value={userName} onChange={onChangeName} />
          </label>
          <br />
          <label>
            Nationality:
            <select value={nationality} onChange={onChangeNationality}>
              {nationalityOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <br />
          
          <label>
          매칭 버디 수 (한국인 신청자만 조정가능):
            {nationality === 'Korea' ? (
            <input className="input-bar" type="number" value={buddyNum} onChange={onChangeBuddyNum} />
            ) : (
            <input className="input-bar input-readonly" type="number" value={buddyNum} readOnly />
            )}
          </label>
          <br />
          <label className="label-container">
            Email:
            <input className="input-bar" type="email" value={email} onChange={onChangeEmail} />
          </label>
          <br />
          <label>
            Password:
            <input className="input-bar" type="password" value={password} onChange={onChangePassword} />
          </label>
          <br />
          <label>
            Confirm Password:
            <input className="input-bar" type="password" value={confirmPassword} onChange={onChangeConfirmPassword} />
            {!isPwMatched && <p style={{ color: 'red' }}>Passwords do not match.</p>}
          </label>
          <br />
          <label>
            Phone Number:
            <input className="input-bar"  type="text" value={phoneNumber} onChange={onChangePhoneNumber} />
          </label>
          <br />
          <label>
            Kakao ID:
            <input className="input-bar" type="text" value={kakaoId} onChange={onChangeKakao} />
          </label>
          <br />
          <label>
            Instagram ID:
            <input className="input-bar" type="text" value={instagramId} onChange={onChangeInsta} />
          </label>
          <br />
          
          <button className="submit-btn" type="submit">Sign up</button>
          {err&&<span>Something went wrong</span>}
        </form>
      </div>
    </>
  );
}


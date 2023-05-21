import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';


export default function RegisterPage(props) {

  const nationalityOptions=['Korea','USA','Japan','China','UK','Canada','Australia','Germany','France','Spain','Sweden','Netherlands','Finland']
  //초기값- 학번, 닉네임, 이름, 이메일, 이메일검증여부, 비밀번호, 비밀번호 확인, 국적, 전화번호, 
  const[studentNumber, setStudentNumber]=useState('');
  const[userNickname, setUserNickName]= useState('');
  const[userName, setUserName]= useState('');
  const[nationality,setNationality]= useState('');
  const[email, setEmail]=useState('');
  const[isVerified,setIsVerified]=useState(false);
  const[password,setPassword]=useState('');
  const[confirmPassword,setConfrimPassword]= useState('');
  const[isPwMatched,setIsPwMatched]=useState(true);
  //옵션으로 받는 곳
  const[phoneNumber,setPhoneNumber]=useState('');
  const[kakaoId,setKakaoId]=useState('');
  const[instagramId,setInstagramId]= useState('');

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
  const handleVerification = () => {
    // 이메일 인증 로직 처리

    // 인증 완료 시 상태 변경
    setIsVerified(true);
  };
  const onChangePassword=(e)=>{
    setPassword(e.currentTarget.value);
  }
  const onChangeConfirmPassword=(e)=>{
    setConfrimPassword(e.currentTarget.value);
    if (password!==confirmPassword){
        setIsPwMatched(false);
    }
  }
  const onChangeNationality = (e) => {
    const selectedNationality = e.currentTarget.value;
    setNationality(selectedNationality);
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
  const handleSubmit = (e)=>{
    e.preventDefault();
    //폼 제출 후 로직
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
          <label className="label-container">
            Email:
            <input className="input-bar" type="email" value={email} onChange={onChangeEmail} />
            <button
              className={`verificationBtn ${isVerified ? 'verified' : ''}`}
              onClick={handleVerification}
              disabled={isVerified}
            >
              {isVerified ? '인증 완료' : '이메일 인증'}
            </button>
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
        </form>
      </div>
    </>
  );
}

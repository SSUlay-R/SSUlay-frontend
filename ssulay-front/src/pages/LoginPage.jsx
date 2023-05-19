import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const[studentNumber, setStudentNumber]=useState('');
  const[password,setPassword]=useState('');

  const onChangeStdId=(e)=>{
    setStudentNumber(e.currentTarget.value);
  } 

  const onChangePassword=(e)=>{
    setPassword(e.currentTarget.value);
  }

  return (
    <>
      <div className="login-container">
        <h1 className="page-title">Login Account</h1>
        <form className="login-form">
          <label>
            Student ID
            <input className="login-input" type="text" value={studentNumber} onChange={onChangeStdId}/>
          </label>
          <label>
            Password
            <input className="login-input" type="password" value={password} onChange={onChangePassword} />
          </label>
          <button id= "login-btn"className="submit-btn" type="submit">Log In</button>
          <span>Forgot Password?</span>
          <span>Don't have an account? <Link to ="/" className="link">Register here!</Link></span>
        </form>
      </div>
    </>
  )
}

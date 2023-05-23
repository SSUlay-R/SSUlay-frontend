import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './LoginPage.css';
import { Auth } from '../config/firebase';

export default function LoginPage() {
  const[email, setEmail]=useState('');
  const[password,setPassword]=useState('');

  const onChangeEmail=(e)=>{
    setEmail(e.currentTarget.value);
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
            Email
            <input className="login-input" type="text" value={email} onChange={onChangeEmail}/>
          </label>
          <label>
            Password
            <input className="login-input" type="password" value={password} onChange={onChangePassword} />
          </label>
          <button id= "login-btn"className="submit-btn" type="submit">Login</button>
          <span>Forgot Password?</span>
          <span>Don't have an account? <Link to ="/" className="link">Register here!</Link></span>
        </form>
      </div>
    </>
  )
}

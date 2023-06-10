import React,{useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import './LoginPage.css';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const[email, setEmail]=useState('');
  const[password,setPassword]=useState('');

  const onChangeEmail=(e)=>{
    setEmail(e.currentTarget.value);
  } 

  const onChangePassword=(e)=>{
    setPassword(e.currentTarget.value);
  }

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/buddyForm");
        } catch (err) {
          console.log(err.response);
          setErr(true);
        }
  };

  return (
    <>
      <div className="login-container">
        <h1 className="page-title">Login Account</h1>
        <form className="login-form" onSubmit={handleSubmit}> 
          <label>
            Email
            <input className="login-input" type="text" value={email} onChange={onChangeEmail}/>
          </label>
          <label>
            Password
            <input className="login-input" type="password" value={password} onChange={onChangePassword} />
          </label>
          <button id= "login-btn"className="submit-btn" type="submit">Login</button>
          <span>Don't have an account? <Link to ="/" className="link">Register here!</Link></span>
        </form>
      </div>
    </>
  )
}

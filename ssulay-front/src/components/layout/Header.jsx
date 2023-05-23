import React from 'react';
import { Link } from 'react-router-dom';
import {getAuth,signOut} from "firebase/auth"
import { auth } from '../../config/firebase';

export default function Header() {
  const authInstance= getAuth();
  const user= authInstance.currentUser;

  return (
    <header style={{ height: '17vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <img alt="ssu logo" src="/assets/ssuLogo.png" style={{ marginLeft: '20px' }}/>
      <div style={{ flex: 1, textAlign: 'center' , fontWeight: 'bold',fontSize: '30px', paddingRight:'167px'}}>Exchange at SSU-Fall 2023</div>
      
      {user ? (
        <button onClick={()=>signOut(auth)}>logOut</button> 
      ):(
        <Link to="/login" style={{ position: 'absolute', top: '10px', right: '20px' ,padding: '5px 10px', fontSize: '20px', background: 'none', border: 'none', textDecoration: 'underline'}}>
        Log in</Link> 
      )}
      
      
    </header>
  )
}

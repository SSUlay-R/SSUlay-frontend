import React from 'react'

export default function Header() {
  return (
    <header style={{ height: '17vh', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor:"gray" }}>
      <img alt="ssu logo" src="./assets/ssuLogo.png" style={{ marginLeft: '20px' }}/>
      <div style={{ flex: 1, textAlign: 'center' , fontWeight: 'bold',fontSize: '30px', paddingRight:'167px'}}>Exchange at SSU-Fall 2023</div>
      <button style={{ position: 'absolute', top: '10px', right: '20px' ,padding: '5px 10px', fontSize: '20px', background: 'none', border: 'none', textDecoration: 'underline'}}>
        Log in</button> 
    </header>
  )
}

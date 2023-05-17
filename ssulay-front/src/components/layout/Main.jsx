import React from 'react'

export default function Main(props) {
  const mainStyle={
    display: 'flex',
    justifyContent: 'center', 
    padding: '0 20px', 
    height: '100vh', 
    minHeight: '100vh',
    overflow:'auto',
    paddingBottom:"40px"
  }


  return (
    <main style={mainStyle}>
      <section style={{width:"80%" , height:"100%" ,paddingBottom:"10%"}}>
        {props.children}
      </section>
    </main>
  )
}

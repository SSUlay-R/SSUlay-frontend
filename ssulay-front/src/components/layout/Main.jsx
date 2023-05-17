import React from 'react'

export default function Main(props) {
  const mainStyle={
    display: 'flex',
    justifyContent: 'center', 
    padding: '0 20px', 
    height: '100vh', 
    backgroundColor:"green",
  }
  return (
    <main style={mainStyle}>
      <section>
        {props.children}
      </section>
    </main>
  )
}

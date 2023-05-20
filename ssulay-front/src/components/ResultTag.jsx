import React from 'react'

export default function ResultTag(props) {

  const ResultTagStyle={
    backgroundColor:"#F8F8F8",
    borderRadius:"22px",
    minWidth:"140px",
    maxWidth: '250px',
    height:"31px",
    color:"black",
    padding:"5px",
    display: 'inline-block',
    justifyContent:'center',
    alignItems:'center',
    fontSize:'16px',    
    fontWeight:"600",
    overflow: 'hidden',
    boxShadow: '0 3px 3px 0 rgba(0,0,0,0.3)',
    position: 'relative',
  }
  const xmark={
    border: "none",
    position: 'absolute',
    top: "0",
    right: "0",
    backgroundColor:"#F8F8F8"
  
  }
  const xmarkImg={
    width:"10px",
    height:"10px",
  }
  const handleRemoveTag = () => {
    props.onRemoveTag(props.children);
  };

  return (
    <div style={ResultTagStyle}>
      {props.children}
      <button style={xmark} onClick={handleRemoveTag}><img style={xmarkImg} alt="cancle btn" src="/assets/xmark.png" /></button>
    </div>
  )
}

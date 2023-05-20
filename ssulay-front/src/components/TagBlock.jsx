import React,{useState} from 'react'

export default function TagBlock(props) {
  const [isClicked, setIsClicked ] = useState(false);

  const tagBlockStyle={
    backgroundColor:"#02A6CB",
    borderRadius:"22px",
    minWidth: '100px',
    maxWidth: '250px',
    height:"31px",
    color:"white",
    padding:"5px",
    display: 'inline-block',
    justifyContent:'center',
    alignItems:'center',
    fontSize:'16px',    
    fontWeight:"600",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    border: isClicked ? 'none' : '4px solid #006E93',
  }
  const handleClick=()=>{
    setIsClicked(!isClicked);
  }

  return (
    <button style={tagBlockStyle} onClick={handleClick}>
      {props.children}
    </button>
  )
}

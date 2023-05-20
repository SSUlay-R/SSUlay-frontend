import React,{useState} from 'react'

export default function TagBlock(props) {
  const [isClicked, setIsClicked ] = useState(false);

  const tagBlockStyle={
    backgroundColor:"#02A6CB",
    borderRadius:"22px",
    minWidth: '70px',
    maxWidth: '250px',
    height:"31px",
    color:"white",
    display: 'felx',
    justifyContent:'center',
    alignItems:'center',
    fontSize:'16px',    
    fontWeight:"500",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    border:'none',
    outline: isClicked ? '4px solid #006E93':'none' ,
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

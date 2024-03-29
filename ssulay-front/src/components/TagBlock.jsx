import React from 'react';

export default function TagBlock({ children, isSelected, onClick }) {

  
  const tagBlockStyle = {
    backgroundColor: '#02A6CB',
    borderRadius: '22px',
    minWidth: '70px',
    maxWidth: '250px',
    height: '31px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    border: 'none',
    cursor: 'pointer',
    outline: isSelected ? '4px solid #006E93' : 'none'
  };

  const handleTagClick = () => {
    onClick(children); // 선택된 태그를 부모 컴포넌트의 onClick 함수로 전달
  };

  return (
    <button style={tagBlockStyle} onClick={handleTagClick}>
      {children}
    </button>
  );
}
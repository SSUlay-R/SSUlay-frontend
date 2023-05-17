import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigaters() {
  return (
    <>
      <Navbar style={{backgroundColor:"#02A6CB"}} variant="dark">
          <Nav className="me-auto" style={{ marginLeft: '30px', gap: '20px' }}>
            <Nav.Link href="#home">Requirements</Nav.Link>
            <Nav.Link href="#features">Buddy Program</Nav.Link>
            <Nav.Link href="#pricing">Notification</Nav.Link>
          </Nav>
      </Navbar>
    </>
  );
}
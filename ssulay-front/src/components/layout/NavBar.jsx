import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


export default function Navigaters() {
  return (
    <>
      <Navbar style={{backgroundColor:"#02A6CB"}} variant="dark">
          <Nav className="me-auto" style={{ marginLeft: '30px', gap: '20px' }}>
            <Nav.Link as={Link} to="/" href="#">Requirements</Nav.Link>
            <Nav.Link as={Link} to="/buddyprogram" href="#features">Buddy Program</Nav.Link>
            <Nav.Link as={Link} to="/" href="#">Notification</Nav.Link>
          </Nav>
      </Navbar>
    </>
  );
}
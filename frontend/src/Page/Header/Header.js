import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand to="#home" className='mx-5'>TreLLo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"  className='mx-4 justify-content-end' >
          <Nav className="mr-auto gap-3 ">
            <Link to="/"  className="text-decoration-none text-white" >Home</Link>
            <Link to="/register" className="text-decoration-none text-white">Register</Link>
            <Link to="/login" className="text-decoration-none text-white">Login</Link>
         </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header
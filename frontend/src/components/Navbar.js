import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav"
import Container from 'react-bootstrap/Container'
import logo from "../assets/imgs/palmtree.png"

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="black">
      <Container>
        <Navbar.Brand>
          <img
            alt="logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
            src={logo}
          />{' '}
        Paradise Competitions
      </Navbar.Brand>
        <Navbar.Toggle style={{color:'white'}} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/competitions">Competitions</Nav.Link>
            <Nav.Link href="/how-to-play">How To Play</Nav.Link>
            <Nav.Link href="/live-Draw">Live Draw</Nav.Link>
            <Nav.Link href="/podium">Podium</Nav.Link>
            <Nav.Link href="/login">Client Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Navigation;

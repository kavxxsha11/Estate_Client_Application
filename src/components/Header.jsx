import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaHome, FaHeart } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" aria-label="Main Navigation">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>EstateAgent</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link><FaHome className="me-1" /> Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/favorites">
              <Nav.Link><FaHeart className="me-1" /> Favorites</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

import React from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Container,
} from "react-bootstrap";
// import logo from '../img/logo.png'
// import logo fr om '../img/1.png'
import { FaSearch } from "react-icons/fa";
import './Header.css';
function Header({ searchQuery, setSearchQuery }) {
  return (
    <Navbar expand="lg"  className="bg-dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          {/* <img src={logo} alt="Logo" className="logo" height="40" /> */}
            <img
    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
    alt="Netflix Logo"
    height="40"
    className="logo"
  />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
       <Navbar.Collapse id="navbar-nav">
    <Nav className="me-auto">
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href="/movie">Movies</Nav.Link>
    <Nav.Link href="/tv">Tv Shows</Nav.Link>
    <Nav.Link href="/new">New & Popular</Nav.Link>
  </Nav>

  <Form className="d-flex align-items-center ms-auto mt-2 mt-lg-0" role="search">
    <Form.Control
      type="search"
      placeholder="Search Movies"
      className="me-2"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ minWidth: "200px" }}
    />
    <Button variant="outline-light">
      <FaSearch />
    </Button>
  </Form>
</Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

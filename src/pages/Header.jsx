import { Navbar, Nav, Container } from "react-bootstrap";

import logo from "../img/logo.png";
function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Netflix" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/movie">Movies</Nav.Link>
            <Nav.Link href="/tv">TV</Nav.Link>
            <Nav.Link href="/new">New & Popular</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

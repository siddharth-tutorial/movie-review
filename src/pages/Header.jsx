
import { Navbar, Nav, Container} from "react-bootstrap";

function Header() {


  return (
    <Navbar expand="lg" className="bg-dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
           src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        
            alt="Netflix Logo"
            height="80"
            width="80"
            className="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/movie">Movies</Nav.Link>
            <Nav.Link href="/tv">Tv Shows</Nav.Link>
            <Nav.Link href="/new">New & Popular</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

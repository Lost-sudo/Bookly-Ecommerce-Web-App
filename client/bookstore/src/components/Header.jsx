import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../public/images/bookly-logo.png"; 

function Header() {
  return (
    <Navbar bg="dark" variant="dark" className="py-3 shadow-sm">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* Left: Logo + Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center text-white fw-bold fs-4"
        >
          <img src={logo} alt="Bookly Logo" height="35" className="me-2" />
          Bookly
        </Navbar.Brand>

        {/* Center: Dropdowns */}
        <Nav className="d-flex justify-content-center gap-4">
          <NavDropdown title="Fiction" id="fiction-dropdown" menuVariant="dark">
            <NavDropdown.Item as={Link} to="/genre/fantasy">
              Fantasy
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/romance">
              Romance
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/mystery">
              Mystery
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Non-Fiction"
            id="nonfiction-dropdown"
            menuVariant="dark"
          >
            <NavDropdown.Item as={Link} to="/genre/biography">
              Biography
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/history">
              History
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/self-help">
              Self-Help
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Children"
            id="children-dropdown"
            menuVariant="dark"
          >
            <NavDropdown.Item as={Link} to="/genre/children-fiction">
              Fiction
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/educational">
              Educational
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* Right: Search + Icons */}
        <div className="d-flex align-items-center gap-3">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search books..."
              className="me-2 search-input"
              aria-label="Search"
            />
          </Form>
          <Link to="/cart" className="text-light fs-5">
            <FaShoppingCart />
          </Link>
          <Link to="/account" className="text-light fs-5">
            <FaUser />
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;

import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../public/images/bookly-logo.png";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
  }

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
            <NavDropdown.Item as={Link} to="/genre/fiction/fantasy">
              Fantasy
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/fiction/romance">
              Romance
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/fiction/mystery">
              Mystery
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Non-Fiction"
            id="nonfiction-dropdown"
            menuVariant="dark"
          >
            <NavDropdown.Item as={Link} to="/genre/non-fiction/biography">
              Biography
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/non-fiction/history">
              History
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/non-fiction/self-help">
              Self-Help
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Children"
            id="children-dropdown"
            menuVariant="dark"
          >
            <NavDropdown.Item as={Link} to="/genre/children/fiction">
              Fiction
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/genre/children/educational">
              Educational
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <div className="d-flex align-items-center gap-3">
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search books..."
              className="me-2 search-input"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
          <Link to="/cart" className="text-light fs-5">
            <FaShoppingCart />
          </Link>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-account"
              className="text-light fs-5 p-0 border-0 shadow-none"
            >
              <FaUser />
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-dark">
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/orders">
                Orders
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;

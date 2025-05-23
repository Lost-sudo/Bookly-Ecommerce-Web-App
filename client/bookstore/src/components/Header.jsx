import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
  Badge,
  Offcanvas,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../public/images/bookly-logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import axios from "axios";

function Header() {
  const { logout, authTokens } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!authTokens) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cart-items/`,
          {
            headers: { Authorization: `Bearer ${authTokens.access}` },
          }
        );
        // Calculate total quantity instead of just counting items
        const totalQuantity = res.data.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(totalQuantity);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };

    fetchCartCount();
    // Set up an interval to refresh cart count
    const interval = setInterval(fetchCartCount, 2000);

    return () => clearInterval(interval);
  }, [authTokens]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <Navbar
      bg={theme === "dark" ? "dark" : "light"}
      variant={theme === "dark" ? "dark" : "light"}
      className="py-3 shadow-sm sticky-top"
      expand="md"
      style={{ zIndex: 1040 }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* Left: Logo + Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-bold fs-4"
          style={{
            color: theme === "dark" ? "#fff" : "#23272b",
            transition: "color 0.2s",
          }}
        >
          <img src={logo} alt="Bookly Logo" height="35" className="me-2" />
          Bookly
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar-offcanvas"
          onClick={() => setShowOffcanvas(true)}
          className="d-md-none"
        />

        <Navbar.Collapse className="d-none d-md-flex">
          {/* Center: Dropdowns */}
          <Nav className="d-flex justify-content-center gap-4 mx-auto">
            <NavDropdown
              title={
                <span style={{ color: theme === "dark" ? "#fff" : "#23272b" }}>
                  Fiction
                </span>
              }
              id="fiction-dropdown"
              menuVariant={theme === "dark" ? "dark" : "light"}
            >
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
              title={
                <span style={{ color: theme === "dark" ? "#fff" : "#23272b" }}>
                  Non-Fiction
                </span>
              }
              id="nonfiction-dropdown"
              menuVariant={theme === "dark" ? "dark" : "light"}
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
              title={
                <span style={{ color: theme === "dark" ? "#fff" : "#23272b" }}>
                  Children
                </span>
              }
              id="children-dropdown"
              menuVariant={theme === "dark" ? "dark" : "light"}
            >
              <NavDropdown.Item as={Link} to="/genre/children/fiction">
                Fiction
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/genre/children/educational">
                Educational
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <div className="d-flex align-items-center gap-3">
          {/* Theme Switch Button */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="btn btn-outline-secondary d-flex align-items-center justify-content-center me-2"
            style={{
              border: "none",
              background: "transparent",
              fontSize: "1.3rem",
              color: theme === "dark" ? "#ffd700" : "#23272b", // sun/moon icon color
              transition: "color 0.2s",
            }}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <Form className="d-none d-md-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search books..."
              className="me-2 search-input"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                color: theme === "dark" ? "#fff" : "#23272b",
                backgroundColor: theme === "dark" ? "#23272b" : "#fff",
              }}
            />
          </Form>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/cart"
              className="fs-5 position-relative d-inline-flex align-items-center"
              style={{
                textDecoration: "none",
                color: theme === "dark" ? "#ffd700" : "#23272b", // cart icon color
                transition: "color 0.2s",
              }}
            >
              <FaShoppingCart />
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="position-absolute"
                  style={{
                    top: -8,
                    right: -8,
                  }}
                >
                  <Badge
                    bg="primary"
                    pill
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      minWidth: "18px",
                      height: "18px",
                      fontSize: "0.7rem",
                    }}
                  >
                    {cartCount}
                  </Badge>
                </motion.div>
              )}
            </Link>
          </motion.div>

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-account"
              className="fs-5 p-0 border-0 shadow-none"
              style={{
                color: theme === "dark" ? "#ffd700" : "#23272b", // user icon color
                transition: "color 0.2s",
              }}
            >
              <FaUser />
            </Dropdown.Toggle>

            <Dropdown.Menu
              className={theme === "dark" ? "dropdown-menu-dark" : ""}
            >
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

      {/* Offcanvas for mobile */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="start"
        className={theme === "dark" ? "bg-dark text-light" : ""}
        id="main-navbar-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={logo} alt="Bookly Logo" height="30" className="me-2" />
            Bookly
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-2">
            <NavDropdown
              title="Fiction"
              id="fiction-dropdown-mobile"
              menuVariant={theme === "dark" ? "dark" : "light"}
            >
              <NavDropdown.Item
                as={Link}
                to="/genre/fiction/fantasy"
                onClick={() => setShowOffcanvas(false)}
              >
                Fantasy
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/genre/fiction/romance"
                onClick={() => setShowOffcanvas(false)}
              >
                Romance
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/genre/fiction/mystery"
                onClick={() => setShowOffcanvas(false)}
              >
                Mystery
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Non-Fiction"
              id="nonfiction-dropdown-mobile"
              menuVariant={theme === "dark" ? "dark" : "light"}
            >
              <NavDropdown.Item
                as={Link}
                to="/genre/non-fiction/biography"
                onClick={() => setShowOffcanvas(false)}
              >
                Biography
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/genre/non-fiction/history"
                onClick={() => setShowOffcanvas(false)}
              >
                History
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/genre/non-fiction/self-help"
                onClick={() => setShowOffcanvas(false)}
              >
                Self-Help
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Children"
              id="children-dropdown-mobile"
              menuVariant={theme === "dark" ? "dark" : "light"}
            >
              <NavDropdown.Item
                as={Link}
                to="/genre/children/fiction"
                onClick={() => setShowOffcanvas(false)}
              >
                Fiction
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/genre/children/educational"
                onClick={() => setShowOffcanvas(false)}
              >
                Educational
              </NavDropdown.Item>
            </NavDropdown>
            <Form
              className="my-3"
              onSubmit={(e) => {
                handleSearch(e);
                setShowOffcanvas(false);
              }}
            >
              <FormControl
                type="search"
                placeholder="Search books..."
                className="search-input"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  color: theme === "dark" ? "#fff" : "#23272b",
                  backgroundColor: theme === "dark" ? "#23272b" : "#fff",
                }}
              />
            </Form>
            <Nav.Link
              as={Link}
              to="/cart"
              onClick={() => setShowOffcanvas(false)}
            >
              <FaShoppingCart className="me-2" />
              Cart{" "}
              {cartCount > 0 && <Badge bg="primary">{cartCount}</Badge>}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile"
              onClick={() => setShowOffcanvas(false)}
            >
              <FaUser className="me-2" />
              Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/orders"
              onClick={() => setShowOffcanvas(false)}
            >
              Orders
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                logout();
                setShowOffcanvas(false);
              }}
            >
              Logout
            </Nav.Link>
            <div className="mt-3">
              <Button
                variant={theme === "dark" ? "outline-light" : "outline-dark"}
                onClick={toggleTheme}
                className="w-100"
              >
                {theme === "dark" ? (
                  <FaSun className="me-2" />
                ) : (
                  <FaMoon className="me-2" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default Header;

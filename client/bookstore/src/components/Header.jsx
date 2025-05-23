import React, { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
  Badge,
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
      className="py-3 shadow-sm"
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

        {/* Center: Dropdowns */}
        <Nav className="d-flex justify-content-center gap-4">
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

          <Form className="d-flex" onSubmit={handleSearch}>
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
    </Navbar>
  );
}

export default Header;

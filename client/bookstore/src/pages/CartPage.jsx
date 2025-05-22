import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowRight,
} from "react-icons/fa";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import { useAlert } from "../hooks/useAlert";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, showAlert, setAlert] = useAlert();
  const { authTokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, [authTokens]);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart-items/`,
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      setCartItems(res.data);
    } catch (error) {
      showAlert("Failed to load cart items", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
      showAlert("Quantity cannot be less than 1", "warning");
      return;
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/cart-items/${id}/`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: res.data.quantity } : item
        )
      );
      showAlert("Cart updated successfully", "success");
    } catch (error) {
      showAlert("Failed to update quantity", "error");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart-items/${id}/`,
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      showAlert("Item removed from cart", "success");
    } catch (error) {
      showAlert("Failed to remove item", "error");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <Container className="py-5 d-flex justify-content-center">
        <div className="loading-spinner"></div>
      </Container>
    );
  }

  return (
    <Container className="py-5 text-light">
      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary mb-0">
            <FaShoppingCart className="me-2" />
            Your Cart
          </h2>
          <span className="text-muted">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-5"
          >
            <h4 className="text-muted mb-4">Your cart is empty</h4>
            <Button
              variant="primary"
              onClick={() => navigate("/")}
              className="px-4 py-2"
            >
              Continue Shopping
            </Button>
          </motion.div>
        ) : (
          <Row>
            <Col lg={8}>
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                    }}
                  >
                    <Card className="cart-item-card mb-3 bg-dark border border-primary glass-effect rounded-3">
                      <Card.Body>
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                          <div className="mb-3 mb-md-0">
                            <motion.h5
                              className="mb-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              {item.book.title}
                            </motion.h5>
                            <p className="text-muted mb-0">
                              {item.book.author}
                            </p>
                          </div>

                          <div className="d-flex align-items-center gap-3">
                            <div className="quantity-controls">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                                className="quantity-btn"
                              >
                                <FaMinus size={12} />
                              </Button>
                              <span className="mx-3 fw-bold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="quantity-btn"
                              >
                                <FaPlus size={12} />
                              </Button>
                            </div>

                            <motion.h5
                              className="mb-0 text-primary"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              ₱{(item.book.price * item.quantity).toFixed(2)}
                            </motion.h5>

                            <Button
                              variant="link"
                              className="text-danger p-0 remove-btn"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Col>

            <Col lg={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card
                  className="bg-dark border border-primary glass-effect rounded-3 sticky-top"
                  style={{ top: "2rem" }}
                >
                  <Card.Body>
                    <h5 className="text-primary mb-4">Cart Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Subtotal</span>
                      <span>₱{subtotal.toFixed(2)}</span>
                    </div>
                    <Button
                      variant="primary"
                      className="w-100 py-2"
                      onClick={() => navigate("/checkout")}
                    >
                      Proceed to Checkout
                      <FaArrowRight className="ms-2" />
                    </Button>
                    <Button
                      variant="link"
                      className="w-100 text-muted mt-2"
                      onClick={() => navigate("/")}
                    >
                      Continue Shopping
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        )}
      </motion.div>
    </Container>
  );
};

export default CartPage;

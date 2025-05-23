import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingBag,
  FaTruck,
  FaCreditCard,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import { useAlert } from "../hooks/useAlert";
import { getUser } from "../api/user";

const shipping = 5.0;

const CheckOutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [alert, showAlert, setAlert] = useAlert();
  const { authTokens } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  // Add user state for profile info
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCartItems();
    fetchUserInfo();
  }, [authTokens]);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart-items/`,
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      if (res.data.length === 0) {
        showAlert("Your cart is empty", "warning");
        setTimeout(() => navigate("/cart"), 2000);
        return;
      }
      setCartItems(res.data);
    } catch (error) {
      showAlert("Could not load your cart items. Please try again.", "error");
    }
  };

  // Fetch user profile info and pre-fill form
  const fetchUserInfo = async () => {
    try {
      const data = await getUser(authTokens?.access);
      setUser(data);
      setFormData({
        fullName: data.full_name || "",
        phoneNumber: data.phone_number || "",
        address: data.address || "",
      });
    } catch (error) {
      // fallback: leave form empty
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      showAlert("Please enter your full name", "error");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      showAlert("Please enter your phone number", "error");
      return false;
    }
    if (!formData.address.trim()) {
      showAlert("Please enter your address", "error");
      return false;
    }
    return true;
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.book.price || 0) * item.quantity,
    0
  );
  const total = subtotal + shipping;

  const confirmCheckout = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const transactionID = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // Send user info with order
      const payload = {
        total_amount: total,
        payment_type: paymentMethod,
        transaction_id: transactionID,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        address: formData.address,
      };
      console.log("Checkout Request Payload:", payload);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Checkout Response:", response.data);

      showAlert(
        "🎉 Order placed successfully! Redirecting to orders...",
        "success"
      );
      setCartItems([]);
      setShowConfirmation(false);
      // setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.error("Checkout Error Details:", {
        message: error.message,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
        },
        request: {
          payload: error.config?.data,
          headers: error.config?.headers,
        },
      });

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data ||
        "An unexpected error occurred. Please try again.";
      showAlert(errorMessage, "error");
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

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
            <FaShoppingBag className="me-2" />
            Checkout
          </h2>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => navigate("/cart")}
          >
            <FaArrowLeft className="me-2" />
            Back to Cart
          </Button>
        </div>

        <Row>
          <Col lg={8}>
            <Card className="bg-dark border border-primary glass-effect rounded-3 shadow-sm mb-4">
              <Card.Body>
                <h5 className="text-primary mb-4">
                  <FaTruck className="me-2" />
                  Shipping Details
                </h5>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="bg-dark text-light border-secondary"
                          placeholder="Enter your full name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="bg-dark text-light border-secondary"
                          placeholder="Enter your phone number"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-dark text-light border-secondary"
                      placeholder="Enter your complete address"
                      required
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            <Card className="bg-dark border border-primary glass-effect rounded-3 shadow-sm mb-4">
              <Card.Body>
                <h5 className="text-primary mb-4">
                  <FaCreditCard className="me-2" />
                  Payment Method
                </h5>
                <div className="d-flex gap-3 flex-wrap">
                  {["cash", "credit_card", "paypal"].map((method) => (
                    <motion.div
                      key={method}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`bg-dark border ${
                          paymentMethod === method
                            ? "border-primary"
                            : "border-secondary"
                        } rounded-3 cursor-pointer`}
                        onClick={() => setPaymentMethod(method)}
                        style={{ minWidth: "120px" }}
                      >
                        <Card.Body className="text-center p-3">
                          <i className={`fab fa-${method} fa-2x mb-2`}></i>
                          <p className="mb-0 text-capitalize">
                            {method.replace("_", " ")}
                          </p>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card
                className="bg-dark border border-primary glass-effect rounded-3 shadow-sm sticky-top"
                style={{ top: "2rem" }}
              >
                <Card.Body>
                  <h5 className="text-primary mb-4">Order Summary</h5>
                  {/* Show user info in summary */}
                  <div className="mb-3">
                    <div>
                      <strong>Name:</strong> {formData.fullName}
                    </div>
                    <div>
                      <strong>Phone:</strong> {formData.phoneNumber}
                    </div>
                    <div>
                      <strong>Address:</strong> {formData.address}
                    </div>
                  </div>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <small className="text-muted">
                        {item.book.title} × {item.quantity}
                      </small>
                      <span>
                        ₱{(item.book.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <hr className="border-secondary" />
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>
                      ₱
                      {typeof subtotal === "number"
                        ? subtotal.toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Shipping</span>
                    <span>₱{shipping.toFixed(2)}</span>
                  </div>
                  <hr className="border-secondary" />
                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold text-primary fs-5">
                      ₱{typeof total === "number" ? total.toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    className="w-100 py-2"
                    onClick={() => setShowConfirmation(true)}
                    disabled={loading || cartItems.length === 0}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" />
                    ) : null}
                    Place Order
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal d-block"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="modal-dialog modal-dialog-centered"
            >
              <div className="modal-content bg-dark text-light border border-primary">
                <div className="modal-header border-bottom border-secondary">
                  <h5 className="modal-title">Confirm Order</h5>
                  <Button
                    variant="link"
                    className="p-0 text-light"
                    onClick={() => setShowConfirmation(false)}
                  >
                    <FaTimes />
                  </Button>
                </div>
                <div className="modal-body">
                  <p>Please review your order details:</p>
                  <div className="mb-3">
                    <strong>Payment Method:</strong>{" "}
                    <span className="text-capitalize">
                      {paymentMethod.replace("_", " ")}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Total Amount:</strong>{" "}
                    <span className="text-primary">₱{total.toFixed(2)}</span>
                  </div>
                  <p className="mb-0">
                    Are you sure you want to place this order?
                  </p>
                </div>
                <div className="modal-footer border-top border-secondary">
                  <Button
                    variant="secondary"
                    onClick={() => setShowConfirmation(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={confirmCheckout}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Order"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CheckOutPage;

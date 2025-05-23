import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckOutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
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
      console.error("Failed to load cart items:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const payload = {
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        address: formData.address,
        total_amount: cartItems.reduce(
          (sum, item) => sum + item.book.price * item.quantity,
          0
        ),
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/`, payload, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      navigate("/orders");
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h2>Checkout</h2>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Order Summary</h5>
              {cartItems.map((item) => (
                <div key={item.id}>
                  {item.book.title} x {item.quantity} = ₱
                  {(item.book.price * item.quantity).toFixed(2)}
                </div>
              ))}
              <hr />
              <h6>
                Total: ₱
                {cartItems
                  .reduce(
                    (sum, item) => sum + item.book.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </h6>
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOutPage;

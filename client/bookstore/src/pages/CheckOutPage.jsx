import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const shipping = 5.0;

const CheckOutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { authTokens } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/cart-items/", {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setCartItems(res.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    if (authTokens) {
      fetchCartItems();
    }
  }, [authTokens]);

  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/cart-items/${id}/`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: res.data.quantity } // updated quantity
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart-items/${id}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      // Update frontend state after successful deletion
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );
  const total = subtotal + shipping;

  const handleProceedToCheckout = async () => {
    setShowConfirmation(true);
  };

  const confirmCheckout = async () => {
    const transactionID = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/orders/",
        {
          payment_amount: total,
          payment_type: paymentMethod,
          transaction_id: transactionID,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      alert("Order placed successfully!");
      setCartItems([]);
      setShowConfirmation(false);
      return res.data;
    } catch (error) {
      console.error("Error placing order:", error);
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data ||
        "An unexpected error occurred. Please try again.";
      alert(msg);
      setShowConfirmation(false);
    }

  };

  return (
    <Container className="text-light py-5">
      <h2 className="mb-4 text-primary">Your Cart</h2>
      <Row>
        {/* Cart Items */}
        <Col lg={8}>
          {cartItems.map((item) => (
            <Card key={item.id} className="...">
              <Card.Body className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <Card.Title className="mb-1">{item.book.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.book.author}
                  </Card.Subtitle>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      −
                    </Button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="form-control w-auto bg-dark text-light border border-light text-center"
                      readOnly
                    />
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </Button>
                    <span className="fw-bold text-primary ms-3">
                      P{(item.book.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-3"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Summary */}
        <Col lg={4}>
          <Card
            className="bg-dark text-light rounded-3 border border-primary shadow"
            style={{ top: "80px", position: "sticky" }}
          >
            <Card.Body>
              <h5 className="fw-semibold text-primary">Summary</h5>
              <hr className="border-light" />
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>P{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>P{shipping.toFixed(2)}</span>
              </div>
              <hr className="border-light" />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>P{total.toFixed(2)}</span>
              </div>
              <Button
                variant="primary"
                className="w-100 mt-3"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>

              {showConfirmation && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light">
                      <div className="modal-header">
                        <h5 className="modal-title">Confirm Checkout</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowConfirmation(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>Payment Type:</p>
                        <select
                          className="form-select"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="cash">Cash</option>
                          <option value="credit_card">Credit Card</option>
                          <option value="paypal">Paypal</option>
                        </select>
                        <p className="mt-3">
                          Are you sure you want to place the order?
                        </p>
                      </div>
                      <div className="modal-footer">
                        <Button
                          variant="secondary"
                          onClick={() => setShowConfirmation(false)}
                        >
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={confirmCheckout}>
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOutPage;

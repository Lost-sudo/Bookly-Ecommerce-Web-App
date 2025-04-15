import React, { useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

const initialCartItems = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    quantity: 1,
    price: 15.99,
    cover: "https://via.placeholder.com/80x120?text=Book+1",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    quantity: 2,
    price: 12.99,
    cover: "https://via.placeholder.com/80x120?text=Book+2",
  },
];

const shipping = 5.0;

const CheckOutPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta), // prevent quantity below 1
            }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shipping;

  return (
    <Container className="text-light py-5">
      <h2 className="mb-4 text-primary">Your Cart</h2>
      <Row>
        {/* Cart Items */}
        <Col lg={8}>
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="mb-3 bg-dark border border-primary text-light rounded-3 shadow-sm"
            >
              <Card.Body className="d-flex align-items-center">
                <img
                  src={item.cover || "/images/placeholder-img.jpg"}
                  alt={item.title}
                  className="rounded me-3"
                  style={{
                    width: "80px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1">
                  <Card.Title className="mb-1">{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.author}
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
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button variant="outline-danger" size="sm" className="ms-3">
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <hr className="border-light" />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button variant="primary" className="w-100 mt-3">
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOutPage;

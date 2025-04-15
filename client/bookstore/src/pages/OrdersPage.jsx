import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const currentOrders = [
  {
    id: 1,
    orderNumber: "ORD123456",
    date: "April 14, 2025",
    status: "Pending",
    items: [
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        quantity: 1,
        price: 18.99,
        cover: "https://via.placeholder.com/80x120?text=Book+1",
      },
    ],
  },
];

const pastOrders = [
  {
    id: 2,
    orderNumber: "ORD987654",
    date: "March 20, 2025",
    status: "Delivered",
    items: [
      {
        title: "Deep Work",
        author: "Cal Newport",
        quantity: 2,
        price: 14.99,
        cover: "https://via.placeholder.com/80x120?text=Book+2",
      },
    ],
  },
];

const getTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const OrdersPage = () => {
  return (
    <Container className="py-5 text-light">
      <h2 className="text-primary mb-4">Your Orders</h2>

      {/* Current Orders */}
      <h5 className="mb-3">Current Orders</h5>
      {currentOrders.length === 0 ? (
        <p className="text-muted">You have no current orders.</p>
      ) : (
        currentOrders.map((order) => (
          <Card
            key={order.id}
            className="mb-4 bg-dark border border-primary rounded-3 shadow-sm"
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="fw-semibold">Order #{order.orderNumber}</h6>
                  <small className="text-muted">Placed on {order.date}</small>
                </div>
                <Badge
                  bg={
                    order.status === "Pending"
                      ? "warning"
                      : order.status === "Shipped"
                      ? "info"
                      : "success"
                  }
                  text={order.status === "Pending" ? "dark" : "light"}
                >
                  {order.status}
                </Badge>
              </div>
              {order.items.map((item, idx) => (
                <Row key={idx} className="mb-3 align-items-center">
                  <Col md={2}>
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ height: "120px", objectFit: "cover" }}
                    />
                  </Col>
                  <Col md={6}>
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">{item.author}</small>
                  </Col>
                  <Col md={2}>Qty: {item.quantity}</Col>
                  <Col md={2} className="text-end fw-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Col>
                </Row>
              ))}
              <hr className="border-light" />
              <div className="d-flex justify-content-between">
                <span>Total</span>
                <span className="fw-bold text-primary">
                  ${getTotal(order.items).toFixed(2)}
                </span>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      {/* Past Orders */}
      <h5 className="mb-3 mt-5">Past Orders</h5>
      {pastOrders.length === 0 ? (
        <p className="text-muted">You have no past orders.</p>
      ) : (
        pastOrders.map((order) => (
          <Card
            key={order.id}
            className="mb-4 bg-dark border border-secondary rounded-3 shadow-sm"
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="fw-semibold">Order #{order.orderNumber}</h6>
                  <small className="text-muted">Placed on {order.date}</small>
                </div>
                <Badge bg="success">{order.status}</Badge>
              </div>
              {order.items.map((item, idx) => (
                <Row key={idx} className="mb-3 align-items-center">
                  <Col md={2}>
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ height: "120px", objectFit: "cover" }}
                    />
                  </Col>
                  <Col md={6}>
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">{item.author}</small>
                  </Col>
                  <Col md={2}>Qty: {item.quantity}</Col>
                  <Col md={2} className="text-end fw-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Col>
                </Row>
              ))}
              <hr className="border-light" />
              <div className="d-flex justify-content-between">
                <span>Total</span>
                <span className="fw-bold text-primary">
                  ${getTotal(order.items).toFixed(2)}
                </span>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrdersPage;

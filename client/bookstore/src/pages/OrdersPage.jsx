import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const OrdersPage = () => {
  const { authTokens } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!authTokens) return;
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/orders/", {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        });
        console.log("[OrdersPage] raw response:", res.data);
        // Normalize to array (handle single-object or paginated responses)
        let data = res.data;
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data.results && Array.isArray(data.results)) {
          list = data.results;
        } else if (data && typeof data === "object") {
          list = [data];
        }
        console.log("[OrdersPage] normalized orders list:", list);
        setOrders(list);
      } catch (err) {
        console.error("[OrdersPage] Error fetching orders:", err);
        setError(err.response?.data?.detail || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authTokens]);

  const currentOrders = orders.filter(
    (o) => o.order_status === "pending" || o.order_status === "shipped"
  );
  const pastOrders = orders.filter(
    (o) => o.order_status === "delivered" || o.order_status === "cancelled"
  );

  if (loading)
    return (
      <Container className="py-5 text-light text-center">
        <Spinner animation="border" role="status" variant="primary" />
      </Container>
    );

  if (error)
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="py-5 text-light">
      <h2 className="text-primary mb-4">Your Orders</h2>

      {/* Current Orders */}
      <h5 className="mb-3">Current Orders</h5>
      {currentOrders.length === 0 ? (
        <p className="text-muted">You have no current orders.</p>
      ) : (
        currentOrders.map((order) => {
          console.log(
            "[OrdersPage] Rendering order",
            order.id,
            "cart_items=",
            order.cart_items
          );
          return (
            <Card
              key={order.id}
              className="mb-4 bg-dark border border-primary rounded-3 shadow-sm"
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="fw-semibold">
                      Order #{order.transaction_id || order.id}
                    </h6>
                    <small className="text-muted">
                      Placed on{" "}
                      {new Date(order.order_date).toLocaleDateString()}
                    </small>
                  </div>
                  <Badge
                    bg={
                      order.order_status === "pending"
                        ? "warning"
                        : order.order_status === "shipped"
                        ? "info"
                        : "secondary"
                    }
                    text={order.order_status === "pending" ? "dark" : "light"}
                  >
                    {order.order_status.charAt(0).toUpperCase() +
                      order.order_status.slice(1)}
                  </Badge>
                </div>

                {/* Product items from nested serializer or API */}
                {(order.cart_items || []).map((item, idx) => (
                  <Row key={idx} className="mb-3 align-items-center">
                    <Col md={2}>
                      <img
                        src={item.book.cover_url}
                        alt={item.book.title}
                        className="img-fluid rounded"
                        style={{ height: "120px", objectFit: "cover" }}
                      />
                    </Col>
                    <Col md={4}>
                      <h6 className="mb-1">{item.book.title}</h6>
                      <small className="text-muted">{item.book.author}</small>
                    </Col>
                    <Col md={2}>Qty: {item.quantity}</Col>
                    <Col md={2} className="text-end fw-bold text-primary">
                      ₱
                      {(parseFloat(item.book.price) * item.quantity).toFixed(2)}
                    </Col>
                  </Row>
                ))}

                <hr className="border-light" />
                <div className="d-flex justify-content-between">
                  <span>Total</span>
                  <span className="fw-bold text-primary">
                    ₱{parseFloat(order.total_amount).toFixed(2)}
                  </span>
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}

      {/* Past Orders */}
      <h5 className="mb-3 mt-5">Past Orders</h5>
      {pastOrders.length === 0 ? (
        <p className="text-muted">You have no past orders.</p>
      ) : (
        pastOrders.map((order) => {
          console.log(
            "[OrdersPage] Rendering past order",
            order.id,
            "cart_items=",
            order.cart_items
          );
          return (
            <Card
              key={order.id}
              className="mb-4 bg-dark border border-secondary rounded-3 shadow-sm"
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="fw-semibold">
                      Order #{order.transaction_id || order.id}
                    </h6>
                    <small className="text-muted">
                      Placed on{" "}
                      {new Date(order.order_date).toLocaleDateString()}
                    </small>
                  </div>
                  <Badge bg="success">
                    {order.order_status.charAt(0).toUpperCase() +
                      order.order_status.slice(1)}
                  </Badge>
                </div>
                {(order.cart_items || []).map((item, idx) => (
                  <Row key={idx} className="mb-3 align-items-center">
                    <Col md={2}>
                      <img
                        src={item.book.cover_url}
                        alt={item.book.title}
                        className="img-fluid rounded"
                        style={{ height: "120px", objectFit: "cover" }}
                      />
                    </Col>
                    <Col md={4}>
                      <h6 className="mb-1">{item.book.title}</h6>
                      <small className="text-muted">{item.book.author}</small>
                    </Col>
                    <Col md={2}>Qty: {item.quantity}</Col>
                    <Col md={2} className="text-end fw-bold text-primary">
                      ₱
                      {(parseFloat(item.book.price) * item.quantity).toFixed(2)}
                    </Col>
                  </Row>
                ))}
                <hr className="border-light" />
                <div className="d-flex justify-content-between">
                  <span>Total</span>
                  <span className="fw-bold text-primary">
                    ₱{parseFloat(order.total_amount).toFixed(2)}
                  </span>
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default OrdersPage;

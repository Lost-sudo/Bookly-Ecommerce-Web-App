import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Alert, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
// Add react-icons for icons
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const statusStyles = {
  pending: { variant: "warning", icon: <FaHourglassHalf className="me-1" /> },
  completed: { variant: "success", icon: <FaCheckCircle className="me-1" /> },
  cancelled: { variant: "danger", icon: <FaTimesCircle className="me-1" /> },
  // Add more statuses as needed
};

const paymentIcons = {
  cash: <FaMoneyBillWave className="me-1" color="#28a745" />,
  card: <FaCreditCard className="me-1" color="#007bff" />,
  // Add more payment types as needed
};

const OrdersPage = () => {
  const { authTokens } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [authTokens]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/`,
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      setOrders(res.data);
    } catch (err) {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container
      className="py-5"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <h2
        className="mb-4"
        style={{ fontWeight: 700, color: "#343a40" }}
      >
        <FaShoppingCart className="me-2" />
        Your Orders
      </h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => {
          const status = order.order_status?.toLowerCase() || "pending";
          const statusInfo = statusStyles[status] || statusStyles["pending"];
          return (
            <Card
              key={order.id}
              className="mb-4 shadow-sm"
              style={{
                borderLeft: `6px solid var(--bs-${statusInfo.variant})`,
                background: "#fff",
                borderRadius: "1rem",
              }}
            >
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <h5 style={{ fontWeight: 600 }}>
                      <FaClock className="me-2 text-secondary" />
                      Order #{order.id}
                    </h5>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.order_date).toLocaleString()}
                    </p>
                    <p>
                      <strong>Total:</strong>{" "}
                      <span style={{ color: "#28a745", fontWeight: 600 }}>
                        ₱{Number(order.total_amount).toFixed(2)}
                      </span>
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <Badge
                        bg={statusInfo.variant}
                        className="px-3 py-2 fs-6"
                      >
                        {statusInfo.icon}
                        {order.order_status}
                      </Badge>
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {
                        paymentIcons[order.payment_type?.toLowerCase()] || (
                          <FaCreditCard className="me-1" />
                        )
                      }
                      {order.payment_type}
                    </p>
                    <p>
                      <FaUser className="me-1 text-primary" />
                      <strong>Full Name:</strong> {order.full_name}
                    </p>
                    <p>
                      <FaPhone className="me-1 text-info" />
                      <strong>Phone:</strong> {order.phone_number}
                    </p>
                    <p>
                      <FaMapMarkerAlt className="me-1 text-danger" />
                      <strong>Address:</strong> {order.address}
                    </p>
                  </Col>
                  <Col md={4}>
                    <h6 className="mb-2" style={{ fontWeight: 600 }}>
                      <FaShoppingCart className="me-2" />
                      Cart Items
                    </h6>
                    <div
                      style={{
                        background: "#f1f3f4",
                        borderRadius: "0.5rem",
                        padding: "0.5rem",
                      }}
                    >
                      {order.cart_items.map((item) => (
                        <div
                          key={item.id}
                          className="d-flex align-items-center mb-2"
                        >
                          <span
                            className="me-2"
                            style={{ fontWeight: 500 }}
                          >
                            {item.book.title}
                          </span>
                          <Badge bg="secondary" pill>
                            × {item.quantity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default OrdersPage;

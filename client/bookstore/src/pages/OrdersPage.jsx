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
  FaTruck,
  FaBoxOpen,
} from "react-icons/fa";

const statusStyles = {
  pending: {
    variant: "warning",
    icon: <FaHourglassHalf className="me-1" />,
  },
  shipped: {
    variant: "info",
    icon: <FaTruck className="me-1" />,
  },
  delivered: {
    variant: "success",
    icon: <FaCheckCircle className="me-1" />,
  },
  cancelled: {
    variant: "danger",
    icon: <FaTimesCircle className="me-1" />,
  },
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
    <Container className="py-5" style={{ minHeight: "100vh" }}>
      <h2 className="mb-4 text-light fw-bold">
        <FaShoppingCart className="me-2" />
        Your Orders
      </h2>

      {loading ? (
        <div className="text-center text-light">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <p className="text-light">You have no orders yet.</p>
      ) : (
        Object.keys(statusStyles).map((statusKey) => {
          const groupedOrders = orders.filter(
            (order) => order.order_status?.toLowerCase() === statusKey
          );

          if (groupedOrders.length === 0) return null;

          const { icon, variant } = statusStyles[statusKey];
          const capitalizedStatus =
            statusKey.charAt(0).toUpperCase() + statusKey.slice(1);

          return (
            <div key={statusKey} className="mb-5">
              <h4
                className={`fw-bold mb-3 text-${variant}`}
                style={{ borderBottom: `2px solid var(--bs-${variant})` }}
              >
                {icon} {capitalizedStatus} Orders
              </h4>

              {groupedOrders.map((order) => (
                <Card
                  key={order.id}
                  className="mb-4 shadow-sm"
                  bg="dark"
                  text="light"
                  style={{
                    borderLeft: `6px solid var(--bs-${variant})`,
                    borderRadius: "1rem",
                  }}
                >
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <h5 className="fw-semibold">
                          <FaClock className="me-2 text-secondary" />
                          Order #{order.id}
                        </h5>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(order.order_date).toLocaleString()}
                        </p>
                        <p>
                          <strong>Total:</strong>{" "}
                          <span className="text-success fw-bold">
                            ₱{Number(order.total_amount).toFixed(2)}
                          </span>
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          <Badge bg={variant} className="px-3 py-2 fs-6">
                            {icon}
                            {order.order_status}
                          </Badge>
                        </p>
                        <p>
                          <strong>Payment:</strong>{" "}
                          {paymentIcons[order.payment_type?.toLowerCase()] || (
                            <FaCreditCard className="me-1" />
                          )}
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
                        <h6 className="mb-2 fw-semibold">
                          <FaBoxOpen className="me-2" />
                          Cart Items
                        </h6>
                        <div className="bg-secondary bg-opacity-25 p-3 rounded">
                          {order.cart_items.map((item) => (
                            <div
                              key={item.id}
                              className="d-flex align-items-center mb-2"
                            >
                              <span className="me-2 fw-medium">
                                {item.book.title}
                              </span>
                              <Badge bg="light" text="dark" pill>
                                × {item.quantity}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          );
        })
      )}
    </Container>
  );
  
};

export default OrdersPage;

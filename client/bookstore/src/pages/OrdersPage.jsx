import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Alert,
  Badge,
  Form,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import {
  FaMoneyBill,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const statusColors = {
  pending: "warning",
  processing: "info",
  completed: "success",
  cancelled: "danger",
  delivered: "primary",
};

const paymentStatusColors = {
  pending: "warning",
  paid: "success",
  failed: "danger",
  refunded: "secondary",
};

const OrdersPage = () => {
  const { authTokens } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [authTokens]);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter, paymentFilter]);

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

  const filterOrders = () => {
    let filtered = [...orders];
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) =>
          (order.order_status || "pending").toLowerCase() === statusFilter
      );
    }
    if (paymentFilter !== "all") {
      filtered = filtered.filter(
        (order) =>
          (order.payment_status || "pending").toLowerCase() === paymentFilter
      );
    }
    setFilteredOrders(filtered);
  };

  if (loading)
    return (
      <div className="loading-wrapper">
        <div className="loading-spinner" />
      </div>
    );
  if (error) return <Alert variant="danger">{error}</Alert>;

  // Unique status and payment status for filter dropdowns
  const uniqueStatuses = [
    ...new Set(orders.map((o) => (o.order_status || "pending").toLowerCase())),
  ];
  const uniquePaymentStatuses = [
    ...new Set(
      orders.map((o) => (o.payment_status || "pending").toLowerCase())
    ),
  ];

  return (
    <Container className="py-5 page-transition">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="fw-bold mb-0">Your Orders</h2>
        <Form className="d-flex gap-2 flex-wrap">
          <Form.Group controlId="statusFilter" className="mb-0">
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="shadow-sm"
            >
              <option value="all">All Statuses</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="paymentFilter" className="mb-0">
            <Form.Select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="shadow-sm"
            >
              <option value="all">All Payment Status</option>
              {uniquePaymentStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </div>
      {filteredOrders.length === 0 ? (
        <Card className="glass-effect text-center py-5">
          <Card.Body>
            <h5 className="text-muted mb-0">No orders found.</h5>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} xl={2} className="g-4">
          {filteredOrders.map((order) => (
            <Col key={order.id}>
              <Card className="order-card glass-effect shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2 gap-2">
                    <div>
                      <h5 className="mb-1">
                        Order #{order.id}{" "}
                        <Badge
                          bg={
                            statusColors[
                              (order.order_status || "pending").toLowerCase()
                            ] || "secondary"
                          }
                        >
                          {(order.order_status || "Pending")
                            .charAt(0)
                            .toUpperCase() +
                            (order.order_status || "Pending").slice(1)}
                        </Badge>
                      </h5>
                      <div className="text-muted small">
                        {new Date(order.order_date).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <Badge
                        bg={
                          paymentStatusColors[
                            (order.payment_status || "pending").toLowerCase()
                          ] || "secondary"
                        }
                        className="me-1"
                      >
                        <FaMoneyBill className="me-1" />
                        {(order.payment_status || "Pending")
                          .charAt(0)
                          .toUpperCase() +
                          (order.payment_status || "Pending").slice(1)}
                      </Badge>
                      <Badge bg="info" className="me-1">
                        {order.payment_type &&
                          order.payment_type.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <hr className="border-secondary" />
                  <Row>
                    <Col xs={12} md={6}>
                      <div className="mb-2">
                        <strong>Full Name:</strong> {order.full_name}
                      </div>
                      <div className="mb-2">
                        <strong>Phone:</strong> {order.phone_number}
                      </div>
                      <div className="mb-2">
                        <strong>Address:</strong> {order.address}
                      </div>
                      <div className="mb-2">
                        <strong>Total:</strong>{" "}
                        <span className="text-primary fw-bold">
                          ₱{Number(order.total_amount).toFixed(2)}
                        </span>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div>
                        <strong>Cart Items:</strong>
                        <ul className="mb-0 ps-3">
                          {(Array.isArray(order.cart_items)
                            ? order.cart_items
                            : []
                          ).map((item) => (
                            <li key={item.id} className="order-item">
                              <span className="fw-semibold">
                                {item.book.title}
                              </span>{" "}
                              × {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                  <span className="small text-muted">
                    Transaction ID:{" "}
                    <span className="fw-semibold">{order.transaction_id}</span>
                  </span>
                  {order.payment_status === "paid" ? (
                    <Badge bg="success">
                      <FaCheckCircle className="me-1" />
                      Paid
                    </Badge>
                  ) : order.payment_status === "pending" ? (
                    <Badge bg="warning" text="dark">
                      <FaClock className="me-1" />
                      Pending
                    </Badge>
                  ) : (
                    <Badge bg="danger">
                      <FaTimesCircle className="me-1" />
                      {order.payment_status}
                    </Badge>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrdersPage;

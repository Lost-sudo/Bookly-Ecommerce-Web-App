import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Badge, Alert } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import {
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

// --- Helper functions moved to top for use everywhere ---
const getOrderStatus = (order) =>
  order.order_status || order.orderStatus || "";

const getStatusIcon = (status) => {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return <FaClock className="text-warning" />;
    case "shipped":
      return <FaShippingFast className="text-info" />;
    case "delivered":
      return <FaCheckCircle className="text-success" />;
    case "cancelled":
      return <FaTimes className="text-danger" />;
    default:
      return <FaBox />;
  }
};

const getStatusBadge = (status) => {
  const variants = {
    pending: "warning",
    shipped: "info",
    delivered: "success",
    cancelled: "danger",
  };
  return variants[(status || "").toLowerCase()] || "secondary";
};
// ---------------------------------------------------------

const OrdersPage = () => {
  const { authTokens } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [authTokens]);

  const fetchOrders = async () => {
    if (!authTokens) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/`,
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      // Debug log to inspect the response
      console.log("Fetched orders:", res.data);
      // Add this line to inspect the first order's keys
      if (Array.isArray(res.data) && res.data.length > 0) {
        console.log("Order keys:", Object.keys(res.data[0]));
      }
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.order_date) - new Date(a.order_date)
      );
      setOrders(sortedOrders);
      setError(null);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentOrders = orders.filter((o) =>
    ["pending", "shipped"].includes(getOrderStatus(o).toLowerCase())
  );
  const pastOrders = orders.filter((o) =>
    ["delivered", "cancelled"].includes(getOrderStatus(o).toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-5 text-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-primary mb-4">Your Orders</h2>

        {/* Current Orders Section */}
        <OrderSection
          title="Current Orders"
          icon={<FaBox />}
          orders={currentOrders}
          emptyMessage="You have no current orders."
        />

        {/* Past Orders Section */}
        <OrderSection
          title="Order History"
          icon={<FaCheckCircle />}
          orders={pastOrders}
          emptyMessage="You have no past orders."
          className="mt-5"
        />
      </motion.div>
    </Container>
  );
};

// Helper Components
const OrderSection = ({
  title,
  icon,
  orders,
  emptyMessage,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
    className={className}
  >
    <h5 className="mb-4 d-flex align-items-center gap-2">
      {icon} {title}
    </h5>
    <AnimatePresence>
      {orders.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted"
        >
          {emptyMessage}
        </motion.p>
      ) : (
        orders.map((order, index) => (
          <OrderCard key={order.id} order={order} index={index} />
        ))
      )}
    </AnimatePresence>
  </motion.div>
);

const OrderCard = ({ order, index }) => {
  // Try both cart_items and cart.items for items
  let items = [];
  if (Array.isArray(order.cart_items)) {
    items = order.cart_items;
  } else if (order.cart && Array.isArray(order.cart.items)) {
    items = order.cart.items;
  }

  // Fallbacks for user info
  const fullName =
    order.full_name || order.user_full_name || order.user?.full_name || "";
  const phone =
    order.phone_number ||
    order.user_phone_number ||
    order.user?.phone_number ||
    "";
  const address =
    order.address || order.user_address || order.user?.address || "";

  // Fallback for payment type
  const paymentType =
    (order.payment_type || order.paymentType || "").replace("_", " ").toUpperCase() ||
    "N/A";

  // Fallback for status
  const status = getOrderStatus(order);

  return (
    <motion.div
      key={order.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="mb-4 bg-dark border border-primary glass-effect rounded-3 shadow-sm">
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col>
              <div className="d-flex align-items-center gap-2">
                {getStatusIcon(status)}
                <h6 className="mb-0 fw-bold">
                  Order #{order.transaction_id || order.id}
                </h6>
              </div>
              <small className="text-muted d-block mt-1">
                Placed on{" "}
                {order.order_date
                  ? new Date(order.order_date).toLocaleString()
                  : ""}
              </small>
            </Col>
            <Col xs="auto">
              <Badge
                bg={getStatusBadge(status)}
                className="px-3 py-2"
              >
                {status
                  ? status.charAt(0).toUpperCase() + status.slice(1)
                  : "Unknown"}
              </Badge>
            </Col>
          </Row>
          {/* Show user info */}
          <div className="mb-3">
            <div>
              <strong>Name:</strong> {fullName}
            </div>
            <div>
              <strong>Phone:</strong> {phone}
            </div>
            <div>
              <strong>Address:</strong> {address}
            </div>
          </div>
          <div className="order-items">
            {items.length > 0 ? (
              items.map(
                (item, idx) =>
                  item &&
                  item.book && (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="mb-3"
                    >
                      <Row className="align-items-center g-3">
                        <Col>
                          <div>
                            <h6 className="mb-1 fw-semibold">
                              {item.book.title}
                            </h6>
                            <p className="text-muted mb-0 small">
                              {item.book.author}
                            </p>
                            <span className="badge bg-secondary mt-2">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </Col>
                        <Col xs="auto">
                          <span className="fw-bold text-primary fs-5">
                            ₱
                            {item.book.price && item.quantity
                              ? (item.book.price * item.quantity).toFixed(2)
                              : "0.00"}
                          </span>
                        </Col>
                      </Row>
                    </motion.div>
                  )
              )
            ) : (
              <div className="text-muted small">No items in this order.</div>
            )}
          </div>

          <hr className="border-secondary my-3" />

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Order Total</small>
              <h5 className="mb-0 fw-bold text-primary">
                ₱{parseFloat(order.total_amount || 0).toFixed(2)}
              </h5>
            </div>
            <div className="text-end">
              <small className="text-muted d-block">Payment Method</small>
              <span className="badge bg-secondary">
                {paymentType}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default OrdersPage;

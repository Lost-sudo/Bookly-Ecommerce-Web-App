import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

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
    <Container className="py-5">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="mb-3">
            <Card.Body>
              <Row>
                <Col>
                  <h5>Order #{order.id}</h5>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.order_date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ₱{order.total_amount.toFixed(2)}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.order_status}
                  </p>
                  <p>
                    <strong>Payment:</strong> {order.payment_type}
                  </p>
                  <p>
                    <strong>Full Name:</strong> {order.full_name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone_number}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                  <h6>Cart Items:</h6>
                  {order.cart_items.map((item) => (
                    <div key={item.id}>
                      <p>
                        {item.book.title} × {item.quantity}
                      </p>
                    </div>
                  ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrdersPage;

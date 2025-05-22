import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaShoppingCart, FaCheck, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import CustomAlert from "../components/CustomAlert";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authTokens } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/books/${id}/`
        );
        setBook(response.data);
      } catch (error) {
        setAlert({
          show: true,
          message: "Failed to load book details",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = async () => {
    if (!authTokens) {
      setAlert({
        show: true,
        message: "Please login to add items to cart",
        type: "info",
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setIsAdding(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart-items/`,
        { book: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      );
      setIsAdded(true);
      setAlert({
        show: true,
        message: "Added to cart successfully! 🛍️",
        type: "success",
      });
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      setAlert({
        show: true,
        message: error.response?.data?.message || "Failed to add to cart",
        type: "error",
      });
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 d-flex justify-content-center">
        <div className="loading-spinner"></div>
      </Container>
    );
  }

  return (
    <Container className="py-5 text-light pb-5 mb-5">
      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="link"
          className="text-light mb-4 p-0"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </Button>

        <Row className="g-4">
          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-dark border border-primary glass-effect">
                <Card.Img
                  variant="top"
                  src={book.cover_image}
                  alt={book.title}
                  className="img-fluid rounded"
                  style={{ aspectRatio: "2/3", objectFit: "cover" }}
                />
              </Card>
            </motion.div>
          </Col>

          <Col md={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="mb-2">{book.title}</h2>
              <p className="text-muted mb-4">by {book.author}</p>

              <div className="mb-4">
                <h4 className="text-primary mb-3">₱{book.price}</h4>
                <Button
                  variant={isAdded ? "success" : "primary"}
                  className="px-4 py-2"
                  onClick={handleAddToCart}
                  disabled={isAdding || isAdded}
                >
                  {isAdding ? (
                    <span className="spinner-border spinner-border-sm me-2" />
                  ) : isAdded ? (
                    <>
                      <FaCheck className="me-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="me-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>

              <Card className="bg-dark border border-secondary glass-effect mb-4">
                <Card.Body>
                  <h5 className="mb-3">Description</h5>
                  <p className="text-muted mb-0">{book.description}</p>
                </Card.Body>
              </Card>

              <Row className="g-3">
                <Col sm={6}>
                  <Card className="bg-dark border border-secondary glass-effect h-100">
                    <Card.Body>
                      <h6 className="mb-2">Genre</h6>
                      <p className="mb-0 text-muted">
                        {book.genre} / {book.subgenre}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className="bg-dark border border-secondary glass-effect h-100">
                    <Card.Body>
                      <h6 className="mb-2">Category</h6>
                      <p className="mb-0 text-muted">{book.category}</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default BookDetails;

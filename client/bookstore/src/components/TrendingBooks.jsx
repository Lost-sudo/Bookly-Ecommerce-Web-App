import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "./BookCard";
import "../../public/css/TrendingBooks.css";
import axios from "axios";
import { motion } from "framer-motion";
import CustomAlert from "./CustomAlert";

function TrendingBooks() {
  const [trending, setTrending] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(
      () => setAlert({ show: false, message: "", type: "success" }),
      3000
    );
  };

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/books/trending/`
        );
        setTrending(res.data);
      } catch (error) {
        showAlert("Error fetching trending books", "error");
      }
    };
    fetchTrendingBooks();
  }, []);

  const handleAddToCart = async (id, authTokens, navigate) => {
    if (!authTokens) {
      showAlert("Please login to add items to your cart", "info");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart-items/`,
        { book: id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      showAlert("Added to cart successfully! 🛍️", "success");
    } catch (err) {
      showAlert(
        err.response?.data?.message || "Failed to add to cart",
        "error"
      );
    }
  };

  return (
    <>
      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ ...alert, show: false })}
      />
      <section className="trending-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title text-light mb-4">Trending Books</h2>
            <div className="trending-container">
              <Row className="g-4">
                {trending.map((book, index) => (
                  <Col key={book.id} xs={6} sm={4} md={3} lg={3}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BookCard
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                        cover={book.cover_image}
                        onAddToCart={handleAddToCart}
                      />
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

export default TrendingBooks;

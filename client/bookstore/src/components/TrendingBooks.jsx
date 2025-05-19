import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "./BookCard";
import "../../public/css/TrendingBooks.css";
import axios from "axios";
import { motion } from "framer-motion";

function TrendingBooks() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/books/trending/");
        setTrending(res.data);
      } catch (error) {
        console.error("Error fetching trending books: ", error);
      }
    };
    fetchTrendingBooks();
  }, []);

  return (
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
                    />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default TrendingBooks;

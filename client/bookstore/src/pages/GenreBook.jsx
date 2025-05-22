import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";
import BookCard from "../components/BookCard";
import { getBooksByGenre } from "../api/bookAPI.js";
import CustomAlert from "../components/CustomAlert";

const GenreBook = () => {
  const { mainGenre, subGenre } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getBooksByGenre(mainGenre, subGenre);
        setBooks(res);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again.");
        setAlert({
          show: true,
          message: "Failed to load books. Please try again.",
          type: "error"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [mainGenre, subGenre]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return (
      <Container className="text-light mt-5 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-5"
        >
          <div className="loading-spinner mb-3"></div>
          <p className="text-muted">Loading {subGenre} books...</p>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container className="text-light mt-5 mb-5 pb-5">
      <CustomAlert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert(prev => ({ ...prev, show: false }))}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <motion.h2 
              className="mb-2 text-capitalize d-flex align-items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FaBookOpen className="me-3 text-primary" />
              {mainGenre} / {subGenre}
            </motion.h2>
            <motion.p 
              className="text-muted mb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Found {books.length} books in this category
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => navigate(-1)}
              className="d-flex align-items-center gap-2"
            >
              <FaArrowLeft /> Back
            </Button>
          </motion.div>
        </div>

        {/* Books Grid */}
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-5"
            >
              <p className="text-danger mb-3">{error}</p>
              <Button 
                variant="primary" 
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </motion.div>
          ) : books.length > 0 ? (
            <Row>
              {books.map((book, index) => (
                <Col key={book.id} xs={6} md={4} lg={3} className="mb-4">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <BookCard
                      id={book.id}
                      cover={book.cover_image}
                      title={book.title}
                      author={book.author}
                      price={book.price}
                    />
                  </motion.div>
                </Col>
              ))}
            </Row>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-5"
            >
              <p className="text-muted mb-3">No books found in this category</p>
              <Button 
                variant="primary" 
                onClick={() => navigate("/")}
              >
                Browse All Books
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};

export default GenreBook;

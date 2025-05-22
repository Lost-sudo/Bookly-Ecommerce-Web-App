import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";
import "../../public/css/BookCard.css";

const BookCard = ({ id, cover, title, author, price, onAddToCart }) => {
  const { authTokens } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
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

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the add button
    if (onAddToCart) {
      setIsLoading(true);
      await onAddToCart(id, authTokens, navigate);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
      setIsLoading(false);
      return;
    }
    if (!authTokens) {
      showAlert("Please login to add items to your cart", "info");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart-items/`,
        { book: id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );

      setIsAdded(true);
      showAlert("Added to cart successfully! 🛍️", "success");
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      showAlert(
        err.response?.data?.message || "Failed to add to cart",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!onAddToCart && (
        <CustomAlert
          show={alert.show}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="book-card-wrapper">
        <Card className="book-card" onClick={() => navigate(`/book/${id}`)}>
          <div className="book-cover-wrapper">
            <Card.Img src={cover} alt={title} className="book-cover" />
          </div>
          <Card.Body className="book-content">
            <div className="book-info">
              <Card.Title className="book-title" title={title}>
                {title}
              </Card.Title>
              <div className="book-author" title={author}>
                {author}
              </div>
            </div>
            <div className="book-footer">
              <span className="book-price" style={{ color: "#4b8bbe" }}>
                ₱{price}
              </span>
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant={isAdded ? "success" : "primary"}
                  size="sm"
                  className="cart-button"
                  style={{
                    background: isAdded
                      ? "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)"
                      : "linear-gradient(90deg, #4b8bbe 0%, #306998 100%)",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={handleAddToCart}
                  disabled={isLoading || isAdded}
                >
                  {isLoading ? (
                    <div className="spinner-border spinner-border-sm" />
                  ) : isAdded ? (
                    <>
                      <FaCheck size={14} />
                      <span className="d-none d-sm-inline">Added</span>
                    </>
                  ) : (
                    <>
                      <FaShoppingCart size={14} />
                      <span className="d-none d-sm-inline">Add</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default BookCard;

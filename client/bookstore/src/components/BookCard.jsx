import { Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import PlaceHolderImage from "../../public/images/placeholder-img.jpg";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BookCard = ({ id, cover, title, author, price }) => {
  const { authTokens } = useAuth();

  const handleAddToCart = async () => {
    if (!authTokens) {
      alert("Please login to add items to your cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/cart-items/",
        {
          book: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Added to cart!");
      } else {
        console.error("Unexpected status code:", response.status);
        alert("Something went wrong adding to cart.");
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Something went wrong adding to cart.");
    }
  };

  return (
    <Card className="book-card h-100 shadow rounded-3 border-0">
      <Card.Img
        variant="top"
        src={cover || PlaceHolderImage}
        className="img-fluid rounded-top d-block mx-auto"
        style={{ height: "300px", width: "300px" }}
      />
      <Card.Body>
        <Card.Title className="fw-semibold">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fw-bold text-primary">{price}</span>
          <Button size="sm" variant="outline-primary" onClick={handleAddToCart}>
            Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;

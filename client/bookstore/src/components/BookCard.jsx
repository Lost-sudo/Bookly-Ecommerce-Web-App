import { Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import PlaceHolderImage from "../../public/images/placeholder-img.jpg";

const BookCard = ({ cover, title, author, price}) => {
  return (
    <Card className="book-card h-100 shadow rounded-3 border-0">
      <Card.Img
        variant="top"
        src={cover || PlaceHolderImage}
        className="img-fluid rounded-top d-block mx-auto"
        style={{ height: '300px', width: '300px' }}
      />
      <Card.Body>
        <Card.Title className="fw-semibold">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        {/* <div className="mb-2 text-warning d-flex align-items-center gap-1">
          <FaStar /> {rating}
        </div> */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fw-bold text-primary">{price}</span>
          <Button size="sm" variant="outline-primary">
            Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;

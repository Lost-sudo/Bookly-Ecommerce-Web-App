import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import BookCard from "./BookCard";
import { FaTh, FaBars } from "react-icons/fa";

const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 19.99,
    rating: 4.7,
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    price: 24.99,
    rating: 4.5,
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 22.99,
    rating: 4.8,
  },
  {
    title: "The Four Winds",
    author: "Kristin Hannah",
    price: 18.99,
    rating: 4.6,
  },
];

const AllBooks = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">All Books</h4>
        <ButtonGroup>
          <Button variant="outline-dark">
            <FaTh />
          </Button>
          <Button variant="outline-dark">
            <FaBars />
          </Button>
        </ButtonGroup>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {books.map((book, index) => (
          <Col key={index}>
            <BookCard {...book} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllBooks;

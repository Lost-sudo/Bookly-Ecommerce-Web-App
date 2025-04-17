import React, { useEffect, useState } from "react";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import BookCard from "./BookCard";
import { FaTh, FaBars } from "react-icons/fa";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/books/");

        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

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
            <BookCard
                cover={book.cover_image}
                title={book.title}
                author={book.author}
                price={book.price}
             />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllBooks;

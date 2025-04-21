import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "../components/BookCard";
import { getBooksByGenre } from "../api/bookApi.js";

const GenreBook = () => {
  const { mainGenre, subGenre } = useParams();
  const [books, setBooks] = useState([]);
  console.log(mainGenre);
  console.log(subGenre);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooksByGenre(mainGenre, subGenre);
        console.log(res);
        setBooks(res);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [mainGenre, subGenre]);

  return (
    <Container className="text-light mt-5">
      <h2 className="mb-4 text-capitalize">
        {mainGenre} / {subGenre}
      </h2>
      <Row>
        {books.length > 0 ? (
          books.map((book, index) => (
            <Col key={index} xs={6} md={4} lg={3} className="mb-4">
              <BookCard
                cover={book.cover_image}
                title={book.title}
                author={book.author}
                price={book.price}
              />
            </Col>
          ))
        ) : (
          <p>No books found in this sub-genre</p>
        )}
      </Row>
    </Container>
  );
};

export default GenreBook;

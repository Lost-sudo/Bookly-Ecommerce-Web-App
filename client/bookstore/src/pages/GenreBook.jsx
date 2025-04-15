import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "../components/BookCard";

const GenreBook = () => {
  const { mainGenre, subGenre } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = [
        {
          title: "Throne of Glass",
          genre: "fiction",
          subgenre: "fantasy",
          author: "Sarah J. Maas",
        },
        {
          title: "Project Hail Mary",
          genre: "fiction",
          subgenre: "sci-fi",
          author: "Andy Weir",
        },
        {
          title: "The Silent Patient",
          genre: "fiction",
          subgenre: "thriller",
          author: "Alex Michaelides",
        },
      ];

      const filtered = allBooks.filter(
        (book) =>
          book.genre.toLowerCase() == mainGenre.toLowerCase() &&
          book.subgenre.toLowerCase() == subGenre.toLowerCase()
      );

      setBooks(filtered);
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
              <BookCard {...book} />
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

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import BookCard from "./BookCard";
import FilterSidebar from "./FilterSidebar";
import { FaTh, FaBars } from "react-icons/fa";
import { fetchAllBooks } from "../api/bookApi.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const query = useQuery();
  const searchTerm = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetchAllBooks();
        setBooks(res);
        setFilteredBooks(res);
        console.log(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    let filtered = [...books];

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((book) => selectedGenres.includes(book.genre));
    }

    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((book) =>
        selectedAuthors.includes(book.author)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredBooks(filtered);
  }, [selectedGenres, selectedAuthors, books, searchTerm]);

  return (
    <div className="d-flex">
      <div className="me-4">
        <FilterSidebar
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedAuthors={selectedAuthors}
          setSelectedAuthors={setSelectedAuthors}
        />
      </div>

      <div className="flex-grow-1" id="all-books">
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
          {filteredBooks.map((book, index) => (
            <Col key={index}>
              <BookCard
                key={index}
                id={book.id}
                title={book.title}
                author={book.author}
                price={book.price}
                cover={book.cover_image}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AllBooks;

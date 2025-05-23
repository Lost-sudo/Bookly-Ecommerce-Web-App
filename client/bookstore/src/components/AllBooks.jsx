import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, ButtonGroup, Button, Form } from "react-bootstrap";
import BookCard from "./BookCard";
import FilterSidebar from "./FilterSidebar";
import { FaTh, FaBars, FaSearch } from "react-icons/fa";
import { fetchAllBooks } from "../api/bookAPI.js";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetchAllBooks();
        setBooks(res);
        setFilteredBooks(res);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Extract unique genres and authors from books
  const genres = useMemo(
    () =>
      Array.from(
        new Set(
          books.map((book) => book.genre).filter((g) => g && g.trim() !== "")
        )
      ).sort(),
    [books]
  );
  const authors = useMemo(
    () =>
      Array.from(
        new Set(
          books.map((book) => book.author).filter((a) => a && a.trim() !== "")
        )
      ).sort(),
    [books]
  );

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
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          (book.title && book.title.toLowerCase().includes(term)) ||
          (book.author && book.author.toLowerCase().includes(term))
      );
    }

    setFilteredBooks(filtered);
  }, [selectedGenres, selectedAuthors, books, searchTerm]);

  return (
    <div className="d-flex">
      <div className="me-4">
        <FilterSidebar
          genres={genres}
          authors={authors}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedAuthors={selectedAuthors}
          setSelectedAuthors={setSelectedAuthors}
        />
      </div>

      <div
        className="flex-grow-1"
        id="all-books"
        style={{
          background: "var(--color-bg-secondary)",
          color: "var(--color-text)",
          borderRadius: "16px",
          padding: "2rem 1.5rem",
          transition: "background 0.3s, color 0.3s",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h4 className="fw-bold mb-0">All Books</h4>
          <Form
            className="d-flex align-items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              type="search"
              placeholder="Search by title or author"
              className="me-2"
              style={{ minWidth: 200, maxWidth: 300 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-primary" disabled>
              <FaSearch />
            </Button>
          </Form>
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
            <Col key={book.id || index}>
              <BookCard
                id={book.id}
                title={book.title}
                author={book.author}
                price={book.price}
                cover={
                  book.cover_image
                    ? book.cover_image.replace(/^http:\/\//, "https://")
                    : book.cover_image
                }
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AllBooks;

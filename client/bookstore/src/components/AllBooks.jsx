import React, { useEffect, useState, useMemo } from "react";
import {
  Row,
  Col,
  ButtonGroup,
  Button,
  Form,
  Offcanvas,
} from "react-bootstrap";
import BookCard from "./BookCard";
import FilterSidebar from "./FilterSidebar";
import { FaTh, FaBars, FaSearch, FaFilter } from "react-icons/fa";
import { fetchAllBooks } from "../api/bookAPI.js";
import { useLocation } from "react-router-dom"; // Import useLocation

const AllBooks = () => {
  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const searchQuery = queryParams.get("search") || ""; // Get the 'search' parameter

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchQuery); // Initialize with searchQuery
  const [showSidebar, setShowSidebar] = useState(false);

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

  useEffect(() => {
    setSearchTerm(searchQuery); // Update searchTerm when the URL changes
  }, [searchQuery]);

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
    <div className="d-flex flex-column flex-md-row">
      {/* Sidebar for larger screens */}
      <div className="d-none d-md-block me-4">
        <FilterSidebar
          genres={genres}
          authors={authors}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedAuthors={selectedAuthors}
          setSelectedAuthors={setSelectedAuthors}
        />
      </div>

      {/* Offcanvas for smaller screens */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterSidebar
            genres={genres}
            authors={authors}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            selectedAuthors={selectedAuthors}
            setSelectedAuthors={setSelectedAuthors}
          />
        </Offcanvas.Body>
      </Offcanvas>

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
          <div className="d-flex align-items-center gap-2">
            {/* Filter toggle button for smaller screens */}
            <Button
              variant="outline-primary"
              className="d-md-none"
              onClick={() => setShowSidebar(true)}
            >
              <FaFilter /> Filters
            </Button>
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

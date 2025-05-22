import { Accordion, Form } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const FilterSidebar = ({
  selectedGenres,
  setSelectedGenres,
  selectedAuthors,
  setSelectedAuthors,
}) => {
  const { theme } = useTheme();

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Thriller",
    "Biography",
    "Self-Help",
    "History",
  ];

  const authors = [
    "J.K. Rowling",
    "Stephen King",
    "Agatha Christie",
    "James Patterson",
    "George R.R. Martin",
    "J.R.R. Tolkien",
    "John Grisham",
    "Dan Brown",
  ];

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  return (
    <div
      className="p-3 rounded shadow"
      style={{
        minWidth: "250px",
        maxHeight: "85vh",
        overflowY: "auto",
        background: "var(--color-card)",
        color: "var(--color-text)",
        border: "1px solid var(--color-border)",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <h5
        className="mb-3 d-flex align-items-center gap-2"
        style={{ color: "var(--color-text)" }}
      >
        <FaFilter style={{ color: "var(--color-primary)" }} /> Filters
      </h5>
      <Accordion defaultActiveKey={"0"} flush alwaysOpen>
        <Accordion.Item
          eventKey="0"
          style={{
            background: "var(--color-card)",
            color: "var(--color-text)",
          }}
        >
          <Accordion.Header>Genres</Accordion.Header>
          <Accordion.Body
            style={{
              background: "var(--color-card)",
              color: "var(--color-text)",
            }}
          >
            {genres.map((genre) => (
              <Form.Check
                key={genre}
                label={genre}
                type="checkbox"
                className="mb-2"
                style={{ color: "var(--color-text)" }}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item
          eventKey="1"
          style={{
            background: "var(--color-card)",
            color: "var(--color-text)",
          }}
        >
          <Accordion.Header>Authors</Accordion.Header>
          <Accordion.Body
            style={{
              background: "var(--color-card)",
              color: "var(--color-text)",
            }}
          >
            {authors.map((author) => (
              <Form.Check
                key={author}
                label={author}
                type="checkbox"
                className="mb-2"
                style={{ color: "var(--color-text)" }}
                checked={selectedAuthors.includes(author)}
                onChange={() => handleAuthorChange(author)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FilterSidebar;

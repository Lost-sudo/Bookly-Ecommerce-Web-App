import { Accordion, Form } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

const FilterSidebar = ({
  selectedGenres,
  setSelectedGenres,
  selectedAuthors,
  setSelectedAuthors,
}) => {
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
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
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
      className="bg-dark text-light p-3 rounded shadow"
      style={{ minWidth: "250px", maxHeight: "85vh", overflowY: "auto" }}
    >
      <h5 className="mb-3 d-flex align-items-center gap-2 text-light">
        <FaFilter /> Filters
      </h5>
      <Accordion defaultActiveKey={"0"} flush alwaysOpen>
        <Accordion.Item eventKey="0" className="bg-dark text-light">
          <Accordion.Header>Genres</Accordion.Header>
          <Accordion.Body className="bg-dark text-light">
            {genres.map((genre) => (
              <Form.Check
                key={genre}
                label={genre}
                type="checkbox"
                className="text-light mb-2"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="bg-dark text-light">
          <Accordion.Header>Authors</Accordion.Header>
          <Accordion.Body className="bg-dark text-light">
            {authors.map((author) => (
              <Form.Check
                key={author}
                label={author}
                type="checkbox"
                className="text-light mb-2"
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

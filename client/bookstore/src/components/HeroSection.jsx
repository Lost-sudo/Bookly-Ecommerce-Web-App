import { Container, Button } from "react-bootstrap";

const HeroSection = () => {
  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Container className="text-center py-5">
        <h1 className="display-4 fw-bold mb-4">
          Discover Your Next Favorite Book
        </h1>
        <p className="lead mt-3 mb-4">
          Browse genres, find bestsellers, and explore endless stories.
        </p>
        <Button
          onClick={() => {
            document
              .getElementById("all-books")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          variant="primary"
          style={{
            background: "linear-gradient(90deg, #4b8bbe 0%, #306998 100%)",
            border: "none",
          }}
          size="lg"
          className="mt-3"
        >
          Explore Books
        </Button>
      </Container>
    </section>
  );
};

export default HeroSection;

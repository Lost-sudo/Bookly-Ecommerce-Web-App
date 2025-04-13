import React from "react";
import { Container } from "react-bootstrap";
import BookCard from "./BookCard";
import "../../public/css/TrendingBooks.css";

function TrendingBooks() {
  const trending = [
    { title: "The Midnight Library", author: "Matt Haig" },
    { title: "It Ends With Us", author: "Colleen Hoover" },
    { title: "Atomic Habits", author: "James Clear" },
    { title: "The Silent Patient", author: "Alex Michaelides" },
    { title: "Educated", author: "Tara Westover" },
  ];

  return (
    <section className="scroll-section mt-5">
      <Container>
        <h2 className="section-title text-light">Trending Books</h2>
        <div className="scroll-container">
          {trending.map((book, idx) => (
            <BookCard
              key={idx}
              title={book.title}
              author={book.author}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TrendingBooks;

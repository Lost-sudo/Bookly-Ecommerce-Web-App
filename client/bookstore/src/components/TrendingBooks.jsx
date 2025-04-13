import React from "react";
import { Container } from "react-bootstrap";
import BookCard from "./BookCard";
import "../../public/css/TrendingBooks.css";

function TrendingBooks() {
 const trending = [
   {
     title: "The Midnight Library",
     author: "Matt Haig",
     price: 12.99,
     cover: null,
   },
   {
     title: "It Ends With Us",
     author: "Colleen Hoover",
     price: 10.49,
     cover: null,
   },
   {
     title: "Atomic Habits",
     author: "James Clear",
     price: 14.99,
     cover: null,
   },
   {
     title: "The Silent Patient",
     author: "Alex Michaelides",
     price: 11.75,
     cover: null,
   },
   {
     title: "Educated",
     author: "Tara Westover",
     price: 13.25,
     cover: null,
   },
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

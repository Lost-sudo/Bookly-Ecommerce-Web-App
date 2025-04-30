import React, {useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import BookCard from "./BookCard";
import "../../public/css/TrendingBooks.css";
import "../../public/css/BookCard.css";
import axios from "axios";

function TrendingBooks() {
 const [trending, setTrending] = useState([]);

 useEffect(() => {
        const fetchTrendingBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/books/trending/");
                setTrending(res.data);
            } catch (error) {
                console.error("Error fetching trending books: ", error);
            }
        };
    fetchTrendingBooks();

 }, []);

  return (
    <section className="scroll-section mt-5">
      <Container>
        <h2 className="section-title text-light">Trending Books</h2>
        <div className="scroll-container">
          {trending.map((book, index) => (
            <BookCard
              key={index}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              cover={book.cover_image}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TrendingBooks;

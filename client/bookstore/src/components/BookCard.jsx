import React from "react";
import PropTypes from "prop-types";
import "../../public/css/BookCard.css";
import PlaceHolderImg from "../../public/images/placeholder-img.jpg";


function BookCard({ title, author, cover }) {
  return (
    <div className="book-card bg-secondary text-white">
      <div className="book-cover">
        <img
          src={cover || PlaceHolderImg}
          alt={title}
          className="img-fluid rounded"
        />
      </div>
      <h5 className="mt-2">{title}</h5>
      <p className="text-muted">{author}</p>
    </div>
  );
}

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cover: PropTypes.string,
};

export default BookCard;

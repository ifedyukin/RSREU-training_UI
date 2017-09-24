import React from 'react';

const Stars = ({ stars, update }) => (
  <div className="stars">
    {[5, 4, 3, 2, 1].map(star => (
      <div
        key={star}
        onClick={() => update(star)}
        className={`stars__star${star <= stars ? ' stars__star--full' : ' stars__star--zero'}`}
      />
    ))}
  </div>
)

export default function Book({ img, title, author, stars, updateBook }) {
  return (
    <div className="book">
      <div className="book_pic"><img src={`/books/${img}`} alt="cover" /></div>
      <div className="book_title">{title}</div>
      <div className="book_author">{author}</div>
      <Stars stars={stars} update={(stars) => updateBook({ stars })} />
    </div>
  );
}

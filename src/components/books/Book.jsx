import React from 'react';
import { Stars } from './Stars';

export const Book = ({ img, title, author, stars, updateBook, editBook }) => (
  <div className="book">
    <div onClick={editBook} className="book_pic"><img src={`/books/${img}`} alt="cover" /></div>
    <div onClick={editBook} className="book_title">{title}</div>
    <div onClick={editBook} className="book_author">{author}</div>
    <Stars stars={stars} update={(stars) => updateBook({ stars })} />
  </div>
);

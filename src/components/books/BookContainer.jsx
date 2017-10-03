import React from 'react';
import { Book } from './Book';

export const BooksContainer = ({ books, updateBook, editBook }) => (
  <div id="books">
    {books.map(book => (<Book key={book._id} editBook={() => editBook(book)} updateBook={(data) => updateBook(book._id, data)} {...book} />))}
  </div>
);

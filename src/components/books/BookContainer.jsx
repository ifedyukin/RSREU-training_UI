import React from 'react';
import { Book } from './Book';

export const BooksContainer = ({ books, updateBook, editBook }) => (
  <div id="books">
    {books.map(book => (<Book key={book.id} editBook={() => editBook(book)} updateBook={(data) => updateBook(book.id, data)} {...book} />))}
  </div>
);

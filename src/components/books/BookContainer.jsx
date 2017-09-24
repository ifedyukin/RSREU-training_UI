import React from 'react';
import Book from './Book';

export default function BooksContainer({ books, updateBook }) {
  return (
    <div id="books">
      {books.map(book => (<Book key={book.id} updateBook={(data) => updateBook(book.id, data)} {...book} />))}
    </div>
  );
}
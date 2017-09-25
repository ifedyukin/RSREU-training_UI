import React from 'react';
import { Filters } from './Filters';
import { BooksContainer } from '../books/BookContainer';

export const ContentContainer = ({ filters, books, searchMethod, searchText, setFilter, updateBook, editBook }) => (
  <div id="content">
    <div className="head_content">
      <h1>Browse Available Books</h1>
    </div>
    <div className="head_content">
      <Filters filters={filters} setFilter={setFilter} />
      <input
        id="search"
        value={searchText}
        onChange={e => searchMethod(e.target.value)}
        className="search_box"
        placeholder="Enter Keywords"
        type="text"
      />
    </div>
    <BooksContainer books={books} updateBook={updateBook} editBook={editBook} />
  </div >
);

import React from 'react';

export const AddBook = ({ onClick }) => (
  <div className="side">
    <button className="add_book" onClick={onClick}>
      <span className="plus">+</span>
      ADD A BOOK
      </button>
  </div>
);

import React from 'react';
import { Stars } from './Stars';

export class Book extends React.Component {
  handleNoCover = () => {
    this.img.src = '/images/nocover.jpg';
  }

  render() {
    const { img, title, author, rating, updateBook, editBook } = this.props;
    return (
      <div className="book">
        <div onClick={editBook} className="book_pic">
          <img src={`/books/${img}`} alt="cover" ref={img => this.img = img} onError={this.handleNoCover} />
        </div>
        <div onClick={editBook} className="book_title">{title}</div>
        <div onClick={editBook} className="book_author">{`${author.firstName} ${author.lastName}`}</div>
        <Stars stars={rating} update={(newRating) => updateBook({ rating: newRating })} />
      </div>
    );
  }
}
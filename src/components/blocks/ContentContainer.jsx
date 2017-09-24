import React from 'react';
import BookContainer from '../books/BookContainer';

const Filters = ({ filters, setFilter }) => (
  <ul>
    {filters.map((filter, index) => (<li
      key={index}
    ><a onClick={() => setFilter(filter.id)} className={filter.active ? 'activeFilter' : ''} >{filter.title}</a></li>))}
  </ul>
)

export default function ContentContainer({ filters, books, searchMethod, searchText, setFilter, updateBook }) {
  return (<div id="content">
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
    <BookContainer books={books} updateBook={updateBook} />
  </div >);
}

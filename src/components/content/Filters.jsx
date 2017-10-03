import React from 'react'

export const Filters = ({ filters, setFilter }) => (
  <ul>
    {filters.map((filter, index) => (<li
      key={index}
    ><a onClick={() => setFilter(filter.type)} className={filter.active ? 'activeFilter' : ''} >{filter.title}</a></li>))}
  </ul>
);

import React from 'react';

export const Categories = ({ categories, setCategory }) => (
  <div className="side side_categories">
    <ul>
      {categories.map(li => (<li key={li.type} onClick={() => setCategory(li.type)} style={{ color: li.color }}><a><span>{li.title}</span></a></li>))}
    </ul>
  </div>
);

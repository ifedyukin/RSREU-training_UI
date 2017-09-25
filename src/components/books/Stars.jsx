import React from 'react';

export const Stars = ({ stars, update }) => (
  <div className="stars">
    {[5, 4, 3, 2, 1].map(star => (
      <div
        key={star}
        onClick={() => update(star)}
        className={`stars__star${star <= stars ? ' stars__star--full' : ' stars__star--zero'}`}
      />
    ))}
  </div>
);

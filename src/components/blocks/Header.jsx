import React from 'react';

export const Header = () => (
  <header>
    <div id="top_menu">
      <div className="top_profile">
        <div className="avatar"></div>
        <a>Username</a>
        <div id="top_arrow" className="top_arrow"></div>
      </div>
      <div className="top_item">
        <a>Help Center</a>
        <span> &bull; </span>
        <a>Our Support</a>
      </div>
    </div>
  </header>
);

import React from 'react';

export const NavMenu = props => (
  <div className="side side_menu">
    <a>
      <div className="reading_pic menu_pic"></div>Now Reading</a>
    <a className="select_item">
      <div className="browse_pic menu_pic"></div>Browse</a>
    <a>
      <div className="buy_pic menu_pic"></div>Buy Books</a>
    <a>
      <div className="favourite_pic menu_pic"></div>Favourite Books</a>
    <a>
      <div className="wishlist_pic menu_pic"></div>Wishlist</a>
    <a>
      <div className="history_pic menu_pic"></div>History</a>
  </div>
);

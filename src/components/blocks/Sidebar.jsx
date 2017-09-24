import React from 'react';

const History = ({ messages }) => (
  <div id="history_msgs" className="side side_menu noborder">
    {messages.map((message, index) => (
      <div className="history_msg" key={index}>
        <div className="history_pic menu_pic"></div>
        <div className="history_text">
          <p>You {message.move} <b>{message.book}</b> by <b>{message.author}</b> {message.text}</p>
          <span>{message.time} ago</span>
        </div>
      </div>
    ))}
  </div>
)

const AddBook = ({ onClick }) => (
  <div className="side">
    <button className="add_book" onClick={onClick}>
      <span className="plus">+</span>
      ADD A BOOK
      </button>
  </div>
)

const NavMenu = props => (
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
)

const Categories = props => (
  <div className="side side_menu">
    <ul>
      <li className="red"><a><span>Must Read Titles</span></a></li>
      <li className="yellow"><a><span>Best Of List</span></a></li>
      <li className="blue"><a><span>Classic Novels</span></a></li>
      <li className="purple"><a><span>Non Fiction</span></a></li>
    </ul>
  </div>
)

export default function Sidebar({ history, openPopup }) {
  return (
    <sidebar>
      <AddBook onClick={openPopup} />
      <NavMenu />
      <Categories />
      <History messages={history} />
    </sidebar>
  );
}

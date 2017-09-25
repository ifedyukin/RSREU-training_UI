import React from 'react';

export const History = ({ messages }) => (
  <div id="history_msgs" className="side side_menu noborder">
    {messages.map((message, index) => (
      <div className="history_msg" key={index}>
        <div className="history_pic"></div>
        <div className="history_text">
          <p>You {message.move} <b>{message.book}</b> by <b>{message.author}</b> {message.text}</p>
          <span>{message.time} ago</span>
        </div>
      </div>
    ))}
  </div>
);

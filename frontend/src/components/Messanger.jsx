import React, { useState } from 'react';
import {
  FaCommentAlt,
  FaPaperPlane,
  FaTimes,
  FaUserFriends,
} from 'react-icons/fa';
import { formatDate } from '../utils/helper';

function Messanger({ setIsMessanger, sendMessage, messageList }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="messanger">
      <div className="messanger__header">
        <h3>Meeting Details</h3>
        <FaTimes className="icon" onClick={() => setIsMessanger(false)} />
      </div>

      <div className="messanger__header-tabs">
        <div className="tab">
          <FaUserFriends className="icon" />
          <p>People (1)</p>
        </div>
        <div className="tab active">
          <FaCommentAlt className="icon" />
          <p>Chat</p>
        </div>
      </div>

      <div className="messanger__chat">
        {messageList?.map(({ user, message, time }, i) => (
          <div className="messanger__chat-box">
            <div className="sender">
              {user} <small>{formatDate(time)} </small>
            </div>
            <p className="message">{message}</p>
          </div>
        ))}
      </div>

      <div className="messanger__send-message">
        <input
          type="text"
          placeholder="Send message to everyone"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <FaPaperPlane className="icon" onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default Messanger;

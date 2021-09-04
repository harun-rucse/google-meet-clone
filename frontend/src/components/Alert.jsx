import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';

function Alert({ messageAlert }) {
  return (
    <div className="alert">
      <div className="alert__header">
        <FaCommentAlt className="icon" />
        <h3>{messageAlert?.payload?.user}</h3>
      </div>
      <p className="alert__message">{messageAlert?.payload?.message}</p>
    </div>
  );
}

export default Alert;

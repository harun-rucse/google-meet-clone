import React, { useState, useEffect } from 'react';
import { FaCommentAlt, FaUserCircle, FaUserFriends } from 'react-icons/fa';
import { formatDate } from '../utils/helper';

function CallPageHeader({
  isMessanger,
  setIsMessanger,
  messageAlert,
  setMessageAlert,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  console.log({ isMessanger, messageAlert });

  return (
    <div className="call__header">
      <div className="call__header-icons-container">
        <div className="call__header-icon">
          <FaUserFriends />
        </div>
        <div
          className="call__header-icon"
          onClick={() => {
            setIsMessanger(true);
            setMessageAlert({});
          }}
        >
          <FaCommentAlt />
          {!isMessanger && messageAlert.alert && (
            <span className="alert-circle-icon"></span>
          )}
        </div>

        <div className="call__header-date">{formatDate(currentTime)}</div>
        <div className="call__header-icon profile">
          <FaUserCircle />
        </div>
      </div>
    </div>
  );
}

export default CallPageHeader;

import React from 'react';
import { FaLock, FaRegClone, FaTimes, FaUserPlus } from 'react-icons/fa';

function MeetingInfo({ setMeetingInfo, url }) {
  return (
    <div className="meeting-info">
      <div className="meeting-info__header">
        <p>Your meeting's ready</p>
        <FaTimes
          className="meeting-info__icon"
          onClick={() => setMeetingInfo(false)}
        />
      </div>
      <button className="meeting-info__btn">
        <FaUserPlus className="meeting-info__btn-icon" />
        Add others
      </button>
      <p className="meeting-info__text">
        Or share this meeting link with others you want in the meeting
      </p>
      <div className="meeting-info__input-box">
        <input type="text" className="meeting-info__input" defaultValue={url} />
        <FaRegClone
          className="meeting-info__input-icon"
          onClick={() => navigator.clipboard.writeText(url)}
        />
      </div>
      <div className="meeting-info__security">
        <FaLock className="meeting-info__security-icon" />
        <small className="meeting-info__security-text">
          People who use this meeting link must get your permission before they
          can join.
        </small>
      </div>
      <p className="meeting-info__email">Joined as text@gmail.com</p>
    </div>
  );
}

export default MeetingInfo;

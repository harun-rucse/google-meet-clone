import React, { useState, useEffect } from 'react';
import {
  FaCog,
  FaCommentAlt,
  FaQuestionCircle,
  FaUserCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  return (
    <header className="header">
      <Link className="header__link" to="/">
        <img
          className="header__logo"
          src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png"
          alt="Google Meet"
        />
        <span className="header__text">Meet</span>
      </Link>

      <div className="header__action">
        <div className="header__action-date">
          {moment(currentTime).format('MMMM Do YYYY, h:mm:ss A')}
        </div>
        <div className="header__action-icon-box">
          <FaQuestionCircle className="header__action-icon" />
        </div>
        <div className="header__action-icon-box">
          <FaCommentAlt className="header__action-icon" />
        </div>
        <div className="header__action-icon-box">
          <FaCog />
        </div>
        <div className="header__action-icon-box">
          <FaUserCircle className="header__action-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;

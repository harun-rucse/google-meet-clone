import React, { useState } from 'react';
import { FaRegKeyboard, FaVideo } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import shortid from 'shortid';
import userSvg from '../assets/users.svg';
import Header from '../components/Header';

const Home = () => {
  const history = useHistory();
  const [link, setLink] = useState('');

  const startCall = () => {
    const uid = shortid.generate();
    history.push(`/meet/${uid}#init`);
  };

  const joinCall = () => {
    window.location.assign(link);
  };

  return (
    <div>
      <Header />
      <main className="container main">
        <div className="main__left">
          <h4 className="main__left-heading">
            Premium video meetings. <span>Now free for everyone.</span>
          </h4>
          <p className="main__left-paragraph">
            We re-engineered the service we built for secure business meetings,
            Google Meet, to make it free and available for all.
          </p>
          <div className="meeting">
            <button
              type="button"
              className="meeting__btn meeting__btn-green"
              onClick={startCall}
            >
              <FaVideo className="meeting__btn-icon" />
              New meeting
            </button>
            <div className="meeting__input-container">
              <FaRegKeyboard className="meeting__input-icon" />
              <input
                type="text"
                className="meeting__input"
                placeholder="Enter a link to join meeting"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            {link && (
              <button
                type="button"
                className="meeting__join-btn"
                onClick={joinCall}
              >
                Join
              </button>
            )}
          </div>
          <div className="separate" />
          <Link to="/" className="help-text">
            <span>Learn more</span>
            <p>about Google meet</p>
          </Link>
        </div>

        <div className="main__right">
          <div className="image-container">
            <img className="image-container__image" src={userSvg} alt="Users" />
          </div>
          <div className="bg__text">
            <h4>See everyone togather</h4>
            <p>
              To see more people at the same time, go to Change layout in the
              More options menu
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

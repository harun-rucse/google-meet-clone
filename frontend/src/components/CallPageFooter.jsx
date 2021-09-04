import React from 'react';
import {
  FaAngleLeft,
  FaClosedCaptioning,
  FaDesktop,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhone,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/fa';

function CallPageFooter({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  toggleAudio,
  disconnectCall,
  isVideo,
  toggleVideo,
}) {
  return (
    <div className="call__footer">
      <div className="call__footer__details">
        <div className="call__footer__details-text">More details</div>
        <div className="call__footer__details-icon">
          <FaAngleLeft />
        </div>
      </div>
      <div className="call__options">
        <div
          className={`call__options-icon-box ${!isAudio ? 'red-bg' : ''}`}
          onClick={() => toggleAudio(!isAudio)}
        >
          {isAudio ? (
            <FaMicrophone className="icon" />
          ) : (
            <FaMicrophoneSlash className="white-icon" />
          )}
        </div>
        <div className="call__options-icon-box" onClick={disconnectCall}>
          <FaPhone className="icon red" />
        </div>
        <div
          className={`call__options-icon-box ${!isVideo ? 'red-bg' : ''}`}
          onClick={() => toggleVideo(!isVideo)}
        >
          {isVideo ? (
            <FaVideo className="icon" />
          ) : (
            <FaVideoSlash className="white-icon" />
          )}
        </div>
      </div>
      <div className="call__right">
        <div className="call__icon-box">
          <FaClosedCaptioning className="icon red" />
          <p className="title">Turn on captions</p>
        </div>
        {isPresenting ? (
          <div className="call__icon-box" onClick={stopScreenShare}>
            <FaDesktop className="icon red" />
            <p className="title">Stop present</p>
          </div>
        ) : (
          <div className="call__icon-box" onClick={screenShare}>
            <FaDesktop className="icon red" />
            <p className="title">Present now</p>
          </div>
        )}
      </div>
      <div />
    </div>
  );
}

export default CallPageFooter;

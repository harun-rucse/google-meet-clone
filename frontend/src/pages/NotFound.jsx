import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function NotFound() {
  const history = useHistory();

  return (
    <div className="notfound">
      <Header />
      <div className="notfound__content">
        <h2>Invalid video call name</h2>

        <div className="action-btn">
          <button className="back-btn" onClick={() => history.push('/')}>
            Return to home page
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

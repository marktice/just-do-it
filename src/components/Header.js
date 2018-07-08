import React from 'react';

import './../styles/components/Header.css';

const Header = (props) => {
  const handleClick = () => {
    props.handleLogout();
  };

  return (
    <header className="header">
      {props.loggedIn && (
        <button className="btn-logout" onClick={handleClick}>
          Logout
        </button>
      )}
      <h1 className="header__title">Just Do It</h1>

      {props.loggedIn && (
        <div className="gif-toggle">
          <label htmlFor="gifs">Shia gifs?</label>
          <input
            defaultChecked
            type="checkbox"
            name="gifs"
            onChange={(e) => {
              props.handleGifToggle(e.target.checked);
            }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;

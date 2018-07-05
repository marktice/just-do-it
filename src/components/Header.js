import React from 'react';

import './../styles/components/Header.css';

const Header = (props) => {
  const handleClick = () => {
    props.handleLogout();
  };

  return (
    <header className="header">
      <h1 className="header__title">Your Todos</h1>
      {props.loggedIn && <button onClick={handleClick}>Logout</button>}
    </header>
  );
};

export default Header;

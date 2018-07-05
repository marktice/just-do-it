import React from 'react';

import './LoginForm.css';

const LoginForm = (props) => {
  const handleSubmit = (e) => {
    console.log(`hello from handle submit`);
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    props.handleLogin(email, password);
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div className="LoginForm__input-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
      </div>
      <div className="LoginForm__input-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

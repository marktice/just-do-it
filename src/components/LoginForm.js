import React from 'react';

const LoginForm = (props) => {
  const handleSubmit = (e) => {
    console.log(`hello from handle submit`);
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    props.handleLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="email" />
      <input type="text" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

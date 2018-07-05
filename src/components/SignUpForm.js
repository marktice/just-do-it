import React from 'react';

import './../styles/components/UserForms.css';

const SignUpForm = (props) => {
  return (
    <form
      className="userForm"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(`hello from handleSubmit`);
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        props.handleSignUp(email, password);
      }}
    >
      <h3>Sign-up</h3>
      <div className="userForm__input-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
      </div>
      <div className="userForm__input-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>
      <button type="submit">Sign-up</button>
    </form>
  );
};

export default SignUpForm;

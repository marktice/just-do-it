import React, { Component } from 'react';

import Loader from './Loader';

import './../styles/components/UserForms.css';

class LoginForm extends Component {
  state = {
    formType: 'login', // TODO: switch between signup and login
    loggingIn: false,
    error: undefined
  };

  handleSubmit = async (e) => {
    console.log(`hello from handle submit`);
    this.setState((prevState) => {
      return {
        loggingIn: true
      };
    });

    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const error = await this.props.handleLogin(email, password);
    if (error) {
      console.log(error.message);
      this.setState((prevState) => {
        return {
          loggingIn: false,
          error: error.message
        };
      });
    }
  };

  render() {
    if (this.state.loggingIn) {
      return <Loader />;
    }

    return (
      <form className="userForm" onSubmit={this.handleSubmit}>
        <h3>Login</h3>
        <div className="userForm__input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </div>
        <div className="userForm__input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>

        {this.state.error && <p className="userForm__error">{this.state.error}</p>}

        <button type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;

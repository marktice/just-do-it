import React, { Component } from 'react';

import Loader from './Loader';

import './../styles/components/UserForms.css';

class UserForm extends Component {
  state = {
    formType: 'login',
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

    const error = await this.props.handleUser(this.state.formType, email, password);
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
      <form
        className={
          this.state.formType === 'login'
            ? 'userForm userForm--loginType'
            : 'userForm userForm--signUpType'
        }
        onSubmit={this.handleSubmit}
      >
        <div className="userForm--type-toggle">
          <a
            className="login-toggle"
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                formType: 'login'
              });
            }}
          >
            Login
          </a>

          <a
            className="signUp-toggle"
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                formType: 'signUp'
              });
            }}
          >
            Sign-Up
          </a>
        </div>

        <div className="userForm__content">
          <div className="userForm__input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>
          <div className="userForm__input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
        </div>

        {this.state.error && <p className="userForm__error">{this.state.error}</p>}
        <button type="submit">
          {this.state.formType === 'login' ? 'Login' : 'Sign-Up'}
        </button>
      </form>
    );
  }
}

export default UserForm;

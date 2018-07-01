import React, { Component } from 'react';
import todoAPI from './api/todoAPI';

import LoginForm from './components/LoginForm';
import Todos from './components/Todos';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loggedIn: false,
    authToken: null,
    todos: []
  };

  handleLogin = async (email, password) => {
    try {
      // Login and set authToken
      const { user, authToken } = await todoAPI.userLogin(email, password);
      localStorage.setItem('authToken', authToken);

      // Get Todos
      const todos = await todoAPI.getTodos(authToken);

      // Set State
      if (user.email === email) {
        this.setState((prevState) => {
          return {
            loggedIn: true,
            authToken,
            todos
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle Methods
  async componentDidMount() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const todos = await todoAPI.getTodos(authToken);
      this.setState((prevState) => {
        return {
          loggedIn: true,
          authToken,
          todos
        };
      });
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <h3>Login</h3>
          <LoginForm handleLogin={this.handleLogin} />
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Mark's Todos</h1>
        </header>
        <h3>Your Todos</h3>
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;

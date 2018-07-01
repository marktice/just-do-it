import React, { Component } from 'react';
// import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loggedIn: false,
    authToken: null,
    todos: null
  };

  handleLogin = async (email, password) => {
    console.log(`hello from handle login, email: ${email}, password: ${password}`);
    try {
      // Login
      const url = `https://cors-anywhere.herokuapp.com/https://marks-todos.herokuapp.com/users/login`;
      const response = await axios.post(url, { email, password });
      console.log('Login response: ', response);
      const user = response.data;
      const authToken = response.headers['x-auth'];
      console.log('x-auth: ', authToken);

      // Get Todos
      const getTodosUrl = `https://cors-anywhere.herokuapp.com/https://marks-todos.herokuapp.com/todos`;
      const todosResponse = await axios.get(getTodosUrl, {
        headers: { 'x-auth': authToken }
      });
      console.log('Todos Response: ', todosResponse);

      const todos = todosResponse.data.todos;
      console.log('Todos', todos);

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
          <h1 className="App-title">Welcome to React Todos</h1>
        </header>
        <h3>Your Todos</h3>
        <ul>
          {this.state.todos.map((todo, index) => {
            return <li key={index}>{todo.text}</li>;
          })}
        </ul>
      </div>
    );
  }
}

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

export default App;

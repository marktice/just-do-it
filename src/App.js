import React, { Component } from 'react';

import todoAPI from './api/todoAPI';
import LoginForm from './components/LoginForm';
import AddTodoForm from './components/AddTodoForm';
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

  handleAddTodo = async (text) => {
    console.log(`hello from handleAddTodo, text: ${text}`);
    try {
      const todo = await todoAPI.addTodo(text, this.state.authToken);
      console.log(todo);
      if (todo) {
        this.setState((prevState) => {
          return {
            todos: prevState.todos.concat(todo)
          };
        });
      } else {
        throw new Error('no todo');
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteTodo = async (id) => {
    console.log(`hello from handleDeleteTodo, id: ${id}`);
    try {
      const todo = await todoAPI.deleteTodo(id, this.state.authToken);
      console.log(`deleted todo: ${todo.text}`);
      if (todo) {
        this.setState((prevState) => {
          return {
            todos: prevState.todos.filter((todo) => todo._id !== id)
          };
        });
      } else {
        throw new Error('could not find todo to delete');
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
        <AddTodoForm handleAddTodo={this.handleAddTodo} />
        <Todos todos={this.state.todos} handleDeleteTodo={this.handleDeleteTodo} />
      </div>
    );
  }
}

export default App;

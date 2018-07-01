import React, { Component } from 'react';

import todoAPI from './api/todoAPI';
import LoginForm from './components/LoginForm';
import AddTodoForm from './components/AddTodoForm';
import Todos from './components/Todos';

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

  handleCompleteTodo = async (id) => {
    console.log(`hello from handleCompleteTodo, id: ${id}`);
    try {
      const completedTodo = await todoAPI.completeTodo(id, this.state.authToken);
      if (completedTodo) {
        this.setState((prevState) => {
          return {
            todos: prevState.todos.map((todo) => {
              if (todo._id !== id) {
                return todo;
              } else {
                return completedTodo;
              }
            })
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
    const inCompleteTodos = this.state.todos.filter((todo) => todo.completed === false);
    const completeTodos = this.state.todos.filter((todo) => todo.completed === true);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Mark's Todos</h1>
        </header>
        <div className="container">
          <AddTodoForm handleAddTodo={this.handleAddTodo} />
          <h3>Todos</h3>
          <Todos
            className="todos--incomplete"
            todos={inCompleteTodos}
            handleDeleteTodo={this.handleDeleteTodo}
            handleCompleteTodo={this.handleCompleteTodo}
          />
          <h3>Completed</h3>
          <Todos
            className="todos--complete"
            todos={completeTodos}
            handleDeleteTodo={this.handleDeleteTodo}
            handleCompleteTodo={this.handleCompleteTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;

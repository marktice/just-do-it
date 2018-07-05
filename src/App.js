import React, { Component } from 'react';

import todoAPI from './api/todoAPI';

import AddTodoForm from './components/AddTodoForm';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Todos from './components/Todos';

import './styles/App.css';

class App extends Component {
  state = {
    loaded: false,
    loggedIn: false,
    authToken: null,
    todos: []
  };

  // User methods
  handleLogin = async (email, password) => {
    try {
      // Login and set authToken
      const { user, authToken } = await todoAPI.loginUser(email, password);
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

  handleSignUp = async (email, password) => {
    try {
      const { user, authToken } = await todoAPI.createUser(email, password);
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

  handleLogout = async () => {
    console.log(`hello from handleLogout`);
    try {
      localStorage.removeItem('authToken');
      this.setState((prevState) => {
        return {
          loggedIn: false,
          authToken: null,
          todos: []
        };
      });
      await todoAPI.logoutUser(this.state.authToken);
    } catch (error) {
      console.log(error);
    }
  };

  // Todo methods
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
        throw new Error('Could not find todo to delete');
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
        throw new Error('Could not find todo to complete');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle Methods
  async componentDidMount() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      this.setState((prevState) => {
        return {
          loaded: true
        };
      });
    } else {
      const todos = await todoAPI.getTodos(authToken);
      this.setState((prevState) => {
        return {
          loaded: true,
          loggedIn: true,
          authToken,
          todos
        };
      });
    }
  }

  render() {
    if (!this.state.loaded) {
      // TODO: Loader Component
      return (
        <div>
          <Header loggedIn={false} />
          <div>Loading...kill nat</div>
        </div>
      );
    }

    if (!this.state.loggedIn) {
      return (
        <div>
          <Header loggedIn={false} />
          <LoginForm handleLogin={this.handleLogin} />
          <SignUpForm handleSignUp={this.handleSignUp} />
        </div>
      );
    }

    const inCompleteTodos = this.state.todos.filter((todo) => todo.completed === false);
    const completeTodos = this.state.todos.filter((todo) => todo.completed === true);
    return (
      <div className="App">
        <Header loggedIn={true} handleLogout={this.handleLogout} />
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

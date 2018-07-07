import React, { Component } from 'react';
import _ from 'lodash';

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
      // API first
      const { user, authToken } = await todoAPI.loginUser(email, password);
      localStorage.setItem('authToken', authToken);

      const todos = await todoAPI.getTodos(authToken);
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
      // API first
      const { user, authToken } = await todoAPI.createUser(email, password);
      localStorage.setItem('authToken', authToken);

      const todos = await todoAPI.getTodos(authToken);
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
    // State first
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
      // State first
      const tempTodo = {
        text,
        completed: false,
        tempIdentifier: 'markymark'
      };
      this.setState((prevState) => {
        return {
          todos: prevState.todos.concat(tempTodo)
        };
      });

      const realTodo = await todoAPI.addTodo(text, this.state.authToken);
      this.setState((prevState) => {
        const todos = prevState.todos.filter((todo) => todo !== tempTodo);
        return {
          todos: todos.concat(realTodo)
        };
      });
    } catch (error) {
      console.log(error);
      this.setState((prevState) => {
        return {
          todos: prevState.todos
        };
      });
    }
  };

  handleDeleteTodo = async (id) => {
    console.log(`hello from handleDeleteTodo, id: ${id}`);
    try {
      // State first
      this.setState((prevState) => {
        return {
          todos: prevState.todos.filter((todo) => todo._id !== id)
        };
      });
      await todoAPI.deleteTodo(id, this.state.authToken);
    } catch (error) {
      console.log(error);
      this.setState((prevState) => {
        return {
          todos: prevState.todos
        };
      });
    }
  };

  handleCompleteTodo = async (id) => {
    console.log(`hello from handleCompleteTodo, id: ${id}`);
    try {
      // State first
      this.setState((prevState) => {
        const todos = prevState.todos.map((todo) => {
          if (todo._id !== id) {
            return todo;
          } else {
            todo.completed = true;
            todo.completedAt = new Date();
            return todo;
          }
        });
        return {
          todos
        };
      });
      await todoAPI.completeTodo(id, this.state.authToken);
    } catch (error) {
      console.log(error);
      this.setState((prevState) => {
        return {
          todos: prevState.todos
        };
      });
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
    const orderedCompleteTodos = _.orderBy(completeTodos, 'completedAt', 'desc');
    return (
      <div className="App">
        <Header loggedIn={true} handleLogout={this.handleLogout} />
        <div className="container">
          <AddTodoForm handleAddTodo={this.handleAddTodo} />
          <h3>Todos</h3>
          <Todos
            className="todos--incomplete"
            todos={inCompleteTodos.reverse()}
            handleDeleteTodo={this.handleDeleteTodo}
            handleCompleteTodo={this.handleCompleteTodo}
          />
          <h3>Completed</h3>
          <Todos
            className="todos--complete"
            todos={orderedCompleteTodos}
            handleDeleteTodo={this.handleDeleteTodo}
            handleCompleteTodo={this.handleCompleteTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;

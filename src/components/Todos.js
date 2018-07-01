import React from 'react';

import Todo from './Todo';

const Todos = (props) => {
  const todos = props.todos.map((todo, index) => {
    return (
      <Todo
        key={index}
        {...todo}
        handleDeleteTodo={props.handleDeleteTodo}
        handleCompleteTodo={props.handleCompleteTodo}
      />
    );
  });

  return <div className={props.className}>{todos}</div>;
};

export default Todos;

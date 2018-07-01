import React from 'react';

import Todo from './Todo';

const Todos = (props) => {
  const todos = props.todos.map((todo, index) => {
    return <Todo key={index} {...todo} />;
  });

  return <ul>{todos}</ul>;
};

export default Todos;

import React from 'react';

const Todo = ({ text, completed }) => {
  return (
    <li>
      <p>{text}</p>
      {completed ? <p>Completed</p> : <p>Incomplete</p>}
    </li>
  );
};

export default Todo;

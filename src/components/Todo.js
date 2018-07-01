import React from 'react';

const Todo = ({ _id, text, completed, handleDeleteTodo }) => {
  return (
    <div className={completed ? 'todo-complete' : 'todo-incomplete'}>
      <p>{text}</p>
      {completed ? <p>Completed</p> : <p>Incomplete</p>}
      <button
        onClick={(e) => {
          handleDeleteTodo(_id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default Todo;

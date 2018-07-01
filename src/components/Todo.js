import React from 'react';
import './Todo.css';

const Todo = ({
  _id,
  text,
  completed,
  completedAt,
  handleDeleteTodo,
  handleCompleteTodo
}) => {
  // const completedDate = new Date(completedAt);
  // console.log(completedDate);
  return (
    <div className={completed ? 'todo todo--complete' : 'todo todo--incomplete'}>
      {completed && <p>{completedAt}</p>}
      <p>{text}</p>
      <div>
        {!completed && <button onClick={(e) => handleCompleteTodo(_id)}>√</button>}
        <button onClick={(e) => handleDeleteTodo(_id)}>X</button>
      </div>
    </div>
  );
};

export default Todo;

import React from 'react';
import moment from 'moment';

import './Todo.css';

const Todo = ({
  _id,
  text,
  completed,
  completedAt,
  handleDeleteTodo,
  handleCompleteTodo
}) => {
  return (
    <div className={completed ? 'todo todo--complete' : 'todo todo--incomplete'}>
      <p>{text}</p>
      <div>
        {completed && <span>{moment(completedAt).format('MMM Do, h:ma')}</span>}
        {!completed && <button onClick={(e) => handleCompleteTodo(_id)}>√</button>}
        <button onClick={(e) => handleDeleteTodo(_id)}>X</button>
      </div>
    </div>
  );
};

export default Todo;

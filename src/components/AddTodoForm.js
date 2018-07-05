import React from 'react';

import './../styles/components/AddTodoForm.css';

const AddTodoForm = (props) => {
  return (
    <form
      className="AddTodoForm"
      onSubmit={(e) => {
        e.preventDefault();
        const text = e.target.elements.text.value;
        props.handleAddTodo(text);
        e.target.reset();
      }}
    >
      <input type="text" name="text" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;

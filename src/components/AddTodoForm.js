import React from 'react';

const AddTodoForm = (props) => {
  return (
    <form
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

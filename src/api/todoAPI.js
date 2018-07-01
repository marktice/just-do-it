import axios from './todosAPIConfig';

// Users requests
const userLogin = async (email, password) => {
  const response = await axios.post('users/login', { email, password });
  return { user: response.data, authToken: response.headers['x-auth'] };
};
//TODO: logout
//TODO: create
//TODO: get/me profile page

// Todos requests
const getTodos = async (authToken) => {
  const response = await axios.get('/todos', {
    headers: { 'x-auth': authToken }
  });
  const todos = response.data.todos;
  return todos;
};

const addTodo = async (text, authToken) => {
  console.log(`hello from addTodo, text: ${text}, authToken: ${authToken}`);
  const response = await axios.post(
    '/todos',
    { text },
    {
      headers: { 'x-auth': authToken }
    }
  );
  const todo = response.data;
  return todo;
};

const deleteTodo = async (id, authToken) => {
  const response = await axios.delete(`/todos/${id}`, {
    headers: { 'x-auth': authToken }
  });
  const todo = response.data.todo; // FIXME: is returned inside todo for this request
  return todo;
};

//TODO: updateTodo - mark as complete
const completeTodo = async (id, authToken) => {
  const response = await axios.patch(
    `/todos/${id}`,
    { completed: true },
    {
      headers: { 'x-auth': authToken }
    }
  );
  const todo = response.data.todo; // FIXME: is returned inside todo for this request
  return todo;
};

//TODO: get single todo
// const getTodo = async (id, authToken) => {};

export default { userLogin, getTodos, addTodo, deleteTodo, completeTodo };

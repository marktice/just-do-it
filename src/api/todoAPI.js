import axios from './todosAPIConfig';

// Users requests
const loginUser = async (email, password) => {
  const response = await axios.post('users/login', { email, password });
  return { user: response.data, authToken: response.headers['x-auth'] };
};

const createUser = async (email, password) => {
  const response = await axios.post('users', { email, password });
  return { user: response.data, authToken: response.headers['x-auth'] };
};

const logoutUser = async (authToken) => {
  await axios.delete('/users/me/token', {
    headers: { 'x-auth': authToken }
  });
};
//TODO: get/me profile page

// Todos requests
const getTodos = async (authToken) => {
  const response = await axios.get('/todos', {
    headers: { 'x-auth': authToken }
  });
  const todos = response.data.todos;
  return todos;
};
//TODO: get single todo
// const getTodo = async (id, authToken) => {};

const addTodo = async (text, authToken) => {
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
//TODO: updateTodo - edit todo details

export default {
  loginUser,
  createUser,
  logoutUser,
  getTodos,
  addTodo,
  deleteTodo,
  completeTodo
};

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

//TODO: deleteTodo
//TODO: updateTodo - mark as complete
//TODO: get single todo

export default { userLogin, getTodos, addTodo };

import axios from './todosAPIConfig';

// Users requests
const userLogin = async (email, password) => {
  const response = await axios.post('users/login', { email, password });
  return { user: response.data, authToken: response.headers['x-auth'] };
};

// Todos requests
const getTodos = async (authToken) => {
  const response = await axios.get('/todos', {
    headers: { 'x-auth': authToken }
  });
  const todos = response.data.todos;
  return todos;
};
export default { getTodos, userLogin };

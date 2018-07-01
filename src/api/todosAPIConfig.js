import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://marks-todos.herokuapp.com'
});

export default axiosConfig;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pomodorin.herokuapp.com'
  // baseURL: 'http://localhost:3444'
});

export default api;

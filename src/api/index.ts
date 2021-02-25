import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pomodorin.herokuapp.com/'
});

export default api;

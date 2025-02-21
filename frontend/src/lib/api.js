import axios from 'axios';

const api = axios.create({
  baseURL: 'https://assignment-todo-indol.vercel.app',  
});



export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/tasks' // Ajuste para IP da máquina se testar no dispositivo físico
});

export default api;

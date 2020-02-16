import axios from 'axios';

const APIExame = axios.create({
  baseURL: 'http://localhost:3333/exame',
});

export default APIExame;

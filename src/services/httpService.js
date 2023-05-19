import axios from 'axios';
import { Toast } from '../components';

axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response && error.response.status >= 400 && error.response.status < 500;
  if (!expectedErrors) {
    Toast('Error', 'Unexpected Error', 'error');
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

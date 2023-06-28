// request.js
import axios from "axios";

const baseURL = '/api';

const instance = axios.create({
  baseURL,
  timeout: 15000,
});

instance.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = config.data;
    delete config.data;
  }
  console.log("requset -- config", config)
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(
  response => response.data,
  err => {
    console.log(err.response.status, err)
    return Promise.reject(err)
  }
)

export default (url, method, data) => {
  return instance({ url, method, data })
}
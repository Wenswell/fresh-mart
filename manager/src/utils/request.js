// request.js
import axios from "axios";



export default (url, method, data, isServe) => {

  let baseURL = '/api';
  // if (isServe) baseURL = 'http://192.168.1.5:8333/';
  // if (isServe) baseURL = 'http://124.221.124.116/server/';
  if (isServe) baseURL = 'https://wswensw.top/mapi/';

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
      // console.log(err.response.status, err)
      return Promise.reject(err)
    }
  )
  return instance({ url, method, data, isServe })
}

import request from "@/utils/request";

const getData = () => {
  return request('/home/getData', 'get',)
}

const getUser = (params) => {
  return request('/user/get', 'get', params)
}
const createUser = (data) => {
  return request('/user/add', 'post', data)
}
const updateUser = (data) => {
  return request('/user/edit', 'put', data)
}
const deleteUser = (params) => {
  return request('/user/delete', 'delete', params)
}

const authGetMenu = (data) => {
  return request('/manager/auth', 'post', data, 'isServe')
}

const verifyToken = (data) => {
  return request('/manager/verifytoken', 'post', data, 'isServe')
}

const getProductList = (data) => {
  return request('/products', 'get', data, 'isServe')
}



export default {
  getData,

  getUser,
  createUser,
  updateUser,
  deleteUser,

  authGetMenu,
  verifyToken,
  getProductList,


  
}
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

const getMenu = (data) => {
  return request('/permission/getMenu', 'post', data)
}

export default {
  getData,

  getUser,
  createUser,
  updateUser,
  deleteUser,

  getMenu,

  
}
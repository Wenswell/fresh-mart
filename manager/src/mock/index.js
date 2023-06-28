import Mock from "mockjs";
import homeApi from "./home";
import userApi from "./user";

// 首页数据
Mock.mock('/api/home/getData', 'get', homeApi.getStatisticaData)

Mock.mock(/\/api\/user\/get(\?.*)?/, 'get', userApi.getUserList)
Mock.mock('/api/user/add', 'post', userApi.createUser)
Mock.mock('/api/user/edit', 'put', userApi.updateUser)
Mock.mock(/\/api\/user\/delete(\?.*)?/, 'delete', userApi.deleteUser)
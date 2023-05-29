// import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import store from '@/store'


export const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'

const instance = axios.create({
  baseURL,
  timeout: 2000,
});

// 请求拦截器
instance.interceptors.request.use(config => {
  // 发送请求前执行

  // 从store中读取token,并添加到请求头
  const token = store.state.profile.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(

  // 隐式返回（implicit return）
  response => response.data,

  err => {
  // 401 状态码，进入该函数
  if (err.response && err.response.status === 401) {
    // 1. 清空无效用户信息
    // 2. 跳转到登录页
    // 3. 跳转需要传参（当前路由地址）给登录页码
    store.commit('setUser', {})
    // 当前路由地址
    // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
    const fullPath = encodeURIComponent(router.currentRoute.fullPath)
    console.log(router.currentRoute.fullPath)
    // encodeURIComponent 转换uri编码，防止解析地址出问题
    router.push('/auth/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)

  }
);

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据

  return instance({
    url,
    method,

    // method参数：get,Get,GET  转换成小写再来判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  }).catch(error => {
    console.log('请求错误：', error)
    // 这里可以根据具体需求进行错误处理，例如弹出错误提示框
    // throw error // 如果需要将错误继续向上传递，需要将错误重新抛出
  })
}



// export default function request(config) {
//   // 添加请求拦截器
//   axios.interceptors.request.use(config => {
//     // 从store中读取token,并添加到请求头
//     const token = store.state.token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   }, error => {
//     return Promise.reject(error)
//   })

//   // 添加响应拦截器
//   axios.interceptors.response.use(response => {
//     return response
//   }, error => {
//     // 401则跳转到登录页面
//     if (error.response.status === 401) {
//       store.commit('logout')
//       router.push({
//         name: 'login'
//       })
//     }
//     return Promise.reject(error)
//   })
// }

// // 导出axios实例
// export const instance = axios.create({
//   baseURL: '你的请求域名'
// })
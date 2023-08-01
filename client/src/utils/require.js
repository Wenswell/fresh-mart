// import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import store from '@/store'


// 请求工具函数
export default (url, method, submitData, changeURL) => {
  console.log("url", url)
  console.log("method", method)
  console.log("submitData", submitData)
  // 负责发请求：请求地址，请求方式，提交的数据
  // const baseURL = changeURL ? 'https://mock.boxuegu.com/mock/1175/' : 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'
  function getBaseURL(param) {
    switch (param) {
      case 'local':
        // return 'http://192.168.1.5:8333/';
        // return 'http://124.221.124.116/server/';
        return 'https://wswensw.top/mapi/';
      case 'change':
        return 'https://mock.boxuegu.com/mock/1175/';
      case 'apipc':
        return 'https://apipc-xiaotuxian-front.itheima.net/';
      default:
        return 'https://pcapi-xiaotuxian-front-devtest.itheima.net/';
    }
  }

  const baseURL = getBaseURL(changeURL);

  const instance = axios.create({
    baseURL,
    timeout: 15000,
  });

  // 请求拦截器
  instance.interceptors.request.use(config => {
    // 发送请求前执行

    // 从store中读取token,并添加到请求头
    const token = store?.state?.user?.profile?.token
    // const token = store?.state?.user?.profile?.token ?? 'Real-token-is-unreachable-This-is-a-test-token';

    if (token) {
      console.log(`token: ${token.slice(0, 20)}...`);
      config.headers.Authorization = `Bearer ${token}`
      // console.log("config.headers.Authorization: "+config.headers.Authorization)
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
        console.log("清空无效用户信息")
        store.commit('user/setUser', {})
        // 当前路由地址
        // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
        // encodeURIComponent 转换uri编码，防止解析地址出问题
        const fullPath = encodeURIComponent(router.currentRoute.fullPath)
        console.log(router.currentRoute.fullPath)
        router.push('/auth/login?redirectUrl=' + fullPath)
      }
      return Promise.reject(err)

    }
  );

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

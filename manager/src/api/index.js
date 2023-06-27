import request from "@/utils/request";

const getData = () => {
  return request('/home/getData')
}

export default {
  getData,
}
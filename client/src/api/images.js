import request from '@/utils/require'

export const getHomeBanner = () => {
  return request(`/images/home/banner`, 'get', {}, 'local')
}
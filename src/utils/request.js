import axios from 'axios'

const BASE_API = import.meta.env.VITE_APP_BASE_API

// 创建axios 实例
const service = axios.create({
    baseURL: BASE_API, // url = base url + request url
    timeout: 60000, // 连接超时时间
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

const WHITE_RESPONSE_TYPE = ['blob', 'arraybuffer', 'text/html']

// 响应拦截器
service.interceptors.response.use(
    async (response) => {
      const res = response.data
      const config = response.config
      /**
       *  特殊响应类型，直接返回response
       */
      if (WHITE_RESPONSE_TYPE.includes(config.responseType)) {
        return response
      }
      return res
    },
    (error) => {
      return Promise.reject(error)
    }
)

export default service

import axios from 'axios'
import router from '@/router/index.js'
import { useUserStore } from "@/store/index.js";

const { VITE_BASE_URL } = import.meta.env
// 设置请求头和请求路径
axios.defaults.baseURL = VITE_BASE_URL
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
axios.interceptors.request.use(
  (config) => {
    const { token } = useUserStore().userInfo;
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截
axios.interceptors.response.use(
  (res) => {
    if (res.data && res.data.code === 1) {
      router.replace({
        path: '/login'
      })
    }
    return res
  },
  (error) => {
    ElMessage.error('服务器异常，请稍后再试！')
    console.error(error)
    return error
  }
)
export default axios

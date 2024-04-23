import NProgress from 'nprogress'
import axios from './axios.js'
import { useLoadingStore } from '@/store/index.js'

class Request {
  // 请求体
  params = {}

  // 请求地址
  url = ''

  // 请求方式
  method = 'POST'

  // 是否展示异常
  isMessageNeedShow = true

  // 是否展示loading
  isLoading = true

  // 额外请求头
  headers = {}

  constructor(config) {
    Object.keys(config).forEach((configItem) => {
      if (Object.prototype.hasOwnProperty.call(this, configItem)) {
        this[configItem] = config[configItem]
      } else {
        console.warn(`${configItem}不应属于request实例中元素，请删除！`)
      }
    })
  }

  #getRequest = () => {
    return axios.get(this.url, { params: this.params, headers: this.headers })
  }

  #postRequest = () => {
    return axios.post(this.url, this.params, {
      headers: this.headers
    })
  }

  #responseCb = (response) => {
    if (this.isMessageNeedShow) {
      if (response.data.code !== 0) {
        ElMessage.error(response.data.message)
      }
    }
    return response.data
  }

  request = () => {
    return new Promise((resolve, reject) => {
      const loadingStore = useLoadingStore()
      NProgress.start()
      if (this.isLoading) {
        loadingStore.setIsLoading(true)
      }
      switch (this.method) {
        case 'POST':
          this.#postRequest()
            .then((res) => {
              resolve(this.#responseCb(res))
            })
            .catch((e) => {
              reject(e.data)
            })
            .finally(() => {
              NProgress.done()
              if (this.isLoading) {
                loadingStore.setIsLoading(false)
              }
            })
          break
        case 'GET':
          this.#getRequest()
            .then((res) => {
              resolve(this.#responseCb(res))
            })
            .catch((e) => {
              reject(e.data)
            })
            .finally(() => {
              NProgress.done()
              if (this.isLoading) {
                loadingStore.setIsLoading(false)
              }
            })
          break
        default:
          break
      }
    })
  }
}

export default Request

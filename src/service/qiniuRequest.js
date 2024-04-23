import NProgress from 'nprogress'
import Request from '@/service/request.js'
import axios from '@/service/axios.js'
import { useLoadingStore, useStaticDataStore } from '@/store/index.js'
import { getQiniuToken } from '@/api/index.js'
import md5 from "js-md5";

class QiniuRequest extends Request {

  #file = new FormData();

  constructor(params) {
    super({
      params,
      headers: {
        'content-type': 'multipart/form-data'
      },
      url: 'https://up-z2.qiniup.com/'
    })
  }

  #setFile = (file, fileName, path) => {
    const staticDataStore = useStaticDataStore();
    let _key = md5(new Date().getTime() + fileName)
      .slice(8, 24)
      .toUpperCase();
    this.#file.append('token', staticDataStore.getQiniuToken());
    this.#file.append('file', file);
    this.#file.append('key', `${path || 'scnft/official_website_upload/'}${_key}`);
  }

  #getQiniuToken = async () => {
    const staticDataStore = useStaticDataStore();
    const { data: { upToken } } = await getQiniuToken();
    staticDataStore.setQiniuToken(upToken);
  }

  #uploadRequest = () => {
    return axios.post(this.url, this.#file, {
      headers: this.headers
    })
  }

  #responseCb = (response) => {
    if (!response.status || response.status !== 200) {
      const staticDataStore = useStaticDataStore();
      staticDataStore.setQiniuToken('');
      ElMessage.error('上传失败，请重新上传');
      return null
    }
    return 'https://cdn.gometa.com.cn/' + response.data.key
  }

  request = () => {
    return new Promise( async (resolve, reject) => {
      const staticDataStore = useStaticDataStore();
      const loadingStore = useLoadingStore();
      if (!staticDataStore.getQiniuToken()) {
        await this.#getQiniuToken()
      }
      this.#setFile(this.params.file, this.params.fileName, this.params.path)
      NProgress.start()
      if (this.isLoading) {
        loadingStore.setIsLoading(true)
      }
      this.#uploadRequest()
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
    })
    .catch((e) => {
      console.log(e)
    });
  }
}

export default QiniuRequest

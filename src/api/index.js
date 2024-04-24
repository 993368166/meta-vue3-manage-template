/**
 * 通用接口
 * */

import Request from '@/service/request.js'
import QiniuRequest from '@/service/qiniuRequest.js'


// 获取七牛云token eg.
export const getQiniuToken = () => {
  return new Request({
    url: '/settingStatic/getQiNiuToken'
  }).request();
}

// 上传到七牛云
export const upload = ({file, fileName, path = ''}) => {
  return new QiniuRequest({
    file,
    fileName,
    path
  }).request();
}

import axios from './index.js'
import { Notification, Message } from 'element-ui'


/**
 * blob下载 / 导出文件 防止2次下载
 * @param {string} url 访问api
 * @param {object} params 访问参数
 */
export const downloadByBlob = (url, params = {}) => {
  let notify = downoadNotify()
  return axios
    .get(url, { params, responseType: 'blob' })
    .then(resp => {
      // no thing todo
      console.log('should not go here while downloading file')
      return Promise.reject(resp)
    })
    .catch(err => {
      // to here cause of response interceptor
      notify.close()
      try {
        handleDownloadBlob(err.response)
        return Promise.resolve(err.response)
      } catch (exception) {
        return Promise.reject(err, exception)
      }
    })
}
/**
 * blob下载 / 导出文件 防止2次下载 post方法
 * @param {string} url 访问api
 * @param {object} params 访问参数
 */
export const downloadByBlobPost = (url, params = new URLSearchParams()) => {
  let notify = downoadNotify()
  return axios
    .post(url, params, { responseType: 'blob' })
    .then(resp => {
      // no thing todo
      console.log('should not go here while downloading file')
      return Promise.reject(resp)
    })
    .catch(err => {
      // to here cause of response interceptor
      notify.close()
      try {
        handleDownloadBlob(err.response)
        return Promise.resolve(err.resp)
      } catch (exception) {
        return Promise.reject(err, exception)
      }
    })
}
function handleDownloadBlob(resp) {
  if (resp.status != 200) {
    Notification.error('下载文件出错')
    return
  }
  if (resp.data.type == 'application/json') {
    // not a download file, will show error
    const reader = new FileReader()
    reader.readAsText(resp.data, 'utf-8')
    reader.onload = () => {
      let data = JSON.parse(reader.result)
      Message.error(data.msg)
    }
  } else {
    downloadBlob(resp)
    Notification.success('下载成功')
  }
}

function downloadBlob(resp) {
  const blob = resp.data
  const fileName = getDownloadFileName(resp)
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE version
    navigator.msSaveBlob(blob, fileName)
  } else {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  }
}

function getDownloadFileName(resp) {
  let str = resp.headers['content-disposition']
  let map = new Map(str.split(';').map(e => e.split('=')))
  return map.get('filename')
}

/**
 * 下载提示
 */
function downoadNotify() {
  return Notification({
    // type:"info",
    iconClass: 'el-icon-loading',
    title: '提示',
    message: '文件下载中...',
    // offset: 80,
    duration: 0
  })
}

export const paramsAppend = param => {
  let params = new URLSearchParams()
  for (let [k, v] of Object.entries(param)) {
    params.append(k, v)
  }
  return params
}

export const dateFormat = (dates, format) => {
  if (dates == '-' || dates == '--') return dates
  var date = new Date(dates)
  var paddNum = function (num) {
    num += ''
    return num.replace(/^(\d)$/, '0$1')
  }
  //指定格式字符
  var cfg = {
    yyyy: date.getFullYear(), //年 : 4位
    yy: date
      .getFullYear()
      .toString()
      .substring(2), //年 : 2位
    M: date.getMonth() + 1, //月 : 如果1位的时候不补0
    MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
    d: date.getDate(), //日 : 如果1位的时候不补0=
    dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
    hh: paddNum(date.getHours()), //时
    mm: paddNum(date.getMinutes()), //分
    ss: paddNum(date.getSeconds()) //秒
  }
  format || (format = 'yyyy-MM-dd hh:mm:ss')
  return format.replace(/([a-z])(\1)*/gi, function (m) {
    return cfg[m]
  })
}
import { JSEncrypt } from 'jsencrypt'
export const rsaKey = pwd => {
  var pbk =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHCgEhpiEcXSr3E5kF96NqLdMGKoUC1NC5wU986fQPdmasuwQX3xKFPKlBH/frtW00cUAPbzM9Q5v3xodi1ug9IlmkYWaeRBOtDk3Apj+YXOalpXdtz9Qh0nKQS83OUTAsgeR2o4/lFm9PtccxvMvaNJC8bgCicC2oEpDYpqCxJwIDAQAB'
  var encrypt = new JSEncrypt()
  encrypt.setPublicKey(pbk)

  let result = encrypt.encrypt(pwd)
  return result
}

export function getRelativeTime(longTime) {
  if (longTime) {
    let date = new Date(longTime)
    let today = new Date()
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    let time = append0(date.getHours()) + ':' + append0(date.getMinutes())
    if (date.getTime() >= today.getTime()) {
      return time
    } else if (date.getTime() >= today.getTime() - 24 * 60 * 60 * 1000) {
      return '昨天 ' + time
    }
    return (
      (today.getFullYear() == date.getFullYear()
        ? ''
        : date.getFullYear() + '年') +
      (date.getMonth() + 1) +
      '月' +
      date.getDate() +
      '日 ' +
      time
    )
  }
}
function append0(num) {
  return num < 10 ? '0' + num : num
}

/**
 * 判断是否为json格式
 */
export const isJSON = str => {
  if (typeof str == 'string') {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

/**
 * 中文标点转换为英文并去掉所有空格、回车符
 * @param {*} str
 */
export const qj2bj = str => {
  var tmp = ''
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 65281 && str.charCodeAt(i) <= 65374) {
      // 如果位于全角！到全角～区间内
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
    } else if (str.charCodeAt(i) == 12288) {
      //全角空格的值，它没有遵从与ASCII的相对偏移，必须单独处理
      tmp += ' '
    } else {
      // 不处理全角空格，全角！到全角～区间外的字符
      tmp += str[i]
    }
  }
  return (
    tmp
      // .replace(/\s/g, "")
      .replace(/[\r\n]/g, '')
      .replace(/。/g, '.')
  )
}

/**
 *  生成快速体验 uid
 */
export function experienceUid() {
  let randomStr = ''
  for (let i = 0; i < 6; i++) {
    let randonNum = Math.ceil(Math.random() * 25)
    randomStr += String.fromCharCode(97 + randonNum)
  }
  return new Date().getTime() + randomStr
}

/**
 * 根据 px值计算rem
 * 参数 g px值 Number
 */
export function getRem(g) {
  let w = document.documentElement.style.fontSize.substring(
    0,
    document.documentElement.style.fontSize.length - 2
  )
  return (g * Number(w)) / 100
}
/**
 *  新开窗口
 */
export function openHashHref(hashHref, pathParams) {
  let { origin, pathname } = window.location
  let href = `${origin}${pathname}#${hashHref}`
  if (pathParams) {
    let paramsList = Object.entries(pathParams).map(([k, v]) => {
      return `${k}=${encodeURIComponent(v)}`
    })
    if (paramsList.length > 0) {
      href += '?' + paramsList.join('&')
    }
  }
  window.open(href, '_blank')
}
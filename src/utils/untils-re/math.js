/**
 * 根据 px值计算rem
 * 参数 g px值 Number
 */
function getRem(g) {
  let w = document.documentElement.style.fontSize.substring(
    0,
    document.documentElement.style.fontSize.length - 2
  )
  return (g * Number(w)) / 100
}

function mathAnimate(cur, old) {}

function add0(m) {
  return m < 10 ? '0' + m : m
}

/**
 * 时间戳返回时间格式
 */
function datetimeTurnDate(datetime) {
  if (!datetime) {
    return ''
  }
  datetime = parseInt(datetime)
  let time = new Date(datetime)
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let mm = time.getMinutes()
  let s = time.getSeconds()
  return (
    y +
    '-' +
    add0(m) +
    '-' +
    add0(d) +
    ' ' +
    add0(h) +
    ':' +
    add0(mm) +
    ':' +
    add0(s)
  )
}

/**
 * 返回startDays--endDays天内的时间允许选择

@param { 今天的时间戳 } today
 * @param { 开始的天数 } startDays
 * @param { 结束的天数 } endDays
 */
const disabledDateFun = (today, startDays, endDays) => {
  let stTime = Date.now() - startDays * 86400000
  let endTime = Date.now() - endDays * 86400000
  return today.getTime() > stTime || today.getTime() < endTime
}

// 获取dom高度
function getElementHeightById(id) {
  let ele = document.getElementById(id)
  return ele.clientHeight
}

/**
 * 根据时间差来计算天数
 */
const reckonDaysNumByTmestamp = (begindate, enddate = new Date()) => {
  let begintime = new Date(begindate).getTime()
  let endtime = new Date(enddate).getTime()
  let nTime = endtime - begintime
  let day = Math.floor(nTime / 86400000)
  return day
}

function toQueryPair(key, value) {
  if (typeof value == 'undefined') {
    return key
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value))
}

// params转url
function toQueryString(obj) {
  let ret = []
  for (let key in obj) {
    key = encodeURIComponent(key)
    let values = obj[key]
    if (values && values.constructor == Array) {
      //数组
      let queryValues = []
      for (let i = 0, len = values.length, value; i < len; i++) {
        value = values[i]
        queryValues.push(toQueryPair(key, value))
      }
      ret = ret.concat(queryValues)
    } else {
      //字符串
      ret.push(toQueryPair(key, values))
    }
  }
  return ret.join('&')
}

// 返回当前年月 - i 月
const monthFormat = i => {
  let time = new Date()
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  if (i && i > 0) {
    if (m === 1) {
      y--
      m = 12
    }
    m = m - 1
  }
  return y + '-' + add0(m)
}

// 返回某时间的当天0点时间戳
const getDateZeroTime = date => {
  if (typeof date == 'undefined') {
    throw new Error('date is undefined!')
  }

  if (typeof date == 'number') {
    return new Date(new Date(date).toLocaleDateString()).getTime()
  }

  if (typeof date == 'object') {
    return new Date(date.toLocaleDateString()).getTime()
  }
}

/**
 * 返回某时间的当周周一0点时间戳
 * @param {Number} date
 */
const getWeekFirstDayDateZeroTime = date => {
  let nowTemp = new Date(date) // 当前时间

  let oneDayLong = 24 * 60 * 60 * 1000 // 一天的毫秒数

  let c_time = nowTemp.getTime() // 当前时间的毫秒时间

  let c_day = nowTemp.getDay() || 7 // 当前时间的星期几

  let m_time = c_time - (c_day - 1) * oneDayLong // 当前周一的毫秒时间

  let result = getDateZeroTime(m_time) // 当前周一0点时间戳

  return result
}

/**
 * 返回某时间的当月第一天0点时间戳
 * @param {Number} date
 */
const getMonthFirstDayDateZeroTime = date => {
  // 获取当前月的第一天
  var start = new Date(date)
  start.setDate(1)

  let result = getDateZeroTime(start.getTime())
  return result

  // let nowTemp = new Date(date); // 当前时间

  // let oneDayLong = 24 * 60 * 60 * 1000; // 一天的毫秒数

  // let c_time = nowTemp.getTime(); // 当前时间的毫秒时间

  // let c_day = nowTemp.getDay() || 7; // 当前时间的星期几

  // let m_time = c_time - (c_day - 1) * oneDayLong; // 当前周一的毫秒时间

  // let result = getDateZeroTime(m_time) // 当前周一0点时间戳

  // return result;
}

// 获取当月最后一天
function getCurrentMonthLast(time) {
  var date = new Date(time)
  var currentMonth = date.getMonth()
  var nextMonth = ++currentMonth
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  var oneDay = 1000 * 60 * 60 * 24
  var lastDay = new Date(nextMonthFirstDay - oneDay)
  let result = getDateZeroTime(lastDay.getTime())
  return result
}

export {
  getRem,
  mathAnimate,
  datetimeTurnDate,
  getElementHeightById,
  disabledDateFun,
  reckonDaysNumByTmestamp,
  toQueryString,
  monthFormat,
  getDateZeroTime,
  getWeekFirstDayDateZeroTime,
  getMonthFirstDayDateZeroTime,
  getCurrentMonthLast
}

// 菜单根据path来响应激活状态
const routerHandleChangeNavMenu = (path, list) => {
  return list.forEach(ele => {
    if (ele.path === path) {
      ele.active = true
    } else {
      ele.active = false
    }
  })
}

// 菜单根据englishName来响应激活状态
const routerHandleChangeNavMenuByName = (name, list) => {
  return list.forEach(ele => {
    if (ele.englishName === name) {
      ele.active = true
    } else {
      ele.active = false
    }
  })
}

// 菜单根据Key值来响应激活状态
const routerHandleChangeNavMenuByKey = (name, list, key) => {
  return list.forEach(ele => {
    if (ele[key] === name) {
      ele.active = true
    } else {
      ele.active = false
    }
  })
}

const getStrPushVerticalLine = (list, key) => {
  let str = ''
  if (typeof list === Array) {
    list.forEach(ele => {
      str += ele[key] + '|'
    })
  }
  return str
}

/**
 * 注册 外部点击事件
 */
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}

/**
 *
 * @param {应用数量} num
 */
const getCardTopRightShow = num => {
  // 卡片是否显示右上角
  if (num && num > 0) {
    return true
  } else {
    return false
  }
}

/**
 *
 * @param {应用数量} num
 */
const getCardOptList = (num, admin) => {
  // 卡片列表展示（适用问答库管理）

  if (admin) {
    return []
  }

  if (num && num > 0) {
    return ['edit', 'online']
  }

  return ['edit', 'online', 'delete']
}

const APPFUNC = {
  /**
   *
   */
  ['listFilter'](allList, selList) {
    let list = allList
    let cur = selList
    let obj = {}

    cur.forEach(ele => {
      obj[ele.appId || ele.appid] = ele
    })

    list.forEach((ele, i) => {
      if (typeof obj[ele.appid] !== 'undefined') {
        ele.active = true
        ele.status = 1
      } else {
        ele.active = false
        ele.status = 0
      }
    })

    return JSON.parse(JSON.stringify(list))
  },
  /**
   *
   */
  ['listFilterChat'](allList, selList) {
    let list = allList
    let cur = selList
    let obj = {}
    let arr = []

    cur.forEach(ele => {
      obj[ele.appId || ele.appid] = ele
    })

    list.forEach((ele, i) => {
      if (typeof obj[ele.appid] !== 'undefined') {
        ele.active = true
        ele.isChat = obj[ele.appid]['isChat']
        arr.push(ele)
      } else {
        ele.active = false
        ele.isChat = '0'
      }
    })

    return JSON.parse(JSON.stringify(arr))
  },

  /**
   * 把数组设置成上线范围需要的格式
   * @param {需要设置的数组}} list
   */
  ['setDefaultList'](list) {
    if (Array.isArray(list)) {
      list.forEach(ele => {
        ele.active = false
        ele.status = 0
      })
      return list
    } else {
      return []
    }
  },

  /**
   * 筛选新列表和旧列表，获取新增的和删除的列表
   * @param {新列表} list
   * @param {旧列表} oldList
   */
  ['getResultLists'](list, oldList) {
    let objClose = {}
    let objOpen = {}
    let arrOpen = []
    let arrClose = []

    list.forEach(ele => {
      if (ele.active) {
        objOpen[ele.appid] = true
      } else {
        objClose[ele.appid] = true
      }
    })
    oldList.forEach(ele => {
      if (objOpen[ele.appid]) {
        arrOpen.push(ele)
      }

      if (objClose[ele.appid] && ele.active) {
        arrClose.push(ele)
      }
    })

    return {
      arrOpen,
      arrClose
    }
  }
}

const Card = {
  // 卡片筛选器

  ['numberTextFilter'](val) {
    if (val && val !== '') {
      return `${val}个`
    } else {
      return ''
    }
  }
}

const paramsAppend = param => {
  let params = new URLSearchParams()
  for (let [k, v] of Object.entries(param)) {
    params.append(k, v)
  }
  return params
}

const getFilterList = (list, filterValue) => {
  // 获取过滤筛选后的过滤list
  let arr = []
  list.forEach(ele => {
    arr.push(
      Object.assign(
        {},
        { value: ele[filterValue[0]], text: ele[filterValue[1]] }
      )
    )
  })
  return arr
}

const jsonFilterForAthenaSkills = list => {
  if (list && list !== '') {
    let lists = JSON.parse(list)
    return `问：${lists[0]}<br />
            答：${lists[1]}
            `
  } else {
    return ''
  }
}

/**
 * 判断是否为json格式
 */
const isJSON = str => {
  if (typeof str == 'string') {
    try {
      let obj = JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

// 下载文件
function downloadFiles(data) {
  if (!data) {
    return
  }
  let url = window.URL.createObjectURL(new Blob([data]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url

  document.body.appendChild(link)
}
/**
 * 会话文本分析
 * 技能占比分析 名称--筛选
 * @param {string} name 中文名
 * @param {string} code 英文名
 */
const skillPersentNameFilter = (name, code) => {
  if (!name) {
    return code
  }
  if (!code) {
    return name
  }
  return `${name}-${code}`
}

/**
 * 通过列表中的key和keyName，找到对应valueName的value
 * @param {Array} list
 * @param {Array} param1
 * @param {Object} param1[0] key
 * @param {String} param1[1] keyName
 * @param {String} param1[2] valueName
 */
const findValueForKey = (list, [key, keyName, valueName]) => {
  let obj = list.find(ele => {
    return key === ele[keyName]
  })
  return obj[valueName]
}

/**
 *
 * @param {*} param0
 * @param {*} statu
 */
const setLoadingStatu = (
  { state, storeModuleName, loadName },
  statu = false
) => {
  statu
    ? state[storeModuleName][loadName].push(true)
    : state[storeModuleName][loadName].splice(0, 1)
}

/**
 * 技能问答库词典名称新增编辑时，加入下划线与字段的拼串
 */
const codeFilter = (...val) => {
  let str = ''
  val.forEach((ele, i) => {
    if (i == 3) {
      str += `_${ele[0]}`
    } else {
      str += `_${ele}`
    }
  })
  return str.substring(1, str.length)
}

/* 截取最后一个下划线前面的内容 */
const splitBy_ = str => str.substring(0, str.lastIndexOf('_'))

const codeFilter_ = code => {
  if (!code || code == '') {
    return ''
  }

  let arr = code.split('_')
  if (arr.length > 1) {
    return splitBy_(splitBy_(code))
  }

  return code
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
 * 判断是否为数组且不是空数组
 */
export const isFullArray = cur => {
  if (!cur) {
    return false
  }
  if (!Array.isArray(cur)) {
    return false
  }
  if (cur.length === 0) {
    return false
  }
  return true
}
export function debounce(fn, delay) {
  let timer = null
  return function() {
    let args = arguments
    let context = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

export {
  APPFUNC,
  Card,
  clickoutside,
  codeFilter,
  downloadFiles,
  findValueForKey,
  getCardOptList,
  getCardTopRightShow,
  getFilterList,
  getStrPushVerticalLine,
  isJSON,
  jsonFilterForAthenaSkills,
  paramsAppend,
  routerHandleChangeNavMenu,
  routerHandleChangeNavMenuByKey,
  routerHandleChangeNavMenuByName,
  setLoadingStatu,
  skillPersentNameFilter,
  splitBy_,
  codeFilter_
}

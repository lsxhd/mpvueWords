export function trimSpace(str) {
    return str
        .replace(/&nbsp;/g, '')
        .replace(/\s+([\u4e00-\u9fa5])/gi, '$1')
        .replace(/([\u4e00-\u9fa5])\s+/gi, '$1')
        .trim()
}

export function judgeUtteranceParams(value, length = 200, judgeObj = '语料', sumOfMiddleBracketsAndSmallBrackets = 15) {

    if (value.length > length) {
        return {
            valid: false,
            data: { message: `${judgeObj}长度不能大于${length}个字符` }
        }
    }

    let result = value.replace(/[^\[\]]/g, '').replace(/(\[\])/g, '')
    if (result) {
        return {
            valid: false,
            data: { message: '中括号必须成对出现' }
        }
    }

    result = value.replace(/[^\(\)]/g, '').replace(/(\(\))/g, '')
    if (result) {
        return {
            valid: false,
            data: { message: '小括号必须成对出现' }
        }
    }

    result = value.replace(/[^\{\}]/g, '').replace(/(\{\})/g, '')
    if (result) {
        return {
            valid: false,
            data: { message: '花括号必须成对出现' }
        }
    }

    let flowerBrackets = value.match(/\{(.*?)\}/g) || []
    let middleBrackets = value.match(/\[(.*?)\]/g) || []
    let smallBrackets = value.match(/\((.*?)\)/g) || []

    if (middleBrackets.length + smallBrackets.length > sumOfMiddleBracketsAndSmallBrackets) {
        return {
            valid: false,
            data: { message: `中括号和小括号个数之和最多支持${sumOfMiddleBracketsAndSmallBrackets}个` }
        }
    }
    for (let i = 0; i < flowerBrackets.length; i++) {
        let item = flowerBrackets[i].substring(1, flowerBrackets[i].length - 1)
        if (item == '') {
            return {
                valid: false,
                data: { message: '花括号内容不能为空' }
            }
        } else if (item.length > 32) {
            return {
                valid: false,
                data: { message: '花括号内容长度不能超过32个字符' }
            }
        } else if (!(/^[a-zA-Z0-9#._]{0,}$/.test(item))) {
            return {
                valid: false,
                data: { message: '花括号内容仅支持字母/数字/下划线/小数点/井号' }
            }
        }
    }

    for (let i = 0; i < middleBrackets.length; i++) {
        let item = middleBrackets[i].substring(1, middleBrackets[i].length - 1)
        if (item == '') {
            return {
                valid: false,
                data: { message: '中括号内容不能为空' }
            }
        } else {
            let flag = /\(|\)/.test(item)
            if (flag) {
                return {
                    valid: false,
                    data: { message: '中括号内容不能包含小括号' }
                }
            }
        }

        // 中括号拆分
        let splitWord = item.split('|')

        for (let i = 0; i < splitWord.length; i++) {
            if (splitWord[i] === '') {
                return {
                    valid: false,
                    data: { message: ' | 符号两边内容不能为空' }
                }
            }
        }
    }

    for (let i = 0; i < smallBrackets.length; i++) {
        let item = smallBrackets[i].substring(1, smallBrackets[i].length - 1)
        if (item === '') {
            return {
                valid: false,
                data: { message: '小括号内容不能为空' }
            }
        } else {
            let flag = /[\[\]]/.test(item)
            if (flag) {
                return {
                    valid: false,
                    data: { message: '小括号内容不能包含中括号' }
                }
            }
        }

        // 小括号拆分
        let splitWord = item.split('|')

        for (let i = 0; i < splitWord.length; i++) {
            if (splitWord[i] === '') {
                return {
                    valid: false,
                    data: { message: ' | 符号两边内容不能为空' }
                }
            }
        }
    }

    // 获取没有可选、必选符的语句，检测是否包含或 符号
    let utterance = value.replace(/\[(.*?)\]/g, '').replace(/\((.*?)\)/g, '')
    if (/\|/.test(utterance)) {
        return {
            valid: false,
            data: { message: ' | 符号只能出现在中括号或小括号中' }
        }
    }

    if (judgeObj === '内容') {
        let splitWordCount = value.split('|')
        if (splitWordCount.length > 6) {
            return {
                valid: false,
                data: { message: ' | 符号不得超过5' }
            }
        }
    }
    // 语料不能全部为可选符
    result = value.replace(/\[(.*?)\]/g, '')
    if (result === '') {
        return {
            valid: false,
            data: { message: '不能全部为可选符' }
        }
    }

    return {
        valid: true,
        data: { message: '' }
    }
}

export function debounce(fn, wait = 500, immediate) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        // immediate 为 true时, 表示第一次触发时也执行
        // timer 为空时，表示首次触发
        if (immediate && !timer) {
            fn.apply(this, args)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
export function isEng(str) {
    let pattern = new RegExp('[A-Za-z]+')
    return pattern.test(str)
}
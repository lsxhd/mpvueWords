export function checkZhEnNum(rule, value, callback) {
    // const reg = /^[\u4e00-\u9fffa-zA-Z0-9_.]{0,}$/;
    const reg = /^[\u4e00-\u9fffa-zA-Z0-9]{0,}$/
    if (!reg.test(value)) {
        return callback(new Error('仅支持输入英文、中文、数字'))
    } else {
        callback()
    }
};
export function checkEnNum(rule, value, callback) {
    const reg = /^[a-zA-Z0-9]{0,}$/
    if (!reg.test(value)) {
        return callback(new Error('仅支持输入英文、数字'))
    } else {
        callback()
    }
};
export function checkUtter(rule, value, callback) {
    const reg = /^[\u4e00-\u9fffa-zA-Z0-9{}\[\]「」(),.!?%\|+-×*÷/_#]{0,}$/
    if (!reg.test(value)) {
        return callback(new Error('仅支持输入中文、英文、数字、{}[]「」(),.!?%|+-×*÷/_#'))
    } else if (value.indexOf('{}') >= 0) {
        return callback(new Error('括号中内不能为空'))
    } else if (!matchedBracket(value)) {
        return callback(new Error('括号必须成对出现'))
    } else {
        callback()
    }
};
function matchedBracket(value, left = '{', right = '}') {
    let leftCnt = 0
    let flag = true
    let chars = value.split('')
    for (let i = 0; i < chars.length && flag; ++i) {
        let c = chars[i]
        if (c === left) {
            leftCnt++
        } else if (c === right) {
            if (leftCnt === 0) {
                flag = false
            } else {
                leftCnt--
            }
        }
    }
    return flag && leftCnt === 0
}
'use strict'
// version 2.0
// 表单验证

import { JSEncrypt } from 'jsencrypt'
const rules = {
    required: (msg, trigger = 'blur') => {
        return {
            required: true,
            message: msg,
            trigger: trigger
        }
    },
    lengthLimit: (min = 0, max = 10, msg, trigger = 'blur') => {
        return {
            min: min,
            max: max,
            message: msg,
            trigger: trigger
        }
    },
    baseRegLimit: (msg = '只支持中文、英文、数字、下划线格式', trigger = 'blur') => {
        return {
            pattern: /^[\u4e00-\u9fffa-zA-Z0-9_]{0,}$/,
            message: msg,
            trigger: trigger
        }
    },
    chineseRegLimit: (trigger = 'blur') => {
        return {
            pattern: /^[\u4e00-\u9fff]{0,}$/,
            message: '只支持汉字格式',
            trigger: trigger
        }
    },
    englishRegLimit: (msg = '只支持英文、数字、下划线格式', trigger = 'blur') => {
        return {
            pattern: /^[a-zA-Z0-9_]{0,}$/,
            message: msg,
            trigger: trigger
        }
    },
    englishRegPointLimit: (msg = '只支持英文、数字、下划线、小数点格式', trigger = 'blur') => {
        return {
            pattern: /^[a-zA-Z0-9._]{0,}$/,
            message: msg,
            trigger: trigger
        }
    },
    skillName: () => {
        return [
            rules.required('技能标识不能为空', 'change'),
            rules.lengthLimit(1, 15, '技能标识长度不能超过15个字符', 'change'),
            rules.englishRegLimit(undefined, 'change')
        ]
    },
    skillZhName: () => {
        return [
            rules.required('技能名称不能为空', 'change'),
            rules.lengthLimit(1, 32, '技能中文名长度不能超过32个字符', 'change'),
            rules.baseRegLimit(undefined, 'change')
        ]
    },
    skillCallName: () => {
        return [
            rules.required('调用名称不能为空'),
            rules.lengthLimit(3, 8, '调用名称为3-8个汉字'),
            rules.chineseRegLimit()
        ]
    },
    entityCode: () => {
        return [
            rules.englishRegLimit(undefined, 'change'),
            rules.required('词典英文标识不能为空', 'change'),
            rules.lengthLimit(1, 40, '词典英文标识长度不能超过40个字符', 'change')
        ]
    },
    entityName: () => {
        return [
            rules.required('词典中文名称不能为空', 'change'),
            rules.lengthLimit(1, 32, '词典中文名称长度不能超过32个字符', 'change'),
            rules.baseRegLimit(undefined, 'change')
        ]
    },
    intentName: () => {
        return [
            rules.required('意图中文名不能为空', 'change'),
            rules.lengthLimit(1, 64, '长度不能超过64个字符', 'change'),
            rules.baseRegLimit(undefined, 'change')
        ]
    },
    intentCode: () => {
        return [
            rules.required('意图英文标识不能为空', 'change'),
            rules.lengthLimit(1, 64, '长度不能超过64个字符', 'change'),
            rules.englishRegPointLimit(undefined, 'change')
        ]
    },
    baseNameLimit: (label, num = 32) => {
        return [
            rules.required(`${label}中文名称不能为空`, 'change'),
            rules.lengthLimit(1, num, `${label}中文名称长度不能超过${num}个字符`, 'change'),
            rules.baseRegLimit(undefined, 'change')
        ]
    },
    message: () => {
        return {
            showClose: true,
            duration: 1500,
            message: '操作失败，请重试'
        }
    },
    msgError: (option) => {
        return Object.assign({}, rules.message(), option, { type: 'error' })
    },
    msgSuccess: (option) => {
        return Object.assign({}, rules.message(), { message: '操作成功' }, option, { type: 'success' })
    },
    experienceUid() { // 生成快速体验 uid
        let randomStr = ''
        for (let i = 0; i < 6; i++) {
            let randonNum = Math.ceil(Math.random() * 25)
            randomStr += String.fromCharCode(97 + randonNum)
        }
        return (new Date()).getTime() + randomStr
    },
    rsaKey(pwd) {
        var pbk = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHCgEhpiEcXSr3E5kF96NqLdMGKoUC1NC5wU986fQPdmasuwQX3xKFPKlBH/frtW00cUAPbzM9Q5v3xodi1ug9IlmkYWaeRBOtDk3Apj+YXOalpXdtz9Qh0nKQS83OUTAsgeR2o4/lFm9PtccxvMvaNJC8bgCicC2oEpDYpqCxJwIDAQAB'
        var encrypt = new JSEncrypt()
        encrypt.setPublicKey(pbk)

        let result = encrypt.encrypt(pwd)
        return result
    },
    onlineWarn(vm, data) {
        console.log(data)
        try {

            let list = []
            if (Array.isArray(data)) {
                list = data
            } else {
                list = JSON.parse(data)
            }
            if (!(Array.isArray(list) && list.length > 0)) {
                return
            }

            const h = vm.$createElement
            let arr = []
            list.forEach(ele => {
                arr.push(
                    h('p', null, `${ele.appid}-${ele.msg}`),
                )
            })
            let msg = h('p', null, arr)
            vm.$msgbox({
                title: '提示',
                message: msg,
                showCancelButton: false,
                confirmButtonText: '确定',
                // cancelButtonText: '取消',
            }).then(action => {
            })
        } catch (error) {
            vm.$msgbox({
                title: '提示',
                message: '操作失败，请联系管理员',
                showCancelButton: false,
                confirmButtonText: '确定',
                // cancelButtonText: '取消',
            }).then(action => {
            })
        }
    },
    /**
     * @param array 目标数组
     * @param val 目标value
     */
    inArray(array, val) {
        var s = String.fromCharCode(2)
        var r = new RegExp(s + val + s)
        return r.test(s + array.join(s) + s)
    },
    repositoryCommonReg: (msg = '只支持中文、英文、数字、空格、英文单引号、英文句号', trigger = ['blur', 'change']) => {
        return {
            pattern: /^[\u4e00-\u9fffa-zA-Z0-9 \.']{0,}$/,
            message: msg,
            trigger: trigger
        }
    },
}

export default {
    install(Vue) {
        Vue.prototype.$rules = rules
    }
}

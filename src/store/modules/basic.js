// copy from：AI+
// 所有模块 状态管理

// import { unKnow } from '@/axios/api';
// import $http from '@/axios/index';
// import { type } from 'os';

const basicInfo = {
  namespaced: true,
  state: {
    basicInfo: {
      goAllow: true, // 是否允许页面跳转
      scollDom: null,
      scollObj: null,
      showScollToTop: false,
      isFullList: false, // 没有更多数据了
      isEdit: false,
      dialogShow: false, // 是否显示快速验证
      addEntityMask: false, // 是否显示新增词典弹框
      skillNluComponent: localStorage.getItem('nluComponent') || 'dFir',
      env: localStorage.getItem('envBasic') || 'offical', // 沙盒环境sandbox 正式环境 offical
      batchTestShow: false, // 显示批量验证
      batchTestNum: 0, // 批量验证成功的个数
      onlineClearHis: false, // 清除历史记录激活
      onlineClearHisAppIdList: [], // 清除历史记录激活的appid集合
      downloadMaskShow: false, // 是否显示下载弹框
      conversationInfoBatchIds: localStorage.getItem('conversationInfoBatchIds')
        ? JSON.parse(localStorage.getItem('conversationInfoBatchIds'))
        : [], // 会话文本分析下载得batchId列表
      skillLog: [] // 技能验证-日志
    }
  },
  getters: {},
  mutations: {
    setSkillLog(state, list) {
      if (typeof list === 'undefined') return
      if (Array.isArray(list) && list.length > 0) {
        state.basicInfo.skillLog.push(...list)
        return
      }
      if (typeof list === 'Object') {
        state.basicInfo.skillLog.push(list)
        return
      }
      if (typeof list === 'string' && list === 'clean') {
        state.basicInfo.skillLog = []
      }
    },
    setScollToTop(state, result = false) {
      state.basicInfo.showScollToTop = result
    },
    setScollDom(state, dom) {
      state.basicInfo.scollDom = dom
    },
    setScollObj(state, obj) {
      state.basicInfo.scollObj = obj
    },
    setFullList(state, statu) {
      // 列表是否已满
      state.basicInfo.isFullList = statu
    },
    setEditStatu(state, statu) {
      // 是否处于编辑状态
      state.basicInfo.isEdit = statu
    },
    setDialogShow(state, statu = false) {
      state.basicInfo.dialogShow = statu
    },
    setSkillNluComponent(state, str = 'dFir') {
      // 技能
      localStorage.setItem('nluComponent', str)
      state.basicInfo.skillNluComponent = str
    },
    setBatchTestShow(state, statu = false) {
      state.basicInfo.batchTestShow = statu
    },
    setDownloadMaskShow(state, statu = false) {
      state.basicInfo.downloadMaskShow = statu
    },
    setBatchTestNum(state, num = 0) {
      state.basicInfo.batchTestNum = num
    },
    setOnlineClearHis(state, { statu = false, arr = [] }) {
      state.basicInfo.onlineClearHis = statu
      state.basicInfo.onlineClearHisAppIdList = JSON.parse(JSON.stringify(arr))
    },
    setBatchIds(state, { batchId = '', value = '2' }) {
      if (batchId) {
        state.basicInfo.conversationInfoBatchIds.push({
          batchId,
          check: '0',
          value // 2 会话文本分析 1 unknown数据分析
        })
        localStorage.setItem(
          'conversationInfoBatchIds',
          JSON.stringify(state.basicInfo.conversationInfoBatchIds)
        )
      }
    },
    setConversationInfoBatchIds(state, statu = '') {
      if (statu) {
        state.basicInfo.conversationInfoBatchIds.push({
          batchId: statu,
          check: '0',
          value: '2' // 会话文本分析
        })
        localStorage.setItem(
          'conversationInfoBatchIds',
          JSON.stringify(state.basicInfo.conversationInfoBatchIds)
        )
      }
    },
    deleteConversationInfoBatchIds(state, statu = '') {
      if (statu)
        state.basicInfo.conversationInfoBatchIds.forEach((ele, i) => {
          if (ele.batchId === statu) {
            state.basicInfo.conversationInfoBatchIds.splice(i, 1)
            localStorage.setItem(
              'conversationInfoBatchIds',
              JSON.stringify(state.basicInfo.conversationInfoBatchIds)
            )
          }
        })
    },
    setEnv(state, env = 'offical') {
      localStorage.setItem('envBasic', env), // 沙盒环境sandbox 正式环境 offical
        (state.basicInfo.env = env)
    }
  },
  actions: {
    scollToTop({ state }) {
      return state.basicInfo.scollObj.scollToTop(state.basicInfo.scollDom)
    }
  }
}

export default basicInfo

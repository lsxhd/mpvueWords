/**
 * 平台权限的标识
 */

const auth = {
  operation: {
    query: 'search', // 查询
    add: 'add', // 添加
    delete: 'delete', // 删除
    skill: 'skill', // 技能
    qa: 'qa' // 问答库
  },
  path: {
    '/appMan': {
      query: 'search'
    },
    '/appMan/appList': ['query', 'add', 'delete', 'skill', 'qa']
  },
  /**
   * 获取权限
   * @param {*} vm
   * @param {*} url
   */
  getOptAuth(vm, url) {
    if (!vm.authList) {
      vm.optAuth = []
      return
    }
    if (url) {
      vm.optAuth = vm.authList[url] ? vm.authList[url].optAction : []
      return
    }
    vm.optAuth = vm.authList[vm.$route.path]
      ? vm.authList[vm.$route.path].optAction
      : []
    // 当路由中含有不固定参数时，会判断name 是否一样
    if (vm.optAuth.length === 0) {
      for (let [key, val] of Object.entries(vm.authList)) {
        if (val.englishName === vm.$route.name) {
          vm.optAuth = val.optAction
        }
      }
    }
  },
  /**
   * 获取菜单权限
   * @param {*} vm
   * @param {*} urls
   */
  getPathAuth(vm, urls, pathObj) {
    if (!vm.authList) {
      vm.navMenuList = []
      return
    }
    if (urls.length > 0) {
      vm.navMenuList = []
      let obj = {}
      urls.forEach(ele => {
        obj[ele] = true
      })
      for (let [key, val] of Object.entries(vm.authList)) {
        if (obj[key]) {
          vm.navMenuList.push(pathObj[key])
        }
      }
      return
    }
  },
  /**
   * 检验菜单权限，没有菜单权限默认跳转此页面第一个页面，没有第一个默认跳转
   * @param {*} vm
   * @param {*} urls
   */
  checkPathAuth(vm, urls, navMenuList, type) {
    // type 参数是第二次修改时加入的，原因：路径中有不固定参数id所以无法通过path控制；由于这个已有页面使用，无法改动，只能增加参数控制
    if (type === 'name') {
      let name = vm.$route.name
      if (navMenuList.length === 0) {
        // vm.$router.replace("/postProcess");
        vm.$message.error('未配置权限，无法进入')
        return
      }
      let obj = navMenuList.find(ele => {
        return ele.key === name
      })
      if (!obj) {
        vm.$router.push({ name: navMenuList[0].key }, { params: vm.params })
        return
      } else {
        vm.$message.error('未配置权限，无法进入')
      }
    } else {
      if (!vm.authList.hasOwnProperty('/opertionManMain/opertionList')) {
        return
      }
      let path = vm.$route.path

      if (navMenuList.length === 0) {
        vm.$router.replace('/opertionManMain/opertionList')
        vm.$message.error('未配置权限，无法进入')
        return
      }
      let obj = navMenuList.find(ele => {
        return ele.path === path
      })
      if (!obj) {
        vm.$router.replace(navMenuList[0].path)
        return
      } else {
        vm.routerHandleChangeNavMenu(path, navMenuList)
      }
    }
  }
}

export default {
  install(Vue) {
    Vue.prototype.$auth = auth
  }
}

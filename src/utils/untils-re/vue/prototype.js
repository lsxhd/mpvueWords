import Vue from 'vue'
import axios from '@/dao'
import API from '@/dao/api'
import qa from '@/dao/modules/qa'
import login from '@/dao/modules/login'
import { paramsAppend } from '@/utils/common'
import vpaConfirm from '@/components/common/dialog/lightPopUp/confirm'
import vpaToast from '@/components/common/dialog/toast/toast'

Vue.prototype.$axios = axios
Vue.prototype.$paramsAppend = paramsAppend
Vue.prototype.$http = axios
Vue.prototype.$api = {
  qa: qa,
  login: login,
  ...API
}
Vue.prototype.$vpaConfirm = vpaConfirm
Vue.prototype.$vpaToast = vpaToast

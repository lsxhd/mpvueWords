import Vue from "vue";
import App from "./App";
import { openWin, redirectTo, backBeaforWin, Ajax } from "./utils/common";
import store from "./store/index";
import "./css/common.css";
import "./css/iconfont.css";

Vue.config.productionTip = false;
App.mpType = "app";
// 把通用方法挂载到Vue原型上
Vue.prototype.$openWin = openWin;
Vue.prototype.$redirectTo = redirectTo;
Vue.prototype.$backBeaforWin = backBeaforWin;
Vue.prototype.$ajax = Ajax;
// 把store挂载到Vue原型上
Vue.prototype.$store = store;

const app = new Vue(App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      "pages/englishWords/shouye/main",
      "pages/englishWords/remberWord/main",
      "pages/englishWords/updatePlan/main",
      "^pages/index/main",
      "pages/orderList/main",
      "pages/self/main",
      "pages/orderDetail/main",
      "pages/goodDetail/main",
      "pages/comment/main",
      "pages/submit/main",
      "pages/citySelect/main",
      "pages/search/main",
      "pages/error/main"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "暖暖背单词",
      navigationBarTextStyle: "black"
      // enablePullDownRefresh: true
    },
    usingComponents: {
      "van-button": "./static/vantWeapp/button/index",
      "van-card": "./static/vantWeapp/card/index",
      "i-card": "static/iview/card/index",
      "i-button": "static/iview/button/index",
      "i-tabs": "static/iview/tabs/index",
      "i-tab": "static/iview/tab/index",
      "i-icon": "static/iview/icon/index",
      "i-card": "static/iview/card/index",
      "i-cell-group": "static/iview/cell-group/index",
      "i-cell": "static/iview/cell/index",
      "i-modal": "static/iview/modal/index",
      "i-radio-group": "static/iview/radio-group/index",
      "i-radio": "static/iview/radio/index",
      "i-input-number": "static/iview/input-number/index",
      "i-tag": "static/iview/tag/index",
      "i-divider": "static/iview/divider/index",
      "i-grid": "static/iview/grid/index",
      "i-grid-item": "static/iview/grid-item/index",
      "i-grid-icon": "static/iview/grid-icon/index",
      "i-grid-label": "static/iview/grid-label/index"
    },
    tabBar: {
      borderStyle: "white",
      backgroundColor: "#fff",
      selectedColor: "#06c1ae",
      color: "#666",
      list: [
        {
          pagePath: "pages/englishWords/shouye/main",
          iconPath: "static/images/tab1.png",
          selectedIconPath: "static/images/tab1-s.png",
          text: "首页"
        },
        {
          pagePath: "pages/index/main",
          iconPath: "static/images/tab1.png",
          selectedIconPath: "static/images/tab1-s.png",
          text: "商城"
        },
        {
          pagePath: "pages/orderList/main",
          selectedIconPath: "static/images/tab2-s.png",
          iconPath: "static/images/tab2.png",
          text: "订单"
        },
        {
          pagePath: "pages/self/main",
          selectedIconPath: "static/images/tab3-s.png",
          iconPath: "static/images/tab3.png",
          text: "我的"
        }
      ]
    }
  }
};

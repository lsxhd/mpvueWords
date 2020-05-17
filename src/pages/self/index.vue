<template>
  <div class="container ub-box ub-col">
    <dl class="ub-box z-padding-all-10-px" style="background:#fff">
      <dd class="ub-box ub-ver">
        <image
          :src="userInfo.avatarUrl"
          class="head-img"
          mode="aspectFill"
        ></image>
      </dd>
      <dd
        class="ub-flex-1 z-font-size-18 z-color-333 ub-box ub-ver-v z-padding-h-10-px"
      >
        <button
          v-if="!token"
          class="loginBtn"
          lang="zh_CN"
          open-type="getUserInfo"
          @getuserinfo="onGetUserInfo"
        >
          登录
        </button>
        <ul v-else class="ub-box z-margin-left-10-px ub-col">
          <li class="z-font-size-16 z-color-333 z-margin-bottom-5-px">
            {{ userName }}
          </li>
          <!-- <li class="z-font-size-14 z-color-888">
            {{ userName }} {{ userName }} {{ userName }}
          </li> -->
        </ul>
      </dd>
      <dd v-if="token" class="z-font-size-18 z-color-333 ub-box ub-ver-v">
        <div
          @click.stop="exitLogin()"
          class="exitBtn ub-box ub-ver z-font-size-14"
        >
          退出
        </div>
      </dd>
    </dl>
    <dl class="ub-box ub-col z-margin-top-10-px" style="background:#fff;">
      <dd>
        <YearProgress></YearProgress>
      </dd>
      <dd
        @click.stop="gotoOrderList()"
        class="z-padding-all-10-px ub-box ub-between"
        style="border-bottom:1px solid #eee"
      >
        <p class="ub-box ub-ver">
          <i
            class="iconfont icon-danju"
            style="color:#c11c06;font-size:20px"
          ></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px">订单</span>
        </p>
        <p class="ub-box ub-ver">
          <i
            class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"
          ></i>
        </p>
      </dd>
      <dd
        @click.stop="$openWin('/pages/error/main')"
        class="z-padding-all-10-px ub-box ub-between"
        style="border-bottom:1px solid #eee"
      >
        <p class="ub-box ub-ver">
          <i
            class="iconfont icon-hongbao"
            style="color:#c11c06;font-size:20px"
          ></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px">反馈</span>
        </p>
        <p class="ub-box ub-ver">
          <i
            class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"
          ></i>
        </p>
      </dd>
      <dd
        @click.stop="$openWin('/pages/error/main')"
        class="z-padding-all-10-px ub-box ub-between"
        style="border-bottom:1px solid #eee"
      >
        <p class="ub-box ub-ver">
          <i
            class="iconfont icon-caiwu"
            style="color:#c11c06;font-size:20px"
          ></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px"
            >添加图书</span
          >
        </p>
        <p class="ub-box ub-ver">
          <i
            class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"
          ></i>
        </p>
      </dd>
      <dd
        @click.stop="$openWin('/pages/error/main')"
        class="z-padding-all-10-px ub-box ub-between"
        style="border-bottom:1px solid #eee"
      >
        <p class="ub-box ub-ver">
          <i
            class="iconfont icon-caiwu"
            style="color:#c11c06;font-size:20px"
          ></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px">其他</span>
        </p>
        <p class="ub-box ub-ver">
          <i
            class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"
          ></i>
        </p>
      </dd>
      <dd
        @click.stop="clickCall()"
        class="z-padding-all-10-px ub-box ub-between"
      >
        <p class="ub-box ub-ver">
          <i
            class="iconfont icon-dianhua"
            style="color:#c11c06;font-size:20px"
          ></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px"
            >客服电话：987654321</span
          >
        </p>
      </dd>
    </dl>
  </div>
</template>
<script>
import { getOpenIdEnd } from "@/dao/modules/user";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("user", {
      userName: state => state.userInfo.userName,
      token: state => state.userInfo.token
    }),
    isLogin() {
      return false;
      // || this.$store.state.isLogin
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("user", ["loginEnd", "checkoutEnd"]),
    onGetUserInfo(e) {
      console.log("登录");
      console.log(e, e.target.userInfo);
      if (e.target.userInfo) {
        // this.userName=e.target.userInfo.nickName;
        // this.isCeng=false;
        this.isLogin();
      } else {
        // this.userName="";
        // this.isCeng=true;
      }
      // wx.login()
      // this.$store.commit("updateIsLogin", true);
      // this.$store.commit("updateUser", e.mp.detail.userInfo);
    },
    isLogin() {
      var _this = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.userInfo"]) {
            //未授权getUserInfo
            console.log("未授权：", res);
            wx.authorize({
              scope: "scope.getUserInfo",
              success(res) {
                // 用户已经同意小程序使用用户信息，后续调用 wx.userInfo 接口不会弹窗询问
                console.log("同意授权：", res);
                // _this.isCeng = false;
                // _this.userName = res.target.userInfo.nickName;
              },
              fail(err) {
                console.log(err);
              }
            });
          } else {
            //已授权
            console.log("已授权：");
            wx.getUserInfo({
              success(res) {
                console.log("获取用户信息", res);
                _this.getOpenId(res);
              },
              fail(err) {
                console.log(err);
              }
            });
          }
        }
      });
    },
    getOpenId(userInfo) {
      //获取用户的openid
      let user = JSON.parse(userInfo.rawData);
      let _this = this;
      wx.login({
        success(res) {
          console.log("wx.login", res);
          user.code = res.code;
          user.userName = user.nickName;
          console.log("传入user", user);
          getOpenIdEnd(user).then(res => {
            console.log(res.data.data);
            _this.loginEnd(res.data.data);
          });
        }
      });
    },
    exitLogin() {
      this.checkoutEnd();
    },
    gotoOrderList() {
      wx.navigateTo({ url: "/pages/bookStore/allOrder/main" });
    },
    clickCall() {
      wx.showActionSheet({
        itemList: ["客服电话：10107888"],
        success(res) {
          switch (res.tapIndex) {
            case 0:
              wx.makePhoneCall({ phoneNumber: "7654321" });
              break;
          }
        }
      });
    }
  },
  onShow() {
    wx.setNavigationBarTitle({ title: "我的" });
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #e8e8e8;
  object-fit: cover;
}
.head-img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background: #eee;
}
.loginBtn {
  font-size: 14px;
  color: #fff;
  padding: 0px 20px;
  margin-left: 10px;
  background: #ff5722;
}
.exitBtn {
  border: 1px solid #c11c06;
  padding: 7px 15px;
  color: #c11c06;
  border-radius: 3px;
}
</style>

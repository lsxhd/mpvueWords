<template>
  <div class="container ub-box ub-col">
    <slot>
      <button
        v-if="!isLogin"
        class="loginBtn"
        lang="zh_CN"
        open-type="getUserInfo"
        @getuserinfo="onGetUserInfo"
      >
        登录
      </button>
    </slot> 
  </div>
</template>
<script>
import { getOpenIdEnd } from "@/dao/modules/user";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("user", {
      userName: state => state.userInfo.userName,
      token: state => state.userInfo.token,
      isLogin: state => state.isLogin
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("user", ["loginEnd", "checkoutEnd"]),
    onGetUserInfo(e) {
      console.log(e, e.target.userInfo);
      if (e.target.userInfo) {
        this.isLogin();
      } else {
      }
    },
    isLogin() {
      var _this = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.userInfo"]) {
            //未授权getUserInfo
            wx.authorize({
              scope: "scope.getUserInfo",
              success(res) {
                // 用户已经同意小程序使用用户信息，后续调用 wx.userInfo 接口不会弹窗询问
                // _this.isCeng = false;
                // _this.userName = res.target.userInfo.nickName;
              },
              fail(err) {
                console.log(err);
              }
            });
          } else {
            //已授权
            wx.getUserInfo({
              success(res) {
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
          user.code = res.code;
          user.userName = user.nickName;
          getOpenIdEnd(user).then(res => {
            console.log("获取用户信息now：：：",res.data.data);
            _this.loginEnd(res.data.data); 
          });
        }
      });
    }
  }
};
</script>
<style scoped></style>

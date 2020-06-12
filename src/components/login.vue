<template>
  <div>
    <div>
      <van-button
        plain
        hairline
        type="primary"
        lang="zh_CN"
        size="normal"
        open-type="getUserInfo"
        @getuserinfo="onGetUserInfo"
        >登录</van-button
      >
    </div>
  </div>
</template>
<script>
import { getOpenIdEnd } from "@/dao/modules/user";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("user", {
      userName: state => state.userInfo.userName,
      token: state => state.userInfo.token,
      isLogin: state => state.isLogin
    })
  },
  watch: {
    isLogin(isLogin) {
      if (isLogin) {
        console.log("isLogin -> isLogin", isLogin);
        wx.switchTab({ url: "/pages/personal/main" });
      }
    }
  },
  methods: {
    ...mapMutations("user", ["loginEnd", "checkoutEnd"]),
    // 获取用户信息
    onGetUserInfo(e) {
      console.log("登录");
      console.log(e, e.mp.detail.userInfo);
      if (e.mp.detail.userInfo) {
        console.log(e, e.target.userInfo);
        this.getSetting();
      } else {
      }
    },
    getSetting() {
      // 查看授权情况
      let _this = this;
      wx.getSetting({
        success: function(res) {
          let _2this = _this;
          // 已授权
          if (res.authSetting["scope.userInfo"]) {
            // 访问用户信息
            wx.getUserInfo({
              success: function(res) {
                let _3this = _2this;
                console.log("用户的信息", res);
                let user = JSON.parse(res.rawData);
                // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                wx.login({
                  success: res => {
                    let _4this = _3this;
                    // 获取到用户的 code 之后：res.code
                    console.log("用户的code:" + res.code, res);
                    user.code = res.code;
                    user.userName = user.nickName;
                    getOpenIdEnd(user).then(res => {
                      console.log("后台返回的数据", res.data.data);
                      _4this.loginEnd(res.data.data);
                    });
                    // 可以传给后台，再经过解析获取用户的 openid
                    // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                    // wx.request({
                    //     // 自行补上自己的 APPID 和 SECRET
                    //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                    //     success: res => {
                    //         // 获取到用户的 openid
                    //         console.log("用户的openid:" + res.data.openid);
                    //     }
                    // });
                  }
                });
              }
            });
          } else {
            // 未授权
          }
        }
      });
    },
    exitLogin() {
      this.checkoutEnd();
    }
  },
  mounted() {},
  onShow() {}
};
</script>
<style scoped></style>

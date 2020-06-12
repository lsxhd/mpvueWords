<template>
  <div class="container">
    <!-- <div v-if="isLogin"> -->
    <van-card :title="user.userName" :thumb="user.avatarUrl">
      <div slot="desc">
        <van-tag plain type="primary">{{ user.userName }}</van-tag>
        <!-- <van-button plain hairline type="primary" @click.stop="exitLogin">
            退出
          </van-button> -->
      </div>
    </van-card>
    <van-cell-group>
      <van-cell @click.stop="getAddressList()" title="地址管理" is-link />
      <van-cell @click.stop="getoOrderList()" title="订单管理" is-link />
    </van-cell-group>
    <!-- </div>
    <div v-else>
      <login></login>
    </div> -->
  </div>
</template>
<script>
import { getUser } from "@/dao/modules/user";
import { mapState, mapMutations } from "vuex";
import login from "@/components/login.vue";
export default {
  components: { login },
  data() {
    return {
      user: {
        userName: "暂无",
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg"
      }
    };
  },
  computed: {
    ...mapState("user", {
      userName: state => state.userInfo.userName,
      token: state => state.userInfo.token,
      isLogin: state => state.isLogin
    })
  },
  methods: {
    ...mapMutations("user", ["loginEnd", "checkoutEnd"]),
    getUser() {
      getUser().then(res => {
        console.log("个人信息", res);
        this.user = res.data.data;
      });
    },
    exitLogin() {
      this.checkoutEnd();
    },
    getAddressList() {
      wx.navigateTo({ url: "/pages/bookStore/address/main" });
    },
    getoOrderList() {
      wx.navigateTo({ url: "/pages/bookStore/allOrder/main" });
    }
  },
  mounted() {},
  watch: {
    isLogin(isLogin) {
      if (isLogin) {
        this.getUser();
      }
    }
  },
  onShow() {
    this.getUser();
  }
};
</script>
<style scoped></style>

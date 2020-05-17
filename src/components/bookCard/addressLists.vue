<template>
  <div>
    <van-sticky>
      <van-button type="primary" block @click="editor(0)"
        >添加新地址</van-button
      >
    </van-sticky>
    <div v-for="(address, key) in addressList" :key="key">
      <van-cell use-label-slot is-link @click="selectAddress(address)">
        <view slot="title">
          <view class="van-cell-text">
            <span>{{ address.name }}</span>
            <span class="huise margin-left">{{ address.phonNumber }}</span>
          </view>
        </view>
        <view slot="label">
          <p>{{ address.shopRegionName }}</p>
          <p>{{ address.detailInfo }}</p>
        </view>
        <view slot="icon" v-if="defaultAddress == address.addressId">
          <van-icon name="passed" class="checked" />
        </view>
        <view>
          <van-button
            type="primary"
            size="mini"
            round
            plain
            hairline
            @click.stop="editor(address.addressId)"
          >
            编辑
          </van-button>
          <van-button
            type="danger"
            size="mini"
            round
            plain
            hairline
            @click.stop="deleteAddress(address.addressId)"
          >
            删除
          </van-button>
        </view>
      </van-cell>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    addressList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      defaultAddress: null
    };
  },
  methods: {
    selectAddress(address) {
      console.log("selectAddress -> address", address);
      wx.redirectTo({
        url: "/pages/bookStore/order/main?addressId=" + address.addressId
      });
    },
    editor(addressId) {
      wx.navigateTo({
        url: "/pages/bookStore/addOrUpdateAddress/main?addressId=" + addressId
      });
    },
    deleteAddress() {}
  },
  onShow(options) {
    console.log("onLoad -> options", options);
    this.defaultAddress = options.addressId;
  },
  onLoad(options) {
    this.defaultAddress = options.addressId;
  }
};
</script>
<style scoped></style>

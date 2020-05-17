<template>
  <div class="topAndBottom-2 full">
    <van-cell-group>
      <van-field
        :value="address.name"
        placeholder="请输入收货人"
        left-icon="contact"
        label="收货人"
        clearable
        :border="false"
        @change="nameChange"
      />
      <van-field
        :value="address.phonNumber"
        placeholder="请输入手机号码"
        left-icon="phone-o"
        label="手机号码"
        clearable
        :border="false"
        @change="phonNumberChange"
      />
      <van-field
        :value="address.shopRegionName"
        label="所在地区"
        is-link
        left-icon="location-o"
        readonly
        :border="false"
        @click="openArea"
      />
      <van-field
        :value="address.detailInfo"
        label="详细地址"
        type="textarea"
        clearable
        left-icon="orders-o"
        placeholder="请输入详细地址"
        autosize
        @change="detailInfoChange"
        :border="false"
      />
      <van-cell title="默认地址">
        <view>
          <van-switch
            :checked="address.isDefault == 1"
            @change="isDefaultChange"
            size="24px"
          />
        </view>
      </van-cell>
    </van-cell-group>
    <van-popup
      :show="showArea"
      round
      position="bottom"
      custom-style="height: 60%"
    >
      <van-area
        :area-list="areaLists"
        title="省市区选择"
        @cancel="cancel"
        @confirm="confirm"
        :value="areaValue"
      />
    </van-popup>
    <van-button type="danger" block @click="saveOrupdateAddress">
      保存地址
    </van-button>
  </div>
</template>
<script>
import {
  getAddress,
  getAddressById,
  saveOrupdateAddress
} from "@/dao/modules/address";
import areaList from "@/utils/area.js";

export default {
  components: {},
  data() {
    return {
      address: {
        name: "",
        phonNumber: null,
        shopRegionName: "",
        shopRegionId: null,
        detailInfo: "",
        isDefault: 0
      },
      showArea: false,
      areaLists: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
          130000: "河北省",
          140000: "山西省",
          150000: "内蒙古自治区"
        },
        city_list: {
          110100: "北京市",
          120100: "天津市",
          130100: "石家庄市",
          130200: "唐山市",
          130300: "秦皇岛市",
          130400: "邯郸市",
          130500: "邢台市",
          130600: "保定市",
          130700: "张家口市",
          130800: "承德市",
          130900: "沧州市",
          131000: "廊坊市",
          131100: "衡水市",
          140100: "太原市",
          140200: "大同市",
          140300: "阳泉市",
          140400: "长治市",
          140500: "晋城市",
          140600: "朔州市",
          140700: "晋中市",
          140800: "运城市",
          140900: "忻州市",
          141000: "临汾市",
          141100: "吕梁市",
          150100: "呼和浩特市",
          150200: "包头市",
          150300: "乌海市",
          150400: "赤峰市",
          150500: "通辽市",
          150600: "鄂尔多斯市",
          150700: "呼伦贝尔市",
          150800: "巴彦淖尔市",
          150900: "乌兰察布市",
          152200: "兴安盟"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          110107: "石景山区",
          110108: "海淀区",
          110109: "门头沟区",
          110111: "房山区",
          110112: "通州区",
          110113: "顺义区",
          110114: "昌平区",
          110115: "大兴区",
          110116: "怀柔区",
          110117: "平谷区",
          110118: "密云区",
          110119: "延庆区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区",
          120106: "红桥区",
          120110: "东丽区",
          120111: "西青区",
          120112: "津南区"
        }
      },
      areaValue: 110100
    };
  },
  methods: {
    nameChange(value) {
      console.log("nameChange -> value", value);
      this.address.name = value.mp.detail;
    },
    phonNumberChange(value) {
      console.log("nameChange -> value", value);
      this.address.phonNumber = value.mp.detail;
    },
    detailInfoChange(value) {
      console.log("nameChange -> value", value);
      this.address.detailInfo = value.mp.detail;
    },
    isDefaultChange(value) {
      console.log("isDefaultChange -> value", value);
      if (value.mp.detail) {
        this.address.isDefault = 1;
      } else {
        this.address.isDefault = 0;
      }
    },
    openArea() {
      this.showArea = true;
    },
    getAddressById(addressId) {
      getAddressById({ addressId: addressId }).then(res => {
        console.log("getAddressById -> res", res);
        this.address = res.data.data;
      });
    },
    saveOrupdateAddress() {
      let params = Object.assign({}, this.address);
      saveOrupdateAddress(params).then(res => {
        console.log("saveOrupdateAddress -> res", res);
        if (res.data.data) {
          wx.navigateBack({})
          // let pages = getCurrentPages(); //页面栈
          // let currPage = pages[pages.length - 1]; //当前页面
          // this.setData({
          //   addressId: currPage.options.addressId //获取上上级页面传的参数
          // });
        }
      });
    },
    resetAddress() {
      this.address = {
        name: "",
        phonNumber: null,
        shopRegionName: "",
        shopRegionId: null,
        detailInfo: "",
        isDefault: 0
      };
    },
    cancel() {
      this.showArea = false;
    },
    confirm(indexs) {
      let areaList = [];
      areaList = indexs.mp.detail.values;
      let shopRegionName = "";

      for (let index = 0; index < areaList.length; index++) {
        if (index === 0) {
          shopRegionName = areaList[index].name;
        } else {
          shopRegionName = shopRegionName + "-" + areaList[index].name;
        }
      }
      this.address.shopRegionName = shopRegionName;
      this.address.shopRegionId = areaList[areaList.length - 1].code;
      this.showArea = false;
    }
  },

  onShow() {
    wx.setNavigationBarTitle({ title: "我的收货地址" });
  },
  onLoad(options) {
    console.log("onLoad -> options", options);
    if (options.addressId <= 0) {
      this.resetAddress();
    } else {
      this.getAddressById(options.addressId);
    }
  }
};
</script>
<style scoped></style>

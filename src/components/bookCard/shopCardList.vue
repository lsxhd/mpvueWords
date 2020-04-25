<template>
  <div>
    <scroll-view>
      <van-checkbox-group :value="allShopList" @change="shopCheckedChange">
        <van-checkbox
          v-for="(shopCarBook, key) in shopCarBookList"
          :key="key"
          :shopCarBook="shopCarBook.shopCar"
          :name="shopCarBook.shopCarId"
          checked-color="red"
        >
          <van-card
            :price="shopCarBook.price"
            :title="shopCarBook.title"
            :thumb="shopCarBook.imgUrl"
            @click.stop="gotoDetail(shopCarBook.bookId)"
          >
            <view slot="footer" class="rightAndLeft">
              <span></span>
              <div class="rightAndLeft" style="width: 30%">
                <van-tag size="small" @click.stop="subtractShopNumber(key)"
                  >-</van-tag
                >
                <van-tag plain @click.stop="">
                  {{ shopCarBook.bookNumber }}
                </van-tag>
                <van-tag size="small" @click.stop="addShopNumber(key)"
                  >+</van-tag
                >
              </div>
            </view>
          </van-card>
        </van-checkbox>
      </van-checkbox-group>
    </scroll-view>
  </div>
</template>
<script>
import { updateShopCar, deleteShopCar } from "@/dao/modules/shopCar";
export default {
  props: {
    shopCarBookList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      allShopList: []
    };
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      this.allShopList.forEach(shopCarId => {
        this.shopCarBookList.forEach(element => {
          if (shopCarId == element.shopCarId) {
            totalPrice += element.price * element.bookNumber;
            console.log(
              element.price,
              element.bookNumber,
              element.price * element.bookNumber
            );
          }
        });
      });
      return totalPrice;
    }
  },
  watch: {},
  methods: {
    gotoDetail(bookId) {
      wx.navigateTo({
        url: "/pages/bookStore/bookDetail/main?bookId=" + bookId
      });
    },
    shopCheckedChange(event) {
      console.log(event);

      this.allShopList = event.mp.detail;

      this.$emit("getTotalPrice", this.totalPrice);
    },
    addShopNumber(key) {
      console.log("dsfdfs", key);
      let params = {
        shopCarId: this.shopCarBookList[key].shopCarId,
        bookNumber: this.shopCarBookList[key].bookNumber + 1
      };
      updateShopCar(params).then(res => {
        if (res.data.data) {
          this.shopCarBookList[key].bookNumber += 1;
          this.$emit("getTotalPrice", this.totalPrice);
        }
      });
    },
    subtractShopNumber(key) {
      if (this.shopCarBookList[key].bookNumber - 1 == 0) {
        deleteShopCar({ shopCarId: this.shopCarBookList[key].shopCarId }).then(
          res => {
            if (res.data.data) {
              this.$Notify({ type: "success", message: "????" });
              this.$emit("updataData");
            }
          }
        );
      } else {
        let params = {
          shopCarId: this.shopCarBookList[key].shopCarId,
          bookNumber: this.shopCarBookList[key].bookNumber - 1
        };
        updateShopCar(params).then(res => {
          if (res.data.data) {
            this.shopCarBookList[key].bookNumber -= 1;
            this.$emit("getTotalPrice", this.totalPrice);
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>

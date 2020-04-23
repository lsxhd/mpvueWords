<template>
  <div>
    <van-checkbox-group :value="allShopList" @change="shopCheckedChange">
      {{ totalPrice }}
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
          @click.stop="gotoDetail(shopCarBook.shopCarBookId)"
        >
          <view slot="footer">
            <van-tag round @click.stop="updateShop(key)">-</van-tag>
            <van-tag plain @click.stop="">{{ shopCarBook.bookNumber }}</van-tag>
            <van-tag round @click.stop="updateShop(key)">+</van-tag>
          </view>
        </van-card>
      </van-checkbox>
    </van-checkbox-group>
  </div>
</template>
<script>
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
  computer: {
    totalPrice() {
      let totalPrice = 0;
      this.allShopList.forEach(shopCarId => {
        this.shopCarBookList.forEach(element => {
          if (shopCarId === element.shopCarId) {
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

      // 计算总价

      this.$emit("getTotalPrice", this.totalPrice);
    },
    updateShop(shopCarBook) {
      console.log("shopCarBook", shopCarBook);
    }
  }
};
</script>
<style lang="scss" scoped></style>

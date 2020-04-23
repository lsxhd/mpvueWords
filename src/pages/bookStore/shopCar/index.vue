<template>
  <div>
    <topSearch></topSearch>
    <shopCardList
      :isAllchecked="isAllchecked"
      :shopCarBookList="shopCarBookList"
      @getTotalPrice="getTotalPrice"
    ></shopCardList>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <!-- <van-checkbox
        :value="!isAllchecked"
        checked-color="red"
        @change="allCheckedChange"
        >全选</van-checkbox
      > -->
    </van-submit-bar>
  </div>
</template>
<script>
import topSearch from "@/components/bookCard/topSearch.vue";
import { getShopCar } from "@/dao/modules/shopCar";
import shopCardList from "@/components/bookCard/shopCardList.vue";
export default {
  components: { shopCardList, topSearch },
  data() {
    return {
      shopCarBookList: {},
      isAllchecked: 2
    };
  },
  mounted() {
    this.getInitialData();
  },
  methods: {
    getInitialData() {
      this.shopCarBookList = [
        {
          shopCarId: 1,
          bookNumber: 1,
          author: "陈灿",
          bookId: 2,
          bookTypeId: 1,
          detail:
            "《24天突破高考大纲词汇3500》为西安新东方学校陈灿老师的心血之作。本书语言幽默诙谐，内容生动有趣，旨在帮助高中学生在较短时间内快速、有效地记忆高考大纲所规定的3500左右的单词。全书内容丰富、特点鲜明，既有作者精心提炼的 词汇记忆成功学 ，为考生阐释词汇记忆理论基础，又有作者总结的 16大词汇记忆诀窍 ，为考生揭示词汇记忆方法论。主体部分为每个词条配有精准、凝练的中文释义，同时为其设置经典例句、助记方法、用法点拨、高考考点等丰富项目，如果是高考真题出现过的词条，还会将高考原题或原句摘录出来，供学生品读、体会；主体部分将3500词划分为24个单元，每天一单元，并分为Part A和Part B两部分，共24天，每天结束部分还配有 天天练习 ，温故知新 栏目，以帮助学生巩固词汇学习、灵活运用所记单词。 该书词条配有专业外教",
          imgUrl: "http://img3m2.ddimg.cn/25/33/23764282-1_b_1.jpg",
          isDelete: 0,
          modifier: "",
          parentUrl:
            "http://search.dangdang.com/?key=%D3%A2%D3%EF%BF%BC%CA%D4&act=input&category_path=01.00.00.00.00.00&type=01.00.00.00.00.00&page_index=1",
          price: 25.5,
          publish: "浙江教育出版社",
          request: null,
          title: "新东方 24天突破高考大纲词汇3500 高中词汇",
          updateTime: "2020-04-21 21:47:30"
        },
        {
          shopCarId: 2,
          bookNumber: 1,
          author: "英国剑桥大学考试委员会外语考试部",
          bookId: 3,
          bookTypeId: 1,
          detail:
            "剑桥少儿英语考试全真试题I 由剑桥大学考试委员会外语考试部编写，经剑桥大学出版社和剑桥大学考试委员会外语考试部授权，由外语教学与研究出版社在中国境内独家出版。这套真题来自于剑桥大学ESOL考试中心试题库，与剑桥少儿英语考试试题来自于同一个试题库。这套图书与2007年**的剑桥少儿英语考试大纲相呼应，反映了**的题型变化以及考纲在词汇、语法方面的新要求，是准备参加剑桥少儿英语考试的考生的必备材料。",
          imgUrl: "http://img3m6.ddimg.cn/72/22/23824026-1_b_8.jpg",
          isDelete: 0,
          modifier: "",
          parentUrl:
            "http://search.dangdang.com/?key=%D3%A2%D3%EF%BF%BC%CA%D4&act=input&category_path=01.00.00.00.00.00&type=01.00.00.00.00.00&page_index=1",
          price: 30.8,
          publish: "外语教学与研究出版社",
          request: null,
          title: "剑桥少儿英语考试全真试题第二级I(CD光盘版)",
          updateTime: "2020-04-21 21:47:42"
        },
        {
          shopCarId: 3,
          bookNumber: 2,
          author: "英国剑桥大学考试委员会外语考试部",
          bookId: 4,
          bookTypeId: 1,
          detail:
            "剑桥少儿英语考试全真试题I 由剑桥大学考试委员会外语考试部编写，经剑桥大学出版社和剑桥大学考试委员会外语考试部授权，由外语教学与研究出版社在中国境内独家出版。这套真题来自于剑桥大学ESOL考试中心试题库，与剑桥少儿英语考试试题来自于同一个试题库。这套图书与2007年**的剑桥少儿英语考试大纲相呼应，反映了全新的题型变化以及考纲在词汇、语法方面的新要求，是准备参加剑桥少儿英语考试的考生的必备材料。",
          imgUrl: "http://img3m0.ddimg.cn/76/26/23824030-1_b_7.jpg",
          isDelete: 0,
          modifier: "",
          parentUrl:
            "http://search.dangdang.com/?key=%D3%A2%D3%EF%BF%BC%CA%D4&act=input&category_path=01.00.00.00.00.00&type=01.00.00.00.00.00&page_index=1",
          price: 27.4,
          publish: "外语教学与研究出版社",
          request: null,
          title: "剑桥少儿英语考试全真试题第一级I(配光盘)",
          updateTime: "2020-04-21 21:47:50"
        }
      ];
      getShopCar().then(res => {
        console.log(res.data.data);
      });
    },
    getTotalPrice(totalPrice) {
      console.log("getTotalPrice", totalPrice);
    },
    allCheckedChange() {
      this.isAllchecked = !this.isAllchecked;
    }
  },
  onShow() {
    wx.setNavigationBarTitle({ title: "购物车" });
  }
  // onLoad: function(options) {
  //   getBookById({ bookId: options.bookId || 2 }).then(res => {
  //     console.log(res);
  //     this.bookInfo = res.data.data;
  //   });
  // }
};
</script>
<style scoped></style>

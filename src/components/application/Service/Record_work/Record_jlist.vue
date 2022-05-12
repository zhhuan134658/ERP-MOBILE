<template>
  <!--  记工列表-->
  <div id="jigonglist">
    <h3 style="text-align: center">{{ spanTime }}</h3>
    <div
      class="conteng"
      v-if="itemdata.duration"
      @click="lookinfo(2, itemdata)"
    >
      <div class="conteng_left">
        <div class="title">记工:{{ itemdata.duration }}</div>
        <div class="time">{{ itemdata.riqi }}</div>
      </div>
      <div class="conteng_right">
        {{ itemdata.wages }}
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ysScaYttYP1619505979922.png"
          alt=""
        />
      </div>
    </div>
    <div
      class="conteng"
      v-if="itemdata.skill"
      v-for="(item, index) in itemdata.skill"
      @click="lookinfo(1, item)"
    >
      <div class="conteng_left">
        <div class="title">借支</div>
        <div class="time">{{ item.riqi }}</div>
      </div>
      <div class="conteng_right">
        {{ item.jz_money }}
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ysScaYttYP1619505979922.png"
          alt=""
        />
      </div>
    </div>
    <div class="back" @click="backbtn">返回记工本</div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "",
  components: {},
  data() {
    return {
      itemdata: "",
      spanTime: this.$store.state.userData.spanTime,
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "记工列表", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    lookinfo(num, item) {
      this.$router.push({
        path: "/Record_info",
        query: {
          itemnum: this.itemdata,
          spanTime: this.spanTime,
          num: num,
        },
      });
      // ziitemdata;
      this.$store.commit("setziitemdata", item);
    },
    backbtn() {
      this.$router.push({
        path: "/Record_book",
      });
    },
  },
  created() {
    this.setTitle();
    this.itemdata = this.$store.state.userData.jiitemdata;
  },
  mounted() {},
};
</script>
<style lang='less' >
#jigonglist {
  padding-top: 0.67rem;
  .conteng {
    width: 80%;
    background-color: #fff;
    margin: 0.67rem auto;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    .conteng_right {
      color: #377fee;
      font-size: 1.2rem;
      img {
        width: 0.5rem;
        height: 1rem;
      }
    }
    .conteng_left {
      .title {
        font-size: 1.2rem;
        font-weight: 600;
        padding: 0.2rem;
      }
      .time {
        padding: 0.2rem;
        color: #939598;
        font-size: 0.7rem;
      }
    }
  }
  .back {
    background-color: #467eed;
    color: #fff;
    width: 80%;
    height: 2.5rem;
    border-radius: 0.5rem;
    text-align: center;
    line-height: 2.5rem;
    margin: 0.67rem auto;
    font-size: 1rem;
  }
}
</style>

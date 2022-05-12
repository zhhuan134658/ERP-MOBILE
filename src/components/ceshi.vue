<template>
  <!--  -->
  <div id="ceshi">
    <div @click="aaa">重置</div>
    <ul>
      <li v-for="(item, index) in list">{{ item[keys] }}</li>
    </ul>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "ceshi",
  components: {},
  data() {
    return {
      keys: "a",
      list: [
        { a: "1", b: "2", c: "3" },
        { a: "11", b: "21", c: "31" },
        { a: "12", b: "22", c: "32" },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.device.screen.rotateView({
          showStatusBar: true, // 否显示statusbar
          clockwise: true, // 是否顺时针方向
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    aaa() {
      dd.ready(function () {
        dd.device.screen.resetView({
          showStatusBar: true, // 否显示statusbar
          clockwise: true, // 是否顺时针方向
          onSuccess: function (result) {
            this.$router.go(-1);
          },
          onFail: function (err) {},
        });
      });
    },
  },
  created() {
    this.$utils.checkding();
    console.log(this.$utils.numberParseChina("123465.0133"));

    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
</style>

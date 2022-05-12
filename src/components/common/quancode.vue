<template>
  <!--  -->
  <div id="wuquanxian">
    <img
      src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/hCeFEs2Mbx1607494454359.png"
      alt=""
    />
    <div>{{ msg }}</div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "wuquanxian",
  components: {},
  data() {
    return {
      msg: this.$route.query.msg,
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.biz.navigation.setRight({
        show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
#wuquanxian {
  height: 1609px;
  position: fixed;
  z-index: 1111143;
  width: 100%;
  top: 0;
  background-color: #fff;
  text-align: center;
  padding-top: 10rem;
  font-size: 1rem;
}
</style>

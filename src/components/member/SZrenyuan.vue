<template>
  <!--  -->
  <div id="quanxianindex" style="padding-top: 0.33rem">
    <div class="content" v-for="(item, index) in systemList">
      <van-cell
        is-link
        :title="item.name"
        :value="item.num + '人'"
        @click="gonext(item)"
      />
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "quanxianindex",
  components: {},
  data() {
    return {
      systemList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.biz.navigation.setRight({
        show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "人员设置", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },
    gonext(val) {
      this.$router.push({ path: "/quanxianren", query: { val: val } });
    },

    getsystem() {
      this.$axios
        .post("/erp_check/qxuserlist", {
          corp_id: this.$store.state.userData.cid,
        })
        .then((res) => {
          this.systemList = res.data.data;
        });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    // this.addpeo();
    this.getsystem();
  },
  mounted() {},
};
</script>
<style lang='less' >
#quanxianindex {
  .content {
    box-sizing: border-box;
    margin-bottom: 0.5rem;

    background-color: #ffffff;

    overflow: hidden;
    .van-cell {
      line-height: 2rem;
      padding: 0.6rem;
      .van-cell__title {
        font-size: 1rem;
        color: #0e1a29;
      }
      .van-cell__value {
        font-size: 1rem;
      }
      .van-icon {
        font-size: 1rem;
        line-height: 2rem;
      }
    }
  }
}
</style>

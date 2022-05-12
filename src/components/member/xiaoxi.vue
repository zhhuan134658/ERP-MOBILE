<template>
  <!--  -->
  <div id="dtfile">
    <div class="content" v-for="(item, index) in FilesList">
      <div class="item_top">
        <div>{{ item.createdtime }}</div>
        <!-- <div>{{item.time}}</div> -->
      </div>
      <div class="item_bottom">{{ item.parere }}</div>
    </div>
    <Empty v-if="Emptyshow"></Empty>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import Empty from "../common/Empty.vue";
import qs from "qs";
export default {
  name: "dtfile",
  components: { Empty },
  data() {
    return {
      // 分页列表
      Searchname: "",
      FilesList: [],
      isLoading: false,
      loading: false, // 当loading为true时，转圈圈
      current_page: 1,
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
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.time) && res.set(arr.time, 1));
    },
    onLoad() {
      this.getTaiList();
      this.loading = true;
    },
    getTaiList() {
      this.$axios.post("/finance/tonotice").then((res) => {
        if (res.data.code == 1) {
          if (res.data.content.length > 0) {
            this.FilesList = res.data.content;
          } else {
            this.Emptyshow = true;
          }
        }
      });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getTaiList();
  },
  mounted() {},
};
</script>
<style lang='less' >
#dtfile {
  padding: 0.16rem;

  .content {
    border-radius: 0.5rem;
    background-color: #fff;
    padding: 1rem;
    margin-bottom: 0.33rem;
    .item_top {
      display: flex;
      justify-content: space-between;
      font-size: 1.17rem;
      padding-bottom: 0.33rem;
      border-bottom: 0.06rem solid #eeeff3;
    }
    .item_bottom {
      margin-top: 0.33rem;
      font-size: 1rem;
      line-height: 1.67rem;
      color: #606266;
    }
  }
}
</style>

<template>
  <!--  -->
  <div id="dtfile">
    <div
      class="content"
      v-for="(item, index) in FilesList"
      @click="chancgeitem(item)"
    >
      <div class="item_top">
        <div>{{ item.created }}</div>
        <div v-if="item.extend_first == 1" style="color: rgb(245, 108, 108)">
          未读
        </div>
        <div v-else style="color: rgb(103, 194, 58)">已读</div>
      </div>
      <div class="item_bottom">{{ item.content }}</div>
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
      FilesList: [
        {
          content: "1465646546",
          created: "12121212121",
        },
      ],
      isLoading: false,
      loading: false, // 当loading为true时，转圈圈
      current_page: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.biz.navigation.setTitle({
        title: "预警列表", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
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
      this.$axios
        .post("/projectfour/yujingList", {
          page: "1",
          number: "999999",
          type: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            if (res.data.data.length > 0) {
              this.FilesList = res.data.data;
            } else {
              this.Emptyshow = true;
            }
          }
        });
    },
    chancgeitem(item) {
      if (item.extend_first == 1) {
        this.$axios
          .post("/projectfour/yujingEdit", {
            id: item.id,
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.getTaiList();
            }
          });
      }
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

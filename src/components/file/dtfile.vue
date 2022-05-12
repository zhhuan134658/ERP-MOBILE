<template>
  <!--  -->
  <div id="dtfile">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="content" v-for="(item, index) in FilesList">
        <div class="item_top">
          <div>{{ item.name }}</div>
          <div>{{ item.time }}</div>
        </div>
        <div class="item_bottom">{{ item.neirong }}</div>
      </div>
    </van-list>

    <Empty v-if="Emptyshow"></Empty>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "../common/Empty.vue";
export default {
  name: "dtfile",
  components: { Empty },
  data() {
    return {
      // 分页列表
      Emptyshow: false,
      Searchname: "",
      FilesList: [
        {
          name: "张欢欢",
          neirong:
            "在京京数据项目文件'2509195509tl.docx'权限管理中执行了添加人员权限",
          time: "2020-11-10 13:47:55",
        },
        {
          name: "张欢欢",
          neirong:
            "在京京数据项目文件'2509195509tl.docx'权限管理中执行了添加人员权限",
          time: "2020-11-10 13:47:55",
        },
      ],
      isLoading: false,
      loading: false, // 当loading为true时，转圈圈
      current_page: 1,
    };
  },
  computed: {},
  watch: {
    FilesList: {
      handler(val, oldval) {
        if (val.length > 0) {
          this.Emptyshow = false;
        } else {
          this.Emptyshow = true;
        }
      },
    },
  },
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "文件动态", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
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
        .post("/index.php/api/cy_xiezhu/WenJianDongTaiList", {
          xmid: this.$store.state.userData.Selecteddata.id,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            if (!this.Searchname) {
              if (res.data.content.list.length > 0) {
                this.FilesList = this.deunique(
                  this.FilesList.concat(res.data.content.list)
                ); //追加数据
                // this.FilesList.push(...res.data.content.list);
              } else {
                this.FilesList = res.data.content.list;
                this.finished = true;
                // this.Emptyshow = true;
              }
            } else {
              this.FilesList = [];
              this.FilesList = this.deunique(res.data.content.list); //追加数据
            }
            // page
            if (
              this.current_page == res.data.content.page ||
              res.data.content.list.length == 0
            ) {
              //数据全部加载完成
              this.finished = true;
            } else {
              this.current_page += 1;
              this.finished = false;
            }
          } else {
            Toast(res.data.msg);
          }
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

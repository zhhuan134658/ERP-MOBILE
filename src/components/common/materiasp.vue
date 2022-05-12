<template>
  <!-- 项目列表 -->
  <div id="checked">
    <van-sticky style="background-color: #f0f0f0">
      <div class="inputdiv">
        <van-search
          v-model="Searchname"
          placeholder="请填写搜索条件"
          show-action
          shape="round"
        >
          <div slot="action">
            <van-button @click="searchonLoad" type="default">搜索</van-button>

            <!-- <van-button
                        @click="creatin"
                        type="default"
                    >新建</van-button> -->
          </div>
        </van-search>
      </div>
    </van-sticky>
    <!-- 项目主体 -->
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div
        class="member-item"
        v-for="(item, index) in FilesList"
        :key="index"
        @click="projectinfo(item)"
      >
        <!--     @click="addguamli(2)" -->
        <div class="member-img">
          <div class="item_name1">{{ item.name }}</div>
        </div>
        <div class="member-font">
          <div class="member-font1">
            <div class="item_name2">物品类型:{{ item.type_name }}</div>
            <div class="item_name2">单位:{{ item.unit }}</div>
            <div class="item_name2">规格型号:{{ item.size }}</div>
          </div>
        </div>
      </div>
    </van-list>
    <Empty v-if="Emptyshow"></Empty>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";

import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
import Empty from "../common/Empty.vue";
export default {
  components: { Empty },
  data() {
    return {
      isrouter: [],
      Emptyshow: false,
      Searchname: "",
      project_status: "",
      starttime: "",
      stoptime: "",
      val: "",
      //分页
      FilesList: [],
      list: [],
      loading: false,
      finished: false,
      total: "",
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
          title: "选择项目", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },

    searchonLoad() {
      this.FilesList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;

      this.onLoad();
    },
    projectinfo(item) {
      this.$store.commit("setspmateriadata", item);
      this.$router.go(-1);
    },
    onLoad() {
      this.$axios
        .post("/project/materialGoodsList", {
          page: this.current_page,
          number: "10",

          name: this.Searchname,

          type: 0,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.loading = false;
            if (!this.Searchname) {
              if (res.data.data.length > 0) {
                this.FilesList = this.deunique(
                  this.FilesList.concat(res.data.data)
                ); //追加数据
                // this.FilesList.push(...res.data.data);
              } else {
                this.FilesList = res.data.data;
                this.finished = true;
                // this.Emptyshow = true;
              }
            } else {
              if (res.data.data.length > 0 || res.data.data == null) {
                this.FilesList = [];
                this.FilesList = this.deunique(res.data.data);
                // this.Emptyshow = false;
              } else {
                this.FilesList = [];
                // this.Emptyshow = true;
              }
            }

            // page
            if (
              this.current_page == res.data.page_number ||
              res.data.data.length == 0 ||
              res.data.data == null
            ) {
              //数据全部加载完成

              this.finished = true;
            } else {
              this.current_page += 1;
              this.finished = false;
            }
          } else {
            Toast(res.data.msg);
            this.finished = true;
          }
        });
    },
  },
  mounted() {},
  created() {
    // console.log(this.$route.query.val);
    this.$utils.checkding();
    this.setTitle();
  },
};
</script>
<style lang="less">
#checked {
  .member-item {
    margin-bottom: 0.33rem;
    // border-bottom: 0.13rem solid #d9d9d9;

    padding: 0.3rem;
    background-color: #fff;
    display: flex;
    .member-img {
      font-size: 1rem;
      margin: auto;
      width: 40%;
      height: 3.33rem;

      .item_name1 {
        text-align: center;
        line-height: 3.33rem;

        font-size: 1.17rem;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .member-font {
      width: 80%;
      line-height: 1.67rem;
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      .member-font1 {
        margin-left: 0.67rem;

        .item_name2 {
          font-size: 1.06rem;
          color: #858b96;
        }
      }
      .member-font2 {
        color: #409eff;
        line-height: 5rem;
      }
    }
  }
}
</style>

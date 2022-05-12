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
      <div class="pr_list">
        <div
          class="list_item"
          @click="projectinfo(item)"
          v-for="item in FilesList"
          :key="item"
        >
          <div class="item_img">
            <img
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/DnZXQ26B841600655714494.png"
              alt
            />
          </div>
          <div style="width: 70%">
            <div class="item_name">
              <div class="item_span">{{ item.project_status }}</div>
              <div class="pr_name">{{ item.name }}</div>
            </div>
            <div class="item_tel">项目负责人:{{ item.stand_termer }}</div>
            <div class="item_tel">总工期：{{ item.day_number }}天</div>
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
      this.$store.commit("setspprojectdata", item);
      this.$router.go(-1);

      // this.superlist[0].name = item.puseridname;
      // // this.supervisor[0].avatar = this.$store.state.userData.avatar;

      // this.superlist[0].emplId = item.puserid;
      // this.$store.commit('setsupervisor', this.superlist);
    },
    onLoad() {
      this.$axios
        .post("/project/projectInfoRegisterList", {
          page: this.current_page,
          number: "10",
          start_plan_start_riqi: "",
          end_plan_start_riqi: "",
          stand_termer: "",
          start_plan_end_riqi: "",
          end_plan_end_riqi: "",
          name: this.Searchname,
          project_status: "中标",
          send_name: "",
          construction_unit: "",

          status: "",
          type: this.typename,

          shenpi: 7,
          // corp_id: this.$store.state.userData.cid,
          // userid: this.$store.state.userData.userid,
          // projectname: this.$store.state.userData.Selecteddata
          //     .pcontent,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.numbledata = res.data.tj;
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
</style>

<template>
  <!-- 项目列表 -->
  <div id="projectlist">
    <van-sticky style="background-color: #f0f0f0">
      <div class="inputdiv">
        <van-search
          v-model="seaname"
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

    <div class="pr_list">
      <div class="list_item" v-for="item in FilesList" :key="item">
        <div style="display: flex" @click="projectinfo(item)">
          <div style="width: 75%">
            <div class="item_name">
              <div class="item_name_img">
                <img src="../../../static/images/27.png" alt="" />
              </div>
              <div class="pr_name">{{ item.project_name }}</div>
              <div></div>
            </div>
            <!-- <div class="item_tel">
                            <div class="item_tel_item">
                                项目负责人:{{ item.stalker }}
                            </div>
                            <div class="item_tel_item1">
                                计划开始时间：{{ item.plan_start_riqi }}
                            </div>
                            <div class="item_tel_item1">
                                计划结束时间：{{ item.plan_end_riqi }}
                            </div>
                        </div> -->
          </div>
          <!-- <div style="width: 25%">
                        <div
                            class="chuangtai"
                            v-if="item.status == 2"
                            style="color: rgb(103, 194, 58)"
                        >
                            已通过
                        </div>
                        <div
                            class="chuangtai"
                            v-if="item.status == 1"
                            style="color: rgb(230, 162, 60)"
                        >
                            审批中
                        </div>
                        <div
                            class="chuangtai"
                            v-if="item.status == 3"
                            style="color: #67c23a"
                        >
                            已拒绝
                        </div>
                    </div> -->
        </div>
        <!-- <div class="item_jindu">
                    <div>项目进度:{{ item.jindu }}%</div>
                    <van-progress
                        :percentage="item.jindu"
                        stroke-width="8"
                        :show-pivot="false"
                        color="#FF4848"
                    />
                </div> -->
      </div>
    </div>

    <Empty v-if="Emptyshow"></Empty>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
import Empty from "../common/Empty.vue";
export default {
  components: { Empty },
  data() {
    return {
      datainfo: "",
      typename: "",
      isrouter: [],
      Emptyshow: false,
      seaname: "",
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
          title: "项目列表", //控制标题文本，空字符串表示显示默认文本
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
      this.onLoadlist();
    },
    projectinfo(item) {
      console.log("2++", item);
      if (this.typename == "1") {
        this.$router.replace({
          path: "/jilog",
          query: {
            pro_data: item,
          },
        });
      } else {
        this.$router.replace({
          path: "/gongcheng",
          query: {
            pro_data: item,
          },
        });
      }

      // this.superlist[0].name = item.puseridname;
      // // this.supervisor[0].avatar = this.$store.state.userData.avatar;

      // this.superlist[0].emplId = item.puserid;
      // this.$store.commit('setsupervisor', this.superlist);
    },
    onLoadlist() {
      console.log(this.seaname);
      this.$axios
        .post("/finance/getstart_pro", {
          name: this.seaname,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.FilesList = res.data.data;
          } else {
            Toast(res.data.msg);
          }
        });
    },

    Selected(item) {
      this.$store.commit("setSelecteddata", item);

      this.GetProjectUserRole(item.id);
    },
  },
  mounted() {},
  created() {
    console.log(this.$route.query.val);
    this.$utils.checkding();
    this.setTitle();
    this.onLoadlist();
    this.typename = this.$route.query.type;
    this.datainfo = this.$route.query.datainfo;
  },
};
</script>
<style lang="less">
#projectlist {
  .inputdiv {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    width: 100%;
    height: 4.5rem;

    background-color: #e6e6e6;
    .van-search {
      width: 100%;
      height: 100%;

      .van-search__action {
        font-size: 0.6rem;
        line-height: 1rem;
        background-color: #fff;
        .van-button {
          height: 1.8rem;
          width: 4rem;

          .van-button__text {
            font-size: 1rem;
          }
        }
      }
      .van-search__action {
        height: 100%;
        line-height: 4rem;
        .van-button--normal {
          border-radius: 0.33rem;
          height: 2.5rem;
          .van-button__text {
            color: #409eff;
          }
        }
      }
      .van-search__content--round {
        border-radius: 0.33rem;
      }
      .van-search__content {
        .van-cell {
          height: 2.5rem;
          line-height: 2.2rem;
          font-size: 1rem;
          .van-field__left-icon {
            .van-icon {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
  .pr_list {
    .list_item {
      margin: 0.67rem;
      padding: 0.33rem 0.5rem;
      // height: 222px;
      background-color: #fff;

      box-shadow: 0px 0px 13px 0px #f0f0f0;
      border-radius: 0.21rem;

      // align-items: center;

      .item_name {
        display: flex;
        align-items: center;
        height: 2.33rem;
        .pr_name {
          font-weight: 600;
          font-size: 1.17rem;
          margin-left: 0.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .item_span {
          padding: 0.1rem 0.23333rem;
          border-radius: 0.47rem;
          white-space: nowrap;
          text-align: center;
          color: #38cc9c;
          border: 0.03rem solid #38cc9c;
          margin-left: 0.5rem;
        }
        .item_name_img {
          img {
            width: 1.1rem;
            height: 1.1rem;
            line-height: 0;
            display: flex;
            align-items: center;
          }
        }
      }
      .item_tel {
        display: flex;
        flex-wrap: wrap;
        .item_tel_item {
          width: 50%;

          font-size: 1rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 2rem;
        }
        .item_tel_item1 {
          width: 100%;

          font-size: 1rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 2rem;
        }
      }
      .chuangtai {
        height: 2.33rem;
        line-height: 2.33rem;
        text-align: right;

        font-size: 0.8rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #38cc9c;
      }
      .item_jindu {
        padding-top: 0.53rem;
        font-size: 0.93rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: 1.67rem;
        border-top: 0.1rem solid #eceff3;

        display: flex;
        align-items: center;
        justify-content: space-between;

        .van-progress {
          width: 30%;
          border: 0.03rem solid #ff4848;
          background: #fff;
        }
      }
    }
    .list_foot {
      text-align: center;
      color: #58595b;
    }
  }
}
</style>

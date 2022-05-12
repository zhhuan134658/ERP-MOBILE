<template>
  <!-- 项目看板 -->
  <div id="projectindexnew">
    <!--项目搜索  -->
    <van-sticky>
      <div class="inputdiv">
        <van-search
          v-model="Searchname"
          placeholder="请填写搜索条件"
          show-action
          shape="round"
          @change="searchonLoad"
        >
          <div slot="action">
            <van-button @click="searchonLoad" type="info">搜索</van-button>
            <van-button @click="shaixuan" type="info">筛选</van-button>
            <!-- <van-button
                        @click="creatin"
                        type="default"
                    >新建</van-button> -->
          </div>
        </van-search>
      </div>
      <!-- 项目分项 -->
      <div class="pr_concent">
        <div
          class="item"
          @click="goLIST(1)"
          style="
            background: url('https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TX3tK7kcDN1614824772457.png')
              no-repeat;
            background-size: 100% 100%;
          "
        >
          <div class="title">
            项目总数:<span>{{ numbledata.zong_count }}</span>
          </div>

          <div class="title">
            金额(万元):<span>{{ numbledata.zong_money }}</span>
          </div>
        </div>
        <div
          class="item"
          @click="goLIST(2)"
          style="
            background: url('https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MySTdZDnWk1614824772881.png')
              no-repeat;
            background-size: 100% 100%;
          "
        >
          <div class="title">
            在建项目:<span>{{ numbledata.zj_count }}</span>
          </div>

          <div class="title">
            金额(万元):<span>{{ numbledata.zj_money }}</span>
          </div>
        </div>
        <div
          class="item"
          @click="goLIST(3)"
          style="
            background: url('https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/JwdZd8aNj41614824773057.png')
              no-repeat;
            background-size: 100% 100%;
          "
        >
          <div class="title">
            本年新增数: <span>{{ numbledata.xz_count }}</span>
          </div>

          <div class="title">
            金额(万元): <span>{{ numbledata.xz_money }}</span>
          </div>
        </div>
        <div
          class="item"
          @click="goLIST(4)"
          style="
            background: url('https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XJmf7fapjr1614824773224.png')
              no-repeat;
            background-size: 100% 100%;
          "
        >
          <div class="title">
            本年竣工数:<span>{{ numbledata.jg_count }}</span>
          </div>

          <div class="title">
            金额(万元):<span>{{ numbledata.jg_money }}</span>
          </div>
        </div>
      </div>
    </van-sticky>
    <!-- 项目主体 -->
    <!--     finished-text="没有更多了" -->

    <div class="pr_list">
      <div
        class="list_item"
        @click="projectinfo(item)"
        v-for="item in FilesList"
        :key="item"
      >
        <div style="display: flex">
          <div style="width: 75%">
            <div class="item_name">
              <div class="item_name_img">
                <img src="../../../static/images/27.png" alt="" />
              </div>
              <div class="pr_name">
                {{ item.project_name }}
              </div>
              <div class="item_span">
                {{ item.project_status }}
              </div>
            </div>
            <div class="item_tel">
              <div class="item_tel_item">项目负责人:{{ item.stalker }}</div>
              <div class="item_tel_item">
                开工累计天数:{{ item.start_days }}天
              </div>
              <div class="item_tel_item1">项目产值:{{ item.total }}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Empty v-if="Emptyshow"></Empty>

    <van-popup
      v-model="popupshow"
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="zstype">
        <div class="typetitle">
          <div class="titlepoint"></div>
          <div class="titlefont">按项目类型</div>
        </div>
        <div
          class="typecontent"
          v-for="(item, index) in TypyList"
          :key="index"
          @click="Typeclick(item, index)"
          :class="typenum == index ? 'typeColor' : ''"
        >
          {{ item.tmpname }}
        </div>
      </div>
      <div class="sureBtn">
        <van-button type="info" @click="shuaixuan">确定</van-button>
        <van-button type="warning" @click="clac">重置</van-button>
      </div>
    </van-popup>
    <van-overlay :show="overlayshow">
      <div class="wrapper">
        <div class="block">暂无权限</div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Dialog } from "vant";
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
      overlayshow: false,
      typenum: "",
      typename: "",
      numbledata: "",
      popupshow: false,
      superlist: [{ name: "", avatar: "", emplId: "" }],
      Emptyshow: false,
      TongZhList: [],
      Searchname: "",
      content: "",
      FilesList: [],
      //分页
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
      const that = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "项目看板", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    shuaixuan() {
      this.popupshow = false;
      this.FilesList = [];
      this.current_page = 1;

      this.onLoad();
    },
    Typeclick(item, index) {
      this.typenum = index;
      if (item.tmpname == "全部") {
        this.typename = "";
      } else {
        this.typename = item.tmpname;
      }
    },
    searchonLoad() {
      this.FilesList = [];
      this.current_page = 1;

      this.onLoad();
    },
    lookinfo(item) {
      dd.ready(function () {
        dd.biz.util.openLink({
          url: item.url, //要打开链接的地址
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
      });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },

    onLoad() {
      this.$axios
        .post("/task/puttotal", {
          current_page: this.current_page,
          num: "9999",
          project_name: this.Searchname,
          project_type: this.typename,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.numbledata = res.data.data.tj;
            this.loading = false;
            this.FilesList = res.data.data.content.list;
          } else if (res.data.code == 403) {
            this.overlayshow = true;
            this.finished = true;
          } else {
            // Toast(res.data.msg);
            this.finished = true;
          }
        });
    },

    getscan() {
      dd.ready(function () {
        dd.biz.util.scan({
          type: all, // type 为 all、qrCode、barCode，默认是all。
          onSuccess: function (data) {},
          onFail: function (err) {},
        });
      });
    },
    clac() {
      this.popupshow = false;
    },
    projectinfo(item) {
      this.$store.commit("setxminfo", item);
      this.$router.push({
        path: "/details_copynew",
      });

      // this.superlist[0].name = item.puseridname;
      // // this.supervisor[0].avatar = this.$store.state.userData.avatar;

      // this.superlist[0].emplId = item.puserid;
      // this.$store.commit('setsupervisor', this.superlist);
    },
    shaixuan() {
      this.popupshow = true;
      console.log("Ss");
    },
    goLIST(val) {
      if (val == 1) {
        this.$router.push({
          path: "/projectlist",
          query: {
            status: 2,
            xz_pro: "",
            project_status: "",
          },
        });
      } else if (val == 2) {
        this.$router.push({
          path: "/projectlist",
          query: {
            status: 2,
            xz_pro: "",
            project_status: "在建",
          },
        });
      } else if (val == 3) {
        this.$router.push({
          path: "/projectlist",
          query: {
            status: 2,
            xz_pro: 1,
            project_status: "",
          },
        });
      } else if (val == 4) {
        this.$router.push({
          path: "/projectlist",
          query: {
            status: 2,
            xz_pro: 1,
            project_status: "竣工",
          },
        });
      }

      this.$store.commit("setxmtype", val);
      console.log(val);
    },
  },
  mounted() {},
  created() {
    this.$utils.steWebview();
    // this.$utils.checkding();
    this.TypyList = this.$utils.utilProjectStatus();

    this.$utils.checkding();
    this.setTitle();
    this.onLoad();
  },
};
</script>
<style lang="less">
#projectindexnew {
  .van-overlay {
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    .block {
      padding: 0.67rem;
      border-radius: 0.5rem;
      font-size: 1.17rem;

      background-color: #fff;
    }
  }
  .pr_concent {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 0.67rem;

    .item {
      background: url("../../../static/images/23.png") no-repeat;
      background-size: 100% 180px;
      box-sizing: border-box;
      margin: 2%;
      width: 46%;

      height: 5.33rem;
      // float: left;

      border-radius: 0.33rem;

      padding: 0 10px;
      .title {
        text-align: center;
        margin-top: 0.9rem;
        // padding-left: 1.2rem;
        font-size: 1rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        // text-align: center;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // span {
        //     font-size: 1.07rem;
        // }
      }
    }
  }
  .van-notice-bar {
    .van-icon {
      font-size: 1rem;
    }
  }
  .notice-swipe {
    font-size: 1rem;
    height: 3.33rem;
    line-height: 3.33rem;
  }
  .dangqian {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: space-between; /*定义body的里的元素水平居中*/
    padding: 0 30px;
    height: 4rem;
    background-color: #409efe;
    color: #fff;
    .van-button {
      height: 1.8rem;
      border-radius: 0.5rem;
      .van-button__text {
        font-size: 1rem;
      }
    }
    .van-icon {
      font-size: 1.67rem;
    }
  }

  .inputdiv {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    width: 100%;

    background-color: #e6e6e6;
    .van-search {
      width: 100%;
      height: 100%;

      // .van-search__action {
      //     font-size: 0.6rem;
      //     line-height: 1rem;
      //     background-color: #fff;
      //     .van-button {
      //         height: 1.8rem;
      //         width: 4rem;

      //         .van-button__text {
      //             font-size: 1rem;
      //         }
      //     }
      // }
      .van-search__action {
        height: 100%;
        line-height: 3.1rem;
        .van-button--normal {
          border-radius: 0.33rem;
          height: 2rem;
          width: 3.33rem;
          .van-button__text {
            color: #fff;
            font-size: 1rem;
          }
        }
      }
      .van-search__content--round {
        border-radius: 0.33rem;
      }
      .van-search__content {
        .van-cell {
          height: 2rem;
          line-height: 2rem;
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
  .renwucontent {
    margin-top: 0.67rem;
    background-color: #fff;
    padding: 0.33rem 20px;
    border-radius: 0.33rem;
    .btem {
      display: flex;
      margin-left: 0.33rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .btem1 {
        max-width: 50%;
        font-size: 0.83rem;
        overflow: hidden;
        color: #606266;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btem2 {
        max-width: 50%;
        font-size: 0.83rem;
        color: #606266;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item_heard {
      display: flex;
      justify-content: space-between;
      line-height: 2.33rem;
      font-size: 1rem;
      color: #3b4045;
      align-items: center;
      margin-left: 0.33rem;
      .item_name {
        margin: 0.33rem 0;
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item_img {
        display: flex;
        align-items: center;
        font-size: 1.17rem;
        img {
          border-radius: 50%;
          width: 2.33rem;
          height: 2.33rem;
          margin-right: 0.33rem;
        }
        span {
          font-size: 0.83rem;
          display: inline-block;
          border-radius: 50%;
          width: 2.33rem;
          height: 2.33rem;
          line-height: 2.33rem;
          text-align: center;
          background-color: #387ef5;
          color: #fff;
        }
        .item_img_title {
          margin-left: 0.33rem;
          line-height: 1.17rem;
          padding-top: 0.33rem;

          .item_img_title1 {
            color: #000000;
            font-weight: 600;
          }

          .item_img_title2 {
            font-size: 0.67rem;
            color: #9f99a1;
          }
        }
      }
    }
    .item_time {
      font-size: 1rem;
      color: #3b4045;
      margin: 0.33rem 0;
    }
    .fenge {
      border-bottom: 0.03rem solid #eeeff3;
      margin-top: 0.5rem;
    }
    .item_bottom {
      padding: 0.5rem;
      display: flex;
      color: #485985;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;

        align-items: center;
      }

      .dele_bottom {
        color: red;
      }
    }
  }
  .van-popup {
    .sureBtn {
      position: absolute;
      bottom: 0.67rem;
      width: 100%;

      margin-bottom: 0.67rem;
      margin-top: 1rem;
      height: 2.67rem;
      line-height: 2.67rem;
      text-align: center;

      overflow: hidden;
      .van-button {
        width: 40%;
        height: 100%;
        border-radius: 0.27rem;
        span {
          font-size: 1rem;
        }
      }
    }
    .zstype {
      width: 100%;
      height: 80%;
      overflow: auto;

      background-color: #fff;
      .van-cell {
        padding: 0 0.5rem;
        height: 3.33rem;
        .van-cell__title {
          height: 100%;
          line-height: 3.33rem;
          font-size: 1rem;
          padding-left: 0.33rem;
        }
        .van-cell__value {
          .van-field__body {
            height: 100%;
            line-height: 3.33rem;
            .van-field__control {
              font-size: 1rem !important;
              line-height: 1rem !important;
              color: #000;
            }
          }
        }
      }

      .typetitle {
        display: flex;
        width: 100%;

        align-items: center; /*定义body的元素垂直居中*/
        // justify-content: center; /*定义body的里的元素水平居中*/
        padding: 1rem;
        box-sizing: border-box;
        .titlepoint {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #409efe;
        }
        .titlefont {
          margin-left: 0.67rem;
          color: #191f25;
          font-size: 0.93rem;
        }
      }
      .typecontent {
        margin: 1.5%;
        width: 30%;
        float: left;
        height: 2.33rem;
        background-color: #f4f4f4;
        border-radius: 0.33rem;

        font-size: 0.93rem;
        text-align: center;

        line-height: 2.33rem;

        color: #7a7d81;
      }
    }
  }
  .typeColor {
    background-color: #409efe !important;
    color: #fff !important;
  }
  .van-sticky {
    background-color: #fff;
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
          width: 100%;

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

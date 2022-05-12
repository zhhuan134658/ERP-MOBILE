<template>
  <!-- 任务 -->
  <div id="renwuindex">
    <div class="num_title" style="margin-top: 0">
      <div class="color_div"></div>
      <div class="color_font">发起任务</div>
    </div>
    <div class="newtask">
      <div class="newtaskitem">
        <div
          class="itemfont"
          @click="gomuban('2')"
          style="background: linear-gradient(-83deg, #ffc623, #ffb320)"
        >
          <div class="itemfont_img">
            <img
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/DnGN2EePis1614591209511.png"
              alt=""
            />
          </div>
          <div class="itemfont_font">文档任务</div>
        </div>
      </div>
      <div class="newtaskitem">
        <div
          class="itemfont"
          @click="gomuban('1')"
          style="background: linear-gradient(-83deg, #6298ff, #4380ff)"
        >
          <div class="itemfont_img">
            <img
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/4KQ24E3jn81614591209869.png"
              alt=""
            />
          </div>
          <div class="itemfont_font">普通任务</div>
        </div>
      </div>
    </div>
    <!-- <div
            class="guanlishuju"
            @click="gooverdue('0')"
        >
            <div class="guanlishuju_item">
                <img
                    src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/Hzb7Gmtitr1614591210029.png"
                    alt=""
                />
                管理数据
            </div>

        </div> -->
    <div class="num_title">
      <div class="color_div"></div>
      <div class="color_font">审批流程</div>
    </div>

    <div class="numble">
      <div class="numble_item" @click="gooverdue('1')">
        <div class="numble_1">{{ daydata.dzxtask }}</div>
        <!-- <div class="numble_1">11</div> -->
        <div class="numble_font">审批中</div>
      </div>

      <div class="numble_item" @click="gooverdue('2')">
        <div class="numble_1">{{ daydata.filetask }}</div>
        <div class="numble_font">归档中</div>
      </div>
      <div class="numble_item" @click="gooverdue('3')">
        <div class="numble_1">{{ daydata.ywjtask }}</div>
        <div class="numble_font">已完结</div>
      </div>
    </div>

    <div class="num_title">
      <div class="color_div"></div>
      <div class="color_font">任务统计</div>
    </div>
    <div class="mukuai">
      <div class="mukuai_item" @click="gooverdue('0')">
        <div class="mukuai_1">{{ daydata.quanbutask }}</div>
        <div class="mukuai_font">全部任务</div>
      </div>
      <div class="mukuai_item" @click="gooverdue('1')">
        <div class="mukuai_1">{{ daydata.dzxtask }}</div>
        <div class="mukuai_font">待执行的</div>
      </div>
      <div class="mukuai_item" @click="gooverdue('4')">
        <div class="mukuai_1">{{ daydata.myfoundertask }}</div>
        <div class="mukuai_font">我创建的</div>
      </div>
      <div class="mukuai_item" @click="gooverdue('5')">
        <div class="mukuai_1">{{ daydata.cctotask }}</div>
        <div class="mukuai_font">抄送我的</div>
      </div>

      <div class="mukuai_item" @click="gooverdue('3')">
        <div class="mukuai_1">{{ daydata.ywjtask }}</div>
        <div class="mukuai_font">已归档的</div>
      </div>
      <div class="mukuai_item" @click="gooverdue('6')">
        <div class="mukuai_1">{{ daydata.Papprovalnumber }}</div>
        <div class="mukuai_font">待我审批</div>
      </div>
    </div>

    <!-- <div class="addrenwu" @click="upcreat">
            <img
                src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/wjTTiyEM2R1598253823583.png"
                alt
            />
        </div> -->

    <van-popup position="bottom" v-model="popupbottpmshow">
      <div class="footnav">
        <div class="footdi_item" @click="gomuban('1')">
          <img
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/FTPjpse7741605510315123.jpg"
            alt=""
          />
          +普通任务
        </div>
        <div class="footdi_item" @click="gomuban('2')">
          <img
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/RBHmmtNY5n1605510972394.jpg"
            alt=""
          />
          +文档任务
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "../common/Empty.vue";
export default {
  name: "renwuindex",
  components: { Empty },
  data() {
    return {
      datainfo: "",
      popupbottpmshow: false,
      footshow: false,
      sowbest: true,
      Emptyshow: false,
      newtypeList: [],
      typeList: [],
      default: "",
      defaultdata: "",
      daydata: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    upcreat() {
      this.popupbottpmshow = true;
    },
    gomuban(val) {
      if (val == "1") {
        this.$router.push({
          path: "/taskcreat",
        });
      } else {
        this.$router.push({
          path: "/mubanlist",
          query: {
            pro_name: "",
            pro_id: "",
            isshow: false,
            datainfo: this.datainfo,
          },
        });
      }

      this.$store.commit("setmubantype", val);
    },
    showmore(val) {
      if (val == 1) {
        this.sowbest = false;
      } else if (val == 2) {
        this.sowbest = true;
      }
    },

    setTitle() {
      dd.biz.navigation.setTitle({
        title: "任务", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
      });
    },

    // setTitle() {
    //     dd.ready(function () {
    //         dd.biz.navigation.setTitle({
    //             title: '任务中心', //控制标题文本，空字符串表示显示默认文本
    //             onSuccess: function (result) {},
    //             onFail: function (err) {},
    //         });
    //     });
    // },
    gochecd() {
      this.$router.push({
        path: "/checproject",
      });
    },

    gooverdue(val) {
      this.$router.push({
        path: "/tasklist",
      });

      this.$store.commit("settaskliststatus", val);
    },
    toList(typeChild) {
      this.$router.push({
        path: "/renwulist",
        // query: {
        //     typeid: typeid,
        //     typename: typename,
        // },
      });
      this.$store.commit("settaskdata", typeChild);
      // taskdata
    },

    // gettypeList() {
    //     this.$axios
    //         .post('/task/tasklists', {
    //             userid: this.$store.state.userData.userid,

    //             corp_id: this.$store.state.userData.cid,
    //             xmid: this.$store.state.userData.Selecteddata.id
    //         })
    //         .then((res) => {
    //             if (res.data.comtent[0].lsit.length > 0) {
    //                 this.typeList = res.data.comtent;
    //                 // this.newtypeList.push(res.data.comtent[0]);
    //             } else {
    //                 this.Emptyshow = true;
    //             }
    //         });
    // },
    // getnewtypeList() {
    //     this.$axios
    //         .post('/task/lists', {
    //             userid: this.$store.state.userData.userid,
    //             corp_id: this.$store.state.userData.cid,
    //             xmid: this.$store.state.userData.Selecteddata.id
    //         })
    //         .then((res) => {
    //             if (res.data.comtent.length > 0) {
    //                 this.newtypeList = res.data.comtent;
    //             } else {
    //                 this.Emptyshow = true;
    //             }
    //         });
    // },
    getdata() {
      this.$axios
        .post("/task/tasknumber", {
          corp_id: this.$store.state.userData.cid,

          userid: this.$store.state.userData.userid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.daydata = res.data.list;
          } else {
            Toast(res.data.msg);
          }
        });
    },
  },
  created() {
    this.$utils.steWebview();
    this.$utils.checkding();
    this.setTitle();

    this.getdata();
    this.datainfo = this.$route.query.datainfo;
    // this.gettypeList();
    // this.getnewtypeList();
  },
  mounted() {},
};
</script>
<style lang='less' >
#renwuindex {
  .van-popup--bottom {
    display: flex;

    justify-content: space-around;
    align-items: center;

    .footnav {
      padding: 0.67rem 1.33rem;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      margin-bottom: 1.67rem;
      // bottom: 4.33rem;
      // bottom: calc(4.33rem + constant(safe-area-inset-bottom));
      // bottom: calc(4.33rem + env(safe-area-inset-bottom));
      width: 100%;
      .footdi_item {
        display: flex;
        align-items: center;
        img {
          width: 2.33rem;
          height: 2.33rem;
        }
      }
    }
  }
  .dangqian {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: space-between; /*定义body的里的元素水平居中*/
    padding: 0 30px;
    height: 4rem;
    background-color: #409efe;
    color: #fff;
    .xmjindu-item {
      width: 100%;
      height: 3.33rem;
      border-right: 0.03rem solid #fff;
      padding-right: 0.33rem;
      .xmjindu-item-font {
        font-family: "SourceHanSansCN-Medium";
        font-size: 1.33rem;
        height: 48%;
        line-height: 1.33rem;
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .xmjindu-item-font1 {
        font-size: 0.67rem;
        height: 48%;
        line-height: 1.67rem;
        color: #fff;
      }
      .xmjindu-item-jindu {
        .van-progress {
          background: #1b47b4;
        }
      }
    }
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
  .bgimg {
    height: 8.33rem;
    background-image: url("../../../static/images/beijing.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%; /*按比例缩放*/
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/

    .xiangmu {
      clear: both;
      width: 100%;
      height: 5rem;
      background-color: #409eff;
      display: flex;
      .xmdiv {
        height: 100%;
      }
      .xmimg {
        width: 30%;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center;

        img {
          width: 5rem;
          height: 5rem;
          border: 0.03rem solid #fff;
          border-radius: 0.33rem;
        }
      }
      .xmjindu {
        width: 60%;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        .xmjindu-item {
          width: 100%;
          height: 3.33rem;
          border-right: 0.03rem solid #fff;
          padding-right: 0.33rem;
          .xmjindu-item-font {
            font-family: "SourceHanSansCN-Medium";
            font-size: 1.33rem;
            height: 50%;
            line-height: 1.33rem;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .xmjindu-item-font1 {
            font-size: 0.67rem;
            height: 48%;
            line-height: 1.67rem;
            color: #fff;
          }
          .xmjindu-item-jindu {
            .van-progress {
              background: #1b47b4;
            }
          }
        }
      }
      .xmqiehuan {
        width: 20%;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center;
        .xmqiehuan-item {
          text-align: center;
          img {
            width: 1.67rem;
            height: 1.67rem;
          }
          .xmqiehuan-item-font {
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }
  .daiwo {
    display: flex;
    justify-content: space-between;

    .daiwo_item {
      height: 3.33rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      margin-bottom: 0.67rem;
      img {
        width: 1.67rem;
        margin-right: 0.5rem;
      }
    }
  }
  .num_title {
    margin-top: 0.67rem;
    padding: 0.67rem 0;
    background-color: #fff;
    line-height: 2rem;
    color: #000;

    // border-bottom: 0.03rem solid #eceeed;
    padding-left: 0.67rem;
    display: flex;
    .color_div {
      width: 0.33rem;
      height: 1.17rem;
      background: #0089ff;
      border-radius: 0.13rem;
    }
    .color_font {
      margin-left: 0.47rem;
      // width: 119px;
      height: 0.97rem;
      font-size: 1.17rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 1.17rem;
    }
  }
  .newtask {
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    // margin-bottom: 0.67rem;
    // height: 3.33rem;
    .newtaskitem {
      width: 50%;
      display: flex;
      align-items: center;
      .itemfont {
        margin: auto;
        // width: 70%;
        // height: 80%;
        // font-size: 1rem;
        // font-weight: 600;
        // line-height: 2.67rem;
        // text-align: center;
        // background-color: red;
        // border-radius: 0.5rem;
        justify-content: center;
        display: flex;
        align-items: center;
        font-size: 1.33rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;

        width: 90%;
        height: 4.93rem;

        border-radius: 0.83rem;
        .itemfont_img {
          width: 2.33rem;
          height: 2.33rem;

          img {
            width: 100%;
            height: 100%;
          }
        }
        .itemfont_font {
          margin-left: 0.9rem;
        }
      }
    }
  }
  .guanlishuju {
    background-color: #fff;
    padding: 0.67rem 0;
    .guanlishuju_item {
      width: 95%;
      margin: auto;

      background: linear-gradient(-83deg, #ff8534, #ff5e2c);
      border-radius: 0.83rem;
      font-weight: bold;
      font-size: 1.33rem;
      font-family: PingFang SC;
      color: #ffffff;

      height: 5.33rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 2.33rem;
        height: 2.33rem;
        margin-right: 0.9rem;
      }
    }
  }

  .font_title {
    display: flex;
    align-items: center;
    height: 2.33rem;
    background-color: #fff;
    line-height: 1.67rem;
    color: #000;
    font-size: 0.83rem;
    font-weight: 600;
    border-bottom: 0.03rem solid #eceeed;
    padding-left: 0.67rem;
    img {
      width: 1.33rem;
    }
    margin-bottom: 0.67rem;
  }
  .numble {
    padding: 0.33rem 0;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    height: 5rem;
    align-items: center;
    margin-bottom: 0.67rem;

    .numble_item {
      width: 30%;
      text-align: center;

      .numble_1 {
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.67rem;

        color: #fe1919;
      }
      .numble_font {
        margin-top: 0.5rem;
        color: #333333;
        font-size: 0.9rem;
        line-height: 1.67rem;
      }
    }
  }
  .mukuai {
    display: flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    // justify-content: space-between;
    background-color: #fff;
    // height: 270px;
    align-items: center;

    .mukuai_item {
      padding: 0.5rem 0;

      width: 33%;
      text-align: center;
      // border-right: 0.03rem solid #eceeed;
      // border-bottom: 0.03rem solid #eceeed;
      .mukuai_1 {
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.67rem;

        color: #fe1919;
      }
      .mukuai_font {
        margin-top: 0.5rem;
        color: #333333;
        font-size: 0.9rem;
        line-height: 1.67rem;
      }
    }
  }
  .collapse1 {
    position: relative;
    margin-top: 0.33rem;
    background-color: #fff;
    padding: 0.33rem;
    box-sizing: border-box;
    .van-collapse {
      .van-collapse-item {
        .van-collapse-item__wrapper {
          .van-collapse-item__content {
            text-align: center;
            display: flex;

            flex-direction: row;
            flex-wrap: wrap;
            .active-item {
              width: 25%;
              margin: 0.33rem 0;

              display: flex;
              align-items: center; /*定义body的元素垂直居中*/
              justify-content: center;
              text-align: center;
              font-size: 0.9rem;
              img {
                width: 2.67rem;
                height: 2.67rem;
                // border-radius: 1rem;
              }
            }
          }
        }
        .van-cell {
          line-height: 1.75rem;

          .van-cell__title {
            font-size: 1.17rem;
          }
          .van-icon {
            line-height: 1.75rem;
            font-size: 1rem;
          }
        }
      }
    }
  }
  .addrenwu {
    position: fixed;
    width: 30%;
    bottom: 15%;
    right: 0;
    text-align: center;
    img {
      width: 3.33rem;
      height: 3.33rem;
    }
  }
}
</style>

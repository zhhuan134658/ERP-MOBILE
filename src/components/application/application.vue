<template>
  <!-- 应用  -->
  <div id="application">
    <div v-if="firstshow" class="dingbtn" style="height: 2.13rem">
      <div>
        <img
          style="width: 0.8rem; height: 0.8rem; margin: 0 8px 0 16px"
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/eZkBANm35M1621325500394.png"
          alt=""
        />
      </div>

      <div class="ddfont" style="font-size: 0.47rem; color: #0089ff">
        你正在使用个人体验版,如需正式使用,请联系管理员
      </div>
      <!-- <div
                class="ddbtn"
                style="line-height:28px"
                @click="verification"
            >
                联系管理员
            </div> -->
      <van-button @click="verification" type="info">联系管理员</van-button>
    </div>
    <!-- 头像 -->
    <div class="avatar">
      <div class="avat_item" @click="asd">
        <img v-if="imgurl" :src="imgurl" alt />
        <!-- <span
                    v-else
                    style="background-color: #409efe;
                    width: 2.67rem;
                    height: 2.67rem;
                    border-radius: 50%;"
                >
                    {{
                            name.length <= 2
                                ? name
                                : name.substr(name.length - 2, 2)
                        }}
                </span> -->

        <!-- <img
                    src="https://static-legacy.dingtalk.com/media/lADPDgQ9rMzhCJTNBDjNBDg_1080_1080.jpg"
                    alt=""
                /> -->
        <span>{{ this.$store.state.userData.username }},您好</span>
      </div>
      <div class="avat_item1">
        <!-- <van-button
                    icon="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/wWRXab326t1605143197583.png"
                    type="primary"
                >预警</van-button> -->
      </div>
    </div>
    <!--组织图  -->
    <!-- <div class="process_banner">

            <img
                :src="bannerimg"
                alt=""
            >

        </div> -->
    <div class="process">
      <div
        class="process_item"
        v-for="(item, index) in List"
        @click="golist(item)"
      >
        <img :src="item.imgurl" alt="" />

        <div class="item_font">{{ item.name }}</div>

        <div v-if="index == 0 && daichuli != 0" class="tag">
          {{ daichuli }}
        </div>
        <div v-if="index == 3 && shoudao != 0" class="tag">
          {{ shoudao }}
        </div>
      </div>
    </div>
    <!-- 审批数 -->
    <!-- <div class="numble">
            <div class="numble_item">
                <div class="numble_1">{{ applydata.shenpi }}</div>
                <div class="numble_font">待我审批</div>
            </div>
            <div class="numble_item numble_border">
                <div class="numble_1">{{ applydata.faqi }}</div>
                <div class="numble_font">已处理</div>
            </div>
            <div class="numble_item numble_border">
                <div class="numble_1">{{ applydata.faqi }}</div>
                <div class="numble_font">我发起的</div>
            </div>
            <div class="numble_item">
                <div class="numble_1">{{ applydata.chaosong }}</div>
                <div class="numble_font">抄送我的</div>
            </div>
        </div> -->

    <div class="collapse1">
      <div class="van-collapse">
        <div class="van-collapse-item">
          <div class="van-collapse-item__wrapper">
            <div class="van-cell">
              <div class="van-cell__title">
                <div class="color_div"></div>
                <div class="color_font">常用应用</div>
              </div>
            </div>
            <div class="van-collapse-item__content">
              <div
                class="active-item"
                v-for="(item4, index4) in shijianImg"
                :key="index4"
              >
                <div @click="gozhengshu(item4)">
                  <img :src="item4.imgsrc" alt />
                  <div style="text-align: center">
                    {{ item4.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="overlayshow">
      <div class="wrapper">
        <div class="block">暂无权限</div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import "dingtalk-jsapi/entry/union";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import openLink from "dingtalk-jsapi/api/biz/util/openLink";
import close from "dingtalk-jsapi/api/biz/navigation/close";
import { openTryoutSku } from "dingtalk-design-libs";
import { contactAdminToUseApp } from "dingtalk-design-libs";
export default {
  name: "application",
  data() {
    return {
      newname: "",
      firstshow: "",
      bannerimg: "",
      overlayshow: false,
      imgurl: this.$store.state.userData.avatarurl,
      name: this.$store.state.userData.username,
      daichuli: "",
      shoudao: "",
      List: [
        {
          num: 0,
          id: 1,
          name: "待我审批",
          imgurl:
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ekzMKs83Zy1615168260242.png",
        },
        {
          num: 0,
          id: 2,
          name: "我已审批",

          imgurl:
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ZENBT2Jb6c1615168260641.png",
        },
        {
          num: 0,
          id: 3,
          name: "我发起的",
          imgurl:
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/acScXfjWe21615168260809.png",
        },
        {
          num: 1,
          id: 4,
          name: "抄送我的",
          imgurl:
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/zMwhyyt33t1615168260954.png",
        },
      ],
      applydata: {
        shenpi: "2",
        faqi: "2",
        chaosong: "2",
      },
      zdata: this.$store.state.userData.zData,
      cid: this.$store.state.userData.cid,
      userid: this.$store.state.userData.uid,
      project: this.$store.state.userData.project,
      shijianImg: [],
      moreitem: [
        {
          name: "查看更多应用",
          router: "/Module",

          imgsrc:
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/wGRkGa2SWw1615433897713.png",
        },
      ],

      // shijianImg: [
      //     {
      //         isselected: '1',
      //         name: '新增证书',
      //         id: 1,
      //         imgsrc:
      //             'http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/iD6HescMm61605145022957.png'
      //     },
      //     {
      //         isselected: '1',
      //         name: '新增证书',
      //         id: 2,
      //         imgsrc:
      //             'http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/aFWYfJhzRQ1605145075518.png'
      //     },
      //     {
      //         isselected: '1',
      //         name: '新增证书',
      //         id: 3,
      //         imgsrc:
      //             'http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/iD6HescMm61605145022957.png'
      //     },
      //     {
      //         isselected: '1',
      //         name: '新增证书',
      //         id: 4,
      //         imgsrc:
      //             'http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/iD6HescMm61605145022957.png'
      //     },
      //     {
      //         isselected: '1',
      //         name: '查看更多应用',
      //         id: 5,
      //         imgsrc:
      //             'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/2JwyQGBCPb1607329629352.png'
      //     }
      // ]
    };
  },
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "工作台", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    asd() {
      if (
        this.$store.state.userData.cid == "dingdd959e3808ad2bed24f2f5cc6abecb85"
      ) {
        this.creatin("/project/projectInfoRegister");
      }
    },
    verification() {
      const that = this;
      // const corpId = 'dingea47c602975497f935c2f4657eb6378f';
      // dingea47c602975497f935c2f4657eb6378f;
      // alert(that.cid);
      const corpId = that.$store.state.userData.maincorpid;
      const appId = "58708";
      dd.ready(() => {
        contactAdminToUseApp({
          id: appId,
          corpId: corpId,
        }).catch((err) => {
          // 入参不正确，或者遇到技术异常时才会进入这个链路
          // console.error(err);
          alert(JSON.stringify(err));
        });
      });
    },
    getList(tag) {
      console.log("1");
      this.$axios
        .post("/projectthree/banZuList", {
          page: 1,
          number: 9999,
          name: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            // this.workList = res.data.data;
            this.$store.commit("setworklist", res.data.data);
            this.$router.push({
              path: tag.router,
              query: {
                itemdata: tag,
              },
            });
          } else {
            Toast(res.data.msg);
          }
        });
    },

    gozhengshu(tag) {
      if (tag.name == "查看更多应用") {
        this.$router.push({ path: "/Module" });
      } else {
        if (
          tag.extend_two == "/approvalindexcreat" ||
          tag.extend_two == "/assetListform" ||
          tag.extend_two == "/diaoboform" ||
          tag.extend_two == "/Distributedindex" ||
          tag.extend_two == "/lendListindex" ||
          tag.extend_two == "/InventoryList" ||
          tag.extend_two == "/disposalList"
        ) {
          this.$router.push({
            path: tag.extend_two,
            query: {
              itemdata: tag,
            },
          });
        } else {
          this.creatin(tag.extend_three);
        }
      }
    },
    creatin(pathname) {
      const _this = this;
      console.log(_this.datainfo);

      _this.$axios.post(pathname).then((res) => {
        if (res.data.code == 1) {
          if (res.data.content) {
            var openurl =
              "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=" +
              _this.$store.state.userData.cid +
              "&swfrom=qrshareh5&tempalteName=" +
              "劳务合同变更签证" +
              "&processCode=" +
              res.data.content.process_code +
              "&back=native#/custom";

            dd.ready(function () {
              dd.biz.util.openLink({
                url: openurl, //要打开链接的地址
                onSuccess: function (result) {
                  /**/
                },
                onFail: function (err) {},
              });
            });
          } else {
            var openurl =
              "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=" +
              _this.$store.state.userData.cid +
              "&swfrom=qrshareh5&tempalteName=" +
              res.data.name_mould +
              "&processCode=" +
              res.data.data +
              "&back=native#/custom";

            dd.ready(function () {
              dd.biz.util.openLink({
                url: openurl, //要打开链接的地址
                onSuccess: function (result) {
                  /**/
                },
                onFail: function (err) {},
              });
            });
          }
        } else {
          Toast(res.data.msg);
        }
      });
    },
    logcreatin(logname) {
      const _this = this;

      if (logname == "项目经理日志列表") {
        _this.newname = "项目经理日志";
      } else if (logname == "机长日志列表") {
        _this.newname = "机长日志";
      } else {
        _this.newname = logname;
      }

      _this.$axios
        .post("/journal/logapproval", {
          tmpname: _this.newname,
        })
        .then((res) => {
          _this.openurl =
            "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=" +
            _this.$store.state.userData.cid +
            "&swfrom=qrshareh5&tempalteName=" +
            _this.newname +
            "&processCode=" +
            res.data.process_code +
            "&back=native#/custom";

          dd.ready(function () {
            dd.biz.util.openLink({
              url: _this.openurl, //要打开链接的地址
              onSuccess: function (result) {
                /**/
              },
              onFail: function (err) {},
            });
          });
        });
    },
    //默认常用分类生成
    getTypeCreate() {
      this.$axios.post("/mobile/commonlyTypeCreate").then((res) => {
        if (res.data.code == 403) {
          this.overlayshow = true;
        } else {
          this.getcyList();
        }
      });
    },

    //常用分类列表
    getcyList() {
      this.$axios.post("/erp_check/changyongphoneroles").then((res) => {
        if (res.data.code == 1) {
          this.shijianImg = res.data.data.concat(this.moreitem);
          // this.shijianImg = this.shijianImg.;
        }
      });
    },
    //统计待我审批，抄送我的数量
    getcynum() {
      this.$axios.post("/mobile/dingApprovalCount").then((res) => {
        if (res.data.code == 1) {
          this.daichuli = res.data.data.wait_count;
          this.shoudao = res.data.data.cc_count;
        }
      });
    },
    golist(item) {
      this.$router.push({
        path: "/approval_list",
        query: {
          type: item.id,
        },
      });
    },
    getbanner() {
      this.$axios.post("/mobile/imageShow").then((res) => {
        if (res.data.code == 1) {
          this.bannerimg = res.data.data;
        } else if (res.data.code == 0) {
          this.bannerimg =
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/dz7Zt8dkTY1615451713653.png";
        }
      });
    },
    getxmList() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        let xmlist = res.data.data;
        this.$store.commit("setSelecteddata", xmlist[0]);
        this.$store.commit("setlcxminfo", xmlist[0]);
      });
    },
  },
  mounted() {},
  created() {
    this.$utils.steWebview();

    this.$utils.checkding();
    if (this.$store.state.userData.ddtype == 2) {
      this.firstshow = true;
    } else {
      this.firstshow = false;
    }
    this.getxmList();
    this.setTitle();
    this.getbanner();

    this.getTypeCreate();
    this.getcynum();
  },
};
</script>
<style lang="less">
#application {
  .dingbtn {
    background-color: #e0edfe;
    display: flex;
    align-items: center;
    .ddfont {
      font-family: PingFang SC;
      font-weight: 500;
    }
    .van-button {
      margin: 0 0.667rem;
      border-radius: 0.33rem;
      width: 30%;
      height: 60%;
      .van-button__content {
        span {
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 0.83rem;
        }
      }
    }
    .ddbtn {
      background-color: #0089ff;
      color: #fff;
      border-radius: 0.33rem;
      margin: 0 1rem;
      padding: 0.33rem;
      width: 7rem;
      text-align: center;
    }
  }
  .van-overlay {
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    .block {
      padding: 0.667rem;
      border-radius: 0.5rem;
      font-size: 1.167rem;

      background-color: #fff;
    }
  }
  .avatar {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.33rem 0.667rem;
    .avat_item {
      font-size: 1.167rem;
      font-weight: 600;

      img {
        width: 2.67rem;
        height: 2.67rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
    .avat_item1 {
      .van-button {
        background-color: #f1f8fe;
        border: 0.03rem solid #f1f8fe;
        color: #6080cb;
        width: 10.667rem;
        height: 1.667rem;
        font-size: 0.77rem;
      }
    }
  }

  .numble {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    height: 21.667rem;
    align-items: center;
    .numble_border {
      border-right: 0.03rem solid #ebebeb;
      border-left: 0.03rem solid #ebebeb;
    }
    .numble_item {
      width: 30%;
      text-align: center;
      .numble_1 {
        font-size: 1.667rem;
        font-weight: 600;

        color: #434343;
      }
      .numble_font {
        color: #6f6e73;
        font-size: 1rem;
        line-height: 3rem;
      }
    }
  }

  .collapse1 {
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
            padding: 0;
            flex-direction: row;
            flex-wrap: wrap;
            .active-item {
              width: 22%;
              margin: 1%;
              padding: 0.5rem 0px;
              display: flex;
              // align-items: center; /*定义body的元素垂直居中*/
              justify-content: center;
              text-align: center;
              font-size: 0.77rem;
              color: #666666;
              font-family: PingFang SC;
              img {
                width: 2.6rem;
                height: 2.6rem;
                // width: 3.27rem;
                // height: 3.27rem;
                margin-bottom: 0.33rem;
              }
            }
          }
        }
        .van-cell {
          line-height: 1.75rem;

          .van-cell__title {
            font-size: 1.167rem;
            font-weight: 600;
            display: flex;
            .color_div {
              width: 0.33rem;
              height: 1.167rem;
              background: #0089ff;
              border-radius: 0.13rem;
            }
            .color_font {
              margin-left: 0.47rem;
              // width: 119px;
              height: 0.97rem;
              font-size: 1.167rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: #333333;
              line-height: 1.167rem;
            }
          }
          .van-icon {
            line-height: 1.75rem;
            font-size: 1rem;
          }
        }
        .van-cell::after {
          border-bottom: inherit;
        }
      }
    }
  }
  .process_banner {
    background-color: #fff;
    padding: 0.5rem 1rem;
    height: 10rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .process {
    border-bottom-left-radius: 0.33rem;
    border-bottom-right-radius: 0.33rem;
    // margin-top: 0.33rem;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    .process_item {
      padding: 0.667rem 0;
      width: 25%;
      text-align: center;

      position: relative;
      img {
        width: 3.1rem;
        height: 3.1rem;
      }
      .item_font {
        font-weight: bold;
        font-family: PingFang SC;
        font-size: 1rem;
        margin-top: 0.33rem;
        color: #202020;
      }
      .tag {
        background-color: red;
        position: absolute;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        padding: 0.16rem;
        font-size: 0.667rem;
        color: #fff;
        font-weight: 500;
        top: 0.16rem;
        right: 20%;
      }
    }
  }
}
</style>

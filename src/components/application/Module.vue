<template>
  <!--  -->
  <div id="Module">
    <div class="Commonly">
      <div class="Commonly_item1">
        <div class="color_div"></div>
        <div class="color_font">常用应用</div>
      </div>
      <div class="Commonly_item4">
        <div class="Commonly_item2">
          <img v-for="item in selecimg" :src="item" alt="" />
        </div>
        <div class="Commonly_item3" @click="edit">
          <van-button v-if="editshow" type="info">保存</van-button>
          <van-button v-else type="info">编辑</van-button>
        </div>
      </div>
    </div>
    <div class="collapse2" v-if="editshow">
      <div class="van-collapse">
        <div class="van-collapse-item">
          <div class="van-collapse-item__wrapper">
            <div class="van-collapse-item__content">
              <div
                class="active-item changcolor"
                v-for="(item1, index1) in selectedList"
                :key="index1"
                @click="remove(item1)"
              >
                <img
                  class="jianicon"
                  src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/8xAXAGd3Pm1605147979042.png"
                  alt=""
                />
                <div>
                  <img :src="item1.imgsrc" alt />
                  <div style="text-align: center">
                    {{ item1.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="num_title">
      <div class="color_div"></div>
      <div class="color_font">全部应用</div>
    </div>
    <div class="collapse1">
      <van-tabs v-model="active" swipeable animated>
        <van-tab
          v-for="(item2, index) in shijianImg"
          :title="item2.name"
          :key="item2 + index"
        >
          <div class="van-collapse">
            <div class="van-collapse-item">
              <div class="van-cell">
                <div class="van-cell__title">
                  <span>{{ item2.name }}</span>
                </div>
              </div>
              <div class="van-collapse-item__wrapper">
                <div class="van-collapse-item__content">
                  <div
                    class="active-item"
                    v-for="(item1, index1) in item2.children"
                    :key="index1"
                    :class="editshow == true ? 'changcolor' : ''"
                    @click="addition(item1, index1)"
                  >
                    <div v-if="editshow">
                      <img
                        v-if="item1.isselected == 0"
                        class="jianicon"
                        src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/Nd4R3Br7na1605147942515.png"
                        alt=""
                      />
                      <img
                        v-else
                        class="jianicon"
                        src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/8xAXAGd3Pm1605147979042.png"
                        alt=""
                      />
                    </div>

                    <div>
                      <img :src="item1.imgsrc" alt />
                      <div style="text-align: center">
                        {{ item1.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "Module",
  components: {},
  data() {
    return {
      active: "",
      newname: "",
      activeNames: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
      ],
      editshow: false,
      selecimg: [],
      selectedList: [],
      shijianImg: [],

      // "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/Nd4R3Br7na1605147942515.png" 加号
      // "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/8xAXAGd3Pm1605147979042.png"
    };
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (to.name == "Module") {
        // this.stop();
      } else {
        // this.move();
      }
      console.log(to, from);
      // to , from 分别表示从哪跳转到哪，都是一个对象
      // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
    },
  },
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "应用中心", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    // 编辑 保存
    edit() {
      if (this.editshow == true) {
        this.editshow = false;
      } else {
        this.editshow = true;
      }
    },
    //常用分类删除
    remove(item) {
      if (this.selectedList.length < 2) {
        Toast("最少需设置一个常用应用！");
      } else {
        this.$axios
          .post("/mobile/commonlyTypeDel", {
            id: item.id,
          })
          .then((res) => {
            this.getcyList();
            this.getTypeAllList();
          });
      }
    },
    //分类添加
    addType(item) {
      this.$axios
        .post("/mobile/commonlyTypeAdd", {
          cid: item.id,
        })
        .then((res) => {
          this.getcyList();
          this.getTypeAllList();
        });
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
      _this.newname = logname;
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
    //添加选中
    addition(tag, value) {
      console.log(tag, value);
      if (this.editshow == false) {
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

        console.log(tag);
      } else {
        console.log("22");
        this.addType(tag);
      }
    },
    //所有分类列表
    getTypeAllList() {
      this.$axios
        .post("/erp_check/phoneroles", {
          corp_id: this.$store.state.userData.cid,
          userid: this.$store.state.userData.userid,
        })
        .then((res) => {
          this.shijianImg = res.data.data;
        });
    },
    //常用分类列表
    getcyList() {
      this.$axios.post("/erp_check/changyongphoneroles").then((res) => {
        if (res.data.code == 1) {
          this.selectedList = res.data.data;
          this.selecimg = res.data.data
            .map((item) => {
              return item.imgsrc;
              ``;
            })
            .splice(0, 6);

          console.log(this.selecimg);
        }
      });
    },
    stop() {
      document.body.style.overflow = "hidden"; //禁止页面划动
      document.body.style.backgroundColor = "#fff"; //禁止页面划动
    },
    move() {
      document.body.style.overflow = ""; //出现滚动条
      document.body.style.backgroundColor = "#fff"; //禁止页面划动
    },
    getxmList() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        let xmlist = res.data.data;
        this.$store.commit("setSelecteddata", xmlist[0]);
        this.$store.commit("setlcxminfo", xmlist[0]);
      });
    },
  },
  activated() {
    // this.stop();
    this.$utils.checkding();
    this.getxmList();
    this.setTitle();
    this.getcyList();
    this.getTypeAllList();
  },
  // destroyed() {
  //     console.log('likai+++++++++++++++++++');
  //     // this.move();
  // },
  mounted() {},
};
</script>
<style lang='less' >
#Module {
  overflow: hidden;
  .van-sticky {
    background-color: #fff;
  }
  .Commonly {
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
    padding: 0.33rem 0;
    background-color: #fff;
    margin-bottom: 0.33rem;
    .Commonly_item1 {
      padding: 0.67rem 0;
      background-color: #fff;
      line-height: 2rem;
      color: #000;
      font-size: 1.17rem;
      font-weight: 600;
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
        font-size: 1rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 1.17rem;
      }
    }
    .Commonly_item4 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .Commonly_item2 {
        padding-left: 0.5rem;
        width: 70%;
        line-height: 1rem;
        img {
          width: 1.9rem;
          height: 1.9rem;
          margin: 0 10px;
        }
      }
      .Commonly_item3 {
        width: 15%;
        .van-button {
          width: 3rem;
          height: 1.33rem;
          line-height: 1.33rem !important;
          font-size: 0.67rem;
          border-radius: 0.33rem;
          padding: inherit;
        }
      }
    }
  }
  .active-item {
    border-radius: 0.43rem;
    width: 22%;
    margin: 1%;
    padding: 0.5rem 0px;
    display: flex;
    // align-items: center; /*定义body的元素垂直居中*/
    justify-content: center;
    text-align: center;

    font-size: 0.77rem;
    font-family: PingFang SC;

    color: #666666;
    position: relative;
    img {
      width: 2.6rem;
      height: 2.6rem;
      margin-bottom: 0.33rem;
    }
    .jianicon {
      width: 1rem;
      height: 1rem;
      position: absolute;
      top: 0.33rem;
      right: 0.33rem;
    }
  }
  .num_title {
    // margin-top: 0.33rem;
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
      font-size: 1rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 1.17rem;
    }
  }
  // .van-sticky {
  // .van-collapse {
  //     .van-collapse-item {
  //         margin-top: 0px;
  //         .van-cell {
  //             display: none;
  //         }
  //         .van-collapse-item__wrapper {
  //             .van-collapse-item__content {
  //                 display: flex;
  //                 flex-wrap: wrap;
  //             }
  //         }
  //     }

  .collapse2 {
    max-height: 16.5rem;
    overflow-y: scroll;
    margin-bottom: 0.16rem;
    // background-color: #fff;
    // padding: 0.33rem 0;
    box-sizing: border-box;

    .van-collapse {
      .van-collapse-item {
        margin-top: 0px;
        .van-cell {
          display: none;
        }
        .van-collapse-item__wrapper {
          .van-collapse-item__content {
            display: flex;
            flex-wrap: wrap;
          }
        }
      }
    }
  }

  .collapse1 {
    margin-bottom: 0.16rem;
    // background-color: #fff;
    // padding: 0.33rem 0;
    box-sizing: border-box;
    .van-tabs {
      .van-tabs__content {
        .van-tab__pane {
          .van-collapse {
            .van-collapse-item {
              margin-top: 0px;
              .van-cell {
                display: none;
              }
              .van-collapse-item__wrapper {
                .van-collapse-item__content {
                  max-height: 25rem;
                  overflow-y: scroll;
                  display: flex;
                  flex-wrap: wrap;
                }
              }
            }
          }
        }
      }

      .van-tabs__wrap {
        height: 2.5rem;
        .van-tabs__nav {
          .van-tabs__line {
            background-color: #0089ff;
          }
          .van-tab--active {
            color: #0089ff !important;
            .van-tab__text {
              font-size: 1rem;
              line-height: 1.1rem;
              color: #0089ff !important;
            }
          }
          .van-tab {
            .van-tab__text {
              font-size: 1rem;
              line-height: 1.1rem;
            }
          }
        }
      }
    }
  }
  .changcolor {
    background-color: #f7f8fd;
  }
}
</style>

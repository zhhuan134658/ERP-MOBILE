<template>
  <!--日志列表  -->
  <div id="newtasklist">
    <!--项目搜索  -->
    <van-sticky>
      <div class="inputdiv">
        <van-search
          v-model="Searchname"
          placeholder="请填写搜索条件"
          show-action
          shape="round"
          @change="shaixuan"
        >
          <div slot="action">
            <!-- <van-button
                        @click="onLoad"
                        type="default"
                    >搜索</van-button> -->
            <van-button @click="creatin" type="default">新建</van-button>
          </div>
        </van-search>
      </div>
    </van-sticky>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="renwucontent" v-for="(item, index) in FilesList" :key="index">
        <div style="padding: 0.5rem 1rem" @click="lookinfo(item)">
          <div class="item_heard">
            <div class="item_img">
              <img
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/nkKrYbEW2m1615339826337.jpg"
                alt
              />

              <div class="item_img_title">
                <div class="item_img_title1">
                  {{ item.name }}提交的{{ item.log_type }}
                </div>

                <div class="item_img_title2">
                  {{ item.logspare1 }}
                </div>
              </div>
            </div>
          </div>

          <div class="btem">
            <div class="btem1">项目:</div>
            <div class="btem2">{{ item.proname }}</div>
          </div>
          <div class="btem">
            <div class="btem1">日志时间:</div>
            <div class="btem2">{{ item.log_date }}</div>
          </div>
          <div class="btem">
            <div class="btem1">类别:</div>
            <div class="btem2">{{ item.log_type }}</div>
          </div>
        </div>

        <div class="item_bottom">
          <div @click="lookinfo(item)">
            <div
              class="btem2"
              style="color: rgb(230, 162, 60)"
              v-if="item.status == 0"
            >
              审批中
            </div>
            <div
              class="btem2"
              style="color: rgb(103, 194, 58)"
              v-if="item.status == 1"
            >
              已同意
            </div>
            <div class="btem2" style="color: #67c23a" v-if="item.status == 2">
              已拒绝
            </div>
          </div>
          <div class="dele_bottom">
            <span class="delet_t" @click="delelog(item)" style="color: #387ef5"
              >删除</span
            >
            &nbsp;

            <span class="delet_d" @click="lookinfo(item)">查 看</span>
          </div>
        </div>
      </div>

      <!--  -->
    </van-list>

    <Empty v-if="Emptyshow"></Empty>
    <van-popup
      v-model="popupshow"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="zstype">
        <div class="typetitle">
          <div class="titlepoint"></div>
          <div class="titlefont">按时间区间</div>
        </div>
        <van-field
          input-align="right"
          readonly
          clickable
          v-model="starttime"
          name="开始时间"
          label="开始时间"
          placeholder="请填写开始时间"
          @click="settime(1)"
        />
        <van-field
          input-align="right"
          readonly
          clickable
          v-model="stoptime"
          name="结束时间"
          label="结束时间"
          placeholder="请填写结束时间"
          @click="settime(2)"
        />

        <div class="typetitle">
          <div class="titlepoint"></div>
          <div class="titlefont">按日志类型</div>
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
    <!-- 筛选 -->
    <van-popup v-model="timeshow" position="bottom">
      <van-datetime-picker
        v-model="starcurrentDate"
        type="date"
        @confirm="gettime"
        @cancel="close"
      />
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "../common/Empty.vue";
export default {
  name: "loglist",
  components: { Empty },
  data() {
    return {
      newname: "",
      newdata1: "",
      logname: "",
      lognamede: "",
      all: {
        tmpname: "全部",
      },
      // 筛选
      shenpival: "",
      typename: "",
      shenpitype: "",
      Searchname: "",
      timeshow: false,
      starttime: "",
      stoptime: "",
      starcurrentDate: new Date(),
      typenum: "",
      shenpinum: "",
      TypyList: [],
      shenpiList: [],
      popupshow: false,
      // 筛选
      plfile: [],
      Emptyshow: false,
      dialogshow: false,
      commontext: "",
      itemdata: "",
      caozuoshow: false,
      // 分页列表
      Searchname: "",
      FilesList: [],
      isLoading: false,
      loading: false, // 当loading为true时，转圈圈
      current_page: 1,

      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了
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
      dd.biz.navigation.setTitle({
        title: this.$route.query.itemdata.name, //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
      });
    },
    creatin() {
      const _this = this;

      if (_this.$route.query.itemdata.name == "项目经理日志列表") {
        _this.newname = "项目经理日志";
      } else if (_this.$route.query.itemdata.name == "机长日志列表") {
        _this.newname = "机长日志";
      } else {
        _this.newname = _this.$route.query.itemdata.name;
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
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
      this.starttime = "";
      this.stoptime = "";
    },

    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    delelog(item) {
      const _this = this;
      if (_this.$route.query.itemdata.name == "项目经理日志列表") {
        _this.lognamede = "journal/managerlogdel";
      } else if (_this.$route.query.itemdata.name == "机长日志列表") {
        _this.lognamede = "journal/machinehanddel";
      } else {
        _this.lognamede = "/journal/logdel";
      }
      Dialog.confirm({
        title: "提示",
        message: "是否删除",
      }).then(() => {
        _this.$axios
          .post(_this.lognamede, {
            id: [item.id],
          })
          .then((res) => {
            Toast(res.data.msg);
            this.FilesList = [];
            this.current_page = 1;
            this.loading = false;
            this.finished = false;
          });
      });
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

    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
      this.starttime = "";
      this.stoptime = "";
    },
    onLoad() {
      console.log(this.$route.query.itemdata.name);
      const newdata = this.$route.query.itemdata.name;

      if (newdata == "项目经理日志列表") {
        this.newdata1 = "";
        this.logname = "journal/managerlog";
      } else if (newdata == "机长日志列表") {
        this.newdata1 = "";
        this.logname = "journal/machinehand";
      } else {
        this.logname = "journal/loglist";
        this.newdata1 = this.$route.query.itemdata.name;
      }
      this.$axios
        .post(this.logname, {
          current_page: this.current_page,

          starttime: this.starttime,
          stoptime: this.stoptime,
          strt_time: this.starttime,
          end_time: this.stoptime,

          status: "",
          logtype: this.newdata1,

          // corp_id: this.$store.state.userData.cid,
          // userid: this.$store.state.userData.userid,
          // projectname: this.$store.state.userData.Selecteddata
          //     .pcontent,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.loading = false;
            if (!this.Searchname) {
              if (res.data.content.list.length > 0) {
                this.FilesList = this.deunique(
                  this.FilesList.concat(res.data.content.list)
                ); //追加数据
                // this.FilesList.push(...res.data.data);
              } else {
                this.FilesList = res.data.content.list;
                this.finished = true;
                // this.Emptyshow = true;
              }
            } else {
              if (
                res.data.content.list.length > 0 ||
                res.data.content.list == null
              ) {
                this.FilesList = [];
                this.FilesList = this.deunique(res.data.content.list);
                // this.Emptyshow = false;
              } else {
                this.FilesList = [];
                // this.Emptyshow = true;
              }
            }

            // page
            if (
              this.current_page == res.data.content.page ||
              res.data.content.list.length == 0 ||
              res.data.content.list == null
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

    // 筛选
    sear() {
      this.FilesList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;
    },
    shaixuan() {
      this.popupshow = true;
      // this.typename = this.TypyList[0].tmpname;
      // this.shenpitype = this.shenpiList[0].tmpname;
    },
    Typeclick(item, index) {
      this.typenum = index;
      if (item.tmpname == "全部") {
        this.typename = "";
      } else {
        this.typename = item.tmpname;
      }
    },
    shenpiclick(item, index) {
      this.shenpinum = index;
      this.shenpitype = item;
      this.shenpival = item.id;
    },
    shuaixuan() {
      this.popupshow = false;
      this.FilesList = [];
      this.current_page = 1;

      this.onLoad();
    },
    // 时间选择
    settime(val) {
      this.timeshow = true;
      this.valtime = val;
      console.log(val);
    },
    gettime(value) {
      const startdata = value;
      //日期
      const resDate =
        startdata.getFullYear() +
        "-" +
        this.p(startdata.getMonth() + 1) +
        "-" +
        this.p(startdata.getDate());

      // 时间
      // const resTime =
      //     this.p(d.getHours()) +
      //     ':' +
      //     this.p(d.getMinutes()) +
      //     ':' +
      //     this.p(d.getSeconds());
      if (this.valtime == "1") {
        this.starttime = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        if (this.enddata > this.startdata) {
          this.stoptime = resDate;
        } else {
          // alert('合同时间结束日期要在合同开始时间之后');
          Toast("结束时间要在开始时间之后");
        }
      }

      this.timeshow = false;
    },

    p(s) {
      return s < 10 ? "0" + s : s;
    },
    close() {
      this.timeshow = false;
      if (this.valtime == "1") {
        this.starttime = "";
      } else if (this.valtime == "2") {
        this.stoptime = "";
      }
    },
    //获取类型
    getlist() {
      this.$axios.post("/journal/loglisttype").then((res) => {
        if (res.data.code == 1) {
          this.TypyList = [this.all, ...res.data.tmpname];
        }
      });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getlist();
  },
  mounted() {},
};
</script>
<style lang='less' >
// #loglist {
//     .inputdiv {
//         display: flex;
//         align-items: center; /*定义body的元素垂直居中*/
//         justify-content: center; /*定义body的里的元素水平居中*/
//         width: 100%;
//         height: 4.5rem;

//         background-color: #e6e6e6;
//         .van-search {
//             width: 100%;
//             height: 100%;

//             .van-search__action {
//                 font-size: 0.6rem;
//                 line-height: 1rem;
//                 background-color: #fff;
//                 .van-button {
//                     height: 1.8rem;
//                     width: 4rem;

//                     .van-button__text {
//                         font-size: 1rem;
//                     }
//                 }
//             }
//             .van-search__action {
//                 height: 100%;
//                 line-height: 4rem;
//                 .van-button--normal {
//                     border-radius: 0.33rem;
//                     height: 2.5rem;
//                     .van-button__text {
//                         color: #409eff;
//                     }
//                 }
//             }
//             .van-search__content--round {
//                 border-radius: 0.33rem;
//             }
//             .van-search__content {
//                 .van-cell {
//                     height: 2.5rem;
//                     line-height: 2.2rem;
//                     font-size: 1rem;
//                     .van-field__left-icon {
//                         .van-icon {
//                             font-size: 1.2rem;
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     .renwucontent {
//         margin-top: 0.67rem;
//         background-color: #fff;
//         // padding: 0.33rem 20px;
//         border-radius: 0.33rem;
//         .btem {
//             display: flex;
//             margin-left: 0.33rem;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             white-space: nowrap;

//             font-size: 0.87rem;
//             font-family: PingFang SC;
//             font-weight: 500;
//             color: #666666;
//             line-height: 2rem;

//             .btem1 {
//                 max-width: 50%;

//                 overflow: hidden;

//                 text-overflow: ellipsis;
//                 white-space: nowrap;
//             }
//             .btem2 {
//                 max-width: 50%;

//                 overflow: hidden;
//                 text-overflow: ellipsis;
//                 white-space: nowrap;
//             }
//         }
//         .item_heard {
//             display: flex;
//             justify-content: space-between;
//             line-height: 2.33rem;
//             font-size: 1rem;
//             color: #3b4045;
//             align-items: center;
//             margin-left: 0.33rem;
//             .item_name {
//                 margin: 0.33rem 0;
//                 width: 60%;
//                 overflow: hidden;
//                 text-overflow: ellipsis;
//                 white-space: nowrap;
//             }
//             .item_img {
//                 display: flex;
//                 align-items: center;
//                 font-size: 1.17rem;
//                 width: 100%;
//                 img {
//                     border-radius: 50%;
//                     width: 1.7rem;
//                     height: 1.7rem;
//                     // margin-right: 0.33rem;
//                 }

//                 .item_img_title {
//                     margin-left: 0.33rem;
//                     line-height: 1.17rem;
//                     // padding-top: 0.33rem;
//                     width: 90%;
//                     display: flex;
//                     justify-content: space-between;

//                     .item_img_title1 {
//                         width: 60%;
//                         overflow: hidden;
//                         text-overflow: ellipsis;
//                         white-space: nowrap;
//                         color: #000000;
//                         font-weight: 600;

//                         font-size: 1rem;

//                         font-family: PingFang SC;
//                         font-weight: bold;
//                         color: #333333;
//                     }

//                     .item_img_title2 {
//                         width: 40%;
//                         text-align: right;
//                         font-size: 0.8rem;
//                         font-family: PingFang SC;
//                         font-weight: 500;
//                         color: #999999;
//                     }
//                 }
//             }
//         }
//         .item_time {
//             font-size: 1rem;
//             color: #3b4045;
//             margin: 0.33rem 0;
//         }
//         .fenge {
//             border-bottom: 0.03rem solid #eeeff3;
//             margin-top: 0.5rem;
//         }
//         .item_bottom {
//             border-top: 0.1rem solid #eceff3;
//             padding: 0.6rem 1rem;
//             display: flex;
//             color: #485985;
//             align-items: center;
//             justify-content: space-between;
//             div {
//                 display: flex;

//                 align-items: center;
//             }

//             .dele_bottom {
//                 color: red;
//                 .delet_t {
//                     text-align: center;
//                     display: block;
//                     width: 4.2rem;
//                     height: 1.3rem;
//                     border: 0px solid #387ef5;
//                     border-radius: 0.3rem;
//                     padding: 0.1rem;
//                     border: 0.03rem solid #387ef5;
//                 }
//                 .delet_d {
//                     text-align: center;
//                     display: block;
//                     width: 2.97rem;
//                     height: 1.3rem;
//                     border: 0px solid red;
//                     border-radius: 0.3rem;
//                     padding: 0.1rem;
//                     border: 0.03rem solid red;
//                 }
//             }
//         }
//     }
//     .van-popup {
//         .sureBtn {
//             position: absolute;
//             bottom: 0.67rem;
//             width: 100%;

//             margin-bottom: 0.67rem;
//             margin-top: 1rem;
//             height: 2.67rem;
//             line-height: 2.67rem;
//             text-align: center;

//             overflow: hidden;
//             .van-button {
//                 width: 40%;
//                 height: 100%;
//                 border-radius: 0.27rem;
//                 span {
//                     font-size: 1rem;
//                 }
//             }
//         }
//         .zstype {
//             width: 100%;
//             height: 80%;
//             overflow: auto;

//             background-color: #fff;
//             .van-cell {
//                 padding: 0 0.5rem;
//                 height: 3.33rem;
//                 .van-cell__title {
//                     height: 100%;
//                     line-height: 3.33rem;
//                     font-size: 1rem;
//                     padding-left: 0.33rem;
//                 }
//                 .van-cell__value {
//                     .van-field__body {
//                         height: 100%;
//                         line-height: 3.33rem;
//                         .van-field__control {
//                             font-size: 1rem !important;
//                             line-height: 1rem !important;
//                             color: #000;
//                         }
//                     }
//                 }
//             }

//             .typetitle {
//                 display: flex;
//                 width: 100%;

//                 align-items: center; /*定义body的元素垂直居中*/
//                 // justify-content: center; /*定义body的里的元素水平居中*/
//                 padding: 1rem;
//                 box-sizing: border-box;
//                 .titlepoint {
//                     width: 1rem;
//                     height: 1rem;
//                     border-radius: 50%;
//                     background-color: #409efe;
//                 }
//                 .titlefont {
//                     margin-left: 0.67rem;
//                     color: #191f25;
//                     font-size: 0.93rem;
//                 }
//             }
//             .typecontent {
//                 margin: 1.5%;
//                 width: 30%;
//                 float: left;
//                 height: 2.33rem;
//                 background-color: #f4f4f4;
//                 border-radius: 0.33rem;

//                 font-size: 0.93rem;
//                 text-align: center;

//                 line-height: 2.33rem;

//                 color: #7a7d81;
//             }
//         }
//     }
//     .typeColor {
//         background-color: #409efe !important;
//         color: #fff !important;
//     }
// }
</style>

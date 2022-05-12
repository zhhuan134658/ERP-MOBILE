<template>
  <!--项目信息  -->
  <div id="newtasklist">
    <!--项目搜索  -->
    <van-sticky>
      <div class="inputdiv">
        <van-search
          v-model="Searchname"
          placeholder="请填写搜索条件"
          show-action
          shape="round"
          @change="sear"
        >
          <div slot="action">
            <!-- <van-button
                        @click="onLoad"
                        type="default"
                    >搜索</van-button> -->
            <van-button @click="shaixuan" type="default">筛选</van-button>
            <van-button @click="creatin" type="default">新建</van-button>
          </div>
        </van-search>
      </div>
    </van-sticky>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <!-- fatherMethod1 查看详情  fatherMethod2 删除  fatherMethod3 提醒日期 -->
      <commonList
        :waringdata="waringdata"
        :dataList="FilesList"
        :fatherMethod1="lookinfo"
        :fatherMethod2="deleteitem"
        :fatherMethod3="getTimej"
        :valname="valname"
      ></commonList>
      <!-- <div
                class="renwucontent"
                v-for="(item, index) in FilesList"
                :key="index"
            >
                <div
                    style="padding:.5rem 1rem;"
                    @click="lookinfo(item)"
                >
                    <div class="item_heard">
                        <div class="item_img">
                            <img
                                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/nkKrYbEW2m1615339826337.jpg"
                                alt
                            />

                            <div class="item_img_title">

                                <div class="item_img_title1">
                                    {{ item.name }}
                                </div>

                                <div class="item_img_title2">
                                    {{ item.project_riqi }}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="btem">
                        <div class="btem1">投标负责人:</div>
                        <div class="btem2">{{ item.applicant }}</div>
                    </div>
                    <div class="btem">
                        <div class="btem1">类型:</div>
                        <div class="btem2">{{ item.type }}</div>
                    </div>
                    <div class="btem">
                        <div class="btem1">投标时间:</div>
                        <div class="btem2">{{ item.bid_riqi }}</div>
                    </div>

                </div>

                <div class="item_bottom">

                    <div @click="lookinfo(item)">
                        <div
                            class="btem2"
                            style="color:rgb(230, 162, 60)"
                            v-if="item.status==1"
                        >
                            审批中
                        </div>
                        <div
                            class="btem2"
                            style="color:rgb(103, 194, 58)"
                            v-if="item.status==2"
                        >
                            已同意
                        </div>
                        <div
                            class="btem2"
                            style="color:#67c23a"
                            v-if="item.status==3"
                        >
                            已拒绝
                        </div>
                    </div>
                    <div class="dele_bottom">

                        <span
                            class="delet_t"
                            @click="getTimej(item)"
                            style="color:#387ef5"
                        >提醒日期</span>
                        &nbsp;

                        <span
                            class="delet_d"
                            @click="deleteitem(item)"
                        >删除</span>

                    </div>

                </div>

            </div> -->
    </van-list>

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

        <div class="typetitle">
          <div class="titlepoint"></div>
          <div class="titlefont">按审批状态</div>
        </div>
        <div
          class="typecontent"
          v-for="(item, index) in shenpiList"
          :key="index"
          @click="shenpiclick(item, index)"
          :class="shenpinum == index ? 'typeColor' : ''"
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
    <van-dialog
      v-model="zxmdialog"
      title="设置提醒日期"
      show-cancel-button
      @confirm="confirmd"
      @cancel="quxiao"
    >
      <van-field
        readonly
        @click="settimetx"
        input-align="right"
        v-model="txData.riqi"
        name="选择日期"
        label="选择日期"
        placeholder="请填写选择日期"
        maxlength="50"
      />
    </van-dialog>
    <van-popup v-model="timetxshow" position="bottom">
      <van-datetime-picker
        v-model="starcurrenttxDate"
        type="date"
        @confirm="gettxtime"
        @cancel="closetx"
      />
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "../../../common/Empty.vue";
import commonList from "../../../common/commonList.vue";
export default {
  name: "newtasklist",
  components: { Empty, commonList },
  data() {
    return {
      valname: "zk_project_spreadfield",
      waringdata: true,

      starcurrenttxDate: new Date(),
      txData: {
        name: "zk_project",
        remind_id: "",
        riqi: "",
      },
      valtxtime: "",
      valtime: "",
      zxmdialog: false,
      maxDate: "",
      txitem: "",
      timetxshow: false,
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

      Emptyshow: false,
      dialogshow: false,
      commontext: "",
      itemdata: "",
      caozuoshow: false,
      // 分页列表

      FilesList: [],
      searchFrom: {},
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
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
      this.starttime = "";
      this.stoptime = "";
    },
    settxTime(item) {
      this.zxmdialog = true;
      this.txitem = item;
      // this.maxDate = new Date(item.bid_riqi);
      console.log(this.maxDate);

      this.txData.remind_id = item.id;
    },

    // 时间选择
    settimetx(val) {
      this.timetxshow = true;
      this.valtxtime = val;
      console.log(val);
    },
    gettxtime(value) {
      const startdata = value;
      console.log(startdata);
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

      this.txData.riqi = resDate;

      this.timetxshow = false;
    },

    closetx() {
      this.timetxshow = false;

      this.txData.riqi = "";
    },
    confirmd() {
      this.$axios
        .post("/projecttwo/editRemindRiqi", this.txData)
        .then((res) => {
          if (res.data.code == 1) {
            Toast(res.data.msg);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    quxiao() {
      this.zxmdialog = false;
    },

    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    onLoad() {
      this.getInfo();
      this.loading = true;
    },

    getInfo() {
      this.$axios
        .post("/project/projectList", {
          page: this.current_page,
          number: "10",
          start_riqi: this.starttime,
          end_riqi: this.stoptime,
          type: this.typename,
          name: this.Searchname,
          applicant: "",
          estimate_contract_money_start: "",
          estimate_contract_money_end: "",
          inputer: "",
          construction_unit: "",
          shenpi: this.shenpival,
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
    deleteitem(item) {
      console.log(item);
      Dialog.confirm({
        title: "提示",
        message: "是否删除",
      })
        .then(() => {
          this.$axios
            .post("/project/projectDel", {
              id: [item.id],
            })
            .then((res) => {
              if (res.data.code == 1) {
                Toast(res.data.msg);
                this.FilesList = [];
                this.current_page = 1;
                this.loading = false;
                this.finished = false;

                this.onLoad();
                this.newdelete();
              } else {
                Toast(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    //新
    newdelete() {
      this.$axios.post("/project/projectReductionEup").then((res) => {});
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
    creatin() {
      const _this = this;
      console.log(_this.datainfo);

      _this.$axios.post("/project/projectAdd").then((res) => {
        if (res.data.code == 1) {
          _this.openurl =
            "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=" +
            _this.$store.state.userData.cid +
            "&swfrom=qrshareh5&tempalteName=" +
            res.data.name_mould +
            "&processCode=" +
            res.data.data +
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
        } else {
          Toast(res.data.msg);
        }
      });
    },

    // 筛选
    sear() {
      this.FilesList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;

      this.onLoad();
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
      this.loading = false;
      this.finished = false;

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
      this.timeshow = false;
    },
    getTimej(item) {
      this.$axios
        .post("/projectfour/newRemindRq", {
          remind_id: item.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            let newdata = new Date(res.data.data);
            let y = newdata.getFullYear();
            let m = newdata.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            let d = newdata.getDate();
            d = d < 10 ? "0" + d : d;
            this.txData.riqi = y + "-" + m + "-" + d;

            this.settxTime(item);
          } else {
            Toast(res.data.msg);
          }
        });
    },
  },
  created() {
    this.$utils.checkding();

    this.TypyList = this.$utils.utilProjectStatus();
    this.shenpiList = this.$utils.utilApprovalStatus();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
#newtasklist {
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
  .van-dialog__content {
    padding: 0 0.5rem;
    .van-cell {
      .van-cell__value {
        .van-field__body {
          .van-field__control {
            padding: 0.33rem !important;
            height: 5rem !important;
            font-size: 1rem !important;
          }
          .van-field__right-icon {
            .van-icon {
              font-size: 1rem !important;
              color: #409efe;
            }
          }
        }
      }
    }
  }
  // padding: 0.33rem;
  .renwucontent {
    margin-top: 0.67rem;
    background-color: #fff;
    // padding: 0.33rem 20px;
    border-radius: 0.33rem;
    .btem {
      display: flex;
      margin-left: 0.33rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      font-size: 0.87rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      line-height: 2rem;

      .btem1 {
        max-width: 50%;

        overflow: hidden;

        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btem2 {
        max-width: 50%;

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
        width: 100%;
        img {
          border-radius: 50%;
          width: 1.7rem;
          height: 1.7rem;
          // margin-right: 0.33rem;
        }

        .item_img_title {
          margin-left: 0.33rem;
          line-height: 1.17rem;
          // padding-top: 0.33rem;
          width: 90%;
          display: flex;
          justify-content: space-between;

          .item_img_title1 {
            width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000000;
            font-weight: 600;

            font-size: 1rem;

            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
          }

          .item_img_title2 {
            width: 40%;
            text-align: right;
            font-size: 0.8rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
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
      border-top: 0.1rem solid #eceff3;
      padding: 0.6rem 1rem;
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
        .delet_t {
          text-align: center;
          display: block;
          width: 4.2rem;
          height: 1.3rem;
          border: 0px solid #387ef5;
          border-radius: 0.3rem;
          padding: 0.1rem;
          border: 0.03rem solid #387ef5;
        }
        .delet_d {
          text-align: center;
          display: block;
          width: 2.97rem;
          height: 1.3rem;
          border: 0px solid red;
          border-radius: 0.3rem;
          padding: 0.1rem;
          border: 0.03rem solid red;
        }
      }
    }
  }

  .addrenwu {
    position: fixed;
    width: 30%;
    bottom: 15%;
    left: 35%;
    text-align: center;
    img {
      width: 3.33rem;
      height: 3.33rem;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .typeColor {
    background-color: #409efe !important;
    color: #fff !important;
  }
}
</style>

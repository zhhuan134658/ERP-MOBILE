<template>
  <!--投标保证金退回  -->
  <div id="newtasklist">
    <!-- -->
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
      <commonList
        :waringdata="waringdata"
        :dataList="FilesList"
        :fatherMethod1="lookinfo"
        :fatherMethod2="deleteitem"
        :fatherMethod3="getTimej"
        :valname="valname"
      ></commonList>
      <!-- <div
                class=""
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
                                    {{ item.project_name }}
                                </div>

                                <div class="item_img_title2">
                                    {{ item.created }}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="btem">
                        <div class="btem1">退回金额:</div>
                        <div class="btem2">{{ item.bond_money }}</div>
                    </div>
                    <div class="btem">
                        <div class="btem1">账号:</div>
                        <div class="btem2">{{ item.account }}</div>
                    </div>
                    <div class="btem">
                        <div class="btem1">发起日期:</div>
                        <div class="btem2">{{ item.created }}</div>
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
      title="请选择项目"
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
      />
    </van-dialog>
    <van-popup v-model="timetxshow" position="bottom">
      <van-datetime-picker
        :max-date="maxDate"
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
      valname: "bid_bond_return",
      waringdata: false,
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
    },
    settxTime(item) {
      this.zxmdialog = true;
      this.txitem = item;
      this.maxDate = new Date(item.bid_riqi);
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
        .post("/projecttwo/bidBondReturnList", {
          page: this.current_page,
          number: "10",
          start_bond_money: "",
          end_bond_money: "",

          project_name: this.Searchname,

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
            .post("/projecttwo/bidBondReturnDel", {
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
                // this.newdelete();
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
    // newdelete() {
    //     this.$axios.post('/project/projectReductionEup').then((res) => {});
    // },
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

      _this.$axios.post("/projecttwo/bidBondReturn").then((res) => {
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

.typeColor {
  background-color: #409efe !important;
  color: #fff !important;
}
</style>

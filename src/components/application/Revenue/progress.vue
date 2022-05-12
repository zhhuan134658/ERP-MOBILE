<template>
  <!--进度款申报-->
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
      <commonList
        :waringdata="waringdata"
        :dataList="FilesList"
        :fatherMethod1="lookinfo"
        :fatherMethod2="deleteitem"
        :fatherMethod3="getTimej"
        :valname="valname"
      ></commonList>
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
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "../../common/Empty.vue";
import commonList from "../../common/commonList.vue";
export default {
  name: "newtasklist",
  components: { Empty, commonList },
  data() {
    return {
      valname: "income_progresspay_declaration",
      waringdata: false,
      // 筛选
      typename: "",
      shenpitype: "",
      Searchname: "",
      shenpival: "",
      timeshow: false,
      starttime: "",
      stoptime: "",
      starcurrentDate: new Date(),
      typenum: "",
      shenpinum: "",
      TypyList: [],
      shenpiList: [],
      popupshow: false,
      plfile: [],
      Emptyshow: false,
      dialogshow: false,
      commontext: "",
      itemdata: "",
      caozuoshow: false,
      // 分页列表
      Searchname: "",
      FilesList: [
        // {
        //     by1: null,
        //     by2: null,
        //     enclosure: '[]',
        //     filedata1: null,
        //     founder: '赵勇',
        //     id: '203',
        //     pname: '协同建设问题汇总',
        //     processdata1: null,
        //     spare4: '46',
        //     starttime: '2020-09-25',
        //     stoptime: '2020-09-29',
        //     taskstatus: '0',
        //     tasktitle: '文明施工区检查',
        //     tasktype: '安全文明检查',
        //     todostaff: '125316554438038523',
        //     username: '陈莉娜',
        //     xmid: '63',
        // },
      ],
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
      this.starttime = "";
      this.stoptime = "";
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
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
        .post("/project/incomeProgresspayDeclarationList", {
          page: this.current_page,
          number: "10",
          start_riqi: this.starttime,
          end_riqi: this.stoptime,
          project_name: "",
          contract_name: "",
          filler: "",
          party_a: "",
          p_number: "",
          name: this.Searchname,

          shenpi: this.shenpival,
          // corp_id: this.$store.state.userData.cid,
          // userid: this.$store.state.userData.userid,
          // projectname: this.$store.state.userData.Selecteddata
          //     .pcontent,
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
            .post("/project/incomeProgresspayDeclarationDel", {
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
              } else {
                Toast(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
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
    creatin() {
      const _this = this;
      console.log(_this.datainfo);

      _this.$axios.post("/project/incomeProgresspayDeclaration").then((res) => {
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
    this.TypyList = this.$utils.utilProjectStatus();
    this.shenpiList = this.$utils.utilApprovalStatus();
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
</style>

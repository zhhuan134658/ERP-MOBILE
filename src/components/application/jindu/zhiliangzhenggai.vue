<template>
  <!--材料调拨  -->
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
                  {{ item.title }}
                </div>

                <div class="item_img_title2">
                  {{ item.created_time }}
                </div>
              </div>
            </div>
          </div>
          <div class="btem">
            <div class="btem1">回复内容:</div>
            <div class="btem2">{{ item.reply_content }}</div>
          </div>
          <div class="btem">
            <div class="btem1">回复人:</div>
            <div class="btem2">{{ item.reply_user }}</div>
          </div>
          <div class="btem">
            <div class="btem1">关联审批单:</div>
            <div class="btem2">{{ item.relation_name }}</div>
          </div>
        </div>

        <div class="item_bottom">
          <div @click="lookinfo(item)">
            <div
              class="btem2"
              style="color: rgb(230, 162, 60)"
              v-if="item.status == 1"
            >
              审批中
            </div>
            <div
              class="btem2"
              style="color: rgb(103, 194, 58)"
              v-if="item.status == 2"
            >
              已同意
            </div>
            <div class="btem2" style="color: #67c23a" v-if="item.status == 3">
              已拒绝
            </div>
          </div>
          <div class="dele_bottom">
            <!-- <span
                            class="delet_t"
                            @click="settxTime(item)"
                            style="color:#387ef5"
                        >提醒日期</span>
                        &nbsp; -->

            <!-- <span
                            class="delet_d"
                            @click="deleteitem(item)"
                        >删除</span> -->
          </div>
        </div>
      </div>
    </van-list>

    <Empty v-if="Emptyshow"></Empty>
    <van-popup
      v-model="popupshow"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="zstype">
        <!-- <div class="typetitle">
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
                </div> -->

        <div class="typetitle">
          <div class="titlepoint"></div>
          <div class="titlefont">按回复状态</div>
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
    <van-dialog
      v-model="zxmdialog"
      title="请选择项目"
      show-cancel-button
      @confirm="confirmd"
      @cancel="quxiao"
    >
      <van-field
        readonly
        @click="showPopup"
        input-align="right"
        v-model="zxmname"
        name="项目名称"
        label="项目名称"
        placeholder="请填写项目名称"
        maxlength="50"
        :rules="[{ required: false, message: '请填写项目名称' }]"
      />
    </van-dialog>
    <van-popup v-model="zxmshow" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @cancel="zxmshow = false"
        @confirm="onConfirm1"
      />
    </van-popup>
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
export default {
  name: "newtasklist",
  components: { Empty },
  data() {
    return {
      selecval: "",
      zxmshow: false,
      xmlist: [],
      // 筛选
      typename: "",
      shenpitype: "",
      shenpival: "",
      Searchname: "",
      timeshow: false,
      starttime: "",
      stoptime: "",
      starcurrentDate: new Date(),
      typenum: "",
      shenpinum: "",
      TypyList: [],
      shenpiList: [
        { id: "", tmpname: "全部" },
        { id: 1, tmpname: "回复中" },
        { id: 2, tmpname: "已回复" },
        { id: 3, tmpname: "已拒绝" },
      ],

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
      zxmname: "",
      zxmid: "",
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
    onConfirm1(value) {
      console.log(value);

      this.zxmname = value.name;
      this.zxmid = value.id;

      this.zxmshow = false;
      this.gocreatin();
    },
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
    },
    quxiao() {
      this.zxmname = "";
      this.zxmid = "";
    },
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

    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },

    onLoad() {
      this.$axios
        .post("task/zlreply", {
          corp_id: this.$store.state.userData.cid,
          userid: "",
          page: this.current_page,
          status: "", //	状态 审批中1 同意2 拒绝3 撤销4

          content: this.Searchname,

          flow: this.shenpival, //	流程状态 1 我发起的 2抄送我的 3我审批的
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
                // this.FilesList.push(...res.data.content.list);
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
              this.current_page == res.data.content.total ||
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
    deleteitem(item) {
      console.log(item);
      this.$axios
        .post("/project/materialAllocationDel", {
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
      this.selecval = "name";
      this.zxmshow = true;
      this.columns = this.xmlist;
    },

    gocreatin() {
      const _this = this;

      _this.$axios
        .post("task/gettmpcode", {
          corp_id: _this.$store.state.userData.cid,
          tmpname: "质量整改回复",
          xmid: _this.zxmid,
        })
        .then((res) => {
          _this.openurl =
            "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=" +
            _this.$store.state.userData.cid +
            "&swfrom=qrshareh5&tempalteName=" +
            "质量整改回复" +
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
    //获取子项目列表
    getxmList() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.xmlist = res.data.data;
      });
    },
  },
  created() {
    this.TypyList = this.$utils.utilProjectStatus();
    // this.shenpiList = this.$utils.utilApprovalStatus();
    this.$utils.checkding();
    this.setTitle();
    this.getxmList();
  },
  mounted() {},
};
</script>
<style lang='less' >
</style>

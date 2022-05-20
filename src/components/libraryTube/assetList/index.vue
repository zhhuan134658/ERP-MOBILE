<template>
  <!--项目立项  -->
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
            <van-button v-if="daoshow" @click="Import" type="default"
              >导入</van-button
            >

            <van-button @click="shaixuan" type="default">筛选</van-button>
            <van-button @click="creatin(1)" type="default">新建</van-button>
          </div>
        </van-search>
      </div>
    </van-sticky>

    <div class="renwucontent" v-for="(item, index) in FilesList" :key="index">
      <div style="padding: 0.5rem 1rem" @click="goinfo1(item, 2)">
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
                {{ item.plan_start_riqi }}
              </div>
            </div>
          </div>
        </div>
        <div class="btem">
          <div class="btem1">项目负责人:</div>
          <div class="btem2">{{ item.send_name }}</div>
        </div>
        <div class="btem">
          <div class="btem1">类型:</div>
          <div class="btem2">{{ item.type }}</div>
        </div>
        <div class="btem">
          <div class="btem1">项目状态:</div>
          <div class="btem2">{{ item.project_status }}</div>
        </div>
      </div>

      <div class="item_bottom">
        <div @click="goinfo1(item, 2)">
          <!-- <div
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
          </div> -->
        </div>
        <div class="dele_bottom">
          <span class="delet_t" @click="goinfo(item, 2)" style="color: #387ef5"
            >编辑信息</span
          >
          &nbsp;

          <span class="delet_d" @click="deleteitem(item)">删除</span>
        </div>
      </div>
    </div>
   
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
import pxupload from "../../common/hupload.vue";
export default {
  name: "newtasklist",
  components: { Empty, commonList, pxupload },
  data() {
    return {
      searchFormData: {
        corp_id: this.$store.state.userData.cid,
        sortname: "", //排序参数 资产状态extendone，资产编码zznumber，资产名称name，资产分类type，品牌brand，型号model，设备序列号shsn
        sort: "", //正序ASC，倒叙DESC
        current_page: 1, //页码必填
        num: 999999, //每页显示数量
        mohu: 2, //搜索前缀  1位模糊搜索2位精准搜索，3为高级搜索
        content: "", //mohu参数1.2时必填
        name: "", //资产名称
        brand: "", //品牌
        model: "", //型号填
        shsn: "", //设备序列号
        adminuser: "", //管理员
        orderid: "", //订单号
        remark: "", //备注
        zznumber: "", //资质编码
        extendone: "", //资产状态
        type: "", //资产分类，分类数组
        usestatus: "", //使用状况
        shoptype: "", //购置方式
        starttime: "", //购置起租开始日期
        stoptime: "", //购置起租结束日期填
        address: "", //位置
        chengzuorg: "", //所属承租公司
      },
      daoshow: false,
      fileuel: "",
      upImgList: [],
      licenceImg: [],
      dialogshow: false,
      valname: "project_info_register",
      waringdata: false,
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
    dwonmo() {
      window.location.href =
        "http://dingzhukuai.zzdingyun.com/public/file/立项信息登记导入模板.xls";
      // this.$axios
      //     .get(
      //         'http://dingzhukuai.zzdingyun.com/public/file/立项信息登记导入模板.xls'
      //     )
      //     .then((res) => {
      //         Toast(res.data.msg);
      //     });
    },
    confirmdialog() {
      this.$axios
        .post("/projecttwo/projectImport", { url: this.fileuel[0] })
        .then((res) => {
          Toast(res.data.msg);
        });
    },
    Import() {
      this.dialogshow = true;
    },
    showurl(data) {
      console.log(data + "55555");
      this.fileuel = data;
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
    // onLoad() {
    //   this.getList();
    //   this.loading = true;
    // },

    getList() {
      this.$axios
        .post("/erp_check/assetlists", this.searchFormData)
        .then((res) => {
          if (res.data.code == 1) {
            this.FilesList = res.data.content.list;
            if (this.FilesList && this.FilesList.length > 0) {
              this.Emptyshow = false;
            } else {
              this.Emptyshow = true;
            }
          } else {
            Toast(res.data.msg);
          }
        });
    },

    deleteitem(item) {
      Dialog.confirm({
        title: "提示",
        message: "是否删除",
      })
        .then(() => {
          this.$axios
            .post("/erp_check/deleteassetlists", {
              id: [item.id],
            })
            .then((res) => {
              if (res.data.code == 1) {
                Toast(res.data.msg);
                this.FilesList = [];
                this.current_page = 1;

                // this.onLoad();
                this.getList();
              } else {
                Toast(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
      console.log(item);
    },

    goinfo1(item) {
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
    //编辑
    goinfo(item, val) {
      this.$router.push({
        path: "/approvalindexcreat",
        query: {
          item: item,
          val: val,
        },
      });
      this.$store.commit("setshenpiList", item.approval_userid);
      this.$store.commit("setchaosongList", item.cc_userid);
    },
    //新建
    creatin(val) {
      this.$router.push({
        path: "/assetListform",
        query: {
          val: val,
        },
      });
    },
    creatin1(val) {
      this.$router.push({
        path: "/assetListform",
        query: {
          val: val,
        },
      });
      this.$store.commit("setshenpiList", []);
      this.$store.commit("setchaosongList", []);

      // const _this = this;
      // console.log(_this.datainfo);

      // _this.$axios.post('/project/projectInfoRegister').then((res) => {
      //     if (res.data.code == 1) {
      //         _this.openurl =
      //             'https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=' +
      //             _this.$store.state.userData.cid +
      //             '&swfrom=qrshareh5&tempalteName=' +
      //             res.data.name_mould +
      //             '&processCode=' +
      //             res.data.data +
      //             '&back=native#/custom';

      //         dd.ready(function () {
      //             dd.biz.util.openLink({
      //                 url: _this.openurl, //要打开链接的地址
      //                 onSuccess: function (result) {
      //                     /**/
      //                 },
      //                 onFail: function (err) {}
      //             });
      //         });
      //     } else {
      //         Toast(res.data.msg);
      //     }
      // });
    },

    // 筛选
    sear() {
      this.FilesList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;

      //   this.onLoad();
      this.getList();
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

      //   this.onLoad();
      this.getList();
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
 
  },
  created() {
 
    this.getList();
    this.TypyList = this.$utils.utilProjectStatus();
    this.shenpiList = this.$utils.utilApprovalStatus();
    this.$utils.checkding();
    this.setTitle();

    if (
      this.$store.state.userData.cid == "ding1b508a8102d46015ffe93478753d9884"
    ) {
      this.daoshow = true;
    } else {
      this.daoshow = false;
    }
  },
  mounted() {},
};
</script>
<style lang='less' >
.dialogfile {
  display: flex;
  font-size: 1rem;
  line-height: 3rem;
  .dialogfile1 {
  }
  .dialogfile2 {
    color: #66b1ff;
  }
}
#newtasklist {
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
}

.van-popup {
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
</style>

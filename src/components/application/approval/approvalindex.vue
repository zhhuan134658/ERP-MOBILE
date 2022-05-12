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
    <!-- <van-list v-model="loading" :finished="finished" @load="onLoad"> -->
    <commonList
      :waringdata="waringdata"
      :dataList="FilesList"
      :fatherMethod1="goinfo1"
      :fatherMethod2="deleteitem"
      :fatherMethod3="getTimej"
      :fatherMethod4="goinfo"
      :valname="valname"
    ></commonList>
    <!-- <div
                class=""
                v-for="(item, index) in FilesList"
                :key="index"
            >
                <div
                    style="padding:.5rem 1rem;"
                    @click="goinfo1(item,2)"
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

                    <div @click="goinfo1(item,2)">
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
                            v-if="item.status==2"
                            @click="goinfo(item,2)"
                            style="color:#387ef5"
                        >编辑信息</span>
                        &nbsp;

                        <span
                            class="delet_d"
                            @click="deleteitem(item)"
                        >删除</span>

                    </div>

                </div>

            </div> -->
    <!-- </van-list> -->

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
    <!-- 导入 -->
    <van-dialog
      v-model="dialogshow"
      title="上传文件"
      show-cancel-button
      @confirm="confirmdialog"
    >
      <pxupload
        @listenToChildEvent="showurl"
        :upImgList="upImgList"
        :licenceImg="licenceImg"
        :isShow="isShow"
      ></pxupload>

      <div class="dialogfile">
        <div class="dialogfile1">下载模板:</div>
        <div class="dialogfile2" @click="dwonmo">点击下载模板</div>
      </div>
    </van-dialog>
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
    //   this.getInfo();
    //   this.loading = true;
    // },

    getInfo() {
      this.$axios
        .post("/project/projectInfoRegisterList", {
          page: this.current_page,
          number: "99999",
          start_plan_start_riqi: this.starttime,
          end_plan_start_riqi: this.stoptime,
          stand_termer: "",
          start_plan_end_riqi: "",
          end_plan_end_riqi: "",
          name: this.Searchname,
          send_name: "",
          construction_unit: "",

          status: "",
          type: this.typename,

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
      Dialog.confirm({
        title: "提示",
        message: "是否删除",
      })
        .then(() => {
          this.$axios
            .post("/project/projectInfoRegisterDel", {
              id: [item.id],
            })
            .then((res) => {
              if (res.data.code == 1) {
                Toast(res.data.msg);
                this.FilesList = [];
                this.current_page = 1;

                // this.onLoad();
                this.getInfo();
                this.newdelete();
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
    newdelete() {
      this.$axios
        .post("/project/projectInfoRegisterReductionEup")
        .then((res) => {});
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
      if (window.location.protocol == "http:") {
        this.$router.push({
          path: "/approvalindexcreat",
          query: {
            val: val,
          },
        });
      } else if (window.location.protocol == "https:") {
        if (
          //this.$store.state.userData.cid
          this.$store.state.userData.cid ==
            "ding53c9e0147ed9d5fe35c2f4657eb6378f" ||
          this.$store.state.userData.cid ==
            "ding7ea9d6291ae87db1a1320dcb25e91351" ||
          this.$store.state.userData.cid ==
            "ding1a9d6aa4c63dfb99ffe93478753d9884" ||
          this.$store.state.userData.cid ==
            "dingb2e5997b238d554735c2f4657eb6378f" ||
          this.$store.state.userData.cid ==
            "ding85b5c1933abfd7f235c2f4657eb6378f" ||
          this.$store.state.userData.cid ==
            "ding02923b795dc25433ffe93478753d9884" ||
          this.$store.state.userData.cid ==
            "ding23b12dc5f632063824f2f5cc6abecb85" ||
          this.$store.state.userData.cid ==
            "ding1cf4c0ec5c7566f735c2f4657eb6378f" ||
          this.$store.state.userData.cid ==
            "dingec869366cf4713d3a1320dcb25e91351" ||
          this.$store.state.userData.cid ==
            "ding5cc9f7e976f9cc92acaaa37764f94726" ||
          this.$store.state.userData.cid ==
            "ding00f1aafe21a95976bc961a6cb783455b" ||
          this.$store.state.userData.cid ==
            "dingea718b6fb7aa611235c2f4657eb6378f" ||
          this.$store.state.userData.cid ==
            "ding5ee4ff6292e3498ba39a90f97fcb1e09" ||
          this.$store.state.userData.cid ==
            "ding3abae6364050807035c2f4657eb6378f" ||
          this.$store.state.userData.cid ==
            "ding1b508a8102d46015ffe93478753d9884" ||
          this.$store.state.userData.cid ==
            "dinge9e7294e66af1a01a39a90f97fcb1e09" ||
          this.$store.state.userData.cid ==
            "ding4cc2495c09c54b8da1320dcb25e91351" ||
          this.$store.state.userData.cid ==
            "ding48b7e37c986368f3ffe93478753d9884" ||
          this.$store.state.userData.cid ==
            "dingee167496cb125eaeee0f45d8e4f7c288" ||
          this.$store.state.userData.cid ==
            "ding2c472b79b3c2b02035c2f4657eb6378f"
        ) {
          this.$router.push({
            path: "/approvalindexcreat",
            query: {
              val: val,
            },
          });
          this.$store.commit("setshenpiList", []);
          this.$store.commit("setchaosongList", []);
        } else {
          const _this = this;
          console.log(_this.datainfo);

          _this.$axios.post("/project/projectInfoRegister").then((res) => {
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
        }
      }
    },
    creatin1(val) {
      this.$router.push({
        path: "/approvalindexcreat",
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
      this.getInfo();
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
      this.getInfo();
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
    this.getInfo();
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
</style>

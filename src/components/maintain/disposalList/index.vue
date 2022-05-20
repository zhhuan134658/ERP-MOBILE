<template>
  <!-- 项目立项 -->
  <div id="spcreat">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
      style="margin-bottom: 100px"
    >
      <van-field
        input-align="right"
        v-model="addUserForm.cznumber"
        name="处置单号"
        label="处置单号"
        placeholder="请填写处置单号"
        maxlength="40"
        :rules="[{ required: false }]"
      />

      <van-field
        readonly
        input-align="right"
        v-model="addUserForm.starttime"
        name="创建日期"
        label="创建日期"
        placeholder="请填写创建日期"
        :rules="[{ required: false }]"
        @click="settime(1)"
      />
      <van-field
        @click="showPopup(1)"
        readonly
        input-align="right"
        clickable
        v-model="addUserForm.czstatus"
        name="单据状态"
        label="单据状态"
        placeholder="请填写单据状态"
        :rules="[{ required: false }]"
      />
      <van-field
        @click="addoneren('chu')"
        readonly
        input-align="right"
        v-model="addUserForm.czusername"
        name="处置发起人"
        label="处置发起人"
        placeholder="请填写处置发起人"
        :rules="[{ required: false }]"
      />
      <van-field
        @click="showPopup(2)"
        readonly
        input-align="right"
        clickable
        v-model="addUserForm.userteamname"
        name="发起人部门"
        label="发起人部门"
        placeholder="请填写发起人部门"
        :rules="[{ required: false }]"
      />
      <van-field
        readonly
        input-align="right"
        v-model="addUserForm.stoptime"
        name="完成日期"
        label="完成日期"
        placeholder="请填写完成日期"
        :rules="[{ required: false }]"
        @click="settime(2)"
      />
      <van-field
        @click="showPopup(3)"
        readonly
        input-align="right"
        clickable
        v-model="addUserForm.cztype"
        name="处置类型"
        label="处置类型"
        placeholder="请填写处置类型"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        v-model="addUserForm.czmoney"
        name="处置金额"
        label="处置金额"
        placeholder="请填写处置金额"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        v-model="addUserForm.czxiaofei"
        name="处置费用"
        label="处置费用"
        placeholder="请填写处置费用"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        v-model="addUserForm.zcyuanzhi"
        name="资产原值合计"
        label="资产原值合计"
        placeholder="请填写资产原值合计"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        v-model="addUserForm.zccanzhi"
        name="资产残值合计"
        label="资产残值合计"
        placeholder="请填写资产残值合计"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        v-model="addUserForm.czremark"
        name="处置说明"
        label="处置说明"
        placeholder="请填写处置说明"
        :rules="[{ required: false }]"
      />

      <comassList ref="headerChild"></comassList>
      <div class="sureBtn">
        <van-button :loading="loading" native-type="submit" type="info"
          >提 交</van-button
        >
      </div>
    </van-form>
    <div class="height:100px;"></div>

    <van-popup v-model="popupshow" position="bottom" :style="{ height: '38%' }">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @cancel="mxcancel"
        @confirm="onConfirm1"
      />
    </van-popup>
    <!-- 时间 -->
    <!-- <van-popup
            v-model="isshow"
            position="bottom"
        >
            <van-datetime-picker
                v-model="starcurrentDate1"
                type="date"
                @confirm="gettime1"
                @cancel="close1"
            />
        </van-popup> -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="starcurrentDate"
        type="date"
        @confirm="gettime"
        @cancel="close"
      />
    </van-popup>
    <van-popup v-model="areashow" position="bottom">
      <van-area
        :area-list="areaList"
        :columns-num="3"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        :value="newcode"
        @change="changeAddr"
        @confirm="chooseThis"
      />
    </van-popup>
    <!--树状  -->
    <van-popup v-model="treeShow" position="bottom" :style="{ height: '30%' }">
      <el-tree
        :data="treeList"
        show-checkbox
        :default-expand-all="false"
        :expand-on-click-node="false"
        node-key="id"
        ref="ftree"
        highlight-current
        check-strictly
        :props="defaultProps"
        @check="handleNewAddClick"
      >
      </el-tree>
    </van-popup>
  </div>
</template>

<script>
import $ from "jquery";
import * as dd from "dingtalk-jsapi";
import addressData from "../../common/area.js";
import newUpload from "../../common/newUpload.vue";
import comassList from "../../common/comassList.vue";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "spcreat",
  components: { newUpload, comassList },
  data() {
    return {
      newtypelist: [{ name: "zhuangtai" }],
      treeShow: false,
      treeList: [],
      noLastList: [],
      LastList: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      allProjectList: [],
      allSupplier: [],
      isShow: [],
      upImgList: [],
      licenceImg: [],
      loading: false,
      newall: {
        tmpname: "全部",
        value: "全部",
      },
      reashow: false,
      areashow: false, //是否显示弹出层
      detailAddress: "", //绑定详细地址输入框
      areaList: addressData, //可选地址数据列表
      showAddr: "", //显示校区地址
      resAddr: "", //传给后端的位置信息
      changeFile: true,
      contactsUnit: [],
      contactsjiaUnit: [],
      xmuserid: [],
      xmuname: [],
      xmlist: [],

      listshow: "",
      UserOrgList: [],
      ZhengShuXIaLaList: [],
      allshow: false,
      newrenList: [],
      chaosongshow: false,
      newcsList: [],
      shenpiList: this.$store.state.userData.shenpiList,
      chaosongList: this.$store.state.userData.chaosongList,
      ZhengTypeList: [],
      ChiZhengUserList: [],
      uptype: "",
      isshow: false,
      show: false,
      active: "1",
      popupshow: false,
      starcurrentDate1: new Date(),
      starcurrentDate: new Date(),
      endcurrentDate: new Date(),
      columns: [],
      selectype: "",
      selecval: "",
      mxindex: 0,
      issureList: [
        { name: "是", id: "1" },
        { name: "否", id: "2" },
      ],
      xmtype: [],
      xmstatus: [],
      newList: [{ name: "电子件", id: "2" }],
      mxitem: {
        name: "", //
        size: "", //规格型号
        unit: "", //单位
        zh_number: "",
        position: "",
        remarks: "", //备注
      },
      newcode: "",
      priceStatus: [
        { name: "综合单价", value: "综合单价" },
        { name: "土层价", value: "土层价" },
        { name: "岩层价", value: "岩层价" },
        { name: "空孔价", value: "空孔价" },
      ],
      addUserForm: {
        corp_id: "", //企业ID
        assetcontent: "", //资产内容
        starttime: "", //创建日期
        cznumber: "", //处置单号
        czstatus: "", //单据状态
        czuserid: "", //处置发起人
        czusername: "", //处置发起人

        userteam: "", //发起人部门
        userteamname: "",
        cztype: "", //处置类型
        czmoney: "", //处置金额
        stoptime: "", //完成日期
        zcyuanzhi: "", //资产原值合计
        zccanzhi: "", //资产残值合计
        czxiaofei: "", //处置费用
        czremark: "", //处置说明内容
        bxurl: "", //添加附件
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    addoneren(value) {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            if (value == "chu") {
              that.addUserForm.czusername = result.users[0].name;
              that.addUserForm.czuserid = result.users[0].empId;
            } else {
              that.addUserForm.fqusername = result.users[0].name;
              that.addUserForm.fquserid = result.users[0].empId;
            }
          },
          onFail: function (err) {},
        });
      });
    },
    getBasicList() {
      this.$axios
        .post("/erp_check/assetxilatypelist", {
          corp_id: this.$store.state.userData.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.noLastList = [
              {
                id: 0,
                pid: "0",
                name: "资产分类",
                children: res.data.content,
              },
            ];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$axios
        .post("/erp_check/addressxilatypelist", {
          corp_id: this.$store.state.userData.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.LastList = [
              {
                id: 0,
                pid: "0",
                name: "资产位置",
                children: res.data.content,
              },
            ];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    typeTree(val) {
      this.treeShow = true;

      this.valNmae = val;
      if (val == "type") {
        this.treeList = this.noLastList;
      } else {
        this.treeList = this.LastList;
      }
      this.$refs.ftree.setCheckedKeys([]);
    },
    handleNewAddClick(a) {
      if (this.valNmae == "type") {
        this.addUserForm.type = a.name;
      } else {
        this.addUserForm.sxaddressname = a.name;
      }

      //   this.addUserForm.extend_two = a.all_fid;
      console.log(this.addUserForm);
      this.treeShow = false;
    },
    setTitle() {
      const _this = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: _this.$store.state.userData.titledata.name, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },

    //改变地址选择，当切换省市区时进行数据留存
    changeAddr(picker) {
      //value=0改变省，1改变市，2改变区
      let val = picker.getValues();
      this.resAddr = val;
      console.log(val);
    },
    //选好地址后点击确定
    chooseThis() {
      this.areashow = false;
      //选中地址成功后回显
      this.showAddr =
        this.resAddr[0].name +
        "/" +
        this.resAddr[1].name +
        "/" +
        this.resAddr[2].name;
      this.showcode =
        this.resAddr[0].code +
        "/" +
        this.resAddr[1].code +
        "/" +
        this.resAddr[2].code;
      this.addUserForm.extend_three = this.showAddr;
      this.addUserForm.procode = this.showcode;
      console.log(this.addUserForm.procode);

      console.log(this.resAddr, "即将传给后端的省市区信息");
    },
    // 选择框
    showPopup(val, index) {
      this.selectype = val;
      this.mxindex = index;

      if (val == 1) {
        this.selecval = "name";
        this.columns = this.newtypelist;
        this.popupshow = true;
      } else if (val == 2) {
        this.selecval = "name";
        this.columns = this.allSupplier;
        this.popupshow = true;
      } else if (val == 3) {
        this.selecval = "name";
        this.columns = this.newtypelist;
        this.popupshow = true;
      }
    },

    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.addUserForm.czstatus = value.name;
      } else if (this.selectype == 2) {
        this.addUserForm.userteam = value.id;
        this.addUserForm.userteamname = value.name;
      } else if (this.selectype == 3) {
        this.addUserForm.cztype = value.name;
      }
      this.popupshow = false;
    },
    mxcancel() {
      if (this.selectype == 1) {
        this.addUserForm.type = "";
      } else if (this.selectype == 2) {
        this.addUserForm.project_status = "";
      } else if (this.selectype == 3) {
        this.addUserForm.branch_office = "";
      }
      this.popupshow = false;
    },
    // 时间选择
    settime(val) {
      this.show = true;
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
        this.addUserForm.starttime = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        this.addUserForm.stoptime = resDate;
      }

      this.show = false;
    },

    p(s) {
      return s < 10 ? "0" + s : s;
    },
    close1() {
      this.isshow = false;
      console.log("152");
    },
    close() {
      this.show = false;
    },

    //表单提示未填写
    failure(errorInfo) {
      Toast(errorInfo.errors[0].name + "未填写");
      console.log(errorInfo);
    },

    onSubmit() {
      console.log(this.addUserForm);
      this.addUserForm.asset = this.$refs.headerChild.checkedList;
      this.addUserForm.corp_id = this.$store.state.userData.cid;
      this.$axios
        .post("/erp_check/chuzhiguanlicreatadd", this.addUserForm)
        .then((res) => {
          if (res.data.code == 1) {
            Toast(res.data.msg);
            this.$router.go(-1);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    clac() {},
  },
  activated() {
    if (this.$route.query.checkList) {
      console.log("cjecklist", this.$route.query.checkList);
      this.addUserForm.assetcontent = this.$route.query.checkList;
    }
    this.$utils.commonAllPro().then((res) => {
      this.allProjectList = res;
      console.log("9999", res);
    });
    this.$utils.commonAlltouSupplier().then((res) => {
      this.allSupplier = res;
      console.log("9999", res);
    });
    this.getBasicList();
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
.newUpload {
  padding-bottom: 1.67rem;
  background-color: #fff;
  .newUpload_item {
    line-height: 2.33333rem;
    width: 100%;
    font-size: 1rem;
    padding-left: 1rem;
    height: 2.33333rem;
  }
}
.imgupload {
  margin-top: 0.67rem;
  .imgfont {
    font-size: 1rem;
  }
  padding: 0.67rem;
  box-sizing: border-box;
  background-color: #fff;
  .upList {
    margin-top: 0.67rem;
    .xiangmu {
      border: 0.06rem solid #f3f6fd;
      height: 3.33rem;
      margin: 0.33rem 0;
      display: flex;
      background-color: #fff;
      .xmdiv {
        height: 100%;
      }
      .xmimg {
        width: 20%;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center;

        .img {
          text-transform: uppercase;
          border-radius: 0.33rem;
          width: 2.67rem;
          height: 2.67rem;
          border: 0.03rem solid #a5a3a6;
          background-color: #f45457;
          color: #fff;
          line-height: 2.67rem;
          text-align: center;
        }
      }
      .xmjindu {
        width: 80%;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        position: relative;
        .yulan {
          width: 3.33rem;
          font-size: 1rem;
          color: #409eff;
        }
        .van-icon {
          position: absolute;
          top: -5px;
          right: -5px;
          color: #969799;
          line-height: 1rem;
          width: 1rem;
          height: 1rem;
          background-color: red;
          border-radius: 100%;
        }
        .xmjindu-item {
          width: 75% !important;
          height: 3.33rem;

          padding-right: 0.33rem;

          .xmjindu-item-font {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
            font-size: 1rem;
            height: 50%;
            line-height: 1.83rem;
            color: #000;
          }
          .xmjindu-item-font1 {
            font-size: 0.67rem;
            height: 45%;
            line-height: 1.67rem;
            color: #555555;
          }
        }
      }
    }
    .upbtn {
      display: inline-block;
      margin-top: 0.67rem;
      margin-left: 1.33rem;

      width: 3rem;
      height: 3rem;
      background-color: #e6e6e7;
      border-radius: 0.2rem;
      .el-button {
        width: 100%;
        height: 100%;
        font-size: 1.67rem;
      }
    }
  }
}
.liucheng {
  width: 95%;
  margin: auto;
  border-radius: 0.5rem;
  margin-top: 1rem;
  padding: 0.67rem;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 1rem;
  .liucheng_item {
    display: flex;
    justify-content: space-between;
    padding: 0.67rem;

    .item_font {
      width: 25%;
      .item_font1 {
        color: #646566;
        font-size: 1rem;
        //   line-height: 2rem;
      }
      .item_font2 {
        color: #9ea0a3;
        font-size: 0.67rem;
        line-height: 1.67rem;
      }
    }

    .item_img {
      width: 75%;
      display: flex;
      flex-direction: row-reverse;

      img {
        // margin-left: 0.33rem;
        // float: right;
        width: 2.67rem;
        height: 2.67rem;
      }
      .item_icon {
        // float: right;
        width: 1rem;
        height: 3.33rem;
        line-height: 2.67rem;
        text-align: center;
      }
      .item_renyuan {
        position: relative;
        // float: right;
        width: 3.33rem;
        height: 2.67rem;
        font-size: 0.67rem;
        text-align: center;

        .van-icon {
          position: absolute;
          top: -1px;
          right: -1px;
          color: #969799;
          line-height: 1rem;
          width: 1rem;
          height: 1rem;
          background-color: #000;
          border-radius: 100%;
        }

        .itemname {
          font-size: 1rem;
          margin: auto;
          width: 2.67rem;
          height: 2.67rem;
          background-color: #fff;
          border-radius: 50%;
          overflow: hidden;
          span {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 2.67rem;
            text-align: center;
            background-color: #387ef5;
            color: #fff;
          }
        }
      }
    }
  }
}
.sureBtn {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 0.67rem 0 70px;
  text-align: center;

  .van-button--info {
    width: 85%;
    font-size: 1rem;
    border-radius: 0.67rem;
    height: 2.33rem;
  }
}
</style>

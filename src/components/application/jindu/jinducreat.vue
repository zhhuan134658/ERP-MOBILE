<template>
  <div id="creatschedule">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <!--  -->
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="eventFrom.jdtitle"
        name="里程碑名称"
        label="里程碑名称"
        placeholder="请填写里程碑名称"
        maxlength="10"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        maxlength="50"
        v-model="fuzerenzong"
        name="负责人"
        label="负责人"
        placeholder="点击选择负责人"
        @click="addren"
        readonly
        clickable
      />
      <van-field
        input-align="right"
        maxlength="50"
        v-model="cc_name"
        name="抄送人"
        label="抄送人"
        placeholder="点击选择抄送人"
        @click="addmomey"
        readonly
        clickable
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        maxlength="50"
        v-model="eventFrom.proname"
        name="项目名称"
        label="项目名称"
        placeholder="请填写项目名称"
        :rules="[{ required: true }]"
        readonly
        clickable
      />

      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="eventFrom.starttime"
        name="开始时间"
        label="开始时间"
        placeholder="请填写开始时间"
        :rules="[{ required: true }]"
        @click="settime(1)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="eventFrom.stoptime"
        name="结束时间"
        label="结束时间"
        placeholder="请填写结束时间"
        :rules="[{ required: true }]"
        @click="settime(2)"
      />
      <div class="textarea">
        <van-field
          type="textarea"
          input-align="right"
          :maxlength="500"
          v-model="eventFrom.jdcontent"
          name="进度描述"
          label="进度描述"
          placeholder="请填写进度描述"
          clickable
        />
      </div>
      <div class="sureBtn">
        <van-button native-type="submit" type="info">确 定</van-button>
      </div>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @cancel="showPicker = false"
        @confirm="onConfirm1"
      />
    </van-popup>
    <!-- 时间 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        :min-date="min_date"
        :max-date="max_date"
        v-model="starcurrentDate"
        type="date"
        @confirm="gettime"
        @cancel="close"
      />
    </van-popup>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";

import axios from "axios";
import { Toast } from "vant";
Toast.setDefaultOptions({ duration: 1500 });
import { setTimeout } from "timers";

export default {
  name: "creatschedule",

  data() {
    return {
      min_date: "",
      max_date: "",
      plan_end_riqi: "",
      plan_start_riqi: "",
      xmlist: [],
      cc_name: [],
      cc_id: [],
      selecval: "",
      fuzerenzong: "",
      fuzeren: this.$store.state.userData.personnelList,
      test: "",
      eventFrom: {
        corp_id: this.$store.state.userData.cid,
        user_id: this.$store.state.userData.userid,
        cc_userid: [],
        starttime: "",
        stoptime: "",
        jdusers: [],
        jdstatus: "",
        jdtitle: "",
        jdcontent: "",
        status: "2",
        xmid: this.$store.state.userData.lcxminfo.id,
        proname: this.$store.state.userData.lcxminfo.name,
      },
      neweventFrom: {
        corp_id: this.$store.state.userData.cid,
        user_id: this.$store.state.userData.userid,
        cc_userid: [],
        starttime: "",
        stoptime: "",
        jdusers: [],
        jdstatus: "",
        jdtitle: "",
        jdcontent: "",
        status: "2",
      },
      show: false,
      stoptime: "",
      starcurrentDate: new Date(),
      endcurrentDate: new Date(),
      showPicker: false,
      numble: "",
      columns: "",
      shijanName: "",
      lichengList: [],
      lichengzList: [],
    };
  },
  methods: {
    setTitle() {
      dd.biz.navigation.setRight({
        show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
    },
    //下拉
    onConfirm1(value) {
      this.showPicker = false;
      if (this.numble == 1) {
        this.eventFrom.xmid = value.id;
        this.eventFrom.xmname = value.name;
      }
    },
    showPicke(val) {
      this.showPicker = true;
      this.numble = val;
      if (val == 1) {
        this.selecval = "name";
        this.columns = this.xmlist;
      }
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

      if (this.valtime == "1") {
        this.eventFrom.starttime = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        if (this.enddata > this.startdata) {
          this.eventFrom.stoptime = resDate;
        } else {
          // alert('合同时间结束日期要在合同开始时间之后');
          Toast("结束日期要在开始时间之后");
        }
      }

      this.show = false;
    },

    p(s) {
      return s < 10 ? "0" + s : s;
    },
    close() {
      this.show = false;
    },
    clac() {
      this.$router.push({
        path: "/xmevent",
      });
    },
    onSubmit() {
      //否 “1” 是 “2”
      this.$axios.post("/task/CreatedJinDu", this.eventFrom).then((res) => {
        if (res.data.code == 1) {
          Toast(res.data.msg);

          this.$router.go(-1);
        } else if (res.data.code == 2) {
          Toast(res.data.msg);
        } else {
          Toast(res.data.msg);
        }
      });
    },
    failure(errorInfo) {
      console.log(errorInfo.errors);

      Toast(errorInfo.errors[0].name + "未填写");
    },
    addmomey() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 9, //最大可选人数
          pickedUsers: that.cc_id, //已选用户
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
            that.eventFrom.cc_userid = result.users;
            that.cc_name = result.users.map((item) => {
              return item.name;
            });
            that.cc_id = result.users.map((item) => {
              return item.emplId;
            });
          },
          onFail: function (err) {},
        });
      });
    },
    addren() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 9, //最大可选人数
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
            that.eventFrom.jdusers = result.users;
            that.fuzerenzong = result.users.map((item) => {
              return item.name;
            });
          },
          onFail: function (err) {},
        });
      });
    },
    //事件下拉列表
    getList() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.xmlist = res.data.data;
      });
    },
  },
  watch: {},
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getList();

    console.log(this.$store.state.userData.Selecteddata);
    let plan_end_riqi = this.$store.state.userData.lcxminfo.plan_end_riqi;
    let plan_start_riqi = this.$store.state.userData.lcxminfo.plan_start_riqi;
    this.plan_end_riqi = plan_end_riqi;
    this.plan_start_riqi = plan_start_riqi;

    this.min_date = new Date(
      new Date(plan_start_riqi).getFullYear(),
      new Date(plan_start_riqi).getMonth(),
      new Date(plan_start_riqi).getDate()
    );
    this.max_date = new Date(
      new Date(plan_end_riqi).getFullYear(),
      new Date(plan_end_riqi).getMonth(),
      new Date(plan_end_riqi).getDate()
    );
  },
  mounted() {},
};
</script>
<style lang="less">
#creatschedule {
  padding: 0.5rem 0;

  .van-form {
    .textarea {
      height: 10rem !important;
      .van-cell {
        padding: 0 0.5rem;
        display: inherit !important;
        height: 100%;
        .van-field__label {
          width: 50%;
        }
        .van-cell__title {
          // line-height: 3.33rem;
          font-size: 1.17rem;
          padding-left: 0.33rem;
          height: 3.125rem !important;
        }
        .van-cell__value {
          .van-field__body {
            align-items: inherit;
            // line-height: 3.33rem;
            line-height: 1.2rem;
            .van-field__control {
              padding: 0 0.5rem;
              height: 8.33rem !important;
              font-size: 1.17rem !important;
              // line-height: 1.17rem !important;
              max-height: 6.67rem !important;
              color: #000;
            }
            .van-field__control--right {
              text-align: left;
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
}
</style>

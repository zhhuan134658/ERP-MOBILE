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
        v-model="addForm.name"
        name="里程碑名称"
        label="里程碑名称"
        placeholder="请填写里程碑名称"
        maxlength="10"
        :rules="[{ required: true }]"
      />
      <!-- <van-field
        readonly
        class="zh_vant_isprop"
        input-align="right"
        v-model="is_complete"
        name="进度计划类型"
        label="进度计划类型"
        placeholder="进度计划类型"
        @click="showPopup(1)"
        :rules="[{ required: true }]"
      /> -->
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        maxlength="50"
        v-model="fuzerenzong"
        name="负责人"
        label="负责人"
        placeholder="点击选择负责人"
        @click="addren(1)"
        readonly
        clickable
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        maxlength="50"
        v-model="xiezuozong"
        name="协作人"
        label="协作人"
        placeholder="点击选择协作人"
        @click="addren(2)"
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
        input-align="right"
        maxlength="50"
        v-model="addForm.project_name"
        name="项目名称"
        label="项目名称"
        placeholder="请选择项目名称"
        readonly
        clickable
      />

      <!-- <van-field name="checkboxGroup" label="里程碑同步">
        <template #input>
          <van-checkbox v-model="checkbox" shape="square"
            >同步至里程碑</van-checkbox
          >
        </template>
      </van-field> -->
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="addForm.starttime"
        name="开始时间"
        label="开始时间"
        placeholder="请选择开始时间"
        :rules="[{ required: true }]"
        @click="settime(1)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="addForm.endtime"
        name="结束时间"
        label="结束时间"
        placeholder="请选择结束时间"
        :rules="[{ required: true }]"
        @click="settime(2)"
      />
      <div class="textarea">
        <van-field
          type="textarea"
          input-align="right"
          v-model="addForm.remarks"
          name="计划描述"
          label="计划描述"
          placeholder="计划描述"
          :maxlength="500"
          clickable
        />
      </div>
      <!-- 附件 -->
      <div class="imgupload" style="margin-bottom: 3.33rem">
        <div class="imgfont">
          <!-- <div>附件</div> -->
          <div class="imgfont1" @click="getspaceID">添加附件</div>
        </div>
        <div class="upList">
          <div
            class="xiangmu"
            v-for="(item, index) in addForm.enclosure"
            :key="index"
          >
            <div class="xmdiv xmimg">
              <div class="img">{{ item.fileType }}</div>
            </div>
            <div class="xmdiv xmjindu">
              <div class="clear">
                <van-icon name="cross" @click="deletefile(item)" />
              </div>
              <div class="xmjindu-item">
                <div class="xmjindu-item-font">
                  {{ item.fileName }}
                </div>
                <div class="xmjindu-item-font1">
                  {{ (item.fileSize / 1024 / 1024).toFixed(2) }}MB
                </div>
              </div>
              <div class="yulan" @click="lookfile(item)">预览</div>
            </div>
          </div>
        </div>
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
      is_complete: "",
      xiezuozong: "",
      checkbox: false,
      checkboxGroup: [],
      min_date: "",
      max_date: "",
      plan_end_riqi: "",
      plan_start_riqi: "",
      cc_name: [],
      cc_id: [],
      xmlist: [],
      selecval: "",
      fuzerenzong: "",
      chectedid: [],
      chectedid1: [],
      fuzeren: this.$store.state.userData.personnelList,
      test: "",
      addForm: {
        id: "",
        name: "",
        enclosure: [],
        is_complete: "",
        starttime: "",
        endtime: "",

        personincharge: [],
        sponsorname: [],
        cc_user: [],
        jdcontent: "",
        proname: "",
        jdstatus: "",
        status: "2",
        type: 1,
        corp_id: this.$store.state.userData.cid,
        userid: this.$store.state.userData.uid,
      },
      newaddForm: {
        corp_id: this.$store.state.userData.cid,
        user_id: this.$store.state.userData.userid,
        cc_userid: [],
        starttime: "",
        endtime: "",
        jdusers: [],
        jdstatus: "",
        name: "",
        jdcontent: "",
        status: "1",
      },
      show: false,
      endtime: "",
      starcurrentDate: new Date(),
      endcurrentDate: new Date(),
      showPicker: false,
      numble: "",
      columns: "",
      shijanName: "",
      lichengList: [],
      lichengzList: [],
      columnsList: [
        { name: "周计划", id: 1 },
        { name: "月计划", id: 2 },
        { name: "年计划", id: 3 },
        { name: "总计划", id: 4 },
      ],
      selectype: "",
    };
  },
  methods: {
    //获取企业自定义空间
    getspaceID(val) {
      this.uptype = val;
      this.$axios
        .post("/dingding/getAuthUp", {
          type: "add",

          fileids: "",
        })
        .then((res) => {
          console.log(res.data.data);

          this.imguploadAtta(res.data.data.toString());
        });
    },
    imguploadAtta(newspaceid) {
      const _this = this;

      dd.ready(function () {
        dd.biz.util.uploadAttachment({
          image: {
            multiple: true,
            compress: false,
            max: 9,
            spaceId: newspaceid,
          },
          space: {
            corpId: _this.$store.state.userData.cid,
            spaceId: newspaceid,
            isCopy: 1,
            max: 9,
          },
          file: { spaceId: newspaceid, max: 1 },
          types: ["photo", "camera", "file", "space"], //PC端支持["photo","file","space"]
          onSuccess: function (result) {
            _this.addForm.enclosure = _this.deunique(
              _this.addForm.enclosure.concat(result.data)
            );
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    //删除
    deletefile(item) {
      this.addForm.enclosure.splice(this.addForm.enclosure.indexOf(item), 1);
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.fileId) && res.set(arr.fileId, 1)
      );
    },
    // 与拉美盯盘文件

    lookfile(item) {
      const _this = this;
      var fileSizea = parseInt(item.fileSize);
      _this.$axios
        .post("/dingding/getAuthUp", {
          auth: "download",

          fields: item.fileId,
        })
        .then((res) => {
          dd.ready(function () {
            dd.biz.cspace.preview({
              corpId: _this.$store.state.userData.cid,
              spaceId: item.spaceId,
              fileId: item.fileId,
              fileName: item.fileName,
              fileSize: fileSizea,
              fileType: item.fileType,
              onSuccess: function () {
                //无，直接在native显示文件详细信息
              },
              onFail: function (err) {
                // 无，直接在native页面显示具体的错误
              },
            });
          });
        });
    },
    // 选择框
    showPopup(val) {
      this.selectype = val;
      if (val == 1) {
        this.showPicker = true;

        this.selecval = "name";
        this.columns = this.columnsList;
      }
    },
    onConfirm1(value) {
      this.is_complete = value.name;
      this.addForm.is_complete = value.id;

      this.showPicker = false;
    },
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

    // 时间选择
    settime(val) {
      this.show = true;
      this.valtime = val;
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
        this.addForm.starttime = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        let newa = new Date(this.addForm.starttime);
        if (this.enddata > newa) {
          this.addForm.endtime = resDate;
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
      this.$axios.post("/finance/update_milepost", this.addForm).then((res) => {
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

    addren(val) {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: val === 1 ? false : true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 9, //最大可选人数
          pickedUsers: val === 1 ? that.chectedid : that.chectedid1, //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: "1076461841", //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            if (val == 1) {
              that.addForm.personincharge = result.users;
              that.fuzerenzong = result.users[0].name;
              that.chectedid = result.users.map((item) => {
                return item.emplId;
              });
            } else {
              that.addForm.sponsorname = result.users;
              that.xiezuozong = result.users.map((item) => {
                return item.name;
              });
              that.chectedid1 = result.users.map((item) => {
                return item.emplId;
              });
            }
          },
          onFail: function (err) {},
        });
      });
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
          appId: "1076461841", //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            that.addForm.cc_user = result.users;
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
    //事件下拉列表
    getList() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.xmlist = res.data.data;
      });
    },
    // 获取详情
    geteditinfo() {
      this.$axios
        .post("/finance/milepost_feedback", {
          id: this.$route.query.itemdata.id,
          type: 1,
        })
        .then((res) => {
          this.addForm = res.data.content;
          this.addForm.id = this.$route.query.itemdata.id;
          this.columnsList.forEach((item) => {
            if ((item.id = res.data.content.type)) {
              this.is_complete = item.name;
            }
          });

          this.cc_name = res.data.content.cc_user.map((item) => {
            return item.name;
          });
          this.cc_id = res.data.content.cc_user.map((item) => {
            return item.emplId;
          });

          this.xiezuozong = res.data.content.sponsorname.map((item) => {
            return item.name;
          });
          this.chectedid1 = res.data.content.sponsorname.map((item) => {
            return item.emplId;
          });
          this.fuzerenzong = res.data.content.personincharge.map((item) => {
            return item.name;
          });
          this.chectedid = res.data.content.personincharge.map((item) => {
            return item.emplId;
          });
        });
    },
  },
  watch: {
    checkbox: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.addForm.type = 1;
        } else {
          this.addForm.type = 2;
        }
      },
    },
  },
  created() {
    this.$utils.checkding();
    // this.setTitle();

    this.geteditinfo();

    console.log("789415612", this.$store.state.userData.lcxminfo);

    this.addForm.proname = this.$store.state.userData.lcxminfo.name;

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
}
</style>

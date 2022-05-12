<template>
  <div id="creatwb">
    <div class="pollmain" style="padding-right: 0; padding-left: 0">
      <div class="pollinput">
        <div class="pollinput1">
          <span style="color: red">*</span>参见单位名称
        </div>
        <div class="pollinput2">
          <input
            type="text"
            :maxlength="100"
            v-model="xmname"
            placeholder="请输入"
          />
        </div>
      </div>

      <div class="pollinput" style="background-color: #f3f6fd">
        <div class="pollinput1"><span style="color: red">*</span>班组简称</div>
        <div class="pollinput2">
          <input
            style="background-color: #f3f6fd"
            type="text"
            :maxlength="8"
            v-model="pnicheng"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="pollinput">
        <div class="pollinput1"><span style="color: red">*</span>班组长</div>
        <div class="pollinput2">
          <div
            v-if="xianshi"
            class="pofont"
            style="
              height: 100%;
              width: 90%;
              margin-left: 0.16rem;
              text-align: right;
              color: #000000;
            "
            @click="addP"
          >
            {{ bzuser }}
          </div>

          <div
            v-else
            class="pofont"
            style="
              height: 100%;
              width: 90%;
              margin-left: 0.16rem;
              text-align: right;
              color: #b8b8bb;
            "
            @click="addP"
          >
            请选择班组长
          </div>
        </div>
      </div>

      <div class="pollinput" style="background-color: #f3f6fd">
        <div class="pollinput1"><span style="color: red">*</span>参建主体</div>
        <div class="pollinput2">
          <input
            style="background-color: #f3f6fd"
            type="text"
            :maxlength="8"
            v-model="pnicheng"
            placeholder="请输入"
          />
        </div>
      </div>

      <div class="pollinput">
        <div class="pollinput1">
          <span style="color: red">*</span>参建主体专业
        </div>
        <div class="pollinput2">
          <input
            type="text"
            :maxlength="8"
            v-model="pnicheng"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="pollinput" style="background-color: #f3f6fd">
        <div class="pollinput1"><span style="color: #fff">*</span>进场日期</div>
        <div class="pollinput3">
          <van-field
            style="background-color: #f3f6fd"
            readonly
            clickable
            v-model="pstart"
            placeholder="请点击选择时期"
            @click="settime(1)"
          />
        </div>
      </div>
      <div class="pollinput">
        <div class="pollinput1"><span style="color: red">*</span>工期</div>
        <div class="pollinput2">
          <input
            type="text"
            :maxlength="8"
            v-model="pnicheng"
            placeholder="请输入"
          />
        </div>
      </div>

      <div class="addpo" style="background-color: #f3f6fd">
        <div>
          <div class="addc">添加管理成员</div>
        </div>
        <div class="addicon">
          <!-- <div class="addplus" @click="goren">
            <van-icon style="margin-left:5px" name="friends" />
            <p style="font-size:13px">查看全部</p>
                    </div>-->
          <!--
          <div class="aaicon">
            <van-icon name="plus" />
                    </div>-->
          <div class="addplus">
            <van-icon
              name="add-o"
              style="margin-left: 0.16rem; margin-top: 0.33rem"
              @click="goren"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="sureBtn">
      <van-button type="info" :loading="show" @click="sure">确定</van-button>
    </div>
    <!-- 弹出层 -->
    <!-- 项目状态-->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm1"
      />
    </van-popup>
    <!-- 时间 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="starcurrentDate"
        type="date"
        @confirm="gettime"
        @cancel="close"
      />
    </van-popup>

    <!-- <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
        </van-popup>-->
    <vuefooter
      v-show="$route.meta.showFooter"
      :style="{ top: docmHeight - 98 + 'px' }"
    ></vuefooter>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
Toast.setDefaultOptions({ duration: 1500 });
import { setTimeout } from "timers";
export default {
  data() {
    return {
      // 新建参建单位
      name: "参建单位名称",
      groupName: "班组简称",
      subject: "参建主体",
      professional: "参建项目专业",
      enterTime: "进场日期(yyyy-MM-dd)",
      days: "工期",
      monadType: "参建类别ID",
      phone: "联系电话",
      principal: "班组长",
      companyId: "企业Id",
      userList: [
        { name: "成员01", job: "员工" },
        { name: "成员02", job: "员工" },
      ], //
      starcurrentDate: new Date(),
      endcurrentDate: new Date(),
      docmHeight: document.documentElement.clientHeight,
      showPicker: false,
      columns: "",
      xmType: "",
      cajian: "",
      xmTypeList: ["筹建", "在建", "完工"],
      show: false,
      valtime: "",
      leixing: "",
      leixingList: [],

      canjianList: [],

      show: false,
      bzid: "",
      name: "",
      bzuser: "",

      bzname: "",
      bzcode: "",

      agentid: "", //微应用id
      timeStamp: "", //时间戳
      noncestr: "", //签名随机串
      signature: "", //签名
      numble: "",
    };
  },
  methods: {
    //下拉
    onConfirm1(value) {
      this.showPicker = false;
      if (this.numble == 1) {
        this.xmType = value;
      } else if (this.numble == 2) {
        this.cajian = value;
      } else {
        this.leixing = value;
      }
    },
    showPicke(val) {
      this.showPicker = true;
      this.numble = val;
      if (val == 1) {
        this.columns = this.xmTypeList;
      } else if (val == 2) {
        this.columns = this.canjianList;
      } else {
        this.columns = this.leixingList;
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

      // 时间
      // const resTime =
      //     this.p(d.getHours()) +
      //     ':' +
      //     this.p(d.getMinutes()) +
      //     ':' +
      //     this.p(d.getSeconds());
      if (this.valtime == "1") {
        this.pstart = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        if (this.enddata > this.startdata) {
          this.pstop = resDate;
        } else {
          // alert('合同时间结束日期要在合同开始时间之后');
          Toast("合同时间结束日期要在合同开始时间之后");
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

    sure() {
      let newphone = /^[1][0-9]{10}$/;
      //   this.show = true;
      if (!this.xmname) {
        Toast("请输入项目名称");
        // alert('请输入班组名称');

        // this.show = false;
        return false;
      } else if (this.bzuser.length == 0) {
        Toast("请选择项目负责人");
        // alert('请选择班组长');
        // this.show = false;
        return false;
      } else if (!this.pphone || !newphone.test(this.pphone)) {
        Toast("请输入正确格式的电话");
        this.show = false;
        return false;
      }
      // else if (!this.bzname) {
      //     alert('请输入班组单位名称');
      //     this.show = false;
      //     return false;
      // } else if (!this.bzcode) {
      //     alert('请输入统一信用代码');
      //     this.show = false;
      //     return false;
      // } else if (!this.xmType) {
      //     alert('请选择班组类型');
      //     this.show = false;
      //     return false;
      // }
      else {
        // if (this.xmType == "筹建") {
        //   this.pstatus = 2;
        // } else if (this.xmType == "在建") {
        //   this.pstatus = 1;
        // } else {
        //   this.pstatus = 0;
        // }
        if (this.$store.state.userData.pstatusval == "筹建") {
          this.pstatus = 2;
        } else if (this.$store.state.userData.pstatusval == "在建") {
          this.pstatus = 1;
        } else {
          this.pstatus = 0;
        }

        axios
          .post("/laowu_yun/createproject", {
            corp_id: this.$store.state.userData.cid,
            newuid: this.$store.state.userData.uid,
            urid: this.$store.state.userData.newurid,
            name: this.$store.state.userData.xmnameval, //项目名称
            pname: this.$store.state.userData.xmuserval, //项目负责人
            pnicheng: this.$store.state.userData.pnichengval, //项目简称
            pstart: this.$store.state.userData.pstartval,
            pstop: this.$store.state.userData.pstopval,
            gongjiage: this.$store.state.userData.gongjiageval,
            gongguimo: this.$store.state.userData.gongguimoval, //规模
            paddress: this.$store.state.userData.paddressval, //地址
            cajianzhu: this.$store.state.userData.cajianval, //参建主体
            type: this.$store.state.userData.leixingval, //"项目类型",

            pstatus: this.pstatus, //项目状态 筹建

            pphone: this.$store.state.userData.pphoneval, //电话
            ppersonid: this.$store.state.userData.xmuseridval, //负责人id
            // name: this.xmname, //项目名称
            // pname: this.bzuser, //项目负责人
            // pnicheng: this.pnicheng, //项目简称
            // pstart: this.pstart,
            // pstop: this.pstop,
            // gongjiage: this.gongjiage,
            // gongguimo: this.gongguimo, //规模
            // paddress: this.paddress, //地址
            // cajianzhu: this.cajian, //参建主体
            // type: this.leixing, //"项目类型",
            // pstatus: this.pstatus, //项目状态 筹建
            // pphone: this.pphone, //电话
            // ppersonid: this.bzuserid, //负责人id
            userids: this.$store.state.userData.bzglrenid,
            orgids: this.orgids,

            cocode: "",
            coleps: "",
            coname: "",
            coperson: "",
            cophone: "",
            coqlevel: "",
            pbulider: "",
            pbulidertime: "",
            pkey: "",
            pnumber: "",
            ptype: "",
            title: "",
          })
          .then((res) => {
            // this.show = false;

            if (res.data.status == 1) {
              this.$message({
                message: "添加成功",
                center: true,
                type: "success",
                duration: 2000,
              });
              this.$store.commit("setbzglrenid", "");

              this.$store.commit("setxmnameval", "");

              //项目负责人

              this.$store.commit("setxmuserval", "");

              //项目负责人id

              this.$store.commit("setxmuseridval", "");

              //项目简称

              this.$store.commit("setpnichengval", "");

              //开始时间

              this.$store.commit("setpstartval", "");

              //结束时间

              this.$store.commit("setpstopval", "");

              //规模

              this.$store.commit("setgongguimoval", "");

              //造价

              this.$store.commit("setgongjiageval", "");

              //地址

              this.$store.commit("setpaddressval", "");
              //参建

              this.$store.commit("setcajianval", "");

              //类型

              this.$store.commit("setleixingval", "");

              //状态

              this.$store.commit("setpstatusval", "");

              //电话

              this.$store.commit("setpphoneval", "");

              this.$router.go(-1);
            } else if (res.data.status == 2) {
              Toast(res.data.msg);
              // this.$message({
              //     message: '存在未填必填项，请确认',
              //     type: 'success',
              //     duration: 2000
              // });
            } else if (res.data.status == 3) {
              Toast(res.data.msg);
              // this.$message({
              //     message: res.data.msg,
              //     center: true,
              //     type: 'success',
              //     duration: 2000
              // });
            } else if (res.data.status == 9) {
              Toast(res.data.msg);
              // this.$message({
              //     message: res.data.msg,
              //     center: true,
              //     type: 'success',
              //     duration: 2000
              // });
            } else if (res.data.status == 8) {
              Toast(res.data.msg);
              this.$router.go(-1);
              // this.$message({
              //     message: res.data.msg,
              //     center: true,
              //     type: 'success',
              //     duration: 2000
              // });
            }
          })
          .catch(function (error) {
            // this.show = false;
            Toast(error);
          });
      }
    },
    dingding() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "创建项目", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    // 选中人员
    goren() {
      this.$router.push({
        name: "xmglrenyuan",
        params: {
          number: 1,
        },
      });
    },
    addP() {
      const that = this;
      axios
        .post("/ding/shoujitiongxun", {
          corp_id: that.$store.state.userData.cid,
          newuid: that.$store.state.userData.uid,
        })
        .then((res) => {
          if (res.data.status == "1") {
            that.agentid = res.data.content.agentId;
            that.timeStamp = res.data.content.timeStamp;
            that.noncestr = res.data.content.nonceStr;
            that.signature = res.data.content.signature;
            dd.config({
              agentId: that.agentid, // 必填，微应用ID
              corpId: that.$store.state.userData.cid, //必填，企业ID
              timeStamp: that.timeStamp, // 必填，生成签名的时间戳
              nonceStr: that.noncestr, // 必填，生成签名的随机串
              signature: that.signature, // 必填，签名
              type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
              jsApiList: [
                "biz.contact.complexPicker",
                "biz.contact.choose",
                "runtime.info",
                "device.notification.confirm",
                "device.notification.alert",
                "device.notification.prompt",
                "biz.ding.post",
                "biz.util.openLink",
              ], // 必填，需要使用的jsapi列表，注意：不要带dd。
            });
            dd.ready(function () {
              dd.biz.contact.complexPicker({
                title: "通讯录", //标题
                corpId: that.$store.state.userData.cid, //企业的corpId
                multiple: false, //是否多选
                limitTips: "超出了", //超过限定人数返回提示
                maxUsers: 1, //最大可选人数
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
                  that.xianshi = true;
                  that.bzuser = result.users[0].name;
                  that.bzuserid = result.users[0].emplId;
                },
                onFail: function (err) {
                  //    alert("1");
                },
              });
            });
            dd.error(function (err) {
              // alert("2");
            });
          }
        });
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.userid) && res.set(arr.userid, 1)
      );
    },
    // 添加管理人员
    addManyP() {
      const that = this;
      axios
        .post("/ding/shoujitiongxun", {
          corp_id: that.$store.state.userData.cid,
          newuid: that.$store.state.userData.uid,
        })
        .then((res) => {
          if (res.data.status == "1") {
            that.agentid = res.data.content.agentId;
            that.timeStamp = res.data.content.timeStamp;
            that.noncestr = res.data.content.nonceStr;
            that.signature = res.data.content.signature;
            dd.config({
              agentId: that.agentid, // 必填，微应用ID
              corpId: that.$store.state.userData.cid, //必填，企业ID
              timeStamp: that.timeStamp, // 必填，生成签名的时间戳
              nonceStr: that.noncestr, // 必填，生成签名的随机串
              signature: that.signature, // 必填，签名
              type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
              jsApiList: [
                "biz.contact.complexPicker",
                "biz.contact.choose",
                "runtime.info",
                "device.notification.confirm",
                "device.notification.alert",
                "device.notification.prompt",
                "biz.ding.post",
                "biz.util.openLink",
              ], // 必填，需要使用的jsapi列表，注意：不要带dd。
            });
            dd.ready(function () {
              dd.biz.contact.complexPicker({
                title: "通讯录", //标题
                corpId: that.$store.state.userData.cid, //企业的corpId
                multiple: true, //是否多选
                limitTips: "超出了", //超过限定人数返回提示
                maxUsers: 99, //最大可选人数
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
                  let newPeople = [];
                  let newbz = [];
                  that.tagsData = result.users;
                  //   that.tagsData = that.unique(that.tagsData);

                  that.$store.commit("setchecked", that.tagsData);

                  // that.showTagsData = result.users.splice(1,3);
                  that.neworgids = result.departments;
                  newPeople = result.users.map((item) => {
                    if (!item.emplId) return "";
                    return item.emplId;
                  });
                  newbz = result.departments.map((item) => {
                    if (!item.id) return "";
                    return item.id;
                  });

                  that.userids = newPeople;
                  that.orgids = newbz;
                },
                onFail: function (err) {
                  //    alert("1");
                },
              });
            });
            dd.error(function (err) {
              // alert("2");
            });
          }
        });
    },
    // 获取项目类型
    getxmtype() {
      axios
        .post("/ding_ermodule/getcorpsubject", {
          corp_id: this.$store.state.userData.cid,
          newuid: this.$store.state.userData.uid,
        })
        .then((res) => {
          //   this.xmtypeList = res.data.content.xmtype;
          for (var i = 0; i < res.data.content[0].xmtype.length; i++) {
            this.leixingList.push(res.data.content[0].xmtype[i].type);
          }

          //   this.canjianList = res.data.content.xmzhuti;

          for (var j = 0; j < res.data.content[0].xmzhuti.length; j++) {
            this.canjianList.push(res.data.content[0].xmzhuti[j].zname);
          }
        });
    },
  },
  created() {
    this.getxmtype();

    this.xmname = this.$store.state.userData.xmnameval; //项目名称

    if (!this.$store.state.userData.xmuserval) {
      //   this.bzuser = "请选择项目负责人";
      this.xianshi = false;
    } else {
      this.xianshi = true;
      this.bzuser = this.$store.state.userData.xmuserval; //项目负责人
    }

    this.pnicheng = this.$store.state.userData.pnichengval; //项目简称
    this.pstart = this.$store.state.userData.pstartval;
    this.pstop = this.$store.state.userData.pstopval;
    this.gongjiage = this.$store.state.userData.gongjiageval;
    this.gongguimo = this.$store.state.userData.gongguimoval; //规模
    this.paddress = this.$store.state.userData.paddressval; //地址
    this.cajian = this.$store.state.userData.cajianval; //参建主体
    this.leixing = this.$store.state.userData.leixingval; //"项目类型",

    this.xmType = this.$store.state.userData.pstatusval; //项目状态 筹建

    this.pphone = this.$store.state.userData.pphoneval; //电话
    this.bzuserid = this.$store.state.userData.xmuseridval; //负责人id
    // 获取当前可视区域的高度
    // const height = document.documentElement.clientHeight;
    // // 在页面整体加载完毕时
    // window.onload = function() {
    //   // 把获取到的高度赋值给根div
    //   document.getElementById("creatwb").style.height = `${height}px`;
    // };
  },
  mounted() {
    // this.bzid = this.$store.state.userData.sbzid;
    this.dingding();
  },
  watch: {
    //项目名称
    xmname(val) {
      this.$store.commit("setxmnameval", val);
    },
    //项目负责人
    bzuser(val) {
      this.$store.commit("setxmuserval", val);
    },
    //项目负责人id
    bzuserid(val) {
      this.$store.commit("setxmuseridval", val);
    },
    //项目简称
    pnicheng(val) {
      this.$store.commit("setpnichengval", val);
    },
    //开始时间
    pstart(val) {
      this.$store.commit("setpstartval", val);
    },
    //结束时间
    pstop(val) {
      this.$store.commit("setpstopval", val);
    },
    //规模
    gongguimo(val) {
      this.$store.commit("setgongguimoval", val);
    },
    //造价
    gongjiage(val) {
      this.$store.commit("setgongjiageval", val);
    },
    //地址
    paddress(val) {
      this.$store.commit("setpaddressval", val);
    },
    //参建
    cajian(val) {
      this.$store.commit("setcajianval", val);
    },
    //类型
    leixing(val) {
      this.$store.commit("setleixingval", val);
    },
    //状态
    xmType(val) {
      this.$store.commit("setpstatusval", val);
    },
    //电话
    pphone(val) {
      this.$store.commit("setpphoneval", val);
    },
  },
};
</script>
<style lang="less">
#creatwb {
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #b8b8bb;
  }

  input:-moz-placeholder,
  textarea:-moz-placeholder {
    color: #b8b8bb;
  }

  input::-moz-placeholder,
  textarea::-moz-placeholder {
    color: #b8b8bb;
  }

  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #b8b8bb;
  }

  //   height: 1330px;
  padding-top: 0.5rem;
  background-color: #f0f0f0;

  .addpo {
    height: 3.33rem;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    border: 0.03rem solid #eee;
    line-height: 3.33rem;
    .addc {
      font-size: 1.17rem;
      padding-left: 1.5rem;
    }
    .addicon {
      // padding: 0.16rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.33rem;
      .addplus {
        width: 116px;
        height: 2.33rem;
        line-height: 0;
        margin-bottom: 0.33rem;
        // border: 0.03rem dashed #409eff;
        // border-radius: 50%;
        .van-icon {
          color: #409eff;
          font-size: 2.33rem;
          margin-bottom: 0.33rem;
        }
      }
    }
  }
  //下拉
  .van-popup {
    .van-picker {
      .van-hairline--top-bottom {
        height: 2.67rem;
        line-height: 2.67rem;
        .van-picker__cancel {
          padding: 0.06rem 5px;
          font-size: 1.17rem;
        }
        .van-picker__confirm {
          padding: 0.06rem 5px;
          font-size: 1.17rem;
        }
      }
      .van-picker__columns {
        background-color: #c0c4cc;
        .van-picker-column {
          .van-ellipsis {
            font-size: 1.33rem;
          }
          .van-picker-column__item--selected {
            color: #1989fa;
          }
        }
        // .van-hairline-unset--top-bottom {
        //   // border-bottom: 0.06rem solid #909399;
        //   // border-top: 0.06rem solid #909399;
        // }
      }
    }
  }

  .pollmain {
    // margin-top: 0.67rem;
    padding-left: 1rem;

    padding-right: 1rem;

    .pollinput {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      height: 3rem;
      line-height: 3rem;
      border-bottom: 0.03rem solid #eee;
      background-color: #fff;
      //   margin-bottom: 0.67rem !important;
      .pollinput1 {
        font-size: 1.17rem;
        line-height: 3rem;
        width: 50%;
        box-sizing: border-box;
        padding-left: 1.33rem;
      }
      .pollinput3 {
        line-height: 3.33rem;
        // padding-left: 0.33rem;
        box-sizing: border-box;
        width: 62%;
        .van-cell {
          padding: 0;
          height: 99%;
          .van-cell__value {
            .van-field__body {
              height: 100%;
              line-height: 3.33rem;
              .van-fmint-cellield__control {
                font-size: 1.17rem;
                line-height: 1.17rem;
                color: #000;
              }
            }
          }
        }
      }
      .pollinput2 {
        line-height: 3.33rem;
        box-sizing: border-box;
        width: 62%;
        .pofont {
          font-size: 1.17rem;
        }
        .van-dropdown-menu {
          height: 100%;
          .van-dropdown-menu__title {
            line-height: 3.33rem;
            width: 100%;
            .van-ellipsis {
              font-size: 0.93rem;
            }
          }
          .van-dropdown-menu__title:after {
            width: 0.33rem;
            height: 0.33rem;
          }
        }
        .van-cell {
          padding: 0.8rem 20px;
          .van-cell__title {
            span {
              font-size: 1.06rem;
            }
          }
          .van-dropdown-item__icon {
            font-size: 0.93rem;
          }
        }
      }
      > div {
        input {
          font-size: 1.17rem;
          line-height: 1.17rem;
          border: 0;
          text-align: right;
          width: 90%;
          height: 70%;
        }
      }
    }
  }
  .sureBtn {
    padding: 0 20px;
    margin-bottom: 4rem;
    margin-top: 1.33rem;
    height: 2.67rem;
    line-height: 2.67rem;
    text-align: center;

    overflow: hidden;
    .van-button {
      width: 100%;
      height: 100%;
      border-radius: 0.27rem;
      span {
        font-size: 1.2rem;
      }
    }
  }
}
</style>

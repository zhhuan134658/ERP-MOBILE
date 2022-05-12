<template>
  <div id="creatschedule">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <div class="formslider">
        <div class="formslider_font">
          <span style="color: red">*</span> 进度
        </div>
        <div class="formslider_div">
          <van-slider
            v-model="schedule"
            active-color="#409EFF"
            inactive-color="#E4E7ED"
            :bar-height="10"
            :button-size="30"
          >
            <template #button>
              <div class="custom-button">
                {{ schedule }}
              </div>
            </template>
          </van-slider>
        </div>
      </div>
      <!-- <van-field name="checkboxGroup" label="里程碑同步">
        <template #input>
          <van-checkbox v-model="checked" disabled shape="square"
            >同步至里程碑</van-checkbox
          >
        </template>
      </van-field> -->

      <div class="textarea">
        <van-field
          type="textarea"
          input-align="right"
          maxlength="50"
          v-model="eventFrom.progress"
          name="进展情况："
          label="进展情况："
          placeholder="请填写进展情况："
          :maxlength="200"
          clickable
        />
      </div>
      <div class="textarea" style="margin-top: 0.67rem">
        <van-field
          type="textarea"
          input-align="right"
          maxlength="50"
          v-model="eventFrom.remarks"
          name="备注"
          label="备注"
          placeholder="请填写备注"
          :maxlength="200"
          clickable
        />
      </div>
      <!-- 附件 -->
      <div class="imgupload" style="margin-bottom: 0.33rem">
        <div class="imgfont">
          <!-- <div>附件</div> -->
          <div class="imgfont1" @click="getspaceID">添加附件</div>
        </div>
        <div class="upList">
          <div
            class="xiangmu"
            v-for="(item, index) in eventFrom.enclosure"
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

          <!-- <div class="upbtn" @click="getspaceID">
                                <el-button
                                    plain
                                    class="el-icon-plus"
                                ></el-button>
                            </div> -->
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
    <!-- <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="starcurrentDate"
        type="date"
        @confirm="gettime"
        @cancel="close"
      />
    </van-popup>
    <van-popup v-model="popupshow" position="bottom" :style="{ height: '38%' }">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @cancel="mxcancel"
        @confirm="onConfirm1"
      />
    </van-popup> -->
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
      checked: "",
      schedule: "",
      lichenglist: [],
      popupshow: false,
      slidervalue: "",
      xmlist: [],
      selecval: "",
      fuzerenzong: "",
      fuzeren: this.$store.state.userData.personnelList,
      test: "",
      eventFrom: {
        id: this.$route.query.itemdata.id,
        schedule: 0,
        remarks: "",
        progress: "",
        type: 2,
        enclosure: [],
      },
      neweventFrom: {
        corp_id: this.$store.state.userData.cid,
        userid: this.$store.state.userData.userid,
        xmid: this.$store.state.userData.lcxminfo.id,
        milepostid: "",
        milepostjd: "",
        describe: "",
        liname: "",
        remarks: "",
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
        text: "上报进度", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },
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
            _this.eventFrom.enclosure = _this.deunique(
              _this.eventFrom.enclosure.concat(result.data)
            );
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    //删除
    deletefile(item) {
      this.eventFrom.enclosure.splice(
        this.eventFrom.enclosure.indexOf(item),
        1
      );
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

      this.eventFrom.schedule = this.schedule;
      this.$axios.post("/finance/schedule_up", this.eventFrom).then((res) => {
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
      this.$axios
        .post("/task/newJinDuList", {
          corp_id: this.$store.state.userData.cid,
          xmid: this.$store.state.userData.lcxminfo.id,
          user_id: this.$store.state.userData.userid,
          jdstatus: "",
          fid: "",
          status: 2,
          licheng: 1,
          name: "",
        })
        .then((res) => {
          this.lichenglist = res.data.content;
        });
    },
    // 选择框
    showPopup(val) {
      // this.selectype = val;

      if (this.lichenglist.length > 0) {
        this.popupshow = true;

        this.selecval = "jdtitle";
        this.columns = this.lichenglist;
      } else {
        Toast("暂无数据");
      }
    },
    onConfirm1(value) {
      this.eventFrom.milepostid = value.id;
      this.eventFrom.liname = value.jdtitle;

      this.popupshow = false;
    },
  },
  watch: {},
  created() {
    this.$utils.checkding();
    // this.setTitle();
    // this.getList();
    // this.eventFrom = this.$route.query.itemdata;
    this.schedule = this.$route.query.itemdata.schedule;
    this.eventFrom.type = this.$route.query.itemdata.type;
    if (this.eventFrom.type == 1) {
      this.checked = false;
    } else {
      this.checked = true;
    }
    console.log("111111", this.eventFrom);
  },
  mounted() {},
};
</script>
<style lang="less">
#creatschedule {
  // padding: 0.5rem 0;

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
          font-size: 1rem;
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
  .formslider {
    background-color: #fff;
    margin-bottom: 0.66667rem;
    .formslider_font {
      line-height: 2.33333rem;
      // width: 100%;

      font-size: 1rem;
      padding-left: 0.3rem;
      height: 2.33333rem;
    }
    .formslider_div {
      height: 2.33333rem;
      display: flex;
      align-items: center;
      .van-slider {
        width: 90%;
        margin: auto;
      }
      .custom-button {
        width: 1.5rem;
        height: 1.5rem;
        color: #fff;
        font-size: 0.67rem;
        line-height: 1.4rem;
        text-align: center;
        background-color: #1989fa;
        border-radius: 3.33rem;
      }
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

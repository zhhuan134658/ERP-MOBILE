<template>
  <div id="editevent">
    <van-form @submit="onSubmit" :colon="true">
      <van-field
        readonly
        class="zh_vant_isprop"
        input-align="right"
        v-model="editeventFrom.jdtitle"
        name="工程事件名称"
        label="工程事件名称"
        placeholder="请填写事件名称："
        maxlength="50"
        :rules="[{ required: true }]"
      />

      <van-field
        class="zh_vant_isprop"
        input-align="right"
        maxlength="50"
        v-model="editeventFrom.jdusers[0].name"
        name="负责人"
        label="负责人"
        placeholder="请填写负责人"
        readonly
        clickable
      />

      <van-field name="radio" label="定义里程碑">
        <template #input>
          <van-radio-group
            v-model="editeventFrom.status"
            direction="horizontal"
            disabled
          >
            <van-radio name="1">否</van-radio>
            <van-radio name="2">是</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        input-align="right"
        readonly
        clickable
        v-model="editeventFrom.starttime"
        name="开始时间"
        label="开始时间"
        placeholder="请填写开始时间"
        :rules="[{ required: false, message: '请填写开始时间' }]"
      />
      <van-field
        input-align="right"
        readonly
        clickable
        v-model="editeventFrom.stoptime"
        name="结束时间"
        label="结束时间"
        placeholder="请填写结束时间"
        :rules="[{ required: false, message: '请填写结束时间' }]"
      />

      <div class="muban">
        <div class="textarea">
          <van-field
            readonly
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="240"
            v-model="editeventFrom.jdcontent"
            name="工程描述"
            label="工程描述"
            placeholder="工程描述"
          />
        </div>
      </div>
    </van-form>

    <van-dialog
      @confirm="dialogsure"
      v-model="dialogshow"
      title="标题"
      show-cancel-button
    >
      <van-field
        input-align="right"
        readonly
        clickable
        v-model="finishFrom.jdstoptime"
        name="完成时间"
        label="完成时间"
        placeholder="请填写完成时间"
        :rules="[{ required: true }]"
        @click="settime(3)"
      />

      <div class="muban">
        <div class="textarea">
          <van-field
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="240"
            v-model="finishFrom.jdyuanyin"
            name="完成说明"
            label="完成说明"
            placeholder="请填写完成说明"
            :rules="[{ required: true }]"
          />
        </div>
      </div>

      <div class="imgupload">
        <div class="imgfont">附件</div>
        <div class="upList">
          <div class="xiangmu" v-for="(item, index) in FilesList" :key="index">
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

          <div class="upbtn" @click="getspaceID">
            <el-button plain class="el-icon-plus"></el-button>
          </div>
        </div>
      </div>
    </van-dialog>
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
        :min-date="minDate"
        @confirm="gettime"
        @cancel="close"
      />
    </van-popup>
  </div>
</template>
<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
// import addressData from '../common/area.js';
import axios from "axios";
import { Toast } from "vant";
Toast.setDefaultOptions({ duration: 1500 });
import { setTimeout } from "timers";
// import corpUpload from '../common/corpUpload.vue';
export default {
  name: "editevent",
  // components: { corpUpload },
  data() {
    return {
      minDate: "",
      fuzeren: "",
      dialogshow: false,
      editeventFrom: {
        corp_id: this.$store.state.userData.cid,
        userid: this.$store.state.userData.userid,
        username: "",
        xmid: "",
        fid: "",
        starttime: "",
        stoptime: "",
        // jdusers: this.$store.state.userData.personnelList,
        jdusers: [],
        jdstatus: "",
        jdtitle: "",
        jdcontent: "",
        status: "",
        jdstopurl: "",
        shangjistarttime: "",
        shangjistoptime: "",
      },
      FilesList: [],
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
      finishFrom: {
        jid: this.$store.state.userData.eventinfo.id,
        jdstoptime: "",
        type: "",
        jdgongqi: "",
        jdyuanyin: "",
        userid: this.$store.state.userData.userid,
        jdstopurl: "",
        userid: this.$store.state.userData.userid,
      },
      fristroute: "",
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
    //下拉
    onConfirm1(value) {
      this.showPicker = false;
      if (this.numble == 1) {
        this.shijanName = value;
      }
    },
    showPicke(val) {
      this.showPicker = true;
      this.numble = val;
      if (val == 1) {
        this.columns = this.lichengList;
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
        this.editeventFrom.starttime = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        if (this.enddata > this.startdata) {
          this.editeventFrom.stoptime = resDate;
        } else {
          // alert('合同时间结束日期要在合同开始时间之后');
          Toast("结束日期要在开始时间之后");
        }
      } else if (this.valtime == "3") {
        this.finishFrom.jdstoptime = resDate;
        this.compareDate(new Date(), resDate);
      }

      this.show = false;
    },
    compareDate(date1, date2) {
      var oDate1 = new Date(date1);
      var oDate2 = new Date(date2);
      if (oDate1.getTime() > oDate2.getTime()) {
        this.finishFrom.type = 1; //第一个大
        this.finishFrom.jdgongqi = (oDate1 - oDate2) / (1000 * 60 * 60 * 24);
      } else if (oDate1.getTime() < oDate2.getTime()) {
        this.finishFrom.type = 2; //第二个大
        this.finishFrom.jdgongqi = (oDate2 - oDate1) / (1000 * 60 * 60 * 24);
      } else {
        this.finishFrom.type = 0;
        this.finishFrom.jdgongqi = 0;
      }
    },
    dialogsure() {
      this.finishFrom.jdstopurl = this.FilesList;

      this.$axios.post("/task/FinishJinDu", this.finishFrom).then((res) => {
        if (res.data.code == 1) {
          this.$router.push({
            path: "/jinduindex",
          });
          Toast(res.data.msg);
          this.dialogshow = fasle;
        } else if (res.data.code == 2) {
          Toast(res.data.msg);
        }
      });
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    close() {
      this.show = false;
    },
    finish() {
      this.dialogshow = true;
    },
    fanhui() {
      this.$router.push({
        path: "/jinduindex",
      });
    },
    sure() {
      this.infoFrom.type = "update";
      this.infoFrom.jid = this.$store.state.userData.eventinfo.id;

      this.infoFrom.userid = this.$store.state.userData.userid;

      this.$axios.post("/task/UpdateJinDu", this.infoFrom).then((res) => {
        if (res.data.code == 1) {
          Toast(res.data.msg);

          this.$router.push({
            path: "/jinduindex",
          });
        } else if (res.data.code == 2) {
          Toast(res.data.msg);
        }
      });
    },
    dele() {
      Dialog.confirm({
        title: "删除里程碑",
        message: "一旦删除无法找回！",
      })
        .then(() => {
          this.$axios
            .post("/task/UpdateJinDu", {
              jid: this.$store.state.userData.eventinfo.id,
              type: "delete",
            })
            .then((res) => {
              if (res.data.code == 1) {
                Toast(res.data.msg);
                this.$router.push({
                  path: "/jinduindex",
                });
              } else if (res.data.code == 2) {
                Toast(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
      // type: 'delete';
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
            that.editeventFrom.jdusers = result.users;
            that.editeventFrom.username = result.users[0].name;
          },
          onFail: function (err) {},
        });
      });
    },

    getinfo() {
      this.$axios
        .post("/task/JinDuContent", {
          jid: this.$store.state.userData.eventinfo.id,
          fid: this.$store.state.userData.eventinfo.fid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.minDate = new Date(res.data.content.starttime);

            // this.lichengList = res.data.content;
            this.editeventFrom = res.data.content;
            this.editeventFrom.username = this.editeventFrom.jdusers[0].name;
            this.infoFrom = res.data.content;
            // jdusers: this.$store.state.userData.personnelList

            if (this.fristroute == "jinduindex") {
              this.$store.commit("setpersonnelList", res.data.content.jdusers); //选择人员清空
            }
            this.fuzeren = this.$store.state.userData.personnelList.map(
              (item) => {
                return item.name;
              }
            );
          }
        });
    },
    //获取企业自定义空间
    getspaceID() {
      this.$axios
        .post("/dingding/getAuthUp", {
          auth: "add",

          fields: "",
        })
        .then((res) => {
          console.log(res.data.data);
          this.uploadAtta(res.data.data.toString());
        });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.fileId) && res.set(arr.fileId, 1)
      );
    },

    deletefile(tag) {
      this.FilesList.splice(this.FilesList.indexOf(tag), 1);
    },
    uploadAtta(newspaceid) {
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
            _this.FilesList = _this.deunique(
              _this.FilesList.concat(result.data)
            );
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    // 与拉美盯盘文件

    lookfile(item) {
      const _this = this;
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
              fileSize: item.fileSize,
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
  },
  watch: {
    shijanName(newName, oldName) {
      var menti = this.lichengzList.filter((item) => {
        return item.name == newName;
      });
      this.editeventFrom.jdstatus = menti[0].status;
    },
  },

  created() {
    this.$utils.checkding();
    this.setTitle();

    this.getinfo();
  },
  mounted() {},
};
</script>
<style lang="less">
#editevent {
  padding: 0.5rem 0;
  .van-dialog {
    .imgupload {
      margin-top: 0.67rem;
      .imgfont {
        margin-left: 1.17rem;
        font-size: 1.17rem;
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
              font-size: 1.17rem;
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

        //   .upList_item {
        //     width: 100%;
        //     height: 3rem;
        //     border: 0.03rem solid #f3f6fd;
        //     border-radius: 0.33rem;
        //     margin: 0.33rem;
        //     border-radius: 0.2rem;

        //     .clear {
        //       position: relative;
        //       .van-icon {
        //         position: absolute;
        //         top: -5px;
        //         right: -5px;
        //         color: #969799;
        //         line-height: 1rem;
        //         width: 1rem;
        //         height: 1rem;
        //         background-color: red;
        //         border-radius: 100%;
        //       }
        //     }
        //   }
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

  .sureBtn {
    padding: 0 20px;
    margin-bottom: 4rem;
    margin-top: 1.33rem;
    height: 2.67rem;
    line-height: 2.67rem;
    text-align: center;

    overflow: hidden;
    .van-button {
      width: 20%;
      height: 100%;
      border-radius: 0.27rem;
      span {
        font-size: 1.2rem;
      }
    }
  }
}
</style>

<template>
  <!-- 新增任务 -->
  <div id="taskcreat">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <van-field
        readonly
        class="zh_vant_isprop"
        input-align="right"
        v-model="contractDrawerForm.xmname"
        name="项目名称"
        maxlength="50"
        label="项目名称"
        placeholder="请选择项目名称"
        :rules="[{ required: true }]"
        @click="showPopup(1)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="contractDrawerForm.tasktitle"
        name="用户名"
        maxlength="50"
        label="任务标题"
        placeholder="请填写任务标题"
        :rules="[{ required: true }]"
      />

      <van-field
        class="zh_vant_isprop"
        readonly
        input-align="right"
        clickable
        v-model="contractDrawerForm.starttime"
        name="任务开始时间"
        label="任务开始时间"
        placeholder="请填写任务开始时间"
        @click="settime(1)"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="contractDrawerForm.endtime"
        name="任务结束时间"
        label="任务结束时间"
        placeholder="请填写任务结束时间"
        @click="settime(2)"
        :rules="[{ required: true }]"
      />
      <div class="muban">
        <div class="textarea">
          <van-field
            rows="1"
            show-word-limit
            type="textarea"
            maxlength="240"
            input-align="right"
            v-model="contractDrawerForm.taskdesc"
            name="备注"
            label="备注"
            placeholder="请填写"
          />
        </div>
      </div>
      <!-- ssssssssssssssssssssssssssssssssssssssssss -->
      <div class="imgupload">
        <div class="imgfont">附件</div>
        <div class="upList">
          <div
            class="xiangmu"
            v-for="(item, index) in contractDrawerForm.enclosure"
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

          <div class="upbtn" @click="getspaceID">
            <el-button plain class="el-icon-plus"></el-button>
          </div>
        </div>
      </div>

      <div class="liucheng">
        <div style="color: #646566">审批流程</div>
        <div class="liucheng_item">
          <div class="item_font">
            <div class="item_font1">
              <span style="color: red">*</span>待办人
            </div>
            <div class="item_font2">请选择待办人</div>
          </div>

          <div class="item_img">
            <img
              @click="addren(1)"
              src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
              alt
            />
            <div v-for="(item, index) in newrenList" :key="index">
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
              <div class="item_renyuan">
                <van-icon name="cross" @click="deleteren(item)" />
                <div class="itemname">
                  <img v-if="item.avatar" :src="item.avatar" alt />
                  <span v-else>
                    {{
                      item.name.length <= 2
                        ? item.name
                        : item.name.substr(item.name.length - 2, 2)
                    }}
                  </span>
                </div>
                <div
                  style="
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  "
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <!-- 全部人员 -->
            <div v-if="allshow">
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
              <div class="item_renyuan">
                <div class="itemname">
                  <span @click="goall(1)">
                    <img
                      src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/SJA7AQnXE81593745134914.png"
                      alt
                    />
                  </span>
                </div>
                <div>查看全部</div>
              </div>
            </div>
          </div>
        </div>

        <div class="liucheng_item">
          <div class="item_font">
            <div class="item_font1">可见人</div>
            <div class="item_font2">请选择可见人</div>
          </div>

          <div class="item_img">
            <img
              @click="addren(2)"
              src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
              alt
            />

            <div v-for="(item, index) in newcsList" :key="index">
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
              <div class="item_renyuan">
                <van-icon name="cross" @click="deletechao(item)" />
                <div class="itemname">
                  <img v-if="item.avatar" :src="item.avatar" alt />
                  <span v-else>
                    {{
                      item.name.length <= 2
                        ? item.name
                        : item.name.substr(item.name.length - 2, 2)
                    }}
                  </span>
                </div>
                <div
                  style="
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  "
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div v-if="chaosongshow">
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
              <div class="item_renyuan">
                <div class="itemname">
                  <span @click="goall(2)">
                    <img
                      src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/SJA7AQnXE81593745134914.png"
                      alt
                    />
                  </span>
                </div>
                <div>查看全部</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content" v-for="(item, index) in commentList" :key="index">
        <div class="item_top">
          <div>{{ item.username }}</div>
        </div>
        <div class="item_bottom">{{ item.content }}</div>
      </div>

      <!-- <div style="margin: 0.53rem;">
                <van-button block type="info" native-type="submit">提交</van-button>
            </div>-->
      <div class="sureBtn">
        <van-button type="info" native-type="submit">确 定</van-button>
      </div>
    </van-form>

    <!-- {{contractDrawerForm.enclosure}} -->
    <van-popup v-model="popupshow" position="bottom" :style="{ height: '38%' }">
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
        v-model="starcurrentDate"
        type="date"
        @confirm="gettime"
        @cancel="close"
      />
    </van-popup>
    <!-- 选择 -->
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "taskcreat",
  components: {},
  data() {
    return {
      newrenList: [],
      newcsList: [],
      shenpiList: [],
      chaosongList: [],

      xmlist: [],
      selecval: "",
      popupshow: false,
      contractDrawerForm: {
        xmid: "",
        xmname: "",
        corp_id: this.$store.state.userData.cid,
        userid: this.$store.state.userData.userid,

        starttime: "",
        endtime: "",
        taskdesc: "", //备注
        tasktitle: "",
        enclosure: [],
        logspare: [], //代办
        logspare1: [], //可见
      },
      newcontractDrawerForm: {
        xmid: "",
        xmname: "",
        corp_id: this.$store.state.userData.cid,
        userid: this.$store.state.userData.userid,

        starttime: "",
        endtime: "",
        taskdesc: "", //备注
        tasktitle: "",
        enclosure: [],
        logspare: [], //代办
        logspare1: [], //可见
      },

      username: "",
      password: "",
      show: false,
      starcurrentDate: new Date(),
      endcurrentDate: new Date(),
      planstarttime: "",
      timetitle: "",
      checkeddata: "",
      showPicker: false,
    };
  },
  computed: {},
  watch: {
    shenpiList: {
      handler(val, oldval) {
        if (val.length < 4) {
          this.allshow = false;
          this.newrenList = val;
        } else {
          this.allshow = true;
          this.newrenList = val.slice(-2);
        }
      },
    },
    chaosongList: {
      handler(val, oldval) {
        if (val.length < 4) {
          this.chaosongshow = false;
          this.newcsList = val;
        } else {
          this.chaosongshow = true;
          this.newcsList = val.slice(-2);
        }
      },
    },
  },
  methods: {
    setTitle() {
      dd.biz.navigation.setTitle({
        title: "普通任务", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
      });
    },

    goall(val) {
      this.$router.push({
        path: "/renyuanlist",
        query: {
          typeren: val,
          type: "creat",
        },
      });
    },
    // 选择框
    showPopup(val) {
      this.$router.replace({
        path: "/projectnewlist",
        query: {
          datainfo: this.datainfo,
          type: "2",
        },
      });
      // this.popupshow = true;
      // this.selectype = val;
      // if (val == 1) {
      //     this.selecval = 'name';
      //     this.columns = this.xmlist;
      // }
    },
    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.contractDrawerForm.xmid = value.id;
        this.contractDrawerForm.xmname = value.name;
      }
      this.popupshow = false;
    },

    failure(errorInfo) {
      Toast(errorInfo.errors[0].message);
    },
    gorenyuan(num) {
      this.$router.push("/renwurenyuan", {
        query: {
          num: num,
        },
      });
    },
    // onSubmit(values) {
    //     console.log(values);
    // },
    // 时间选择
    settime(val, timetitle) {
      this.show = true;
      this.valtime = val;
      console.log(val);
      this.timetitle = timetitle;
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
      //  +
      // ' ' +
      // this.p(startdata.getHours()) +
      // ':' +
      // this.p(startdata.getMinutes());

      // 时间
      // const resTime =
      //     this.p(d.getHours()) +
      //     ':' +
      //     this.p(d.getMinutes()) +
      //     ':' +
      //     this.p(d.getSeconds());
      if (this.valtime == "1") {
        this.contractDrawerForm.starttime = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        if (this.enddata > this.startdata) {
          this.contractDrawerForm.endtime = resDate;
        } else {
          // alert('合同时间结束日期要在合同开始时间之后');
          Toast("任务结束日期要在任务开始时间之后");
        }
      }
      if (this.valtime == "3") {
        this.contractDrawerForm.desc[this.timetitle] = resDate;
      }

      this.show = false;
    },

    p(s) {
      return s < 10 ? "0" + s : s;
    },
    close() {
      this.show = false;
    },
    calc() {
      this.$router.push({ path: "/renwulist" });
    },

    showPicke(val) {
      this.showPicker = true;
      // this.numble = val;
      console.log(val);

      this.columns = val.select.map((item) => {
        return item.selectname;
      });

      // item.select;
      // this.columns = this.typeList;

      this.checkeddata = val;
    },
    deleteren(tag) {
      this.shenpiList.splice(this.shenpiList.indexOf(tag), 1);
      this.$store.commit("setshenpiList", this.shenpiList);
    },
    deletechao(tag) {
      this.chaosongList.splice(this.chaosongList.indexOf(tag), 1);
      this.$store.commit("setchaosongList", this.chaosongList);
    },
    addren(value) {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: true, //是否多选
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
            if (value == 1) {
              that.shenpiList = that.deunique1(
                that.shenpiList.concat(result.users)
              );
              that.$store.commit("setshenpiList", that.shenpiList);
            } else if (value == 2) {
              that.chaosongList = that.deunique1(
                that.chaosongList.concat(result.users)
              );
              // that.chaosongList = result.users;
              that.$store.commit("setchaosongList", that.chaosongList);
            }
          },
          onFail: function (err) {},
        });
      });
    },

    gochaosong() {},

    deletefile(tag) {
      this.contractDrawerForm.enclosure.splice(
        this.contractDrawerForm.enclosure.indexOf(tag),
        1
      );
    },

    dduploadFiles() {},

    save() {},

    //获取企业自定义空间
    getspaceID() {
      this.$axios
        .post("/dingding/getAuthUp", {
          auth: "add",

          fields: "",
        })
        .then((res) => {
          console.log(res.data.spaceid);

          this.uploadAtta(res.data.data.toString());
        });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.fileId) && res.set(arr.fileId, 1)
      );
    },
    deunique1(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
      );
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
            // Toast(result.data);
            // _this.contractDrawerForm.enclosure = result.data;
            _this.contractDrawerForm.enclosure = _this.deunique(
              _this.contractDrawerForm.enclosure.concat(result.data)
            );

            // _this.fileList = _this.deunique(
            //     _this.fileList.concat(result.data)
            // );
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
    preview() {},

    onSubmit() {
      this.contractDrawerForm.logspare = this.shenpiList;
      this.contractDrawerForm.logspare1 = this.chaosongList;

      if (this.contractDrawerForm.logspare.length == 0) {
        Toast("代办人不能为空");
      } else {
        this.$axios
          .post("/task/Addtask", this.contractDrawerForm)
          .then((res) => {
            this.$router.push({ path: "/taskindex" });
            this.contractDrawerForm = this.newcontractDrawerForm;

            Toast(res.data.msg);
          });
      }
    },

    //获取任务评论
    gettaskcomment() {
      this.$axios
        .post("/task/cotentlist", {
          taskid: this.$store.state.userData.itemdata.id,
          xmid: this.$store.state.userData.Selecteddata.id,
          userid: this.$store.state.userData.userid,
        })
        .then((res) => {
          this.commentList = res.data.list;
        });
    },
    //获取子项目列表
    getxmList() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.xmlist = res.data.data;
      });
    },
  },

  activated() {
    this.$utils.checkding();
    this.setTitle();
    this.getxmList();
    if (this.$route.query.pro_name) {
      this.contractDrawerForm.xmid = this.$route.query.pro_id;
      this.contractDrawerForm.xmname = this.$route.query.pro_name;
    }
  },
  mounted() {
    // this.getMouldInfo();
  },
};
</script>
<style lang='less' >
#taskcreat {
  padding-bottom: 3.33rem;
  .van-form {
    .imgupload {
      margin-top: 0.67rem;
      .imgfont {
        margin-left: 0.67rem;
        font-size: 1.17rem;
        color: #646566;
      }
      padding: 0.67rem 0;
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
            width: 79%;
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

          width: 3.33rem;
          height: 3.33rem;
          background-color: #e6e6e7;
          border-radius: 0.2rem;
          .el-button {
            width: 100%;
            height: 100%;
            font-size: 1.67rem;
            padding: 0.4px 0.67px;
          }
        }
      }
    }
    .liucheng {
      margin-top: 1rem;
      padding: 0.67rem;
      box-sizing: border-box;
      background-color: #fff;
      font-size: 1.17rem;
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

          img {
            margin-left: 0.33rem;
            float: right;
            width: 2.67rem;
            height: 2.67rem;
          }
          .item_icon {
            float: right;
            width: 1rem;
            height: 3.33rem;
            line-height: 2.67rem;
            text-align: center;
          }
          .item_renyuan {
            position: relative;
            float: right;
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
              background-color: red;
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
      // .shnpiren {
      //     .shnpiren_item {
      //     }
      // }
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
  .content {
    border-radius: 0.5rem;
    background-color: #fff;
    padding: 1rem;
    margin-bottom: 0.33rem;
    .item_top {
      font-size: 1.17rem;
      padding-bottom: 0.33rem;
      border-bottom: 0.06rem solid #eeeff3;
    }
    .item_bottom {
      margin-top: 0.33rem;

      color: #606266;
      .van-field {
        border-bottom: 0.03rem solid #e6e6e7;
        .van-cell__title {
          font-size: 1.17rem;
          line-height: 1.67rem;
          color: #575b60;
          width: 30%;
        }
        .van-cell__value {
          font-size: 1.17rem;
          .van-field__body {
            line-height: 1.67rem;
          }
          .van-field__word-limit {
            font-size: 1rem;
          }
        }
      }
    }
  }
  .van-dialog {
    .van-dialog__content {
      padding: 0 0.5rem;
      .van-cell {
        border-bottom: 0.03rem solid #ebedf0;
        padding: 0 0.5rem;
        height: 3.33rem;
        margin-bottom: 0.67rem;

        .van-cell__value {
          .van-field__body {
            height: 100%;
            line-height: 3.33rem;
            .van-field__control {
              font-size: 1.17rem !important;
              // line-height: 1.17rem !important;
              color: #000;
            }
            .van-field__right-icon {
              .van-icon {
                font-size: 1.33rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <!-- 新增任务 -->
  <div id="creatrenwu">
    <van-form @submit="onSubmit" :colon="true">
      <van-field
        readonly
        class="zh_vant_isprop"
        input-align="right"
        v-model="contractDrawerForm.project_name"
        name="项目名称"
        maxlength="50"
        label="项目名称"
        placeholder="请选择项目名称"
        :rules="[{ required: true }]"
      />
      <van-field
        readonly
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
        :rules="[{ required: true }]"
      />
      <div class="muban">
        <div class="textarea">
          <van-field
            rows="1"
            readonly
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

      <div class="liucheng">
        <div style="color: #646566">审批流程</div>
        <div class="liucheng_item">
          <div class="item_font">
            <div class="item_font1">待办人</div>
            <div class="item_font2">请选择待办人</div>
          </div>

          <div class="item_img">
            <!-- <img
                            @click="addren(1)"
                            src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
                            alt
                        /> -->
            <div v-for="(item, index) in newrenList" :key="index">
              <div class="item_renyuan">
                <!-- <van-icon
                                    name="cross"
                                    @click="deleteren(item)"
                                /> -->
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
              <div class="item_icon" v-if="newrenList.length > 1">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <!-- 全部人员 -->
            <div v-if="allshow">
              <div class="item_renyuan" @click="lookall(1)">
                <div class="itemname">
                  <span>
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
            <!-- <img
                            @click="addren(2)"
                            src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
                            alt
                        /> -->

            <div v-for="(item, index) in newcsList" :key="index">
              <div class="item_renyuan">
                <!-- <van-icon
                                    name="cross"
                                    @click="deletechao(item)"
                                /> -->
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
              <div class="item_icon" v-if="newcsList.length > 1">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div v-if="chaosongshow">
              <div class="item_renyuan">
                <div class="itemname" @click="lookall(2)">
                  <span>
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
      <div class="pinglun">评论</div>
      <div class="content" v-for="(item, index) in commentList" :key="index">
        <div class="item_top">
          <div>{{ item.username }}</div>
          <div>{{ item.created }}</div>
        </div>
        <div class="item_bottom">{{ item.content }}</div>
        <div class="imgupload">
          <div class="upList">
            <div
              class="xiangmu"
              v-for="(item1, index) in item.file"
              :key="index"
            >
              <div class="xmdiv xmimg">
                <div class="img">{{ item1.fileType }}</div>
              </div>
              <div class="xmdiv xmjindu">
                <div class="xmjindu-item">
                  <div class="xmjindu-item-font">
                    {{ item1.fileName }}
                  </div>
                  <div class="xmjindu-item-font1">
                    {{ (item1.fileSize / 1024 / 1024).toFixed(2) }}MB
                  </div>
                </div>
                <div class="yulan" @click="lookfile(item1)">预览</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-form>
    <div class="sureBtn">
      <van-button
        type="info"
        v-if="contractDrawerForm.taskstatus == '0'"
        @click="complete(1)"
        >完成</van-button
      >
      <van-button v-else type="info" @click="retask(2)">重启</van-button>
      <van-button
        v-if="
          this.$store.state.userData.taskliststatus == '1' &&
          contractDrawerForm.taskstatus == '0'
        "
        type="info"
        @click="urge"
        >催办</van-button
      >

      <van-button type="warning" @click="clickcomment">评论</van-button>
    </div>
    <van-dialog
      @confirm="queren"
      @cancel="quxiao"
      v-model="dialogshow"
      title="评论"
      show-cancel-button
    >
      <van-field
        v-model="commontext"
        placeholder="请输入标签名"
        right-icon="photo"
        @click-right-icon="getspaceID(3)"
      />
    </van-dialog>
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
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm1"
      />
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "creatrenwu",
  components: {},
  data() {
    return {
      infodata: this.$store.state.userData.itemdata,
      plfile: "",
      commontext: "",
      dialogshow: false,
      fileList: [],
      // newspaceid: '',
      commentList: [],
      description: "",
      iscreat: "",
      //人员
      newrenList: [],

      allshow: false,
      chaosongshow: false,
      //
      newTaskDemoList: [],

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

        logspare: [], //代办
        logspare1: [], //可见
      },

      // taskid
      title: "",
      // typename: this.$route.query.typename,
      // desc: '',
      planstarttime: "",

      planendtime: "",
      comment: "",
      list: [],
      daibanemplIdlist: [],
      kejianemplIdlist: [],

      username: "",
      password: "",
      show: false,
      starcurrentDate: new Date(),
      endcurrentDate: new Date(),
      planstarttime: "",
      timetitle: "",
      checkeddata: "",
      showPicker: false,
      pinglundata: "",
      fristroute: "",
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
        title: "任务修改", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
      });
    },

    //归档任务
    guidang(val) {
      this.$axios
        .post("/task/taskdelOrcom", {
          corp_id: this.$store.state.userData.cid,
          userid: this.$store.state.userData.userid,

          proname: this.$store.state.userData.Selecteddata.pcontent,

          id: this.infodata.id,
          status: val,
        })
        .then((res) => {
          if (res.data.code == 200) {
            Toast(res.data.msg);
            this.getinfo(this.$store.state.userData.itemdata);
          } else {
            Toast(res.data.msg);
          }
        });
    },

    // 完成任务

    complete(val) {
      this.$axios
        .post("/task/taskdelOrcom", {
          corp_id: this.$store.state.userData.cid,
          userid: this.$store.state.userData.userid,

          proname: this.$store.state.userData.Selecteddata.pcontent,

          id: this.infodata.id,
          status: val,
        })
        .then((res) => {
          if (res.data.code == 1) {
            Toast(res.data.msg);

            this.$router.go(-1);
            // this.getinfo(this.$store.state.userData.itemdata);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    // 重启任务
    retask(val) {
      this.$axios
        .post("/task/tasknotice", {
          corp_id: this.$store.state.userData.cid,

          user_id: this.$store.state.userData.userid,

          id: this.infodata.id,

          type: val,
        })
        .then((res) => {
          if (res.data.status == 1) {
            Toast(res.data.msg);
            this.getinfo(this.$store.state.userData.itemdata);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    //催办任务
    urge() {
      //  this.itemdata.todostaff

      const _this = this;
      var userids = _this.contractDrawerForm.logspare.map((item) => {
        return item.emplId;
      });
      dd.ready(function () {
        dd.biz.ding.create({
          users: userids, // 用户列表，工号
          corpId: _this.$store.state.userData.cid, // 企业id
          type: 1, // 附件类型 1：image  2：link
          alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
          alertDate: {
            format: "yyyy-MM-dd HH:mm",
            value: "",
          },
          attachment: {
            images: [""],
          }, // 附件信息
          text: "", // 正文
          bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；

          onSuccess: function () {
            //onSuccess将在点击发送之后调用
          },
          onFail: function () {},
        });
      });
    },
    // righticon(val) {
    //     this.getspaceID();
    //     this.pinglun = val;
    // },
    //评论
    clickcomment() {
      this.dialogshow = true;
    },
    //评论
    quxiao() {
      this.commontext = "";
    },
    queren() {
      if (this.commontext == "" && this.plfile == []) {
        Toast("评论不能为空");
      } else {
        this.$axios
          .post("/task/taskcomment", {
            file: this.plfile,
            corp_id: this.$store.state.userData.cid,
            user_id: this.$store.state.userData.userid,

            taskid: this.$store.state.userData.itemdata.id,

            username: this.$store.state.userData.username,
            content: this.commontext,
          })
          .then((res) => {
            if (res.data.code == 1) {
              Toast(res.data.msg);
              this.commontext = "";
              this.dialogshow = false;

              this.gettaskcomment();
            } else {
              Toast(res.data.msg);
            }
          });
      }
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
          this.contractDrawerForm.stoptime = resDate;
        } else {
          // alert('合同时间结束日期要在合同开始时间之后');
          Toast("结束日期要在开始时间之后");
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
    onConfirm1(value) {
      this.showPicker = false;
      console.log(value);

      this.contractDrawerForm.desc[this.checkeddata.title] = value;
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

    // 获取模板
    getMouldInfo() {
      const _this = this;
      _this.$axios
        .post("/task/edittempalte", {
          type: 1,
          id: this.$store.state.userData.taskdata.id,
          userid: this.$store.state.userData.userid,
          xmid: this.$store.state.userData.Selecteddata.id,
        })
        .then((res) => {
          if (res.data.code == "200") {
            let newData = res.data.list;
            let newJson = {};
            newData.task_title.forEach((item) => {
              let newKey = item.title;

              newJson[newKey] = "";
            });
            _this.$set(_this.contractDrawerForm, "desc", newJson);
            console.log("444444+++" + JSON.stringify(_this.contractDrawerForm));

            _this.newTaskDemoList = newData.task_title;
            console.log(_this.newTaskDemoList);
            console.log("+66665" + JSON.stringify(this.fristroute));
            _this.getinfo(_this.$store.state.userData.itemdata);

            // _this.contractDrawerForm.type=res.data.list.taskid
          }
        });
    },
    lookall(val) {
      this.$router.push({
        path: "/renyuanlist",
        query: {
          typeren: val,
          type: "edit",
        },
      });
    },
    // 选人
    addren(value) {
      this.$router.push({
        path: "/mansList",
      });
      this.$store.commit("settyperen", value); //审批

      this.$store.commit("settaskman", []);
    },

    gochaosong() {},

    deletefile(tag) {
      this.contractDrawerForm.enclosure.splice(
        this.contractDrawerForm.enclosure.indexOf(tag),
        1
      );
    },

    dduploadFiles() {},

    deleteren(tag) {
      this.$store.state.userData.daibanList.splice(
        this.$store.state.userData.daibanList.indexOf(tag),
        1
      );
    },
    deletechao(tag) {
      this.$store.state.userData.kejianList.splice(
        this.$store.state.userData.kejianList.indexOf(tag),
        1
      );
    },

    save() {},

    //获取企业自定义空间
    getspaceID(val) {
      this.pinglundata = val;

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
            // _this.fileList = result.data;
            // _this.contractDrawerForm.enclosure = _this.deunique(
            //     _this.contractDrawerForm.enclosure.concat(
            //         result.data
            //     )
            // );
            if (_this.pinglundata == 3) {
              _this.plfile = result.data;
            } else {
              _this.contractDrawerForm.enclosure = _this.deunique(
                _this.contractDrawerForm.enclosure.concat(result.data)
              );
            }

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
    // preview() {},

    // sure() {
    //     // logspare
    //     // this.contractDrawerForm.enclosure = this.fileList;
    //     this.contractDrawerForm.logspare = this.$store.state.userData.daibanList;
    //     this.contractDrawerForm.logspare12 = this.$store.state.userData.kejianList;

    //     this.contractDrawerForm.corp_id = this.$store.state.userData.cid;
    //     this.contractDrawerForm.xmid = this.$store.state.userData.Selecteddata.id;
    //     this.contractDrawerForm.userid = this.$store.state.userData.userid;
    //     this.contractDrawerForm.id = this.$store.state.userData.itemdata.id;

    //     this.contractDrawerForm.type = 2;
    //     if(this.contractDrawerForm.logspare.length==0){
    //       Toast("请填写待办人")
    //     } else{
    //        this.$axios
    //         .post('/task/taskupdate', this.contractDrawerForm)
    //         .then((res) => {
    //             Toast(res.data.msg);
    //             this.$router.push({ path: '/renwulist' });
    //         });
    //     }

    // },

    getinfo(item) {
      // this.$store.commit('setshenpiList', []);
      // this.$store.commit('setchaosongList', []);
      console.log(item);
      this.$axios
        .post("/task/taskdetails", {
          corp_id: this.$store.state.userData.cid,

          userid: this.$store.state.userData.userid,
          id: item.id,
        })
        .then((res) => {
          console.log(res.data.list);
          this.contractDrawerForm = res.data.list;

          // this.contractDrawerForm.enclosure = JSON.parse(
          //     this.contractDrawerForm.enclosure
          // );
          //  this.contractDrawerForm.logspare = JSON.parse(
          //     this.contractDrawerForm.logspare
          // );
          //  this.contractDrawerForm.logspare1 = JSON.parse(
          //     this.contractDrawerForm.logspare1
          // );

          this.$store.commit("setshenpiList", res.data.list.logspare);
          this.$store.commit("setchaosongList", res.data.list.logspare1);
          if (res.data.list.logspare.length < 4) {
            this.allshow = false;
            this.newrenList = res.data.list.logspare;
          } else {
            this.allshow = true;
            this.newrenList = res.data.list.logspare.slice(-2);
          }
          if (res.data.list.logspare1.length < 4) {
            this.chaosongshow = false;
            this.newcsList = res.data.list.logspare1;
          } else {
            this.chaosongshow = true;
            this.newcsList = res.data.list.logspare1.slice(-2);
          }
        });
    },
    //获取任务评论
    gettaskcomment() {
      this.$axios
        .post("/task/cotentlist", {
          taskid: this.$store.state.userData.itemdata.id,
          corp_id: this.$store.state.userData.cid,
          user_id: this.$store.state.userData.userid,
          // user_id: this.$store.state.userData.userid,
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

  created() {
    this.$utils.checkding();
    this.setTitle();
    this.gettaskcomment();
    this.getxmList();

    // this.getMouldInfo();

    this.getinfo(this.$store.state.userData.itemdata);
  },
  mounted() {},
};
</script>
<style lang='less' >
#creatrenwu {
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
          }
        }
      }
    }
    .pinglun {
      margin-top: 1rem;
      padding: 0.67rem;
      box-sizing: border-box;
      background-color: #fff;
      font-size: 1.17rem;
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
    padding: 0 20px;
    margin-bottom: 4rem;
    margin-top: 1.33rem;
    height: 2.67rem;
    line-height: 2.67rem;
    text-align: center;

    overflow: hidden;
    .van-button {
      width: 30% !important;
      height: 100%;
      border-radius: 0.27rem;
      span {
        font-size: 1.2rem;
      }
    }
  }
  .content {
    border-radius: 0.5rem;
    background-color: #fff;
    padding: 1rem;
    margin: 0.33rem 0;
    .item_top {
      font-size: 1.17rem;
      padding-bottom: 0.33rem;
      border-bottom: 0.06rem solid #eeeff3;
      display: flex;
      justify-content: space-between;
    }
    .item_bottom {
      margin-top: 0.33rem;

      color: #606266;
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
            }
          }
        }
      }
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
}
</style>

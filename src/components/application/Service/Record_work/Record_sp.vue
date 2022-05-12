<template>
  <!-- 新建企业证书申请 -->
  <div id="Recordsp">
    <div class="header">
      <div class="alldiv">
        <div
          class="alldiv_item"
          @click="showb1"
          :class="{ active: shows == 1 }"
        >
          记工
        </div>
        <div
          @click="showb2"
          class="alldiv_item"
          :class="{ active: shows == 2 }"
        >
          借支
        </div>
      </div>
    </div>
    <!-- 记工 -->
    <van-form
      v-if="shows == 1"
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.durationname"
        name="点工"
        label="点工"
        placeholder="请填写点工"
        :rules="[{ required: true }]"
        @click="showPopup(1)"
      />

      <div class="muban">
        <div class="textarea">
          <van-field
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="240"
            v-model="personnelFrom.remarks"
            name="备注"
            label="备注"
            placeholder="请填写备注"
            :rules="[{ required: false }]"
          />
        </div>
      </div>
      <div class="imgupload">
        <div class="imgfont">
          <div>附件</div>
          <div class="imgfont1" @click="getspaceID('4')">添加附件</div>
        </div>
        <div class="upList">
          <div
            class="xiangmu"
            v-for="(item, index) in personnelFrom.enclosure"
            :key="index"
          >
            <div class="xmdiv xmimg">
              <div class="img">{{ item.fileType }}</div>
            </div>
            <div class="xmdiv xmjindu">
              <div class="clear">
                <van-icon name="cross" @click="deletefile('4', item)" />
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

      <div class="liucheng">
        <div style="color: #000; font-weight: 600">流程</div>
        <div class="liucheng_item" style="border-bottom: 0.06rem solid #f3f6fd">
          <div class="item_font">
            <div class="item_font1">
              <span style="color: red">*</span>审批人
            </div>
            <div class="item_font2">请选择审批人</div>
          </div>

          <div class="item_img">
            <img
              @click="addren(1)"
              src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
              alt
            />
            <div
              v-for="(item, index) in newrenList"
              :key="index"
              style="display: flex"
            >
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
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <!-- 全部人员 -->
            <div v-if="allshow" style="display: flex">
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
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="liucheng_item">
          <div class="item_font">
            <div class="item_font1">抄送人</div>
            <div class="item_font2">请选择抄送人</div>
          </div>

          <div class="item_img">
            <img
              @click="addren(2)"
              src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
              alt
            />

            <div
              v-for="(item, index) in newcsList"
              :key="index"
              style="display: flex"
            >
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
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div v-if="chaosongshow" style="display: flex">
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
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sureBtn">
        <van-button native-type="submit" type="info">提 交</van-button>
      </div>
    </van-form>
    <!-- 借支 -->
    <van-form
      v-else
      @submit="onSubmit1"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="jiezhiFrom.duration"
        name="金额"
        label="金额"
        placeholder="请填写金额"
        :rules="[{ required: true }]"
      />

      <div class="muban">
        <div class="textarea">
          <van-field
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="240"
            v-model="jiezhiFrom.remarks"
            name="备注"
            label="备注"
            placeholder="请填写备注"
            :rules="[{ required: false }]"
          />
        </div>
      </div>
      <div class="imgupload">
        <div class="imgfont">
          <div>附件</div>
          <div class="imgfont1" @click="getspaceID('3')">添加附件</div>
        </div>
        <div class="upList">
          <div
            class="xiangmu"
            v-for="(item, index) in jiezhiFrom.enclosure"
            :key="index"
          >
            <div class="xmdiv xmimg">
              <div class="img">{{ item.fileType }}</div>
            </div>
            <div class="xmdiv xmjindu">
              <div class="clear">
                <van-icon name="cross" @click="deletefile('3', item)" />
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

      <div class="liucheng">
        <div style="color: #000; font-weight: 600">流程</div>
        <div class="liucheng_item" style="border-bottom: 0.06rem solid #f3f6fd">
          <div class="item_font">
            <div class="item_font1">
              <span style="color: red">*</span>审批人
            </div>
            <div class="item_font2">请选择审批人</div>
          </div>

          <div class="item_img">
            <img
              @click="addren(1)"
              src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
              alt
            />
            <div
              v-for="(item, index) in newrenList"
              :key="index"
              style="display: flex"
            >
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
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <!-- 全部人员 -->
            <div v-if="allshow" style="display: flex">
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
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="liucheng_item">
          <div class="item_font">
            <div class="item_font1">抄送人</div>
            <div class="item_font2">请选择抄送人</div>
          </div>

          <div class="item_img">
            <img
              @click="addren(2)"
              src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
              alt
            />

            <div
              v-for="(item, index) in newcsList"
              :key="index"
              style="display: flex"
            >
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
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div v-if="chaosongshow" style="display: flex">
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
              <div class="item_icon">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sureBtn">
        <van-button native-type="submit" type="info">提 交</van-button>
      </div>
    </van-form>
    <!-- {{this.$route.query.spanTime}} -->

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
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "Recordsp",
  components: {},
  data() {
    return {
      timeriqi: "",
      ban_name: "",
      shows: 1,
      UserOrgList: [],
      ZhengShuXIaLaList: [
        { name: "0.5个工", id: 0.5 },
        { name: "1个工", id: 1 },
      ],
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
      mxindex: "",
      issureList: [
        { name: "是", id: "1" },
        { name: "否", id: "2" },
      ],
      typeList: [
        { name: "原件", id: "1" },
        { name: "电子件", id: "2" },
      ],
      mxitem: {
        czid: "", //证书id
        uname: "", //持证人
        number: "", //证书编号
        xing: "", //证书性质
        ya: "", //是否压证
        suo: "", //是否锁证
        remarks: "", //备注
        zsname: "", //证书名称
      },
      personnelFrom: {
        ban_name: this.ban_name,
        riqi: this.timeriqi,
        participants: [],
        participants_id: [],
        duration: "",
        durationname: "",
        remarks: "",
        enclosure: [],
        image: [],
        send_userid: this.$store.state.userData.userid,
        process_code: "",
        cc_userid: "", //抄送人
        approval_userid: "", //审批人
      },
      jiezhiFrom: {
        ban_name: this.ban_name,
        riqi: this.timeriqi,
        participants: "",
        participants_id: "",
        duration: "",

        remarks: "",
        enclosure: [],
        image: [],
        send_userid: this.$store.state.userData.userid,
        process_code: "",
        cc_userid: "", //抄送人
        approval_userid: "", //审批人
      },
      newjiezhiFrom: {
        ban_name: this.ban_name,
        riqi: this.timeriqi,
        participants: "",
        participants_id: "",
        duration: "",

        remarks: "",
        enclosure: [],
        image: [],
        send_userid: this.$store.state.userData.userid,
        process_code: "",
        cc_userid: "", //抄送人
        approval_userid: "", //审批人
      },
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
      const _this = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: _this.$store.state.userData.titledata.name, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    //删除明细
    delemx(item) {
      this.personnelFrom.applyTableData.splice(
        this.personnelFrom.applyTableData.indexOf(item),
        1
      );
    },
    //增加明细
    addmingxi() {
      this.personnelFrom.applyTableData.push({
        czid: "", //证书id
        uname: "", //持证人
        number: "", //证书编号
        xing: "", //证书性质
        ya: "", //是否压证
        suo: "", //是否锁证
        remarks: "", //备注
        zsname: "", //证书名称
      });
    },
    goall(val) {
      this.$router.push({
        path: "/Record_spren",
        query: {
          typeren: val,
        },
      });
    },
    deleteren(tag) {
      this.shenpiList.splice(this.shenpiList.indexOf(tag), 1);
      this.$store.commit("setshenpiList", this.shenpiList);
    },
    deletechao(tag) {
      this.chaosongList.splice(this.chaosongList.indexOf(tag), 1);
      this.$store.commit("setchaosongList", this.chaosongList);
    },
    deletitem(tag) {
      this.personnelFrom.sbcontent.splice(
        this.personnelFrom.sbcontent.indexOf(tag),
        1
      );
    },
    // 选择框
    showPopup(val) {
      this.selectype = val;
      this.popupshow = true;

      if (val == 1) {
        this.selecval = "name";
        this.columns = this.ZhengShuXIaLaList;
      }
    },
    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.personnelFrom.duration = value.id;
        this.personnelFrom.durationname = value.name;
      }
      this.popupshow = false;
    },
    mxcancel() {
      if (this.selectype == 1) {
        this.personnelFrom.zsname = "";
        this.personnelFrom.uname = "";
        this.personnelFrom.czid = "";

        this.personnelFrom.number = "";
      } else if (this.selectype == 2) {
        this.personnelFrom.applyTableData[this.mxindex].xing = "";
      } else if (this.selectype == 3) {
        this.personnelFrom.applyTableData[this.mxindex].ya = "";
      } else if (this.selectype == 4) {
        this.personnelFrom.applyTableData[this.mxindex].suo = "";
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
        this.personnelFrom.time = resDate;
        this.startdata = value;
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
      Toast(errorInfo.errors[0].name);
      console.log(errorInfo);
    },
    onSubmit1() {
      console.log("借支");
      if (this.shenpiList.length < 1) {
        Toast("请填写审批人");
      } else {
        this.$axios.post("/projectthree/jzmould").then((res) => {
          if (res.data.code == 1) {
            // this.personnelFrom.cc_userid = this.chaosongList;
            // this.personnelFrom.approval_userid = this.shenpiList;

            this.jiezhiFrom.approval_userid = this.shenpiList
              .map((item) => {
                if (!item.emplId) return "";
                return item.emplId;
              })
              .toString();
            this.jiezhiFrom.cc_userid = this.chaosongList
              .map((item) => {
                if (!item.emplId) return "";
                return item.emplId;
              })
              .toString();

            this.jiezhiFrom.process_code = res.data.data;

            this.$axios
              .post("/projectthree/jzmouldadd", this.jiezhiFrom)
              .then((res) => {
                this.$router.go(-1);
                this.jiezhiFrom = this.newjiezhiFrom;
                this.$store.commit("setshenpiList", []);
                this.$store.commit("setchaosongList", []);
              });

            Toast(res.data.msg);
          } else {
            Toast(res.data.msg);
          }
        });
        console.log("456");
      }
    },

    onSubmit() {
      console.log("记工");
      delete this.personnelFrom.durationname;
      if (this.shenpiList.length < 1) {
        Toast("请填写审批人");
      } else {
        this.$axios.post("/projectthree/jgMould").then((res) => {
          if (res.data.code == 1) {
            // this.personnelFrom.cc_userid = this.chaosongList;
            // this.personnelFrom.approval_userid = this.shenpiList;

            this.personnelFrom.approval_userid = this.shenpiList
              .map((item) => {
                if (!item.emplId) return "";
                return item.emplId;
              })
              .toString();
            this.personnelFrom.cc_userid = this.chaosongList
              .map((item) => {
                if (!item.emplId) return "";
                return item.emplId;
              })
              .toString();

            this.personnelFrom.process_code = res.data.data;

            this.$axios
              .post("/projectthree/addRecordWorkSp", this.personnelFrom)
              .then((res) => {
                this.$router.go(-1);
                this.$store.commit("setshenpiList", []);
                this.$store.commit("setchaosongList", []);
              });

            Toast(res.data.msg);
          } else {
            Toast(res.data.msg);
          }
        });
        console.log("456");
      }
    },
    clac() {},
    //选部门
    addorg(value) {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.departmentsPicker({
          title: "选择部门", //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxDepartments: 1, //最大选择部门数量
          pickedDepartments: [], //已选部门
          disabledDepartments: [], //不可选部门
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: "GLOBAL", //选人权限，目前只有GLOBAL这个参数
          onSuccess: function (result) {
            console.log(result);
            that.personnelFrom.allotDept = result.departments[0].name;
            /**
        {
            userCount:1,                              //选择人数
            departmentsCount:1，//选择的部门数量
            departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
          },
          onFail: function (err) {},
        });
      });
    },
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
            that.personnelFrom.uname = result.users[0].name;
          },
          onFail: function (err) {},
        });
      });
    },
    //选人
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
    //获取企业自定义空间
    getspaceID(val) {
      this.uptype = val;
      this.$axios
        .post("/dingding/GetDingPanFileID", {
          type: "add",

          fileids: "",
        })
        .then((res) => {
          console.log(res.data.spaceid);
          if (val == "1" || val == "2") {
            this.imguploadAtta(res.data.spaceid.toString());
          } else if (val == "3" || val == "4") {
            this.imguploadAtta(res.data.spaceid.toString());
          }
        });
    },
    deunique1(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
      );
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.fileId) && res.set(arr.fileId, 1)
      );
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
            if (_this.uptype == "3") {
              // _this.personnelFrom.ldenclosure = result.data;
              _this.jiezhiFrom.enclosure = _this.deunique(
                _this.jiezhiFrom.enclosure.concat(result.data)
              );
            } else if (_this.uptype == "4") {
              // _this.personnelFrom.enclosure = result.data;
              _this.personnelFrom.enclosure = _this.deunique(
                _this.personnelFrom.enclosure.concat(result.data)
              );
            }

            // _this.contractDrawerForm.enclosure = _this.deunique(
            //     _this.contractDrawerForm.enclosure.concat(
            //         result.data
            //     )
            // );

            // _this.fileList = _this.deunique(
            //     _this.fileList.concat(result.data)
            // );
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },

    //删除
    deletefile(val, item) {
      if (val == "3") {
        this.jiezhiFrom.enclosure.splice(
          this.jiezhiFrom.enclosure.indexOf(item),
          1
        );
      } else if (val == "4") {
        this.personnelFrom.enclosure.splice(
          this.personnelFrom.enclosure.indexOf(item),
          1
        );
      }
    },
    // 与拉美盯盘文件

    lookfile(item) {
      const _this = this;
      _this.$axios
        .post("/dingding/GetDingPanFileID", {
          type: "download",

          fileids: item.fileId,
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
    showb1() {
      this.shows = 1;
    },
    showb2() {
      if (this.$route.query.spanItem.length == 1) {
        this.shows = 2;
      } else {
        Toast("借支审批只能选择一人");
      }
    },

    // //获取持证人员列表
    // getUserOrgList() {
    //     this.$axios.post('/zhengshu/GetUserOrgList').then((res) => {
    //         this.UserOrgList = res.data.content;
    //     });
    // }
  },
  activated() {
    this.$utils.checkding();
    this.setTitle();
    this.personnelFrom.ban_name = this.$store.state.userData.workitemdata.name;
    this.personnelFrom.riqi = this.$store.state.userData.spanTime;

    this.jiezhiFrom.ban_name = this.$store.state.userData.workitemdata.name;
    this.jiezhiFrom.riqi = this.$store.state.userData.spanTime;
    this.newjiezhiFrom.ban_name = this.$store.state.userData.workitemdata.name;
    this.newjiezhiFrom.riqi = this.$store.state.userData.spanTime;

    // this.timeriqi = this.$store.state.userData.spanTime;
    // this.ban_name = this.$store.state.userData.workitemdata.name;

    // this.getUserOrgList();

    if (this.$store.state.userData.shenpiList.length < 4) {
      this.allshow = false;
      this.newrenList = this.$store.state.userData.shenpiList;
    } else {
      this.allshow = true;
      this.newrenList = this.$store.state.userData.shenpiList.slice(-2);
    }

    if (this.$store.state.userData.chaosongList.length < 4) {
      this.chaosongshow = false;
      this.newcsList = this.$store.state.userData.chaosongList;
    } else {
      this.chaosongshow = true;
      this.newcsList = this.$store.state.userData.chaosongList.slice(-2);
    }
  },
  mounted() {
    var newspanItem = this.$route.query.spanItem;
    this.personnelFrom.participants = newspanItem.map((item) => {
      return item.name;
    });
    this.personnelFrom.participants_id = newspanItem.map((item) => {
      return item.id;
    });
    this.jiezhiFrom.participants = newspanItem.map((item) => {
      return item.name;
    })[0];
    this.jiezhiFrom.participants_id = newspanItem.map((item) => {
      return item.id;
    })[0];
    console.log(this.jiezhiFrom);
  },
};
</script>
<style lang='less' >
#Recordsp {
  .active {
    background-color: #fff !important;
    color: #1989fa !important;
  }
  .header {
    height: 4rem;
    background-color: #1989fa;
    display: flex;
    align-items: center;
    .alldiv {
      margin: auto;
      display: flex;

      width: 60%;
      height: 2rem;
      border: 0.1rem solid #fff;
      border-radius: 0.33rem;
      .alldiv_item {
        width: 50%;
        font-size: 1.2rem;
        color: #fff;
        text-align: center;
        line-height: 2rem;
      }
    }
  }

  .van-form {
    margin-bottom: 3.33rem;
    .addmx {
      line-height: 2.33rem;
      font-size: 0.93rem;
      text-align: center;
      color: #1989fa;
    }
    .mxtitle {
      line-height: 1.67rem;
      font-size: 0.93rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.33rem;
      padding: 0 0.5rem;
    }
    .van-tabs {
      .van-tabs__wrap {
        height: 3rem;
        margin-bottom: 0.5rem;
        .van-tabs__line {
          width: 40%;
          background-color: #1989fa;
        }
        .van-tab {
          font-size: 1.1rem;
          line-height: 3rem;
        }
      }
    }
  }
  .imgupload {
    margin-top: 0.67rem;
    .imgfont {
      margin-left: 0.67rem;
      margin-right: 0.67rem;
      font-size: 1rem;
      color: #646566;
      display: flex;
      justify-content: space-between;
      .imgfont1 {
        font-size: 0.83rem;
        color: #409efe;
      }
    }
    padding: 0.67rem 0;
    box-sizing: border-box;
    background-color: #fff;
    .upList {
      // margin-top: 0.67rem;
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
}
</style>

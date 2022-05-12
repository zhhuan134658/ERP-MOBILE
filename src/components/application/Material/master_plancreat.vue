<template>
  <!-- 新建人员证书申请 -->
  <div id="spcreat">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.name"
        name="计划主题"
        label="计划主题"
        placeholder="请填写计划主题"
        maxlength="20"
        :rules="[{ required: true }]"
      />

      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.project_name"
        name="所属项目"
        label="所属项目"
        placeholder="请填写所属项目"
        :rules="[{ required: true }]"
        @click="checkxm"
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
      <div v-for="(item, index) in personnelFrom.detailed">
        <div class="mxtitle">
          <div>借证明细( {{ index + 1 }} )</div>
          <div
            v-if="personnelFrom.detailed.length > 1"
            style="color: red"
            @click="delemx(item)"
          >
            删除
          </div>
        </div>
        <van-field
          style="margin-bottom: 0"
          class="zh_vant_isprop"
          readonly
          input-align="right"
          v-model="item.name"
          name="材料名称"
          label="材料名称"
          placeholder="请填写材料名称"
          maxlength="20"
          :rules="[{ required: true }]"
          @click="checkcailiao(index)"
        />
        <van-field
          style="margin-bottom: 0"
          class="zh_vant_isprop"
          readonly
          input-align="right"
          v-model="item.size"
          name="规格型号"
          label="规格型号"
          placeholder="请填写规格型号"
          maxlength="20"
          :rules="[{ required: true }]"
        />
        <van-field
          style="margin-bottom: 0"
          class="zh_vant_isprop"
          readonly
          input-align="right"
          v-model="item.unit"
          name="单位"
          label="单位"
          placeholder="请填写单位"
          maxlength="20"
          :rules="[{ required: true }]"
        />
        <van-field
          style="margin-bottom: 0"
          class="zh_vant_isprop"
          input-align="right"
          v-model="item.zh_number"
          name="总计划量"
          label="总计划量"
          placeholder="请填写总计划量"
          maxlength="20"
          :rules="[{ required: true }]"
        />

        <van-field
          style="margin-bottom: 0"
          input-align="right"
          v-model="item.position"
          name="使用部位"
          label="使用部位"
          placeholder="请填写使用部位"
          maxlength="20"
          :rules="[{ required: false }]"
        />

        <div class="muban" style="margin-bottom: 0">
          <div class="textarea">
            <van-field
              rows="1"
              show-word-limit
              type="textarea"
              input-align="right"
              maxlength="240"
              v-model="item.remarks"
              name="备注"
              label="备注"
              placeholder="请填写备注"
            />
          </div>
        </div>
      </div>

      <div class="addmx" @click="addmingxi">增加明细</div>
      <!-- 附件 -->
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
    <van-popup v-model="isshow" position="bottom">
      <van-datetime-picker
        v-model="starcurrentDate1"
        type="date"
        @confirm="gettime1"
        @cancel="close1"
      />
    </van-popup>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
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
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "spcreat",
  components: {},
  data() {
    return {
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
      typeList: [
        { name: "原件", id: "1" },
        { name: "电子件", id: "2" },
      ],
      newList: [{ name: "电子件", id: "2" }],
      mxitem: {
        name: "", //
        size: "", //规格型号
        unit: "", //单位
        zh_number: "",
        position: "",
        remarks: "", //备注
      },
      personnelFrom: {
        process_code: "",
        name: "", //计划名称
        project_name: "", //项目名称
        remarks: "",
        send_userid: this.$store.state.userData.userid,
        approval_userid: [], //审批人
        cc_userid: [], //抄送人
        enclosure: [],

        remarks: "", //用途

        detailed: [
          {
            name: "", //
            size: "", //规格型号
            unit: "", //单位
            zh_number: "",
            position: "",
            remarks: "", //备注
          },
        ],
      },
      newpersonnelFrom: {
        process_code: "",
        name: "", //计划名称
        project_name: "", //项目名称
        remarks: "",
        send_userid: this.$store.state.userData.userid,
        approval_userid: [], //审批人
        cc_userid: [], //抄送人
        enclosure: [],

        remarks: "", //用途

        detailed: [
          {
            name: "", //
            size: "", //规格型号
            unit: "", //单位
            zh_number: "",
            position: "",
            remarks: "", //备注
          },
        ],
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
    checkxm() {
      this.$router.push({ path: "/projectsp" });
    },
    checkcailiao(index) {
      this.mxindex = index;
      this.$router.push({ path: "/materiasp" });
    },
    //删除明细
    delemx(item) {
      this.personnelFrom.detailed.splice(
        this.personnelFrom.detailed.indexOf(item),
        1
      );
    },
    //增加明细
    addmingxi() {
      this.personnelFrom.detailed.push({
        name: "", //
        size: "", //规格型号
        unit: "", //单位
        zh_number: "",
        position: "",
        remarks: "", //备注
      });
      console.log(this.mxitem);
    },
    goall(val) {
      this.$router.push({
        path: "/allpeople",
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
    showPopup(val, index) {
      this.selectype = val;
      this.mxindex = index;

      if (val == 1) {
        this.selecval = "name";
        this.columns = this.ZhengShuXIaLaList;
      } else if (val == 2) {
        this.selecval = "name";

        if (this.listshow == "1") {
          this.columns = this.typeList;
        } else {
          this.columns = this.newList;
        }
        this.popupshow = true;
      } else if (val == 3 || val == 4) {
        this.selecval = "name";
        this.columns = this.issureList;
        this.popupshow = true;
      } else if (val == 9) {
        this.selecval = "name";
        this.columns = this.xmlist;

        if (this.xmlist.length == 0) {
          Toast("暂无数据");
        } else {
          this.popupshow = true;
        }
      }
    },
    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.personnelFrom.detailed[this.mxindex].name = value.name;
        this.personnelFrom.detailed[this.mxindex].size = value.size;
        this.personnelFrom.detailed[this.mxindex].unit = value.unit;
      } else if (this.selectype == 2) {
        this.personnelFrom.detailed[this.mxindex].xing = value.name;
      } else if (this.selectype == 3) {
        this.personnelFrom.detailed[this.mxindex].ya = value.name;
      } else if (this.selectype == 4) {
        this.personnelFrom.detailed[this.mxindex].suo = value.name;
      } else if (this.selectype == 9) {
        this.personnelFrom.project_name = value.name;
      }
      this.popupshow = false;
    },
    mxcancel() {
      if (this.selectype == 1) {
        // this.personnelFrom. = '';
        // this.personnelFrom.uname = '';
        // this.personnelFrom.zid = '';
        // this.personnelFrom.number = '';
      } else if (this.selectype == 2) {
        this.personnelFrom.detailed[this.mxindex].xing = "";
      } else if (this.selectype == 3) {
        this.personnelFrom.detailed[this.mxindex].ya = "";
      } else if (this.selectype == 4) {
        this.personnelFrom.detailed[this.mxindex].suo = "";
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
      } else if (this.valtime == "2") {
        this.enddata = value;
        if (this.enddata > this.startdata) {
          this.personnelFrom.riqi = resDate;
        } else {
          // alert('合同时间结束日期要在合同开始时间之后');
          Toast("时间结束日期要在开始时间之后");
        }
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
      if (this.shenpiList.length < 1) {
        Toast("请填写审批人");
      } else {
        this.personnelFrom.cc_userid = this.chaosongList;
        this.personnelFrom.approval_userid = this.shenpiList;
        this.$axios.post("/project/materialMasterPlan").then((res) => {
          if (res.data.code == 1) {
            this.personnelFrom.process_code = res.data.data;
            this.$axios
              .post("/projectfour/materialMasterPlanSp", this.personnelFrom)
              .then((res) => {
                if (res.data.code == 1) {
                  this.$router.go(-1);

                  this.$store.commit("setshenpiList", []);
                  this.$store.commit("setchaosongList", []);
                  this.personnelFrom = this.newpersonnelFrom;
                  Toast(res.data.msg);
                } else {
                  Toast(res.data.msg);
                }
              });
          }
        });
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
            if (_this.uptype == "1") {
              // _this.personnelFrom .ldenclosure = result.data;
              _this.personnelFrom.ldenclosure = _this.deunique(
                _this.personnelFrom.ldenclosure.concat(result.data)
              );
            } else if (_this.uptype == "4") {
              // _this.personnelFrom .enclosure = result.data;
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
      if (val == "1") {
        this.personnelFrom.ldenclosure.splice(
          this.personnelFrom.ldenclosure.indexOf(item),
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
    //获取证书
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

    this.personnelFrom.detailed[this.mxindex].name =
      this.$store.state.userData.spmateriadata.name;

    this.personnelFrom.detailed[this.mxindex].size =
      this.$store.state.userData.spmateriadata.size;

    this.personnelFrom.detailed[this.mxindex].unit =
      this.$store.state.userData.spmateriadata.unit;

    this.personnelFrom.project_name =
      this.$store.state.userData.spprojectdata.name; //项目名称

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
  mounted() {},
};
</script>
<style lang='less' >
#spcreat {
  .van-form {
    margin-bottom: 3.33rem;
    .addmx {
      background-color: #fff;
      border-top: 0.03rem solid #f3f6fd;
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
}
</style>

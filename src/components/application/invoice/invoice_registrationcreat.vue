<template>
  <!-- 开票登记 -->
  <div id="spcreat">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <van-field
        @click="showPopup(1)"
        readonly
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.xiangmu1"
        name="所属项目"
        label="所属项目"
        placeholder="请填写所属项目"
        :rules="[{ required: true }]"
      />
      <van-field
        @click="showPopup(2)"
        readonly
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.hetong1"
        name="合同名称"
        label="合同名称"
        placeholder="请填写合同名称"
        :rules="[{ required: true }]"
      />
      <van-field
        @click="showPopup(3)"
        readonly
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.shouipiao1"
        name="收票单位"
        label="收票单位"
        placeholder="请填写收票单位"
        :rules="[{ required: true }]"
      />
      <van-field
        @click="showPopup(4)"
        readonly
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.kaipoiao1"
        name="开票单位"
        label="开票单位"
        placeholder="请填写开票单位"
        :rules="[{ required: true }]"
      />
      <van-field
        @click="showPopup(5)"
        readonly
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.fapiao1"
        name="发票类型"
        label="发票类型"
        placeholder="请填写发票类型"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.fapiao2"
        name="发票号码"
        label="发票号码"
        placeholder="请填写发票号码"
        maxlength="40"
        :rules="[{ required: true }]"
      />
      <van-field
        type="number"
        class="zh_vant_isprop"
        style="margin-bottom: 0"
        input-align="right"
        onkeyup="this.value=this.value.replace(/\D/g,'')"
        v-model="personnelFrom.moneynum"
        name="发票金额"
        label="发票金额"
        placeholder="请填写发票金额"
        maxlength="50"
        :rules="[{ required: true }]"
      />
      <div class="moneyfont">
        <span style="color: #000">大写</span> {{ moneydata }}
      </div>
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.kaihu1"
        name="开户银行"
        label="开户银行"
        placeholder="请填写开户银行"
        maxlength="40"
        :rules="[{ required: true }]"
      />
      <van-field
        type="number"
        class="zh_vant_isprop"
        style="margin-bottom: 0"
        input-align="right"
        onkeyup="this.value=this.value.replace(/\D/g,'')"
        v-model="personnelFrom.kahao1"
        name="开户卡号"
        label="开户卡号"
        placeholder="请填写开户卡号"
        maxlength="40"
        :rules="[{ required: true }]"
      />
      <!-- 15454545454 -->
      <van-field
        class="zh_vant_isprop"
        readonly
        input-align="right"
        v-model="personnelFrom.plan_start_riqi"
        name="日期"
        label="日期"
        placeholder="请填写日期"
        :rules="[{ required: true }]"
        @click="settime(1)"
      />

      <div class="muban">
        <div class="textarea">
          <van-field
            rows="1"
            readonly
            @click="getmaps"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="240"
            v-model="personnelFrom.address"
            name="地址"
            label="地址"
            placeholder="请填写地址"
            :rules="[{ required: false }]"
          />
        </div>
      </div>

      <van-field
        readonly
        input-align="right"
        @click="addxmren"
        clickable
        v-model="personnelFrom.extend_five"
        name="填报人"
        label="填报人"
        placeholder="请填写填报人"
        :rules="[{ required: false }]"
      />

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
  </div>
</template>

<script>
import $ from "jquery";
import * as dd from "dingtalk-jsapi";
import addressData from "../../common/area.js";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "spcreat",
  components: {},
  data() {
    return {
      moneydata: "",
      reashow: false,
      areashow: false, //是否显示弹出层
      detailAddress: "", //绑定详细地址输入框
      areaList: addressData, //可选地址数据列表
      showAddr: "", //显示校区地址
      resAddr: "", //传给后端的位置信息
      changeFile: true,
      contactsUnit: [],
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
      projectInfoList: [],
      hetongInfoList: [],
      fapiaolist: [
        { name: "增值税专用发票", id: "1" },
        { name: "普通发票", id: "2" },
        { name: "收据", id: "3" },
      ],
      inInfoList: [],
      kaiInfoList: [],
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
      personnelFrom: {
        xiangmu1: "",
        hetong1: "",
        shouipiao1: "",
        kaipoiao1: "",
        fapiao1: "",
        fapiao2: "",
        kaihu1: "",
        kahao1: "",
        extend_five: "",

        moneynum: "",
        // 454555555

        name: "", //项目名称
        plan_start_riqi: "", //开始日期
        plan_end_riqi: "", // 结束日期,
        address: "", //项目地址,
        extend_three: "",
        procode: "",
        quantities: "", //工程规模
        make_cost: "", //工程造价
        expected_profit: "", //预期利润
        type: "", //项目类型
        quality_level: "", //质量等级
        stalker: "", //项目负责人 调用钉钉选人组件，单个人
        branch_office: "", //所属分公司
        project_status: "", //项目状态
        construction_unit: "", //建设单位
        contacts: "", //联系人
        contacts_mobile: "", //联系方式
        contacts_address: "", //联系地址
        extend_five: "", //项目成员 调用钉钉选人组件，多个人
        image: [], //图片
        enclosure: [], //附件
        id: "", //修改的项目id  修改操作时 传
        process_instance_id: "", //实例id  修改操作时 传
        approval_userid: [], //审批人
        cc_userid: [], //抄送人
        send_userid: this.$store.state.userData.userid,
      },
      newpersonnelFrom: {
        moneynum: "",
        name: "", //项目名称
        plan_start_riqi: "", //开始日期
        plan_end_riqi: "", // 结束日期,
        address: "", //项目地址,
        quantities: "", //工程规模
        make_cost: "", //工程造价
        expected_profit: "", //预期利润
        type: "", //项目类型
        quality_level: "", //质量等级
        stalker: "", //项目负责人 调用钉钉选人组件，单个人
        branch_office: "", //所属分公司
        project_status: "", //项目状态
        construction_unit: "", //建设单位
        contacts: "", //联系人
        contacts_mobile: "", //联系方式
        contacts_address: "", //联系地址
        extend_five: "", //项目成员 调用钉钉选人组件，多个人
        image: "", //图片
        enclosure: [], //附件
        id: "", //修改的项目id  修改操作时 传
        process_instance_id: "", //实例id  修改操作时 传
        approval_userid: [], //审批人
        cc_userid: [], //抄送人
        send_userid: this.$store.state.userData.userid,
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
    "personnelFrom.extend_five": {
      handler(val, oldval) {
        if (val.length > 3) {
          this.xmuname =
            val.slice(0, 3).map((item) => {
              return item.name;
            }) +
            "等" +
            val.length +
            "个人";
        } else {
          this.xmuname = val.map((item) => {
            return item.name;
          });
          this.xmuname = Object.assign(...this.xmuname);
        }
      },
    },
    "personnelFrom.procode": {
      handler(val, oldval) {
        if (val.length > 0) {
          this.newcode = val.substring(val.length - 6);
        } else {
          this.newcode = "110101";
        }
      },
    },
    "personnelFrom.moneynum": {
      handler(val, oldval) {
        if (val.length > 0) {
          this.moneydata = this.$utils.numberParseChina(val);
        } else {
          this.moneydata = "";
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
    //调用钉钉地图
    getmaps() {
      const _this = this;

      dd.ready(function () {
        dd.biz.map.locate({
          latitude: "", // 纬度，非必须
          longitude: "", // 经度，非必须
          scope: 500, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径
          onSuccess: function (result) {
            _this.personnelFrom.address =
              result.province +
              result.city +
              result.adName +
              result.snippet +
              result.title;
          },
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
      this.personnelFrom.extend_three = this.showAddr;
      this.personnelFrom.procode = this.showcode;
      console.log(this.personnelFrom.procode);

      console.log(this.resAddr, "即将传给后端的省市区信息");
    },
    // 选择框
    showPopup(val, index) {
      this.selectype = val;
      this.mxindex = index;

      if (val == 1) {
        this.selecval = "name";
        this.columns = this.projectInfoList;
        this.popupshow = true;
      } else if (val == 2) {
        this.selecval = "name";
        this.columns = this.hetongInfoList;
        this.popupshow = true;
      } else if (val == 3) {
        this.selecval = "name";
        this.columns = this.inInfoList;
        this.popupshow = true;
      } else if (val == 4) {
        this.selecval = "name";
        this.columns = this.kaiInfoList;
        this.popupshow = true;
      } else if (val == 5) {
        this.selecval = "name";
        this.columns = this.fapiaolist;
        this.popupshow = true;
      } else if (val == 9) {
        this.areashow = true;
      }
    },

    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.personnelFrom.xiangmu1 = value.name;
      } else if (this.selectype == 2) {
        this.personnelFrom.hetong1 = value.name;
      } else if (this.selectype == 3) {
        this.personnelFrom.shouipiao1 = value.name;
      } else if (this.selectype == 4) {
        this.personnelFrom.kaipoiao1 = value.name;
      } else if (this.selectype == 5) {
        this.personnelFrom.fapiao1 = value.name;
      }
      this.popupshow = false;
    },
    mxcancel() {
      if (this.selectype == 1) {
        this.personnelFrom.type = "";
      } else if (this.selectype == 2) {
        this.personnelFrom.project_status = "";
      } else if (this.selectype == 3) {
        this.personnelFrom.branch_office = "";
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
        this.personnelFrom.plan_start_riqi = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        if (this.enddata > this.startdata) {
          this.personnelFrom.plan_end_riqi = resDate;
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
      console.log(this.personnelFrom);
      if (this.shenpiList.length < 1) {
        Toast("请填写审批人");
      } else {
        this.personnelFrom.make_cost = this.personnelFrom.make_cost.replace(
          /,/g,
          ""
        );
        this.personnelFrom.expected_profit =
          this.personnelFrom.expected_profit.replace(/,/g, "");
        this.personnelFrom.send_userid = this.$store.state.userData.userid;

        delete this.personnelFrom.status;
        delete this.personnelFrom.number;
        delete this.personnelFrom.url;
        delete this.personnelFrom.created;

        this.personnelFrom.cc_userid = this.chaosongList;
        this.personnelFrom.approval_userid = this.shenpiList;
        this.$axios.post("/project/projectInfoRegister").then((res) => {
          if (res.data.code == 1) {
            this.personnelFrom.process_code = res.data.data;
            this.$axios
              .post("/projectfour/projectInfoRegisterSp", this.personnelFrom)
              .then((res) => {
                if (res.data.code == 1) {
                  this.personnelFrom = this.newpersonnelFrom;
                  this.$router.go(-1);

                  this.$store.commit("setshenpiList", []);
                  this.$store.commit("setchaosongList", []);

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
            that.personnelFrom.stalker = result.users[0];
          },
          onFail: function (err) {},
        });
      });
    },
    // 项目成员
    addxmren(value) {
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
            that.personnelFrom.extend_five = result.users;

            // if (result.users.length > 3) {
            //     that.xmuname =
            //         result.users.slice(0, 3).map((item) => {
            //             return item.name;
            //         }) +
            //         '等' +
            //         result.users.length +
            //         '个人';
            // } else {
            //     that.xmuname = result.users.map((item) => {
            //         return item.name;
            //     });
            //     that.xmuname = Object.assign(...that.xmuname);
            // }
            console.log(that.xmuname);
            console.log(that.xmuserid);
            console.log(result.users);
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
        .post("/dingding/getAuthUp", {
          type: "add",

          fileids: "",
        })
        .then((res) => {
          console.log(res.data.data);
          if (val == "1" || val == "2") {
            this.imguploadAtta(res.data.data.toString());
          } else if (val == "3" || val == "4") {
            this.imguploadAtta(res.data.data.toString());
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
        .post("/dingding/getAuthUp", {
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
    //获取分公司
    getcontactsUnit() {
      this.$axios
        .post("/projectfour/contactsUnit", { name: "所属分公司" })
        .then((res) => {
          this.contactsUnit = res.data.data;
        });
    },
    //金额格式化处理
    rmoney(s) {
      //转成string类型
      s = s + "";
      return parseFloat(s.replace(/[^\d\.-]/g, ""));
    },
    fmMoney(s, n) {
      var lose = ""; //负号
      if (s < 0) {
        //判断是否是负数
        s = (s + "").substring(1); //截取-号
        lose = "-";
      }
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
      t = "";
      for (var i = 0; i < l.length; i++) {
        var t;
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
      }
      return lose + "" + t.split("").reverse().join("") + "." + r; //拼接
    },
    zaojia1() {
      console.log("12345678163");
      if (this.personnelFrom.make_cost != "") {
        this.personnelFrom.make_cost = this.rmoney(
          this.personnelFrom.make_cost
        );
      }
    },
    zaojia2() {
      if (this.personnelFrom.make_cost != "") {
        this.personnelFrom.make_cost = this.fmMoney(
          this.personnelFrom.make_cost,
          2
        );
      }
    },
    lirun1() {
      console.log("12345678163");
      if (this.personnelFrom.expected_profit != "") {
        this.personnelFrom.expected_profit = this.rmoney(
          this.personnelFrom.expected_profit
        );
      }
    },
    lirun2() {
      if (this.personnelFrom.expected_profit != "") {
        this.personnelFrom.expected_profit = this.fmMoney(
          this.personnelFrom.expected_profit,
          2
        );
      }
    },
    //获取项目列表
    getproject() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.projectInfoList = res.data.data;
      });
    },
    //获取合同列表
    getproject() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.hetongInfoList = res.data.data;
      });
    },
    //获取收票单位列表
    getproject() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.inInfoList = res.data.data;
      });
    },
    //获取开票单位列表
    getproject() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.kaiInfoList = res.data.data;
      });
    },
  },
  activated() {
    this.$utils.checkding();
    this.setTitle();
    this.getcontactsUnit();
    this.getproject();

    if (
      this.$store.state.userData.cid ==
        "ding0ae1ff624a5a383e35c2f4657eb6378f" ||
      this.$store.state.userData.cid == "dinga090000f57c90b3eee0f45d8e4f7c288"
    ) {
      this.changeFile = false;
    } else {
      this.changeFile = true;
    }
    if (this.$route.query.val == 1) {
      this.personnelFrom = this.newpersonnelFrom;
      this.reashow = false;
    } else if (this.$route.query.val == 2) {
      this.personnelFrom = this.$route.query.item;
      this.reashow = true;
    }

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
.moneyfont {
  color: #999999;
  font-size: 0.5rem;
  margin-bottom: 0.66667rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #fff;
  line-height: 1.5rem;
  padding-left: 0.83rem;
}
.van-cell::after {
  border-bottom: 0;
}
</style>

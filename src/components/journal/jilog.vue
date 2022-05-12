<template>
  <!-- 机手日志 -->
  <div id="spcreat">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <!-- <van-field
                readonly
                @click="showPopup(2)"
                class="zh_vant_isprop"
                input-align="right"
                v-model="personnelFrom.project_name"
                name="所属项目"
                label="所属项目"
                placeholder="请填写所属项目"
                maxlength="40"
                :rules="[{ required: true }]"
            /> -->
      <van-field
        readonly
        @click="showPopup(2)"
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.project_name"
        name="所属项目"
        label="所属项目"
        placeholder="请选择"
        maxlength="40"
        :rules="[{ required: true }]"
      />
      <van-field
        @click="showPopup(1)"
        readonly
        input-align="right"
        clickable
        v-model="personnelFrom.weather"
        name="今日天气情况"
        label="今日天气情况"
        placeholder="请填写今日天气情况"
        :rules="[{ required: false }]"
      />

      <van-field
        class="zh_vant_isprop"
        readonly
        input-align="right"
        v-model="personnelFrom.now_date"
        name="日期"
        label="日期"
        placeholder="请选择日期"
        :rules="[{ required: true }]"
        @click="settime(1)"
      />
      <van-field
        input-align="right"
        clickable
        v-model="personnelFrom.productiontoday"
        name="今日生产情况"
        label="今日生产情况"
        placeholder="请填写今日生产情况"
        :rules="[{ required: false }]"
      />
      <van-field
        readonly
        @click="showPopup(5)"
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.quality_level"
        name="设备编号"
        label="设备编号"
        placeholder="请选择"
        maxlength="40"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.start_yl"
        type="number"
        name="上机剩余油量"
        label="上机剩余油量(升)"
        placeholder="请填写上机剩余油量"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.add_yl"
        type="number"
        name="今日添加油量"
        label="今日添加油量(升)"
        placeholder="请输入"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.end_yl"
        type="number"
        name="下机剩余油量"
        label="下机剩余油量(升)"
        placeholder="请填写下机剩余油量"
        :rules="[{ required: true }]"
      />
      <van-field
        disabled
        input-align="right"
        clickable
        v-model="personnelFrom.consume_yl"
        type="number"
        name="今日消耗油量"
        label="今日消耗油量(升)"
        placeholder="自动获取"
        :rules="[{ required: false }]"
      />
      <van-field
        disabled
        input-align="right"
        clickable
        v-model="personnelFrom.start_days"
        type="number"
        name="开工累计天数"
        label="开工累计天数"
        placeholder="自动获取"
        :rules="[{ required: false }]"
      />
      <van-field
        disabled
        input-align="right"
        clickable
        v-model="personnelFrom.today_wcgl"
        type="number"
        name="今日完成根量"
        label="今日完成根量"
        placeholder="自动获取"
        :rules="[{ required: false }]"
      />
      <van-field
        disabled
        input-align="right"
        clickable
        v-model="personnelFrom.today_wcms"
        type="number"
        name="今日完成米数"
        label="今日完成米数"
        placeholder="自动获取"
        :rules="[{ required: false }]"
      />
      <van-field
        disabled
        input-align="right"
        clickable
        v-model="personnelFrom.cumulative_wcgl"
        type="number"
        name="累计完成根量"
        label="累计完成根量"
        placeholder="自动获取"
        :rules="[{ required: false }]"
      />
      <van-field
        disabled
        input-align="right"
        clickable
        v-model="personnelFrom.cumulative_wcms"
        type="number"
        name="累计完成米数"
        label="累计完成米数"
        placeholder="自动获取"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="personnelFrom.tc_price"
        type="number"
        name="机长提成米单价"
        label="机长提成米单价(元/米)"
        placeholder="请填写机长提成米单价"
        :rules="[{ required: false }]"
      />
      <van-field
        disabled
        input-align="right"
        clickable
        v-model="personnelFrom.lj_tc"
        type="number"
        name="累计提成"
        label="累计提成(元)"
        placeholder="自动获取"
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

import { Toast } from "vant";
import qs from "qs";
export default {
  name: "spcreat",
  components: {},
  data() {
    return {
      shebelist: [],
      reashow: false,
      areashow: false, //是否显示弹出层
      detailAddress: "", //绑定详细地址输入框

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
      xmtype: [],
      xmstatus: [],
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
      weatherList: [
        { name: "晴天", value: "晴天" },
        { name: "大雨", value: "大雨" },
        { name: "小雨", value: "小雨" },
        { name: "下雪", value: "下雪" },
      ],
      priceStatus: [
        { name: "综合单价", value: "综合单价" },
        { name: "土层价", value: "土层价" },
        { name: "岩层价", value: "岩层价" },
        { name: "空孔价", value: "空孔价" },
      ],
      personnelFrom: {
        process_code: "",
        project_name: "",
        weather: "",
        now_date: "",
        productiontoday: "",
        start_yl: "",
        end_yl: "",
        add_yl: "",
        consume_yl: "",
        start_days: "",
        today_wcgl: "",
        today_wcms: "",
        cumulative_wcgl: "",
        cumulative_wcms: "",
        tc_price: "",
        lj_tc: "",
        enclosure: [],

        approval_userid: [],
        cc_userid: [],

        img: [],
      },
      newpersonnelFrom: {
        quality_level: "",
        process_code: "",
        project_name: "",
        weather: "",
        now_date: "",
        productiontoday: "",
        start_yl: "",
        end_yl: "",
        add_yl: "",
        consume_yl: "",
        start_days: "",
        today_wcgl: "",
        today_wcms: "",
        cumulative_wcgl: "",
        cumulative_wcms: "",
        tc_price: "",
        lj_tc: "",
        enclosure: [],

        approval_userid: [],
        cc_userid: [],

        img: [],
      },
    };
  },
  computed: {},
  watch: {
    personnelFrom: {
      handler(newValue, oldValue) {
        console.log(newValue);
        if (newValue.start_yl && newValue.end_yl && newValue.add_yl) {
          // this.personnelFrom.consume_yl =
          var aaa = Number(newValue.start_yl) + Number(newValue.add_yl);
          var bbb = Number(aaa) - Number(newValue.end_yl);
          console.log(bbb);
          this.personnelFrom.consume_yl = bbb;
          this.personnelFrom.lj_tc =
            newValue.cumulative_wcms * newValue.tc_price;
        }
      },
      deep: true,
    },
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
  },
  methods: {
    setTitle() {
      const _this = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "机手日志", //控制标题文本，空字符串表示显示默认文本
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
        this.columns = this.weatherList;
        this.popupshow = true;
      } else if (val == 2) {
        this.$router.replace({
          path: "/jixmlist",
          query: {
            type: "1",
          },
        });
        // this.selecval = 'name';
        // this.columns = this.contactsUnit;

        // this.popupshow = true;
      } else if (val == 5) {
        this.columns = this.shebelist;

        this.popupshow = true;
      }
    },
    prochange(value, valuedate) {
      console.log(value);
      const _this = this;
      _this.$axios
        .post("/finance/zdjssz", {
          project_name: value,
          tj_data: valuedate,
        })
        .then((res) => {
          _this.personnelFrom.start_days = res.data.list.start_days;
          _this.personnelFrom.today_wcgl = res.data.list.today_wcgl;
          _this.personnelFrom.today_wcms = res.data.list.today_wcms;
          _this.personnelFrom.cumulative_wcgl = res.data.list.cumulative_wcgl;

          _this.personnelFrom.cumulative_wcms = res.data.list.cumulative_wcms;
          _this.personnelFrom.lj_tc = res.data.list.lj_tc;
          _this.shebelist = res.data.list.quality_level;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.personnelFrom.weather = value.name;
        this.personnelFrom.quality_level = "";
      } else if (this.selectype == 2) {
        this.personnelFrom.project_name = value.name;
        this.prochange(value.name, this.personnelFrom.now_date);
      } else if (this.selectype == 5) {
        this.personnelFrom.quality_level = value;
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
        this.personnelFrom.now_date = resDate;
        this.startdata = value;
        this.prochange(this.personnelFrom.project_name, resDate);
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
      this.$axios.post("/finance/machinistlog").then((res) => {
        this.personnelFrom.process_code = res.data.data;
        if (this.shenpiList.length < 1) {
          Toast("请填写审批人");
        } else {
          this.personnelFrom.cc_userid = this.chaosongList;
          this.personnelFrom.approval_userid = this.shenpiList;

          this.$axios
            .post("/finance/jzmouldadd", this.personnelFrom)
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
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: that.xmuserid, //已选用户
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
            that.xmuserid = result.users.map((item) => {
              return item.emplId;
            });

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
    //获取项目
    getcontactsUnit() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
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
  },
  activated() {
    this.$utils.checkding();
    this.setTitle();
    this.getcontactsUnit();
    // this.xmtype = this.$utils.utilProjectStatus().splice(1);
    this.xmtype = this.$store.state.userData.typeDtat.splice(1);
    // this.xmstatus = this.$utils.utilProjectStatus1();
    this.xmstatus = this.$store.state.userData.statusDtat;
    if (
      this.$store.state.userData.cid ==
        "ding0ae1ff624a5a383e35c2f4657eb6378f" ||
      this.$store.state.userData.cid == "dinga090000f57c90b3eee0f45d8e4f7c288"
    ) {
      this.changeFile = false;
    } else {
      this.changeFile = true;
    }
    console.log("1++", this.$route.query.pro_data);
    if (this.$route.query.pro_data) {
      this.personnelFrom.project_name = this.$route.query.pro_data.project_name;
      this.prochange(
        this.$route.query.pro_data.project_name,
        this.personnelFrom.now_date
      );
    } else {
      this.personnelFrom.project_name = "";
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
</style>

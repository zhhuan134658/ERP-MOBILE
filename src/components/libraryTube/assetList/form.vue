<template>
  <!-- 项目立项 -->
  <div id="spcreat">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
      style="margin-bottom: 100px"
    >
      <van-field
        input-align="right"
        v-model="addUserForm.lyusername"
        name="人员姓名"
        label="人员姓名"
        placeholder="请填写人员姓名"
        maxlength="40"
        :rules="[{ required: false }]"
      />
      <van-field
        @click="showPopup(1)"
        readonly
        input-align="right"
        clickable
        v-model="addUserForm.xmname"
        name="使用项目"
        label="使用项目"
        placeholder="请填写使用项目"
        :rules="[{ required: false }]"
      />
      <van-field
        @click="showPopup(2)"
        readonly
        input-align="right"
        clickable
        v-model="addUserForm.syorgname"
        name="使用部门"
        label="使用部门"
        placeholder="请填写使用部门"
        :rules="[{ required: false }]"
      />

      <van-field
        readonly
        input-align="right"
        v-model="addUserForm.lytime"
        name="领用日期"
        label="领用日期"
        placeholder="请填写领用日期"
        :rules="[{ required: false }]"
        @click="settime(1)"
      />

      <van-field
        input-align="right"
        v-model="addUserForm.zznumber"
        name="资产编码"
        label="资产编码"
        placeholder="请填写资产编码"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.name"
        name="资产名称"
        label="资产名称"
        placeholder="请填写资产名称"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        v-model="addUserForm.type"
        name="资产分类"
        label="资产分类"
        placeholder="请填写资产分类"
        :rules="[{ required: false }]"
        @click="typeTree('type')"
      />
      <van-field
        @click="addoneren"
        readonly
        input-align="right"
        v-model="addUserForm.adminuser"
        name="管理员"
        label="管理员"
        placeholder="请填写管理员"
        :rules="[{ required: false }]"
      />

      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.brand"
        name="品牌"
        label="品牌"
        placeholder="请填写品牌"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.model"
        name="型号"
        label="型号"
        placeholder="请填写型号"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.chengzuorg"
        name="所属/承租公司"
        label="所属/承租公司"
        placeholder="请填写所属/承租公司"
        :rules="[{ required: false }]"
      />
      <!--以上必填 -->
      <van-field
        @click="showPopup(3)"
        readonly
        input-align="right"
        clickable
        v-model="addUserForm.usestatus"
        name="使用状态"
        label="使用状态"
        placeholder="请填写使用状态"
        :rules="[{ required: false }]"
      />
      <van-field
        @click="typeTree('adress')"
        input-align="right"
        clickable
        readonly
        v-model="addUserForm.address"
        name="所在位置"
        label="所在位置"
        placeholder="请填写所在位置"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.expectancy"
        name="预计使用期限"
        label="预计使用期限"
        placeholder="请填写预计使用期限"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.money"
        name="金额"
        label="金额"
        placeholder="请填写金额"
        :rules="[{ required: false }]"
      />
      <van-field
        readonly
        input-align="right"
        v-model="addUserForm.starttime"
        name="购置/起购时间"
        label="购置/起购时间"
        placeholder="请填写购置/起购时间"
        :rules="[{ required: false }]"
        @click="settime(2)"
      />

      <van-field
        input-align="right"
        @click="showPopup(4)"
        readonly
        clickable
        v-model="addUserForm.shoptype"
        name="购置方式"
        label="购置方式"
        placeholder="请填写购置方式"
        :rules="[{ required: false }]"
      />

      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.orderid"
        name="订单号"
        label="订单号"
        placeholder="请填写订单号"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.measuring"
        name="计量单位"
        label="计量单位"
        placeholder="请填写计量单位"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.suppliernumber"
        name="供应商编码"
        label="供应商编码"
        placeholder="请填写供应商编码"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.weishuimoney"
        name="未含税金额"
        label="未含税金额"
        placeholder="请填写未含税金额"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.remark"
        name="备注"
        label="备注"
        placeholder="请填写备注"
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
            v-for="(item, index) in addUserForm.enclosure"
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
        </div>
      </div>
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.shsn"
        name="设备序列号"
        label="设备序列号"
        placeholder="请填写设备序列号"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.suppliername"
        name="供应商"
        label="供应商"
        placeholder="请填写供应商"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.supplieruser"
        name="联系人"
        label="联系人"
        placeholder="请填写联系人"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.supplierphone"
        name="联系方式"
        label="联系方式"
        placeholder="请填写联系方式"
        :rules="[{ required: false }]"
      />

      <van-field
        readonly
        input-align="right"
        v-model="addUserForm.wbstoptime"
        name="维保到期时间"
        label="维保到期时间"
        placeholder="请填写维保到期时间"
        :rules="[{ required: false }]"
        @click="settime(1)"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.wbcount"
        name="维修次数"
        label="维修次数"
        placeholder="请填写维修次数"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.wbmoney"
        name="维修金额合计"
        label="维修金额合计"
        placeholder="请填写维修金额合计"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="addUserForm.wbremark"
        name="维保说明"
        label="维保说明"
        placeholder="请填写维保说明"
        :rules="[{ required: false }]"
      />

      <div class="sureBtn">
        <van-button :loading="loading" native-type="submit" type="info"
          >提 交</van-button
        >
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
    <!--树状  -->
    <van-popup v-model="treeShow" position="bottom" :style="{ height: '30%' }">
      <el-tree
        :data="treeList"
        show-checkbox
        :default-expand-all="false"
        :expand-on-click-node="false"
        node-key="id"
        ref="ftree"
        highlight-current
        check-strictly
        :props="defaultProps"
        @check="handleNewAddClick"
      >
      </el-tree>
    </van-popup>
  </div>
</template>

<script>
import $ from "jquery";
import * as dd from "dingtalk-jsapi";
import addressData from "../../common/area.js";
import newUpload from "../../common/newUpload.vue";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "spcreat",
  components: { newUpload },
  data() {
    return {
      gouList: [
        {
          name: "采购",
        },
        {
          name: "内购",
        },
        {
          name: "租赁",
        },
        {
          name: "自建",
        },
        {
          name: "盘盈",
        },
        {
          name: "接受投资",
        },
        {
          name: "接受捐赠",
        },
        {
          name: "其他",
        },
      ],
      usertypelist: [{ name: "正常" }, { name: "故障" }, { name: "维修中" }],
      noLastList: [],
      LastList: [],
      treeList: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      treeShow: false,
      allProjectList: [],
      allSupplier: [],
      isShow: [],
      upImgList: [],
      licenceImg: [],
      loading: false,
      newall: {
        tmpname: "全部",
        value: "全部",
      },
      reashow: false,
      areashow: false, //是否显示弹出层
      detailAddress: "", //绑定详细地址输入框
      areaList: addressData, //可选地址数据列表
      showAddr: "", //显示校区地址
      resAddr: "", //传给后端的位置信息
      changeFile: true,
      contactsUnit: [],
      contactsjiaUnit: [],
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
      priceStatus: [
        { name: "综合单价", value: "综合单价" },
        { name: "土层价", value: "土层价" },
        { name: "岩层价", value: "岩层价" },
        { name: "空孔价", value: "空孔价" },
      ],
      addUserForm: {
        corp_id: "", //企业ID
        zznumber: "", //
        xmid: "", //项目id
        xmname: "",
        name: "", //资质名称
        type: "", //资质分类
        adminuser: "", //管理员
        adminusername: "",
        brand: "", //品牌
        model: "", //型号
        chengzuorg: "", //所属/承租公司
        usestatus: "", //使用状况
        address: "", //所在位置
        expectancy: "", //预计使用期限
        money: "", //金额
        starttime: "", //购置/起租日期
        shoptype: "", //购置方式
        orderid: "", //订单号
        measuring: "", //计量单位
        suppliernumber: "", //供应商编码
        weishuimoney: "", //金额
        remark: "", //备注
        asseturl: "", //资产图片
        shsn: "", //设备序列号
        extendcontent: "", //扩展信息
        wbstoptime: "", //维保到期时间
        wbremark: "", //维保说明
        qianziurl: "", //签字图片
        lynumber: "", //领用单号
        lytype: "", //领用类型
        squserid: "", //申请人
        lyuserid: "", //领用人
        lyusername: "", //领用人
        lytime: "", //领用日期
        cluserid: "", //处理人
        syorgid: "", //使用部门
        syorgname: "",
        lyremark: "", //领用备注
        sptime: "", //申请时间
        pftime: "", //派发时间
        qrlytime: "", //确认领用时间
        suppliername: "", //供应商名称
        supplieruser: "", //供应商联系人
        supplierphone: "", //供应商联系人电话
        wbcount: "", //维修次数
        wbmoney: "", //维修金额合计
      },
      valNmae: "",
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
    "addUserForm.extend_five": {
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
    "addUserForm.procode": {
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
          title: _this.$store.state.userData.titledata.name, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
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
      this.addUserForm.extend_three = this.showAddr;
      this.addUserForm.procode = this.showcode;
      console.log(this.addUserForm.procode);

      console.log(this.resAddr, "即将传给后端的省市区信息");
    },
    typeTree(val) {
      this.treeShow = true;

      this.valNmae = val;
      if (val == "type") {
        this.treeList = this.noLastList;
      } else {
        this.treeList = this.LastList;
      }
      this.$refs.ftree.setCheckedKeys([]);
    },
    handleNewAddClick(a) {
      if (this.valNmae == "type") {
        this.addUserForm.type = a.name;
      } else {
        this.addUserForm.address = a.name;
      }

      //   this.addUserForm.extend_two = a.all_fid;
      console.log(this.addUserForm);
      this.treeShow = false;
    },
    // 选择框
    showPopup(val, index) {
      this.selectype = val;
      this.mxindex = index;

      if (val == 1) {
        this.selecval = "name";
        this.columns = this.allProjectList;
        this.popupshow = true;
      } else if (val == 2) {
        this.selecval = "name";
        this.columns = this.allSupplier;
        this.popupshow = true;
      } else if (val == 3) {
        this.selecval = "name";
        this.columns = this.usertypelist;
        this.popupshow = true;
      } else if (val == 4) {
        this.selecval = "name";
        this.columns = this.gouList;
        this.popupshow = true;
      } else if (val == 9) {
        this.areashow = true;
      } else if (val == 10) {
        this.selecval = "name";
        this.columns = this.priceStatus;
        this.popupshow = true;
      }
    },

    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.addUserForm.xmid = value.id;
        this.addUserForm.xmname = value.name;
      } else if (this.selectype == 2) {
        this.addUserForm.syorgid = value.id;
        this.addUserForm.syorgname = value.name;
      } else if (this.selectype == 3) {
        this.addUserForm.usestatus = value.name;
      } else if (this.selectype == 4) {
        this.addUserForm.shoptype = value.name;
      } else if (this.selectype == 10) {
        this.addUserForm.price_type = value.name;
      }
      this.popupshow = false;
    },
    mxcancel() {
      if (this.selectype == 1) {
        this.addUserForm.type = "";
      } else if (this.selectype == 2) {
        this.addUserForm.project_status = "";
      } else if (this.selectype == 3) {
        this.addUserForm.branch_office = "";
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

      if (this.valtime == "1") {
        this.addUserForm.lytime = resDate;
      } else if (this.valtime == "2") {
        this.addUserForm.starttime = resDate;
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
      console.log(this.addUserForm);

      this.$axios
        .post("/erp_check/assetcreatedadd", this.addUserForm)
        .then((res) => {
          if (res.data.code == 1) {
            this.addUserForm = this.newaddUserForm;

            Toast(res.data.msg);
            this.$router.go(-1);
          } else {
            Toast(res.data.msg);
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
            that.addUserForm.adminusername = result.users[0].name;
            that.addUserForm.adminuser = result.users[0].empId;
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
            that.addUserForm.extend_five = result.users;
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
              // _this.addUserForm .ldenclosure = result.data;
              _this.addUserForm.ldenclosure = _this.deunique(
                _this.addUserForm.ldenclosure.concat(result.data)
              );
            } else if (_this.uptype == "4") {
              // _this.addUserForm .enclosure = result.data;
              _this.addUserForm.enclosure = _this.deunique(
                _this.addUserForm.enclosure.concat(result.data)
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
        this.addUserForm.ldenclosure.splice(
          this.addUserForm.ldenclosure.indexOf(item),
          1
        );
      } else if (val == "4") {
        this.addUserForm.enclosure.splice(
          this.addUserForm.enclosure.indexOf(item),
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

    changeKeys(arr, key) {
      let newArr = [];
      arr.forEach((item) => {
        let obj = {};
        for (var i = 0; i < key.length; i++) {
          obj[key[i]] = item[Object.keys(item)[i]];
        }
        newArr.push(obj);
      });
      return newArr;
    },
    //获取项目类型
    getxmtype() {
      this.$axios.post("/spread/projectType").then((res) => {
        let newarr = this.changeKeys(res.data.data, ["tmpname", "value"]);
        newarr.unshift(this.newall);
        newarr.map((item) => {
          return item.tmpname;
        });

        this.xmtype = newarr.splice(1);
        // this.$store.commit('settypeDtat', newarr);
        console.log(newarr);
      });
    },

    getBasicList() {
      this.$axios
        .post("/erp_check/assetxilatypelist", {
          corp_id: this.$store.state.userData.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.noLastList = [
              {
                id: 0,
                pid: "0",
                name: "资产分类",
                children: res.data.content,
              },
            ];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$axios
        .post("/erp_check/addressxilatypelist", {
          corp_id: this.$store.state.userData.cid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.LastList = [
              {
                id: 0,
                pid: "0",
                name: "资产位置",
                children: res.data.content,
              },
            ];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  activated() {
    this.$utils.checkding();

    this.$utils.commonAllPro().then((res) => {
      this.allProjectList = res;
      console.log("9999", res);
    });
    this.$utils.commonAlltouSupplier().then((res) => {
      this.allSupplier = res;
      console.log("9999", res);
    });
    this.getBasicList();
  },
  mounted() {},
};
</script>
<style lang='less' >
.newUpload {
  padding-bottom: 1.67rem;
  background-color: #fff;
  .newUpload_item {
    line-height: 2.33333rem;
    width: 100%;
    font-size: 1rem;
    padding-left: 1rem;
    height: 2.33333rem;
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
</style>

<template>
  <!-- 项目立项 -->
  <div id="spcreat">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <van-field
        :readonly="reashow"
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.name"
        name="项目名称"
        label="项目名称"
        placeholder="请填写项目名称"
        maxlength="40"
        :rules="[{ required: true }]"
      />
      <van-field
        @click="showPopup(1)"
        readonly
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.type"
        name="项目类型"
        label="项目类型"
        placeholder="请填写项目类型"
        :rules="[{ required: true }]"
      />

      <van-field
        class="zh_vant_isprop"
        readonly
        input-align="right"
        v-model="personnelFrom.plan_start_riqi"
        name="计划开工日期"
        label="计划开工日期"
        placeholder="请填写计划开工日期"
        :rules="[{ required: true }]"
        @click="settime(1)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.plan_end_riqi"
        name="计划竣工日期"
        readonly
        label="计划竣工日期"
        placeholder="请填写计划竣工日期"
        :rules="[{ required: true }]"
        @click="settime(2)"
      />
      <van-field
        @click="showPopup(2)"
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.project_status"
        name="项目状态"
        label="项目状态"
        placeholder="请填写项目状态"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        @click="addoneren"
        v-model="personnelFrom.stalker_ext.name"
        name="项目负责人"
        label="项目负责人"
        placeholder="请填写项目负责人"
        :rules="[{ required: true }]"
      />
      <van-field
        readonly
        class="zh_vant_isprop"
        input-align="right"
        @click="showPopup(9)"
        v-model="personnelFrom.extend_three"
        name="项目位置"
        label="项目位置"
        placeholder="请填写项目位置"
        :rules="[{ required: true }]"
      />
      <!-- <van-field
                readonly
                class="zh_vant_isprop"
                input-align="right"
                @click="getmaps"
                v-model="personnelFrom.address"
                name="项目位置"
                label="项目位置(只返回省-市-县/区)"
                placeholder="请填写项目位置"
                :rules="[
                              { required: false }
                            ]"
            /> -->
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
            name="项目详细地址"
            label="项目详细地址"
            placeholder="请填写项目详细地址"
            :rules="[{ required: false }]"
          />
        </div>
      </div>
      <!-- <van-field
                readonly
                class="zh_vant_isprop"
                input-align="right"
                v-model="personnelFrom.province"
                name="项目位置"
                label="项目位置"
                placeholder="请填写项目位置"
                :rules="[
                            { required: false }
                        ]"
            /> -->
      <!-- id="money" -->
      <van-field
        onkeyup="this.value=this.value.replace(/\D/g,'')"
        @focus="zaojia1"
        @blur="zaojia2"
        class="zh_vant_isprop"
        input-align="right"
        clickable
        v-model="personnelFrom.make_cost"
        name="工程造价(元)"
        label="工程造价(元)"
        placeholder="请填写工程造价(元)"
        :rules="[{ required: true }]"
      />

      <!--以上必填 -->
      <van-field
        input-align="right"
        clickable
        v-model="personnelFrom.quantities"
        name="工程规模"
        label="工程规模"
        placeholder="请填写工程规模"
        :rules="[{ required: false }]"
      />
      <van-field
        onkeyup="this.value=this.value.replace(/\D/g,'')"
        input-align="right"
        @focus="lirun1"
        @blur="lirun2"
        clickable
        id="money1"
        v-model="personnelFrom.expected_profit"
        name="预期利润(元)"
        label="预期利润(元)"
        placeholder="请填写预期利润(元)"
        :rules="[{ required: false }]"
      />

      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.quality_level"
        :label="
          $store.state.userData.cid == 'ding958cdfb717ce33bb35c2f4657eb6378f'
            ? '设备编号'
            : $store.state.userData.cid ==
              'ding1a9d6aa4c63dfb99ffe93478753d9884'
            ? '设备编号'
            : $store.state.userData.cid ==
              'dingb6f8d3afc6d3c2d024f2f5cc6abecb85'
            ? '设备编号'
            : '质量等级'
        "
        placeholder="请填写"
        :rules="[{ required: true }]"
      />
      <van-field
        v-if="changeFile"
        @click="showPopup(3)"
        readonly
        input-align="right"
        clickable
        v-model="personnelFrom.branch_office"
        name="所属分公司"
        label="所属分公司"
        placeholder="请填写所属分公司"
        :rules="[{ required: false }]"
      />
      <van-field
        v-else
        @click="showPopup(3)"
        readonly
        input-align="right"
        clickable
        v-model="personnelFrom.branch_office"
        name="施工单位"
        label="施工单位"
        placeholder="请填写施工单位"
        :rules="[{ required: false }]"
      />

      <van-field
        v-if="changeFile"
        input-align="right"
        clickable
        v-model="personnelFrom.construction_unit"
        name="建设单位"
        label="建设单位"
        placeholder="请填写建设单位"
        :rules="[{ required: false }]"
      />
      <van-field
        v-else
        input-align="right"
        clickable
        v-model="personnelFrom.construction_unit"
        name="委托单位"
        label="委托单位"
        placeholder="请填写委托单位"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="personnelFrom.contacts"
        name="联系人"
        label="联系人"
        placeholder="请填写联系人"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        clickable
        v-model="personnelFrom.contacts_mobile"
        name="联系方式"
        label="联系方式"
        placeholder="请填写联系方式"
        :rules="[{ required: false }]"
      />
      <div class="muban">
        <div class="textarea">
          <van-field
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="240"
            v-model="personnelFrom.contacts_address"
            name="联系地址"
            :label="
              $store.state.cid == 'ding5ce1bcef4579bcdf35c2f4657eb6378f'
                ? '合同金额'
                : '联系地址'
            "
            placeholder="请填写"
            :rules="[{ required: false }]"
          />
        </div>
      </div>
      <!-- <van-field
                v-if="
                    $store.state.userData.cid ==
                        'ding1a9d6aa4c63dfb99ffe93478753d9884' ||
                    $store.state.userData.cid ==
                        'ding958cdfb717ce33bb35c2f4657eb6378f'
                "
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                input-align="right"
                clickable
                v-model="personnelFrom.price"
                name="单价(元)"
                label="单价(元)"
                placeholder="请填写单价(元)"
                :rules="[{ required: false }]"
            />
            <van-field
                v-if="
                    $store.state.userData.cid ==
                        'ding1a9d6aa4c63dfb99ffe93478753d9884' ||
                    $store.state.userData.cid ==
                        'ding958cdfb717ce33bb35c2f4657eb6378f'
                "
                @click="showPopup(10)"
                readonly
                input-align="right"
                clickable
                v-model="personnelFrom.price_type"
                name="单价类型"
                label="单价类型"
                placeholder="请填写单价类型"
                :rules="[{ required: true }]"
            /> -->
      <van-field
        v-if="changeFile"
        readonly
        input-align="right"
        @click="addxmren"
        clickable
        v-model="xmuname"
        name="项目成员"
        label="项目成员"
        placeholder="请填写项目成员"
        :rules="[{ required: false }]"
      />
      <van-field
        v-else
        readonly
        input-align="right"
        @click="addxmren"
        clickable
        v-model="xmuname"
        name="项目成员"
        label="项目成员"
        placeholder="请填写项目成员"
        :rules="[{ required: false }]"
      />
      <div class="newUpload">
        <div class="newUpload_item">
          <span>上传</span>
        </div>
        <newUpload
          @listenToChildEvent="imgshow"
          @zifunc="getzifunc"
          :upImgList="upImgList"
          :licenceImg="licenceImg"
          :isShow="isShow"
        ></newUpload>
      </div>
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
      personnelFrom: {
        // price: '',
        // price_type: '',
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
        stalker_ext: "", //项目负责人 调用钉钉选人组件，单个人
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
        name: "", //项目名称
        plan_start_riqi: "", //开始日期
        plan_end_riqi: "", // 结束日期,
        address: "", //项目地址,
        quantities: "", //工程规模
        make_cost: "", //工程造价
        expected_profit: "", //预期利润
        type: "", //项目类型
        quality_level: "", //质量等级
        stalker_ext: "", //项目负责人 调用钉钉选人组件，单个人
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
    getzifunc(data) {
      console.log("sadasda", data);
      // this.ceshidata = data;
    },
    imgshow(data) {
      this.personnelFrom.image = data;
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
        this.selecval = "tmpname";
        this.columns = this.xmtype;
        this.popupshow = true;
      } else if (val == 2) {
        this.selecval = "name";
        this.columns = this.xmstatus;
        this.popupshow = true;
      } else if (val == 3) {
        this.selecval = "name";
        this.columns = this.contactsUnit;
        this.popupshow = true;
      } else if (val == 4) {
        this.selecval = "name";
        this.columns = this.contactsjiaUnit;
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
        this.personnelFrom.type = value.tmpname;
      } else if (this.selectype == 2) {
        this.personnelFrom.project_status = value.name;
      } else if (this.selectype == 3) {
        this.personnelFrom.branch_office = value.name;
      } else if (this.selectype == 4) {
        this.personnelFrom.construction_unit = value.name;
      } else if (this.selectype == 10) {
        this.personnelFrom.price_type = value.name;
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
        this.loading = true;
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

                  this.loading = false;
                  this.$store.commit("setshenpiList", []);
                  this.$store.commit("setchaosongList", []);

                  Toast(res.data.msg);
                  this.$router.go(-1);
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
            that.personnelFrom.stalker_ext = result.users[0];
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
    //获取分公司
    getcontactsUnit() {
      this.$axios
        .post("/projectfour/contactsUnit", { name: "内部单位" })
        .then((res) => {
          this.contactsUnit = res.data.data;
        });
    },
    //获取分公司
    getcontactsjiaUnit() {
      this.$axios
        .post("/projectfour/contactsUnit", { name: "甲方单位" })
        .then((res) => {
          this.contactsjiaUnit = res.data.data;
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
    //获取项目状态
    getxmstatus() {
      this.$axios.post("/spread/projectStatus").then((res) => {
        // this.$store.commit('setstatusDtat', res.data.data);
        this.xmstatus = res.data.data;
      });
    },
  },
  activated() {
    this.$utils.checkding();
    this.setTitle();
    this.getcontactsUnit();
    this.getcontactsjiaUnit();
    // this.xmtype = this.$utils.utilProjectStatus().splice(1);
    this.getxmtype();
    this.getxmstatus();
    // this.xmstatus = this.$utils.utilProjectStatus1();
    // this.xmstatus = this.$store.state.userData.statusDtat;
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
</style>

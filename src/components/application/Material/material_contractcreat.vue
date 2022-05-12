<template>
  <!-- 采购合同订单 -->
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
        v-model="personnelFrom.xmname"
        name="合同名称"
        label="合同名称"
        placeholder="请填写合同名称"
        maxlength="20"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.xmname"
        name="合同编号"
        label="合同编号"
        placeholder="请填写合同编号"
        maxlength="20"
        :rules="[{ required: true }]"
      />
      <van-field
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.qttime"
        name="签约时间"
        label="签约时间"
        placeholder="请填写签约时间"
        :rules="[{ required: false }]"
        @click="settime(3)"
      />
      <div class="relation">
        <div class="relation_title">
          <div>
            关联采购申请
            <span style="color: #bfc0c1; font-size: 0.33rem">
              请选择 (可多选)</span
            >
          </div>
          <div style="color: #4199fe">选择</div>
        </div>

        <div class="listcontent">
          <div class="list_item">
            <img
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yMTmKxNDaZ1614154849110.png"
              alt=""
            />

            <div class="list_title">张欢欢提交的工程检查</div>
            <div class="list_type" style="color: rgb(230, 162, 60)">审批中</div>
            <!-- <div
                            class="list_type"
                            style="color:rgb(103, 194, 58)"
                        >已同意</div>
                        <div
                            class="list_type"
                            style="color:#67c23a"
                        >已拒绝</div> -->

            <img
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/pASNehHbxM1614155352183.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.userDeptname"
        name="所属项目"
        label="所属项目"
        placeholder="请填写所属项目"
        :rules="[{ required: true }]"
        @click="showPopup(9, 9)"
      />
      <van-field
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.starttime"
        name="开始日期"
        label="开始日期"
        placeholder="请填写开始日期"
        :rules="[{ required: false, message: '请填写开始日期' }]"
        @click="settime(1)"
      />
      <van-field
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.stoptime"
        name="结束日期"
        label="结束日期"
        placeholder="请填写结束日期"
        :rules="[{ required: false, message: '请填写结束日期' }]"
        @click="settime(2)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.xmname"
        name="合同金额"
        label="合同金额"
        placeholder="请填写合同金额"
        maxlength="20"
        :rules="[{ required: true }]"
      />
      <van-field
        input-align="right"
        v-model="personnelFrom.xmname"
        name="预付款"
        label="预付款"
        placeholder="请填写预付款"
        maxlength="20"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        v-model="personnelFrom.xmname"
        name="保证金"
        label="保证金"
        placeholder="请填写保证金"
        maxlength="20"
        :rules="[{ required: false }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.userDeptname"
        name="供应商"
        label="供应商"
        placeholder="请填写供应商"
        :rules="[{ required: true }]"
        @click="showPopup(10, 9)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.xmname"
        name="供应商签约人"
        label="供应商签约人"
        placeholder="请填写供应商签约人"
        maxlength="20"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.zengzhi"
        name="是否增值税"
        label="是否增值税"
        placeholder="请填写是否增值税"
        :rules="[{ required: true }]"
        @click="showPopup(11, 9)"
      />

      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.zhifu"
        name="支付类型"
        label="支付类型"
        placeholder="请填写支付类型"
        :rules="[{ required: true }]"
        @click="showPopup(12, 9)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.jiesuan"
        name="结算方式"
        label="结算方式"
        placeholder="请填写结算方式"
        :rules="[{ required: true }]"
        @click="showPopup(13, 9)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.jiaohuo"
        name="交货方式"
        label="交货方式"
        placeholder="请填写交货方式"
        :rules="[{ required: true }]"
        @click="showPopup(14, 9)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.xmname"
        name="签约地点"
        label="签约地点"
        placeholder="请填写签约地点"
        maxlength="50"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        readonly
        input-align="right"
        v-model="personnelFrom.woname"
        name="我方签约人"
        label="我方签约人"
        placeholder="请填写我方签约人"
        maxlength="50"
        @click="adddanren(1)"
        :rules="[{ required: true }]"
      />
      <div class="muban">
        <div class="textarea">
          <van-field
            class="zh_vant_isprop"
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="240"
            v-model="personnelFrom.remarks"
            name="付款条件"
            label="付款条件"
            placeholder="请填写付款条件"
            :rules="[{ required: true }]"
          />
        </div>
      </div>
      <div class="muban">
        <div class="textarea">
          <van-field
            class="zh_vant_isprop"
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="240"
            v-model="personnelFrom.remarks"
            name="主要条款"
            label="主要条款"
            placeholder="请填写主要条款"
            :rules="[{ required: true }]"
          />
        </div>
      </div>

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
      <div v-for="(item, index) in personnelFrom.applyTableData">
        <div class="mxtitle">
          <div>借证明细( {{ index + 1 }} )</div>
          <div
            v-if="personnelFrom.applyTableData.length > 1"
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
          v-model="item.zsname"
          name="材料名称"
          label="材料名称"
          placeholder="请填写材料名称"
          maxlength="20"
          :rules="[{ required: true }]"
          @click="showPopup(1, index)"
        />
        <van-field
          style="margin-bottom: 0"
          class="zh_vant_isprop"
          input-align="right"
          v-model="item.uname"
          name="采购数量"
          label="采购数量"
          placeholder="请填写采购数量"
          maxlength="20"
          :rules="[{ required: true }]"
        />
        <van-field
          style="margin-bottom: 0"
          class="zh_vant_isprop"
          input-align="right"
          v-model="item.uname"
          name="采购价格"
          label="采购价格"
          placeholder="请填写采购价格"
          maxlength="20"
          :rules="[{ required: false }]"
        />
        <van-field
          style="margin-bottom: 0"
          class="zh_vant_isprop"
          input-align="right"
          v-model="item.uname"
          name="税率"
          label="税率"
          placeholder="请填写税率"
          maxlength="20"
          :rules="[{ required: false }]"
        />
        <van-field
          style="margin-bottom: 0"
          class="zh_vant_isprop"
          input-align="right"
          v-model="item.uname"
          name="含税金额"
          label="含税金额"
          placeholder="请填写含税金额"
          maxlength="20"
          :rules="[{ required: false }]"
        />
        <van-field
          style="margin-bottom: 0"
          class="zh_vant_isprop"
          input-align="right"
          v-model="item.uname"
          name="不含税金额"
          label="不含税金额"
          placeholder="请填写不含税金额"
          maxlength="20"
          :rules="[{ required: false }]"
        />

        <van-field
          style="margin-bottom: 0"
          readonly
          input-align="right"
          v-model="item.number"
          name="小计"
          label="小计"
          placeholder="请填写小计"
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
        type="datetime"
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
      jiaohuolist: [{ name: "一次性交货" }, { name: "分批交货" }],
      jiesuanlist: [
        { name: "按月结算" },
        { name: "分段结算" },
        { name: "目标结算" },
        { name: "竣工后一次结算" },
        { name: "其他" },
      ],
      zhifulist: [
        { name: "现金" },
        { name: "转账" },
        { name: "支票" },
        { name: "微信" },
      ],
      gongyianglist: [{ name: "12" }],
      zengzhilist: [{ name: "是" }, { name: "否" }],
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
      mxindex: "",
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
        zid: "", //证书id
        uname: "", //持证人
        number: "", //证书编号
        xing: "", //证书性质
        ya: "", //是否压证
        suo: "", //是否锁证
        remarks: "", //备注
        zsname: "", //证书名称
      },
      personnelFrom: {
        woname: "",
        xmname: "", //项目名称
        userDeptname: "",
        userDept: "",
        time: "", //借证时间
        uname: "", //借证人
        riqi: "", //日期
        remarks: "", //用途
        qttime: "",
        starttime: "",
        zhifu: "",
        zengzhi: "",
        stoptime: "",
        copyer: [], //抄送人
        approver: [], //审批人
        applyTableData: [
          {
            zid: "", //证书id
            uname: "", //持证人
            number: "", //证书编号
            xing: "", //证书性质
            ya: "", //是否压证
            suo: "", //是否锁证
            remarks: "", //备注
            zsname: "", //证书名称
          },
        ],
      },
      newpersonnelFrom: {
        xmname: "", //项目名称
        userDeptname: "",
        userDept: "",
        time: "", //借证时间
        uname: "", //借证人
        riqi: "", //日期
        remarks: "", //用途
        copyer: [], //抄送人
        approver: [], //审批人
        applyTableData: [
          {
            zid: "", //证书id
            uname: "", //持证人
            number: "", //证书编号
            xing: "", //证书性质
            ya: "", //是否压证
            suo: "", //是否锁证
            remarks: "", //备注
            zsname: "", //证书名称
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
        zid: "", //证书id
        uname: "", //持证人
        number: "", //证书编号
        xing: "", //证书性质
        ya: "", //是否压证
        suo: "", //是否锁证
        remarks: "", //备注
        zsname: "", //证书名称
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
        this.selecval = "zsname";
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
        this.columns = this.UserOrgList;
        this.popupshow = true;
      } else if (val == 10) {
        this.selecval = "name";
        this.columns = this.gongyianglist;
        this.popupshow = true;
      } else if (val == 11) {
        this.selecval = "name";
        this.columns = this.zengzhilist;
        this.popupshow = true;
      } else if (val == 12) {
        this.selecval = "name";
        this.columns = this.zhifulist;
        this.popupshow = true;
      } else if (val == 13) {
        this.selecval = "name";
        this.columns = this.jiesuanlist;
        this.popupshow = true;
      } else if (val == 14) {
        this.selecval = "name";
        this.columns = this.jiaohuolist;
        this.popupshow = true;
      }
    },
    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.personnelFrom.applyTableData[this.mxindex].zsname = value.zsname;
        this.personnelFrom.applyTableData[this.mxindex].uname = value.name;
        this.personnelFrom.applyTableData[this.mxindex].zid = value.zid;
        this.personnelFrom.applyTableData[this.mxindex].number =
          value.zsbianhao;
      } else if (this.selectype == 2) {
        this.personnelFrom.applyTableData[this.mxindex].xing = value.name;
      } else if (this.selectype == 3) {
        this.personnelFrom.applyTableData[this.mxindex].ya = value.name;
      } else if (this.selectype == 4) {
        this.personnelFrom.applyTableData[this.mxindex].suo = value.name;
      } else if (this.selectype == 9) {
        this.personnelFrom.userDeptname = value.name;
        this.personnelFrom.userDept = value.id;
      } else if (this.selectype == 10) {
        this.personnelFrom.userDeptname = value.name;
      } else if (this.selectype == 11) {
        this.personnelFrom.zengzhi = value.name;
      } else if (this.selectype == 12) {
        this.personnelFrom.zhifu = value.name;
      } else if (this.selectype == 13) {
        this.personnelFrom.jiesuan = value.name;
      } else if (this.selectype == 14) {
        this.personnelFrom.jiaohuo = value.name;
      }
      this.popupshow = false;
    },
    mxcancel() {
      if (this.selectype == 1) {
        this.personnelFrom.zsname = "";
        this.personnelFrom.uname = "";
        this.personnelFrom.zid = "";

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
        this.p(startdata.getDate()) +
        " " +
        this.p(startdata.getHours()) +
        ":" +
        this.p(startdata.getMinutes());

      // 时间
      // const resTime =
      //     this.p(d.getHours()) +
      //     ':' +
      //     this.p(d.getMinutes()) +
      //     ':' +
      //     this.p(d.getSeconds());

      if (this.valtime == "1") {
        this.personnelFrom.starttime = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        if (this.enddata > this.startdata) {
          this.personnelFrom.stoptime = resDate;
        } else {
          // alert('合同时间结束日期要在合同开始时间之后');
          Toast("时间结束日期要在开始时间之后");
        }
      } else if (this.valtime == "3") {
        this.personnelFrom.qttime = resDate;
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
      if (this.personnelFrom.applyTableData[0].zid == "") {
        Toast("请填写借证明细");
      } else if (this.shenpiList.length < 1) {
        Toast("请填写审批人");
      } else {
        this.personnelFrom.copyer = this.chaosongList;
        this.personnelFrom.approver = this.shenpiList;

        this.$axios
          .post("/zhengshu/UserZhengShuTemplateShenPi", {
            tmpname: "企业证书借出",
            content: this.personnelFrom,
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.$router.go(-1);

              this.$store.commit("setshenpiList", []);
              this.personnelFrom = this.newpersonnelFrom;
              Toast(res.data.msg);
            } else {
              Toast(res.data.msg);
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

    adddanren(value) {
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
            if (value == 1) {
              that.personnelFrom.woname = result.users[0].name;
            }
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
              // _this.personnelFrom.fjurl.ldenclosure = result.data;
              _this.personnelFrom.fjurl.ldenclosure = _this.deunique(
                _this.personnelFrom.fjurl.ldenclosure.concat(result.data)
              );
            } else if (_this.uptype == "4") {
              // _this.personnelFrom.fjurl.enclosure = result.data;
              _this.personnelFrom.fjurl.enclosure = _this.deunique(
                _this.personnelFrom.fjurl.enclosure.concat(result.data)
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
        this.personnelFrom.fjurl.ldenclosure.splice(
          this.personnelFrom.fjurl.ldenclosure.indexOf(item),
          1
        );
      } else if (val == "4") {
        this.personnelFrom.fjurl.enclosure.splice(
          this.personnelFrom.fjurl.enclosure.indexOf(item),
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
    getZhengShuXIaLaList() {
      this.$axios
        .post("/zhengshu/ZhengShuXIaLaList", {
          zsname: "",
        })
        .then((res) => {
          this.ZhengShuXIaLaList = res.data.content;
        });
    },
    //获取持证人员列表
    getUserOrgList() {
      this.$axios.post("/zhengshu/GetUserOrgList").then((res) => {
        this.UserOrgList = res.data.content;
      });
    },
  },
  activated() {
    this.$utils.checkding();
    this.setTitle();
    this.getZhengShuXIaLaList();
    this.getUserOrgList();
    this.personnelFrom.applyTableData[this.mxindex].zsname =
      this.$store.state.userData.appmxitem.zsname;
    this.listshow = this.$store.state.userData.appmxitem.isYuan;
    this.personnelFrom.applyTableData[this.mxindex].uname =
      this.$store.state.userData.appmxitem.name;

    this.personnelFrom.applyTableData[this.mxindex].number =
      this.$store.state.userData.appmxitem.zsbianhao;
    this.personnelFrom.applyTableData[this.mxindex].zid =
      this.$store.state.userData.appmxitem.zid;
    // var itemids = [];
    // itemids = this.personnelFrom.applyTableData.map((item) => {
    //     return item.zid;
    // });

    // this.$store.commit('setitemids', itemids);
    // console.log('1111' + itemids);

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
.relation {
  margin-bottom: 0.66667rem;
  background-color: #fff;
  padding-bottom: 0.5rem;

  .relation_title {
    box-sizing: border-box;
    line-height: 2.33333rem;
    width: 100%;
    font-size: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2.33333rem;
    display: flex;
    justify-content: space-between;
  }
  .listcontent {
    .list_item {
      border-radius: 0.33rem;
      padding: 0 0.5rem;
      width: 90%;
      margin: 0 auto 10px;
      background-color: #f3f6fd;
      height: 2.33rem;
      color: #898b8e;
      display: flex;
      align-items: center;
      justify-content: space-around;

      img {
        height: 1rem;
        // line-height: 2.33rem;
      }
      .list_title {
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #000;
      }
      .list_type {
        width: 20%;
      }
    }
  }
}
</style>

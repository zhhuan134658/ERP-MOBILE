<template>
  <!-- 机手日志 -->
  <div id="implementchect">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <van-field
        readonly
        input-align="right"
        clickable
        v-model="personnelFrom.project_name"
        name="项目"
        label="项目"
        placeholder="请填写项目"
        :rules="[{ required: false }]"
      />
      <van-field
        readonly
        input-align="right"
        v-model="personnelFrom.judge"
        name="经办法官"
        label="经办法官"
        placeholder="请填写经办法官"
        :rules="[{ required: false }]"
      />
      <van-field
        readonly
        input-align="right"
        clickable
        v-model="personnelFrom.judge_mobile"
        name="法官电话"
        label="法官电话"
        placeholder="请填写法官电话"
        :rules="[{ required: false }]"
      />
      <van-field
        readonly
        input-align="right"
        v-model="personnelFrom.contract_name"
        name="合同"
        label="合同"
        placeholder="请填写合同"
        maxlength="40"
        :rules="[{ required: false }]"
      />

      <div class="sureBtn">
        <van-button native-type="submit" type="info">{{
          sumbiname
        }}</van-button>
      </div>
    </van-form>
    <div class="height:100px;"></div>
  </div>
</template>

<script>
import $ from "jquery";
import * as dd from "dingtalk-jsapi";
import newUpload from "../common/newUpload.vue";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "implementchect",
  components: { newUpload },
  data() {
    return {
      sumbiname: "",
      personnelFrom: {
        project_name: "",
        judge: "",
        judge_mobile: "",
        contract_name: "",
        gl_id: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      const _this = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "案件执行", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    onSubmit() {
      const _this = this;
      if (_this.$route.query.item) {
        _this.$axios.post("/affairs/caseImplement").then((res) => {
          if (res.data.code == 1) {
            _this.openurl =
              "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=" +
              _this.$store.state.userData.cid +
              "&swfrom=qrshareh5&tempalteName=" +
              "" +
              "&processCode=" +
              res.data.data +
              "&back=native#/custom";

            dd.ready(function () {
              dd.biz.util.openLink({
                url: _this.openurl, //要打开链接的地址
                onSuccess: function (result) {
                  /**/
                },
                onFail: function (err) {},
              });
            });
          } else {
            Toast(res.data.msg);
          }
        });
      } else {
        // Toast('未关联案件管理,请先选择');
        _this.$router.replace({ path: "/implementchect" });
      }
    },
  },
  created() {
    console.log("552555", this.$route.query.item);
    if (this.$route.query.item) {
      console.log("8845545", this.$route.query.item);
      this.personnelFrom.project_name = this.$route.query.item.project_name;
      this.personnelFrom.judge = this.$route.query.item.judge;
      this.personnelFrom.judge_mobile = this.$route.query.item.judge_mobile;
      this.personnelFrom.contract_name = this.$route.query.item.contract_name;
      this.personnelFrom.gl_id = this.$route.query.item.gl_id;
      this.sumbiname = "提交审批";
    } else {
      this.sumbiname = "选择案件管理";
    }
  },
  mounted() {},
};
</script>
<style lang='less' >
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

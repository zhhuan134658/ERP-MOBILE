<template>
  <!-- 新建持证人员 -->
  <div id="personnelcreat">
    <van-form :scroll-to-error="true">
      <van-field
        readonly
        input-align="right"
        v-model="personnelFrom.name"
        name="进度计划名称"
        label="进度计划名称"
        placeholder="进度计划名称"
        maxlength="10"
      />
      <!-- <van-field
                readonly
                input-align="right"
                v-model="personnelFrom.zsbianhao"
                name="进度计划类型"
                label="进度计划类型"
                placeholder="进度计划类型"
                maxlength="50"
                :rules="[{ required: true }]"
            /> -->
      <van-field
        readonly
        input-align="right"
        v-model="personnelFrom.personincharge"
        name="负责人"
        label="负责人"
        placeholder="负责人"
        maxlength="50"
        :rules="[{ required: true }]"
      />
      <van-field
        readonly
        input-align="right"
        v-model="personnelFrom.sponsorname"
        name="协作人"
        label="协作人"
        placeholder="协作人"
        maxlength="50"
        :rules="[{ required: true }]"
      />
      <van-field
        readonly
        input-align="right"
        v-model="personnelFrom.cc_user"
        name="抄送人"
        label="抄送人"
        placeholder="抄送人"
        maxlength="50"
        :rules="[{ required: true }]"
      />
      <van-field
        readonly
        input-align="right"
        v-model="personnelFrom.project_name"
        name="项目名称"
        label="项目名称"
        placeholder="项目名称"
        maxlength="50"
        :rules="[{ required: true }]"
      />
      <van-field
        readonly
        input-align="right"
        v-model="personnelFrom.starttime"
        name="开始时间"
        label="开始时间"
        placeholder="开始时间"
        maxlength="50"
        :rules="[{ required: true }]"
      />
      <van-field
        readonly
        input-align="right"
        v-model="personnelFrom.endtime"
        name="结束时间"
        label="结束时间"
        placeholder="结束时间"
        maxlength="50"
        :rules="[{ required: true }]"
      />

      <div class="muban">
        <div class="textarea">
          <van-field
            readonly
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            v-model="personnelFrom.remarks"
            name="计划描述"
            maxlength="240"
            label="计划描述"
            placeholder="计划描述"
          />
        </div>
      </div>

      <div class="sureBtn">
        <van-button @click="fanhui" type="info">返 回</van-button>
      </div>
    </van-form>

    <!-- 时间 -->
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "personnelcreat",
  components: {},
  data() {
    return {
      indexdata: "",
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

      personnelFrom: {
        name: "",
        project_name: "",
        starttime: "",
        endtime: "",
        remarks: "",
        personincharge: "",
        sponsorname: "",
        cc_user: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "预警详情", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },

    fanhui() {
      this.$router.go(-1);
    },
    getInfo() {
      this.$axios
        .post("/finance/detailed_news", {
          id: this.$route.query.itemdata.id,
          pid: this.$route.query.itemdata.pid,
          tablename: this.$route.query.itemdata.extend_first,
        })
        .then((res) => {
          this.personnelFrom = res.data.content;
          const a = res.data.content.personincharge.map((item) => {
            return item.name;
          });
          this.personnelFrom.personincharge = a.toString().replace(/\"/g, "");

          const b = res.data.content.sponsorname.map((item) => {
            return item.name;
          });
          this.personnelFrom.sponsorname = b.toString().replace(/\"/g, "");

          const c = res.data.content.cc_user.map((item) => {
            return item.name;
          });
          this.personnelFrom.cc_user = c.toString().replace(/\"/g, "");
        });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getInfo();
  },
  mounted() {},
};
</script>
<style lang='less' >
#personnelcreat {
  padding-bottom: 100px;

  // }
  .sureBtn {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding: 0.67rem 0 2.33rem;
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

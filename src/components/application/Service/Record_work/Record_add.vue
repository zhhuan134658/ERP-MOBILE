<template>
  <!-- 新建持证人员 -->
  <div id="transfercreat">
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
        name="姓名"
        label="姓名"
        placeholder="请填写姓名"
        maxlength="10"
        :rules="[{ required: true }]"
      />
      <van-field
        readonly
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.work_type"
        name="工种"
        label="工种"
        placeholder="请填写工种"
        maxlength="10"
        :rules="[{ required: true }]"
        @click="showPopup(1)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        onkeyup="this.value=this.value.replace(/\D/g,'')"
        v-model="personnelFrom.wages"
        name="工资(元/工)"
        label="工资(元/工)"
        placeholder="请填写工资(元/工)"
        maxlength="10"
        :rules="[{ required: true }]"
      />
      <div class="sureBtn">
        <van-button native-type="submit" type="info">确 定</van-button>
      </div>
    </van-form>
    <div class="height:100px;"></div>
    <van-popup v-model="popupshow" position="bottom" :style="{ height: '38%' }">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @cancel="showPicker = false"
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
  name: "transfercreat",
  components: {},
  data() {
    return {
      titlename: "",
      personnelFrom: {
        name: "",
        work_type: "",
        wages: "",
        ban_name_id: this.$store.state.userData.workitemdata.id,
      },
      selectype: "",
      popupshow: false,
      utilWorkerType: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      const _this = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: _this.titlename, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    getList() {
      console.log("1");
      this.$axios
        .post("/projectthree/banZuList", {
          page: 1,
          number: 9999,
          name: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            // this.workList = res.data.data;
            this.$store.commit("setworklist", res.data.data);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    // 选择框
    showPopup(val) {
      this.popupshow = true;
      this.selectype = val;

      if (val == 1) {
        this.selecval = "name";
        this.columns = this.utilWorkerType;
      }
    },
    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.personnelFrom.work_type = value.name;
      }
      this.popupshow = false;
    },
    onSubmit(values) {
      console.log("submit", values);
      this.$axios
        .post("/projectthree/addWorker", this.personnelFrom)
        .then((res) => {
          if (res.data.code == 1) {
            Toast(res.data.msg);
            this.getList();
            this.$router.go(-1);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    failure(errorInfo) {
      Toast("请填写" + errorInfo.errors[0].name);
      console.log(errorInfo);
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.utilWorkerType = this.$utils.utilWorkerType();
    console.log(this.$route.query.val);
    if (this.$route.query.val == 1) {
      this.titlename = "添加员工";
    } else {
      this.titlename = "编辑工人";
    }
  },
  mounted() {},
};
</script>
<style lang='less' >
#transfercreat {
  padding-bottom: 6.67rem;
  .van-form {
    margin-bottom: 3.33rem;
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

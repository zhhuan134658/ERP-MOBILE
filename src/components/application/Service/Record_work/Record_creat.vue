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
        :readonly="ready"
        input-align="right"
        v-model="personnelFrom.name"
        name="记工本名称"
        label="记工本名称"
        placeholder="请填写记工本名称"
        maxlength="10"
        :rules="[{ required: true }]"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.foreman"
        name="班组长/工头"
        label="班组长/工头"
        placeholder="请填写班组长/工头"
        maxlength="10"
        :rules="[{ required: true }]"
      />
      <div class="sureBtn">
        <van-button native-type="submit" type="info">确 定</van-button>
      </div>
    </van-form>
    <div class="height:100px;"></div>

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
      ready: false,
      titlename: "",
      personnelFrom: {
        name: "",
        foreman: "",
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
          title: _this.titlename, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    onSubmit(values) {
      console.log("submit", values);
      if (this.ready == false) {
        this.$axios
          .post("/projectthree/addBanZu", this.personnelFrom)
          .then((res) => {
            if (res.data.code == 1) {
              Toast(res.data.msg);
              this.getList();
            } else {
              Toast(res.data.msg);
            }
          });
      } else {
        this.$axios
          .post("/projectthree/banZuEdit", this.personnelFrom)
          .then((res) => {
            if (res.data.code == 1) {
              Toast(res.data.msg);
              this.getList();
              this.$router.push({ path: "/Record_work" });
            } else {
              Toast(res.data.msg);
            }
          });
      }
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
            this.$router.push({ path: "/Record_work" });
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
    console.log(this.$route.query.val);
    if (this.$route.query.val == 1) {
      this.titlename = "创建新记工本";
      this.ready = false;
    } else {
      this.titlename = "编辑记工本";
      this.ready = true;
      this.personnelFrom = this.$store.state.userData.workitemdata;
      console.log(this.personnelFrom);
    }
  },
  mounted() {},
};
</script>
<style lang='less' >
#transfercreat {
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

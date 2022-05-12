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
        class="zh_vant_isprop"
        input-align="right"
        v-model="personnelFrom.cert"
        name="身份证号"
        label="身份证号"
        placeholder="请填写身份证号"
        maxlength="10"
        :rules="[{ required: true }]"
      />

      <van-field
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.riqi"
        name="日期"
        label="日期"
        placeholder="请填写日期"
        :rules="[{ required: false }]"
        @click="settime(1)"
      />
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.project_name"
        name="项目"
        label="项目"
        placeholder="请填写项目"
        :rules="[{ required: true }]"
        @click="showPopup(1)"
      />
      <van-field
        input-align="right"
        readonly
        clickable
        v-model="personnelFrom.work_type"
        name="工种"
        label="工种"
        placeholder="请填写工种"
        :rules="[{ required: false }]"
        @click="showPopup(2)"
      />

      <div class="muban">
        <div class="textarea">
          <van-field
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="200"
            v-model="personnelFrom.work_content"
            name="工作内容"
            label="工作内容"
            placeholder="请填写工作内容"
          />
        </div>
      </div>
    </van-form>
    <div class="height:100px;"></div>
    <div class="sureBtn">
      <van-button @click="onsure" type="info">提 交</van-button>
    </div>
    <van-popup v-model="popupshow" position="bottom" :style="{ height: '30%' }">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @cancel="showPicker = false"
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
  name: "transfercreat",
  components: {},
  data() {
    return {
      utilWorkerType: [],
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
      sexList: [
        { sex: "男", id: "1" },
        { sex: "女", id: "2" },
      ],

      personnelFrom: {
        name: "",
        riqi: "",
        cert: "",
        project_name: "",
        project_id: "",
        work_type: "",
        work_content: "",
      },
      xmList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      //     dd.biz.navigation.setTitle({
      //         title: this.$route.query.itemdata.name, //控制标题文本，空字符串表示显示默认文本
      //         onSuccess: function (result) {
      //             /*结构
      // {
      // }*/
      //         },
      //         onFail: function (err) {}
      //     });
    },

    // 选择框
    showPopup(val) {
      this.popupshow = true;
      this.selectype = val;

      if (val == 1) {
        this.selecval = "name";
        this.columns = this.xmList;
      } else if (val == 2) {
        this.selecval = "name";
        this.columns = this.utilWorkerType;
      }
    },
    onConfirm1(value) {
      console.log(value);
      if (this.selectype == 1) {
        this.personnelFrom.project_name = value.name;
        this.personnelFrom.project_id = value.id;
      } else if (this.selectype == 2) {
        this.personnelFrom.work_type = value.name;
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
        this.personnelFrom.riqi = resDate;
        this.startdata = value;
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
      Toast(errorInfo.errors[0].name);
      console.log(errorInfo);
    },

    onsure() {
      this.$axios
        .post("/project/serviceRealnameRegister", this.personnelFrom)
        .then((res) => {
          if (res.data.code == 1) {
            this.$router.go(-1);
            Toast(res.data.msg);
          } else {
            Toast(res.data.msg);
          }
        });
      console.log("456");
    },
    clac() {},
    getxmList() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        if (res.data.code == 1) {
          this.xmList = res.data.data;
        } else {
        }
      });
      console.log("456");
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getxmList();
    this.utilWorkerType = this.$utils.utilWorkerType();
  },
  mounted() {},
};
</script>
<style lang='less' >
#transfercreat {
  .van-form {
    margin-bottom: 3.33rem;
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
}
</style>

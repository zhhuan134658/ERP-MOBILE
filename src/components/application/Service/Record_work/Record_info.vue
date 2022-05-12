<template>
  <!-- 记工信息 -->
  <div id="Record_info">
    <!-- 记工 -->
    <div v-if="num == 2">
      <van-field
        readonly
        input-align="right"
        v-model="duration"
        label="点工"
        placeholder="未填写"
      />
      <div class="inname">备注</div>
      <input
        readonly
        v-model="jiebeizhu"
        placeholder="未填写"
        class="beizhu"
        type="text"
      />
    </div>
    <!-- 借支 -->
    <div v-else>
      <van-field
        readonly
        input-align="right"
        v-model="money"
        label="金额"
        placeholder="未填写"
      />

      <div class="inname">备注</div>
      <input
        readonly
        v-model="jiebeizhu"
        placeholder="未填写"
        class="beizhu"
        type="text"
      />
    </div>

    <div class="allbtn">
      <div class="btn btn1" @click="lookshen">查看审批单</div>
      <div class="btn btn2" @click="editcont">编辑</div>
      <div class="btn btn3" @click="deleitem">删除</div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "",
  components: {},
  data() {
    return {
      jidata: "",
      value: "",
      duration: "",
      jiebeizhu: "",
      money: "",
      jiebeizhu: "",

      num: this.$route.query.num,
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "记工信息", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    editcont() {
      if (this.$route.query.num == 2) {
        this.$router.push({
          path: "/Record_ji",
          query: {
            plpData: this.$store.state.userData.ziitemdata.jg_id,
            spanTime: this.$store.state.userData.spanTime,
          },
        });
      } else {
        this.$router.push({
          path: "/Record_jie",
          query: {
            plpData: this.$store.state.userData.ziitemdata.jz_id,
            spanTime: this.$store.state.userData.spanTime,
          },
        });
      }
    },
    // 记工
    delefile() {
      this.$axios
        .post("/projectthree/jzjgdel", {
          status: 2,
          id: this.$store.state.userData.ziitemdata.jg_id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            Toast(res.data.msg);
            // this.$router.push({ path: '/Record_jlist' });
            this.$router.push({ path: "/Record_jlist" });
            this.jidata.duration = null;
            this.$store.commit("setjiitemdata", this.jidata);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    getinfo() {
      this.$axios
        .post("/projectthree/jgecho", {
          id: this.$store.state.userData.ziitemdata.jg_id,
        })
        .then((res) => {
          this.duration = res.data.content.duration;
          this.jiebeizhu = res.data.content.remarks;
        });
    },
    lookshen() {
      const _this = this;
      if (_this.$route.query.num == 2) {
        dd.ready(function () {
          dd.biz.util.openLink({
            url: _this.$store.state.userData.ziitemdata.jg_url, //要打开链接的地址
            onSuccess: function (result) {
              /**/
            },
            onFail: function (err) {},
          });
        });
      } else {
        dd.ready(function () {
          dd.biz.util.openLink({
            url: _this.$store.state.userData.ziitemdata.extend_first, //要打开链接的地址
            onSuccess: function (result) {
              /**/
            },
            onFail: function (err) {},
          });
        });
      }
    },
    //借支
    delejiefile() {
      this.$axios
        .post("/projectthree/jzjgdel", {
          status: 1,
          id: this.$store.state.userData.ziitemdata.jz_id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            Toast(res.data.msg);
            // this.$router.push({ path: '/Record_jlist' });

            this.$router.push({ path: "/Record_jlist" });
            //  this.jidata.duration = null;
            this.jidata.skill = this.jidata.skill.filter(
              (item) =>
                item.jz_id !== this.$store.state.userData.ziitemdata.jz_id
            );
            this.$store.commit("setjiitemdata", this.jidata);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    getjieinfo() {
      this.$axios
        .post("/projectthree/jzecho", {
          id: this.$store.state.userData.ziitemdata.jz_id,
        })
        .then((res) => {
          this.money = res.data.content.money;
          this.jiebeizhu = res.data.content.remarks;
        });
    },
    deleitem() {
      if (this.$route.query.num == 2) {
        Dialog.confirm({
          title: "提示",
          message: "是否删除",
        })
          .then(() => {
            this.delefile();
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Dialog.confirm({
          title: "提示",
          message: "是否删除",
        })
          .then(() => {
            this.delejiefile();
          })
          .catch(() => {
            // on cancel
          });
        // this.delejiefile();
      }
    },
  },
  created() {
    this.setTitle();
    this.itemdata = this.$store.state.userData.ziitemdata;
    this.jidata = this.$store.state.userData.jiitemdata;
    if (this.$route.query.num == 2) {
      this.getinfo();
    } else {
      this.getjieinfo();
    }
  },
  mounted() {},
};
</script>
<style lang='less' >
#Record_info {
  box-sizing: border-box;
  padding: 0 30px;
  // height: 100vh;
  background-color: #fff;
  .inname {
    font-size: 1rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000;
    padding: 0.33333rem 0.53333rem;
    height: 3.07rem;
    line-height: 3rem;
  }
  .beizhu {
    width: 90%;
    padding: 0.33333rem 0.53333rem;
    font-size: 1rem;
    font-family: PingFang SC;

    color: #000;
    border: 0px;
  }
  .van-cell {
    height: 3.07rem;
    align-items: center;
    .van-cell__title {
      span {
        font-size: 1rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000;
      }
    }
    .van-cell__value {
      .van-field__body {
        .van-field__control {
          font-size: 1rem;
          font-family: PingFang SC;

          color: #000;
        }
      }
    }
  }
  .allbtn {
    margin-top: 3rem;
    .btn {
      width: 80%;
      height: 2.5rem;
      border-radius: 0.5rem;
      text-align: center;
      line-height: 2.5rem;
      margin: 0.67rem auto;
      font-size: 1rem;
    }
    .btn1 {
      background-color: #07c160;
      color: #fff;
    }
    .btn2 {
      background-color: #467eed;
      color: #fff;
    }

    .btn3 {
      background-color: #f8f8f8;
      color: #737278;
      border: 0.03rem solid #a4a4a4;
    }
  }
  .liucheng {
    width: 95%;
    margin: auto;
    border-radius: 0.5rem;
    margin-top: 1rem;

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
}
</style>

<template>
  <!-- 预警列表 -->
  <div id="yujing">
    <div class="bgimg">
      <div class="bgimg_title">预警</div>
      <div class="bgimg_title1">风险警示,掌控全局无担忧</div>
    </div>
    <!--  -->
    <div class="xuanxiang">
      <div class="xuanxiang_title">
        <div class="xuanxiang_title1">
          <img
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/srtpjz62sc1611824436951.png"
            alt=""
          />
        </div>
        <div class="xuanxiang_title2">风险警告</div>
      </div>
      <div class="xuanxiang_con">
        <div class="con_left" @click="gonext(2)">
          <div class="left_chu">请立即处理</div>
          <div class="left_num">{{ numberData.number2 }}</div>
          <div class="left_font">已过期</div>
        </div>
        <div class="con_right" @click="gonext(3)">
          <div class="left_chu">请立即处理</div>
          <div class="right_num">{{ numberData.number3 }}</div>
          <div class="right_font">即将到期</div>
        </div>
      </div>
      <div class="xuanxiang_img">
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/hbheBW3cn61611826639494.png"
          alt=""
        />
      </div>
      <div class="xuanxiang_bot" @click="gonext(1)">去处理</div>
    </div>
    <!--  -->
    <div class="body">
      <div class="content">
        <van-cell
          is-link
          title="周计划"
          :value="numberData.number4 + '个'"
          @click="gonext(4)"
        />
      </div>
      <div class="content">
        <van-cell
          is-link
          title="月计划"
          :value="numberData.number5 + '个'"
          @click="gonext(5)"
        />
      </div>
      <div class="content">
        <van-cell
          is-link
          title="年计划"
          :value="numberData.number6 + '个'"
          @click="gonext(6)"
        />
      </div>
      <div class="content">
        <van-cell
          is-link
          title="总计划"
          :value="numberData.number7 + '个'"
          @click="gonext(7)"
        />
      </div>
      <div class="content">
        <van-cell
          is-link
          title="里程碑"
          :value="numberData.number8 + '个'"
          @click="gonext(8)"
        />
      </div>
    </div>

    <div class="ceshi"></div>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  data() {
    return {
      userid: "",
      corp_id: "",
      numberData: "",
      guoqi: "",
      jijiang: "",
      geren: "",
      qiye: "",
      hetong: "",
    };
  },
  computed: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "证书预警", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    gonext(valdata) {
      this.$router.push({
        path: "/yujlist",
        query: {
          valdata,
          corp_id:this.corp_id,
          userid:this.userid,
        },
      });
    },

    getList() {
      this.$axios
        .post("/finance/push_new_qy", {
          corp_id: this.$route.query.corp_id,
          userid: this.$route.query.userid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.numberData = res.data.content;

            // const {
            //     number1,
            //     number2,
            //     number3,
            //     number4,
            //     number5,
            //     number6,
            //     number7,
            //     number8
            // } = res.data.content || {};
            // this.number1 = number1;
            // this.number2 = number2;
            // this.number3 = number3;
            // this.number4 = number4;
            // this.number5 = number5;
            // this.number6 = number6;
            // this.number7 = number7;
            // this.number8 = number8;
          }
        });
    },
  },
  mounted() {},
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getList();
    this.corp_id = this.$route.query.corp_id;
    this.userid = this.$route.query.userid;
  },
};
</script>
<style lang="less">
#yujing {
  .bgimg {
    height: 12.67rem;
    background-image: linear-gradient(to bottom, #c2291b, #eb8255);
    padding-top: 0.67rem;
    box-sizing: border-box;
    .bgimg_title {
      margin-top: 2rem;
      margin-left: 2.5%;
      color: #fff;
      font-size: 1.67rem;
    }
    .bgimg_title1 {
      margin-left: 2.5%;
      color: #fff;
      font-size: 1rem;
    }
  }
  .xuanxiang {
    width: 95%;

    padding: 0.67rem;
    box-sizing: border-box;
    background-color: #fff;

    box-shadow: 0px 1px 3px 0px rgba(20, 20, 20, 0.13);

    border-radius: 0.5rem;
    margin: auto;
    position: absolute;
    top: 10rem;
    left: 2.5%;

    .xuanxiang_title {
      margin-bottom: 0.67rem;
      display: flex;
      padding-left: 0.67rem;
      .xuanxiang_title2 {
        font-size: 1.17rem;
        font-weight: 600;
        line-height: 2rem;
        margin-left: 0.67rem;
      }
      .xuanxiang_title1 {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: #d72d23;
        text-align: center;

        img {
          width: 1.33rem;
          margin-top: 0.21rem;
        }
      }
    }
    .xuanxiang_con {
      display: flex;
      justify-content: space-between;
      .con_left {
        width: 50%;
        text-align: center;

        .left_chu {
          color: #9c5955;
          font-size: 0.5rem;
        }
        .left_num {
          color: #bf271b;
          font-size: 2.67rem;
          font-weight: 600;
        }
        .left_font {
          font-size: 1.17rem;
          font-weight: 600;
        }
      }
      .con_right {
        .left_chu {
          color: #fff;
          font-size: 0.5rem;
        }
        width: 50%;
        text-align: center;
        .right_num {
          color: #ec8a5b;
          font-size: 2.67rem;
          font-weight: 600;
        }
        .right_font {
          font-size: 1.17rem;
          font-weight: 600;
        }
      }
    }
    .xuanxiang_img {
      width: 100%;
      text-align: center;
      height: 2.33rem;
      line-height: 2.33rem;

      img {
        width: 1.67rem;
      }
    }
    .xuanxiang_bot {
      margin: auto;
      width: 60%;
      background-image: linear-gradient(to right, #e9794f, #c72e20);
      line-height: 2.33rem;
      font-size: 1.17rem;
      color: #fff;
      text-align: center;
      border-radius: 0.33rem;
    }
  }
  .body {
    margin-top: 13.33rem;
    .content {
      box-sizing: border-box;
      margin-bottom: 0.5rem;

      background-color: #ffffff;

      overflow: hidden;
      .van-cell {
        line-height: 2rem;
        padding: 0.6rem;
        .van-cell__title {
          font-size: 1rem;
          color: #0e1a29;
        }
        .van-cell__value {
          font-size: 1.17rem;
          line-height: 2rem;
        }
        .van-icon {
          font-size: 1rem;
          line-height: 2rem;
        }
      }
    }
  }
}
</style>

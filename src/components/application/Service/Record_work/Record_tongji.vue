<template>
  <!--  -->
  <div id="tongji1">
    <div class="alltime">
      <div style="width: 80%; margin: auto; display: flex">
        <van-field
          readonly
          v-model="starttime"
          placeholder="请选择开始时间"
          @click="settime(1)"
        />
        <div class="midtime">到</div>
        <van-field
          readonly
          v-model="stoptime"
          placeholder="请选择结束时间"
          @click="settime(2)"
        />
      </div>
    </div>

    <div class="swiper_number">
      <div class="num_item">
        <div class="num_title">总工钱(元)</div>
        <div class="num_num">{{ alldata.all_money }}</div>
      </div>
      <div class="num_item">
        <div class="num_title">总点工</div>
        <div class="num_num">{{ alldata.worker_num }}</div>
      </div>
      <div class="num_item">
        <div class="num_title">总借支(元)</div>
        <div class="num_num">{{ alldata.zjz_money }}</div>
      </div>
    </div>
    <div class="divtitle">工人( {{ titlenum }}人)</div>
    <div
      class="member-item"
      v-for="(item, index) in FilesList"
      @click="goInfo(item)"
      :key="index"
    >
      <!--     @click="addguamli(2)" -->
      <div class="member-img">
        <img v-if="item.avatar" :src="item.avatar" alt />
        <span v-else>
          {{
            item.name.length <= 2
              ? item.name
              : item.name.substr(item.name.length - 2, 2)
          }}
        </span>
      </div>
      <div class="member-font">
        <div class="member-font1">
          <div class="item_name2">
            点工: <span style="color: #315dff">{{ item.duration }}</span>
          </div>
          <div class="item_name2">
            工钱: <span style="color: #ff8c84"></span> {{ item.wages }}
          </div>
          <div class="item_name2">
            借支: <span style="color: #6be4a4"></span> {{ item.jz_money }}
          </div>
        </div>
        <div class="member-font2">
          <img
            style="width: 0.33rem; height: 0.67rem"
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ysScaYttYP1619505979922.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <Empty v-if="Emptyshow"></Empty>

    <!-- 时间 -->
    <van-popup v-model="isshow" position="bottom">
      <van-datetime-picker
        :max-date="maxDate"
        v-model="starcurrentDate1"
        type="date"
        @confirm="gettime"
        @cancel="close1"
      />
    </van-popup>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import Empty from "../../../common/Empty.vue";
import qs from "qs";
export default {
  name: "tongji1",
  components: { Empty },
  data() {
    return {
      titlenum: "",
      FilesList: [],
      Emptyshow: false,
      maxDate: new Date(),
      isshow: false,
      starttime: "",
      stoptime: "",
      starcurrentDate1: new Date(),
      alldata: "",
    };
  },
  computed: {},
  watch: {
    FilesList: {
      handler(val, oldval) {
        if (val.length > 0) {
          this.Emptyshow = false;
        } else {
          this.Emptyshow = true;
        }
      },
    },
  },
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "统计", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    // 时间选择
    settime(val) {
      this.isshow = true;
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
        this.starttime = resDate;
        this.startdata = value;
      } else if (this.valtime == "2") {
        this.enddata = value;
        // if (this.enddata > this.startdata) {
        //     this.stoptime = resDate;
        // } else {
        //     Toast('结束日期要在开始时间之后');
        // }
      }

      this.isshow = false;
      console.log("ss");
      this.getMonthTongji();
    },

    p(s) {
      return s < 10 ? "0" + s : s;
    },

    close1() {
      this.isshow = false;
    },
    getMonthTongji() {
      this.$axios
        .post("/projectthree/getMonthTongji", {
          start_riqi: this.starttime,
          end_riqi: this.stoptime,
          ban_id: this.$store.state.userData.workitemdata.id,
        })
        .then((res) => {
          this.alldata = res.data.data;
          this.FilesList = res.data.data.worker_list;
          this.titlenum = res.data.data.worker_list.length;
        });
    },
    goInfo(item) {
      this.$router.push({
        path: "/Record_tongjilist",
        query: {
          item: item,
          startriqi: this.starttime,
          stopriqi: this.stoptime,
        },
      });
    },
    dateFormat(dateData) {
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
    dateFormat1(dateData) {
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-01";
      return time;
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getMonthTongji();
    this.stoptime = this.dateFormat(new Date());
    this.starttime = this.dateFormat1(new Date());
  },
  mounted() {},
};
</script>
<style lang='less' >
#tongji1 {
  .van-cell:after {
    border-bottom: 0 !important;
  }
  .divtitle {
    padding: 0 0 0 20px;
    height: 1.9rem;
    background: #f2f2f2;

    font-size: 0.87rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 1.9rem;
  }
  .alltime {
    display: flex;
    background-color: #315dff;
    color: #1037c6;
    height: 3rem;
    .van-cell {
      width: 45%;
      font-size: 1.17rem;
      background-color: #315dff;
      .van-cell__value {
        text-align: center;
        .van-field__body {
          height: 100%;
          .van-field__control {
            text-align: center;
            color: #fff;
          }
        }
      }
    }
    .midtime {
      width: 10%;
      text-align: center;
      font-size: 1.17rem;

      /*flex 布局*/
      display: flex;
      /*实现垂直居中*/
      align-items: center;
      /*实现水平居中*/
      justify-content: center;
    }
  }
  .swiper_number {
    display: flex;

    .num_item {
      background-color: #fff;
      width: 33%;
      text-align: center;
      .num_title {
        color: #fff;
        font-size: 0.93rem;
        line-height: 2.5rem;

        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
      }
      .num_num {
        color: #000000;
        font-family: PingFang SC;
        font-weight: bold;

        font-size: 1.33rem;
        line-height: 2.5rem;
      }
    }
  }
  .member-item {
    margin-bottom: 0.33rem;
    // border-bottom: 0.13rem solid #d9d9d9;

    padding: 0.3rem;
    background-color: #fff;
    display: flex;
    .member-img {
      font-size: 1rem;
      margin: auto;
      width: 3.33rem;
      height: 3.33rem;

      border-radius: 50%;
      overflow: hidden;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 2.67rem;
        text-align: center;

        color: #fff;
      }
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 3.33rem;
        text-align: center;
        // background-color: #387ef5;
        color: #000;
      }
    }
    .member-font {
      width: 80%;
      line-height: 1.67rem;
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      .member-font1 {
        margin-left: 0.67rem;
        .item_name1 {
          font-size: 1.17rem;
          font-weight: 600;
        }
        .item_name2 {
          font-size: 1.06rem;
          color: #858b96;
        }
      }
      .member-font2 {
        color: #409eff;
        line-height: 5rem;
      }
    }
  }
}
</style>

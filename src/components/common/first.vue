<template>
  <!--  -->
  <div id="first">
    <van-swipe class="my-swipe" indicator-color="white" :loop="false">
      <van-swipe-item>
        <img src="../../../static/images/banner1.jpg" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../static/images/banner2.jpg" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <div class="imgdiv" @click="gofirst">
          <img class="img2" src="../../../static/images/button.png" alt="" />
        </div>

        <img
          @click="gofirst"
          class="img1"
          src="../../../static/images/banner3.jpg"
          alt=""
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "first",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "首次进入", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    stop() {
      document.body.style.overflow = "hidden"; //禁止页面划动
    },
    move() {
      document.body.style.overflow = ""; //出现滚动条
    },
    gofirst() {
      this.move();
      this.$router.replace({
        path: "/application",
      });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.stop();
  },
  mounted() {},
};
</script>
<style lang='less' >
#first {
  .my-swipe {
    height: 100vh;
    .van-swipe__track {
      .van-swipe-item {
        position: relative;
        img {
          width: 100%;
          // height: 100%;
        }
        .imgdiv {
          bottom: 2.33rem;
          position: absolute;

          text-align: center;
          .img2 {
            width: 60%;
            text-align: center;
          }
        }
      }
    }

    .van-swipe__indicators {
      bottom: 1rem !important;
      .van-swipe__indicator {
        width: 1rem !important;
        height: 1rem !important;
      }
    }
  }
}
</style>

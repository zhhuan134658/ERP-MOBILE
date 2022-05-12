<template>
  <!-- 我的 -->
  <div id="fuwu">
    <div class="bgimg">
      <div class="waiceng">
        <div class="touxiang" @click="gogongsi">
          <img
            src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/fG6H84CW281592970680603.png"
            alt=""
          />
        </div>
      </div>

      <div class="rennamne">测试</div>
    </div>

    <div class="content">
      <van-cell title="公司简称" value="筑快" />
      <van-cell title="剩余时间" value="7天" />
      <van-cell title="服务电话" value="400-400-400" />
      <van-cell title="存储空间" :value="infoData.illustrate" />
      <van-progress :percentage="53" stroke-width="10" />
      <div class="jindu">
        <div class="jindu_font">2.7G/5G</div>
        <div class="jindu_font">53%</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  name: "fuwu",
  data() {
    return {
      infoData: "",
      currentRate: 10,
      name: "",
    };
  },
  computed: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "服务中心", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    gogongsi() {
      this.$router.push({ path: "/gongsi" });
    },
    gorenyuan() {
      this.$router.push({ path: "/SZrenyuan" });
    },
    gofuwu() {
      this.$router.push({ path: "/fuwu" });
    },
    //获取存储空间信息
    getUseSize() {
      this.$axios
        .get("/system/getUseSize", {
          params: {
            companyId: this.$store.state.userData.cid,
          },
        })
        .then((res) => {
          this.infoData = res.data.data;
        });
    },
  },
  mounted() {},
  created() {
    this.$utils.checkding();
    this.setTitle();
  },
};
</script>
<style lang="less">
#fuwu {
  .bgimg {
    height: 380px;
    background-image: url("../../../static/images/beijing.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%; /*按比例缩放*/
    padding-top: 0.67rem;
    box-sizing: border-box;
    .waiceng {
      display: flex;
      align-items: center; /*定义body的元素垂直居中*/
      justify-content: center;
      margin: auto;
      width: 6.67rem;
      height: 6.67rem;
      border-radius: 50%;
      background-color: aliceblue;
      .touxiang {
        margin: auto;
        width: 5rem;
        height: 5rem;
        background-color: #409efe;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .rennamne {
      margin-top: 0.67rem;
      text-align: center;
      font-size: 1.33rem;
      color: #ffffff;
    }
  }

  .content {
    box-sizing: border-box;

    margin: auto;

    background-color: #ffffff;
    box-shadow: 0px 1px 3px 0px rgba(20, 20, 20, 0.13);
    border-radius: 0.33rem;
    // overflow: hidden;
    .van-cell {
      line-height: 2.75rem;
      border-bottom: 0.03rem solid #e6e6e7;
      .van-cell__title {
        font-size: 1.17rem;
        color: #575b60;
      }
      .van-cell__value {
        font-size: 1.17rem;
      }
      .van-icon {
        font-size: 1rem;
        line-height: 2.75rem;
      }
    }
    .van-progress {
      .van-progress__portion {
        .van-progress__pivot {
          line-height: 1.67rem;
          font-size: 1rem;
        }
      }
    }
    .jindu {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      .jindu_font {
        height: 2.33rem;
        color: #409efe;
        font-size: 1.17rem;
        line-height: 2.33rem;
      }
    }
  }
}
</style>

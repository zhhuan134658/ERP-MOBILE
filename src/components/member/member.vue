<template>
  <!-- 我的 -->
  <div id="member">
    <div class="member_header">
      <div class="member_font">
        <div class="member_name" @click="adbf">{{ name }}</div>
        <div class="member_crop">{{ company }}</div>
        <!--   @click="goall" -->
      </div>
      <div class="member_img">
        <img :src="imgurl" alt="" />
      </div>
    </div>
    <div class="member_body">
      <div v-if="roleView == 1" class="body_item" @click="gojuese">
        <div class="item_font">
          <img
            style="vertical-align: middle"
            src="../../../static/images/6.png"
            alt=""
          />
          <span style="vertical-align: middle"> 角色列表</span>
        </div>
        <div class="item_img">
          <img src="../../../static/images/4.png" alt="" />
        </div>
      </div>
      <div v-if="roleView == 1" class="body_item" @click="gorenyuan">
        <div class="item_font">
          <img
            style="vertical-align: middle"
            src="../../../static/images/7.png"
            alt=""
          />
          <span style="vertical-align: middle"> 人员设置</span>
        </div>
        <div class="item_img">
          <img src="../../../static/images/4.png" alt="" />
        </div>
      </div>
      <!-- <div class="body_item" @click="openMiniApp">
        <div class="item_font">
          <img
            style="vertical-align: middle"
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//wWyymyyfDn1631179104816.png"
            alt=""
          />
          <span style="vertical-align: middle"> 授权</span>
        </div>
        <div class="item_img">
          <img src="../../../static/images/4.png" alt="" />
        </div>
      </div> -->
      <div class="body_item" @click="goyujing">
        <div class="item_font">
          <img
            style="vertical-align: middle"
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MD4BNRHa6d1618554741583.png"
            alt=""
          />
          <span style="vertical-align: middle"> 预警列表</span>
        </div>
        <div class="item_img">
          <img src="../../../static/images/4.png" alt="" />
        </div>
      </div>
      <div class="body_item" @click="godingdan">
        <div class="item_font">
          <img
            style="vertical-align: middle"
            src="../../../static/images/8.png"
            alt=""
          />
          <span style="vertical-align: middle"> 订单中心</span>
        </div>
        <div class="item_img">
          <img src="../../../static/images/4.png" alt="" />
        </div>
      </div>
      <div class="body_item" @click="goxiaoxi">
        <div class="item_font">
          <img
            style="vertical-align: middle"
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ntkb2jmrB81618554741208.png"
            alt=""
          />
          <span style="vertical-align: middle"> 消息通知</span>
        </div>
        <div class="item_img">
          <img src="../../../static/images/4.png" alt="" />
        </div>
      </div>
      <div class="body_item" @click="fankui">
        <div class="item_font">
          <img
            style="vertical-align: middle"
            src="../../../static/images/9.png"
            alt=""
          />
          <span style="vertical-align: middle"> 意见反馈</span>
        </div>
        <div class="item_img">
          <img src="../../../static/images/4.png" alt="" />
        </div>
      </div>
      <!-- <div class="body_item">
                <div class="item_font">
                    <img
                        style="vertical-align:middle"
                        src="../../../static/images/upload.png"
                        alt=""
                    >
                    <span style="vertical-align:middle">提示图
                        <span>(建议上传宽高比2:1的图)</span>
                    </span>

                </div>
                <div class="item_img1">
                    <pxupload
                        ref="myuplod"
                        @listenToChildEvent="showurl"
                        :upImgList="upImgList"
                        :licenceImg="licenceImg"
                        :isShow="isShow"
                    ></pxupload>

                </div>

            </div> -->
      <div class="body_item">
        <div class="item_font">
          <img
            style="vertical-align: middle"
            src="../../../static/images/10.png"
            alt=""
          />
          <span style="vertical-align: middle"> 服务电话</span>
        </div>
        <div class="item_img">
          <a href="tel:0371-56775558">0371-56775558</a>
        </div>
      </div>
      <!-- @click="ceshi" -->
      <div class="body_item">
        <div class="item_font">
          <img
            style="vertical-align: middle"
            src="../../../static/images/11.png"
            alt=""
          />
          <span style="vertical-align: middle"> 版本号</span>
        </div>
        <div class="item_img">4.2.1</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import pxupload from "../common/hupload.vue";
import { onAuthAppBack } from "dingtalk-design-libs/biz/openAuthMiniApp";
import { openAuthMiniApp } from "dingtalk-design-libs/biz/openAuthMiniApp";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  components: { pxupload },
  data() {
    return {
      roleView: 1,
      upImgList: [],
      licenceImg: [],
      isShow: ["1"],
      currentRate: 10,
      company: this.$store.state.userData.company,
      name: this.$store.state.userData.username,
      imgurl: "",
    };
  },

  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "我的", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    adbf() {
      if (this.$store.state.userData.userid == "1955162522782338") {
        this.$router.push({ path: "/jinduplanindex" });
      }
    },
    goall() {
      this.$router.push({ path: "/dingtaik" });
    },
    godingdan() {
      alert("暂未开放，敬请期待");
      // this.$router.push({ path: '/dingdan' });
    },
    fankui() {
      this.$router.push({ path: "/fankui" });
    },
    goxiaoxi() {
      this.$router.push({ path: "/xiaoxi" });
    },
    goyujing() {
      this.$router.push({ path: "/waring" });
    },
    ceshi() {
      this.$router.push({ path: "/ceshi" });
    },
    gorenyuan() {
      // alert('暂未开放，敬请期待');
      this.$router.push({ path: "/SZrenyuan" });
    },
    gojuese() {
      this.$router.push({ path: "/juese" });
    },
    gofuwu() {
      this.$router.push({ path: "/fuwu" });
    },
    showurl(data) {
      console.log(data + "55555");
    },
    isView() {
      this.$axios.post("/finance/is_admin").then((res) => {
        this.roleView = res.data.data;
      });
    },
  },
  mounted() {},
  created() {
    this.$utils.steWebview();
    this.$utils.checkding();
    this.isView();
    this.setTitle();
    if (!this.$store.state.userData.avatarurl) {
      this.imgurl =
        "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/ibwG5yjjsc1592967580830.jpg";
    } else {
      this.imgurl = this.$store.state.userData.avatarurl;
    }
  },
};
</script>
<style lang="less">
#member {
  background-color: #fff;
  height: 46.6rem;
  .bgimg {
    height: 380px;
    background-image: linear-gradient(to right, #ebeef5, #79bbff);
    padding-top: 0.67rem;
    box-sizing: border-box;
    .touxiang {
      margin: auto;
      width: 5rem;
      height: 5rem;
      background-color: aliceblue;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rennamne {
      margin-top: 0.67rem;
      text-align: center;
      font-size: 1.17rem;
      color: #ffffff;
    }
  }
  .xuanxiang {
    width: 95%;
    height: 180px;
    padding: 0.67rem;
    box-sizing: border-box;
    background-color: #fff;

    box-shadow: 0px 1px 3px 0px rgba(20, 20, 20, 0.13);

    border-radius: 0.5rem;
    margin: auto;
    position: relative;
    top: -110px;
    display: flex;
    justify-content: space-around;

    .xuanxiang_item {
      width: 20%;
      margin: 0.33rem;
      display: flex;
      align-items: center; /*定义body的元素垂直居中*/
      justify-content: center;
      text-align: center;
      font-size: 0.83rem;
      color: #636363;
      img {
        width: 2.33rem;
        height: 2.33rem;
      }
    }
  }
  .content {
    box-sizing: border-box;
    width: 95%;
    margin: -90px auto 0;

    background-color: #ffffff;
    box-shadow: 0px 1px 3px 0px rgba(20, 20, 20, 0.13);
    border-radius: 0.33rem;
    overflow: hidden;
    .van-cell {
      line-height: 2.5rem;
      border-bottom: 0.03rem solid #e6e6e7;
      .van-cell__title {
        font-size: 0.93rem;
        color: #262626;
      }
      .van-cell__value {
        font-size: 0.93rem;
      }
      .van-icon {
        font-size: 1rem;
        line-height: 2.75rem;
      }
    }
  }
  // sdasdasd
  .member_header {
    background: url("../../../static/images/5.png") no-repeat;
    background-size: 100% 13.43rem;

    height: 13.43rem;
    display: flex;
    justify-content: space-between;

    padding: 3.5rem 1.33rem 0;

    .member_font {
      box-sizing: border-box;

      .member_name {
        font-size: 1.07rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 2rem;
      }
      .member_crop {
        font-size: 0.8rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 1.67rem;
      }
    }
    .member_img {
      width: 2.83rem;
      height: 2.83rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .member_body {
    top: 10rem;
    position: absolute;
    width: 100%;
    .body_item {
      box-sizing: border-box;
      padding: 0 0.5rem;
      width: 93%;
      margin: 0.5rem auto;

      height: 3.5rem;
      background: #ffffff;
      box-shadow: 0px 0px 13px 0px #f0f0f0;
      border-radius: 0.21rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_font {
        // line-height: 3.5rem;
        img {
          width: 1.17rem;
          height: 1.17rem;
        }
        span {
          font-size: 1.07rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 1rem;
          span {
            font-size: 0.7rem;
            color: #999999;
          }
        }
      }
      .item_img1 {
        font-size: 1.06rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        display: flex;
        align-items: center;
        a {
          color: #666666;
        }
        img {
          width: 0.57rem;
          height: 1.1rem;
        }
      }

      .item_img {
        font-size: 1.06rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        a {
          color: #666666;
        }
        img {
          width: 0.57rem;
          height: 1.1rem;
        }
      }
    }
  }
}
</style>

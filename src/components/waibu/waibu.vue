<template>
  <!-- 合同 -->
  <div id="waibu" class="clearfix">
    <div class="leibiao">
      <div class="inputdiv">
        <van-search
          v-model="name"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div slot="action" @click="gonew">
            <van-button type="default">新建</van-button>
          </div>
        </van-search>
      </div>
      <div class="content">
        <div
          class="content_item"
          v-for="(item, index) in contentList"
          :key="index"
        >
          <div class="item_top">
            <div class="top_img">
              <img
                src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/Tw37kSZzi51592875113786.jpg"
                alt
              />
            </div>
            <div class="top_name">{{ item.name }}提交的采购订单</div>
            <div class="top_xq">查看</div>
          </div>
          <div class="item_content">
            <div class="content_left">
              <div class="left_font">采购编号:{{ item.bianhao }}</div>
              <div class="left_font">物资类别:{{ item.leibie }}</div>
              <div class="left_font">物资类别:{{ item.leibie }}</div>
            </div>
          </div>
          <div class="item_foot">
            <div class="foot_left">开始时间:{{ item.staritem }}</div>
            <div class="foot_right">结束时间:{{ item.enditem }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts");

import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";

export default {
  name: "waibu",
  data() {
    return {
      name: "",
      qiehuanshow: true,
      qieshow: false,
      num: 0,
      contentList: [
        {
          id: 1,
          name: "张一定是",
          bianhao: "20190508001",
          leibie: "土建物资",
          type: "待采购",
          staritem: "2020-03-23",
          enditem: "2020-03-23",
        },
        {
          id: 2,
          name: "李dfs",
          bianhao: "20190508001",
          leibie: "装修物资",
          type: "待入库",
          staritem: "2020-03-23",
          enditem: "2020-03-23",
        },
      ],
      tuList: [
        {
          id: 1,
          imgurl:
            "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/zsXPQRdhWz1592462103126.jpg",
          text: "图标展示",
        },
        {
          id: 2,
          imgurl:
            "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/j6AGi6EP3a1592462123549.jpg",
          text: "列表展示",
        },
      ],
    };
  },
  computed: {},
  methods: {
    gonew() {
      this.$router.push({ path: "/newwaibu" });
    },
    htchange(index) {
      this.num = index;

      if (index == 0) {
        this.qiehuanshow = true;
        this.qieshow = false;

        this.drawLine();
        this.drawBing();
      } else if (index == 1) {
        this.qiehuanshow = false;
        this.qieshow = true;
      }
      console.log(this.num);
    },
  },
  mounted() {},
  created() {},
};
</script>
<style lang="less">
#waibu {
  margin-bottom: 3.33rem;

  .leibiao {
    .inputdiv {
      display: flex;
      align-items: center; /*定义body的元素垂直居中*/
      justify-content: center; /*定义body的里的元素水平居中*/
      width: 100%;
      height: 4rem;
      background-color: #409efe;
      .van-search {
        width: 95%;
        background-color: #409efe !important;
        .van-search__action {
          font-size: 1rem;
          line-height: 1rem;
          .van-button {
            height: 1.8rem;
            .van-button__text {
              font-size: 1rem;
            }
          }
        }
        .van-search__action {
          .van-button--normal {
            border-radius: 0.33rem;
            .van-button__text {
              color: #409eff;
            }
          }
        }
        .van-search__content--round {
          border-radius: 0.33rem;
        }
        .van-search__content {
          .van-cell {
            height: 2rem;
            line-height: 1.8rem;
            font-size: 0.9rem;
            .van-field__left-icon {
              .van-icon {
                font-size: 1rem;
              }
            }
          }
        }
      }
    }
    .content {
      padding: 0.67rem;

      .content_item {
        margin-top: 0.67rem;
        width: 100%;
        padding: 0.67rem;
        box-sizing: border-box;
        background-color: #ffffff;
        box-shadow: 0px 1px 8px 0px rgba(20, 20, 20, 0.17);
        border-radius: 0.33rem;

        .item_top {
          height: 2.67rem;
          .top_img {
            float: left;
            width: 2.67rem;
            text-align: center;
            img {
              margin-top: 0.33rem;
              width: 2rem;
              height: 2rem;
            }
          }
          .top_name {
            float: left;
            font-size: 1.33rem;
            font-weight: 600;

            line-height: 2.67rem;
            letter-spacing: 0px;
            color: #191f25;
          }

          .top_xq {
            float: right;
            line-height: 2.67rem;
            margin-right: 0.67rem;
            font-size: 1rem;
            color: #409eff;
          }
        }
        .item_content {
          margin-left: 2.67rem;
          box-sizing: border-box;

          padding: 0.67rem 20px 0 0;
          display: flex;

          .content_left {
            width: 70%;
            color: #9ea0a3;
            .left_font {
              line-height: 1.5rem;
            }
          }
        }
        .item_foot {
          margin-left: 2.67rem;
          box-sizing: border-box;

          padding: 0.67rem 20px 0 0;
          display: flex;
          .foot_left {
            width: 50%;
            line-height: 1rem;

            color: #9ea0a3;
          }
          .foot_right {
            width: 50%;
            line-height: 1rem;
            text-align: right;
            color: #9ea0a3;
          }
        }
      }
    }
  }
  .echartsname {
    background-color: #fff;
    font-size: 1.17rem;
    font-weight: 600;
    text-align: center;
  }
  .changeColor {
    color: #409efe !important;
    font-size: 1.33rem;
    font-weight: 600;
  }
}
</style>

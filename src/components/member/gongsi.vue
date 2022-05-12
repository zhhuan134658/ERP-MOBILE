<template>
  <!-- 公司详情 -->
  <div id="gongsi">
    <van-cell title="公司全称" value="河南省筑快科技有限公司" />
    <van-cell title="公司简称" value="河南筑快" />
    <van-cell title="法人姓名" value="卢尚勇" />
    <!-- <van-cell title="注册资金" :value="infoData.registerMoney" /> -->
    <van-cell title="企业电话" value="0371-56775558" />
    <van-cell is-link @click="showdata(1)" title="详细地址" />
    <!-- <van-cell
            is-link
            @click="showdata(2)"
            title="组织机构代码"
        />
        <van-cell
            is-link
            @click="showdata(3)"
            title="营业执照编号"
        /> -->
    <van-cell is-link @click="showdata(4)" title="成立时间" />
    <van-cell is-link @click="showdata(5)" title="官方网址" />
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  name: "gongsi",
  data() {
    return {
      infoData: "",
    };
  },
  computed: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "公司信息", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    showdata(num) {
      if (num == 1) {
        Dialog.confirm({
          title: "详细地址",
          message: "河南省郑州市惠济区升龙汇金写字楼907室",
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      } else if (num == 2) {
        Dialog.confirm({
          title: "组织机构代码",
          message: this.infoData.organizationNum,
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      } else if (num == 3) {
        Dialog.confirm({
          title: "营业执照编号",
          message: this.infoData.businessNum,
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      } else if (num == 4) {
        Dialog.confirm({
          title: "成立时间",
          message: "2014年3月",
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      } else if (num == 5) {
        Dialog.confirm({
          title: "官方网址",
          message: "http://zhihui.zzdingyun.com/app/zhukuai/index.html",
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    getinfo() {
      this.$axios
        .get("/system/info/get", {
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
    // this.getinfo();
  },
};
</script>
<style lang="less">
#gongsi {
  .van-cell {
    line-height: 2.75rem;
    border-bottom: 0.03rem solid #e6e6e7;
    .van-cell__title {
      font-size: 1.17rem;
      color: #575b60;
    }
    .van-cell__value {
      font-size: 1.17rem;
      flex: inherit;
    }
    .van-icon {
      font-size: 1rem;
      line-height: 2.75rem;
    }
  }
}
</style>

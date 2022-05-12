<template>
  <div id="juese">
    <div class="content" v-for="(item, index) in systemList" :key="index">
      <div class="item_font" style="width: 85%">
        {{ item.name }}
      </div>
      <div
        v-if="item.extend_first != 1"
        @click="delejuese(item.id)"
        class="item_font2"
      >
        删除
      </div>
    </div>

    <div class="sureBtn">
      <van-button @click="newadd" type="info">新增角色</van-button>
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
  name: "juese",
  data() {
    return {
      PowerList: [],

      zdata: [],
      checkedList: [
        { id: 1, name: "角色成员" },
        { id: 2, name: " 功能权限" },
      ],
      num: "",
      htshow: "",
      chshow: true,
      dialogshow: false,
      roleName: "",
      systemList: [],
      activeNames: ["1", "2"],
      list: ["a", "b"],
      result: [],
      result1: [],
    };
  },
  computed: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "角色列表", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },

    chooseChenge(checked) {
      console.log(checked);
    },
    quanxuan(val) {
      console.log(val);
      this.$refs.val.toggleAll();
      this.chshow = false;
    },
    quxiao() {
      this.$refs.checkboxGroup.toggleAll();
      this.chshow = true;
    },
    toggle(item) {
      console.log(item);
    },
    goList(item) {
      this.$router.push({
        path: "/jueselist",
        query: {
          id: item.id,
        },
      });
    },

    //角色列表
    getsystem() {
      this.$axios
        .post("/task/JinDuShuXingList", {
          xmid: "",
          status: "",
          fid: "",
        })
        .then((res) => {
          this.systemList = res.data.content;
        });
    },
    //新增角色
    newadd() {
      this.dialogshow = true;
    },
  },
  mounted() {},
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getsystem();
  },
};
</script>
<style lang="less">
#juese {
  padding-top: 0.33rem;
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
  .checked {
    background-color: #ffffff;
    height: 3.33rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .checked_item {
      color: #9ea0a3;
      height: 100%;
      line-height: 3.33rem;
      width: 50%;
      text-align: center;
      font-size: 1.33rem;
    }
  }
  .jdiaog {
    .jdiaog_item {
      width: 100%;
      height: 3.33rem;
    }
    .jdiaog_item_input {
      width: 100%;
      height: 100%;
      font-size: 1.17rem;
      border: inherit;
    }
  }

  .quanxian {
    .van-checkbox-group {
      .chenk {
        padding: 0 0.5rem;
        box-sizing: border-box;
        width: 100%;
        height: 3.33rem;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        line-height: 3.33rem;
        font-size: 1.17rem;
        .chenk_ckeck {
          color: #409efe;
        }
      }
      .van-cell-group {
        .allckeck {
          .van-cell__title {
            font-size: 1.5rem !important;
            margin-left: 0.67rem !important;
          }
        }
        .van-cell {
          line-height: 2rem;
          border-bottom: 0.03rem solid #e6e6e7;
          .van-cell__title {
            margin-left: 1.33rem;
            font-size: 1rem;
            color: #575b60;
          }
          .van-cell__value {
            font-size: 1rem;
            flex: inherit;
          }
          .van-icon {
            font-size: 0.6rem;
            line-height: 2rem;
          }
        }
      }
    }
  }
  .content {
    border-top: 0.03rem solid #f3f6fd;
    padding: 0.6rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    margin-bottom: 0.5rem;

    .item_font {
      font-size: 1rem;
      color: #0e1a29;
      line-height: 1.67rem;
    }
    .item_font2 {
      font-size: 1rem;
      color: #409efe;
      line-height: 1.67rem;
    }

    .item_font1 {
      color: #409efe;
    }
  }

  .van-collapse {
    .van-collapse-item {
      .van-cell::after {
        border-bottom: inherit;
      }
      .van-cell {
        padding: 1rem;
        .van-cell__title {
          font-size: 1rem;
        }
      }
      .van-collapse-item__wrapper {
        .van-collapse-item__content {
        }
      }
    }
  }
}
</style>

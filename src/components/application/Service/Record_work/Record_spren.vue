<template>
  <div id="addrenyuan">
    <div v-for="(item, index) in chaosongList" :key="index">
      <div class="item_renyuan">
        <van-icon name="cross" @click="deleteren(item)" />
        <div class="itemname">
          <img v-if="item.avatar" :src="item.avatar" alt />
          <span v-else>
            {{
              item.name.length <= 2
                ? item.name
                : item.name.substr(item.name.length - 2, 2)
            }}
          </span>
        </div>
        <div
          style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="item_icon">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div class="item_renyuan">
      <div class="itemname">
        <img
          @click="addren"
          src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
          alt
        />
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
Toast.setDefaultOptions({ duration: 1500 });
import { setTimeout } from "timers";
export default {
  name: "addrenyuan",
  data() {
    return {
      chaosongList: [],
      chaosongList1: [],

      agentid: "", //微应用id
      timeStamp: "", //时间戳
      noncestr: "", //签名随机串
      signature: "", //签名
      numble: "",
    };
  },
  methods: {
    setTitle() {
      const _this = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: _this.$store.state.userData.titledata.name, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    deunique1(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
      );
    },
    //选人
    addren(value) {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            that.chaosongList = that.deunique1(
              that.chaosongList.concat(result.users)
            );
            if (that.$route.query.typeren == 1) {
              that.$store.commit("setshenpiList", that.chaosongList);
            } else if (that.$route.query.typeren == 2) {
              // that.chaosongList = result.users;
              that.$store.commit("setchaosongList", that.chaosongList);
            }
          },
          onFail: function (err) {},
        });
      });
    },
    //去重
    dedupe(array) {
      return Array.from(new Set(array));
    },
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
      );
    },

    //删除人员
    deleteren(tag) {
      this.chaosongList.splice(this.chaosongList.indexOf(tag), 1);
      if (this.$route.query.typeren == 1) {
        this.$store.commit("setshenpiList", this.chaosongList);
      } else if (this.$route.query.typeren == 2) {
        this.$store.commit("setchaosongList", this.chaosongList);
      }
    },
  },
  created() {
    // this.$utils.checkding();
    this.setTitle();
    // daibanList: [], //待
    // kejianList: [], //可见
    // this.$store.commit('settyperen', value); //审批
    if (this.$route.query.typeren == 1) {
      this.chaosongList = this.$store.state.userData.shenpiList;
    } else if (this.$route.query.typeren.typeren == 2) {
      this.chaosongList = this.$store.state.userData.chaosongList;
    }
    console.log(this.chaosongList);
  },

  mounted() {},
};
</script>
<style lang="less">
#addrenyuan {
  padding: 0.67rem;
  .imgadd {
    margin-left: 0.33rem;
    float: left;
    width: 3.33rem;
    height: 3.33rem;
  }
  .item_icon {
    float: left;
    width: 1rem;
    height: 3.33rem;
    line-height: 2.67rem;
    text-align: center;
  }
  .item_renyuan {
    position: relative;
    float: left;
    width: 3.33rem;
    // height: 2.67rem;
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
      // background-color: red;
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
      img {
        text-align: center;
        width: 100%;
        height: 100%;
      }
    }
  }
  .sureBtn {
    padding: 0 20px;
    margin-bottom: 4rem;
    margin-top: 1.33rem;
    height: 2.67rem;
    line-height: 2.67rem;
    text-align: center;

    overflow: hidden;
    .van-button {
      width: 40%;
      height: 100%;
      border-radius: 0.27rem;
      span {
        font-size: 1.2rem;
      }
    }
  }
  .sureBtn {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    bottom: env(safe-area-inset-bottom);

    height: 2.67rem;
    line-height: 2.67rem;
    text-align: center;
    clear: both;
    overflow: hidden;
    .van-button {
      width: 40%;
      height: 100%;
      border-radius: 0.27rem;
      span {
        font-size: 1.2rem;
      }
    }
  }
}
</style>

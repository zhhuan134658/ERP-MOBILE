<template>
  <div id="addrenyuan">
    <div v-for="(item, index) in renyuanList" :key="index">
      <div class="item_renyuan">
        <van-icon v-if="!info" name="cross" @click="deleteren(item)" />
        <div class="itemname">
          <span v-if="!item.avatar">
            {{
              item.name.length <= 2
                ? item.name
                : item.name.substr(item.name.length - 2, 2)
            }}
          </span>
          <img v-else :src="item.avatar" alt />
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
      <img
        @click="addren"
        src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
        alt
      />
    </div>
    <div class="sureBtn">
      <van-button type="info" @click="calc">确定</van-button>

      <van-button type="warning" @click="calc">重置</van-button>
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
      renyuanList: [],
      list: { name: "sda" },
      agentid: "", //微应用id
      timeStamp: "", //时间戳
      noncestr: "", //签名随机串
      signature: "", //签名
      numble: "",
    };
  },

  methods: {
    calc() {
      // this.$router.push({
      //     path: '/createvent',
      // });
      if (this.$store.state.userData.iscreat == "5") {
        this.$router.push({
          path: "/createvent",
        });
      } else if (this.$store.state.userData.iscreat == "6") {
        this.$router.push({
          path: "/editevent",
        });
      }
    },
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
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

    setTitle() {
      dd.biz.navigation.setRight({
        show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },

    //删除人员 lichengList
    deleteren(tag) {
      this.renyuanList.splice(this.renyuanList.indexOf(tag), 1);
      this.$store.commit("setpersonnelList", this.renyuanList); //审批
      //   this.bzuserids = this.tagsData.map(item => {
      //     if (!item.userid) return "";
      //     return item.userid;
      //   });
      //   this.$store.commit("setbzglrenid", bzuserids);
    },
    // addren() {
    //     this.$router.push({
    //         path: '/address',
    //         query: {
    //             nextid: 1,
    //         },
    //     });
    // },
    addren() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 9, //最大可选人数
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
            that.renyuanList = that.deunique(
              that.renyuanList.concat(result.users)
            );
            if (that.renyuanList.length > 10) {
              Toast("负责人不可超过9人");
            } else {
              that.$store.commit("setpersonnelList", that.renyuanList); //审批
            }
          },
          onFail: function (err) {},
        });
      });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.renyuanList = this.$store.state.userData.personnelList;

    console.log(this.info);
  },
  mounted() {
    // this.dingding();
  },
};
</script>
<style lang="less">
#addrenyuan {
  padding: 1rem 0;
  img {
    // margin-left: 0.16rem;
    float: left;
    width: 3.33rem;
    height: 3.33rem;
  }
  .item_icon {
    float: left;
    width: 0.83rem;
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
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 2.67rem;
        text-align: center;

        color: #fff;
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

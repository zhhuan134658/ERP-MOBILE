<template>
  <!--  -->
  <div id="quanxianren">
    <div class="member-item" v-for="(item, index) in FilesList" :key="index">
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
        <div class="member-font1">{{ item.name }}</div>
        <div class="member-font2" @click="goInfo(item)">删除</div>
      </div>
    </div>

    <Empty v-if="Emptyshow"></Empty>
    <!-- {{ this.$store.state.userData.xminfo}} -->
    <div class="sureBtn">
      <van-button @click="addguamli" type="info">添加人员</van-button>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import Empty from "../common/Empty.vue";
import qs from "qs";
export default {
  name: "quanxianren",
  components: { Empty },
  data() {
    return {
      FilesList: [],
      loading: false,
      finished: false,
      total: "",
      current_page: 1,
      Emptyshow: false,
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
    goInfo(item) {
      this.$axios
        .post("/erp_check/roleuserdelete", {
          users: [item.emplId],
          id: this.$route.query.val.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            Toast(res.data.msg);
            this.getInfo();
          } else {
            Toast(res.data.msg);
          }
        });
    },
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "编辑人员", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.userid) && res.set(arr.userid, 1)
      );
    },
    addpeo(userlist) {
      this.$axios
        .post("/finance/ryqxadd", {
          j_id: this.$route.query.val.id,
          userid: userlist,
        })
        .then((res) => {
          if (res.data.code == 1) {
            Toast(res.data.msg);

            this.getInfo();
          } else {
            Toast(res.data.msg);
          }
        });
    },
    addguamli() {
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
            let chengyuanList = result.users;
            that.addpeo(chengyuanList);
            // if (value == '1') {
            // } else {
            //     that.chengyuanList = that.deunique(
            //         that.chengyuanList.concat(
            //             result.users.map(function (item) {
            //                 return Object.assign(item, {
            //                     corp_id:
            //                         that.$store.state.userData.cid
            //                 });
            //             })
            //         )
            //     );

            //     that.$store.commit(
            //         'setchengyuanList',
            //         that.chengyuanList
            //     ); //
            // }
          },
          onFail: function (err) {},
        });
      });
    },

    getInfo() {
      this.FilesList = [];
      this.$axios
        .post("/erp_check/roleuserlist", {
          id: this.$route.query.val.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.FilesList = res.data.data;
          } else {
            Toast(res.data.msg);
          }
        });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getInfo();
  },
  mounted() {},
};
</script>
<style lang='less' >
#quanxianren {
  padding-top: 0.33rem;
  .active {
    background-color: red;
  }
  // /* 奇数行的样式 */
  // .list-style:nth-child(odd) > .item-style {
  //     background: #f8fbfd;
  // }

  // /* 偶数行的样式 */
  // .list-style:nth-child(even) > .item-style {
  //     background: #666;
  // }
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
        background-color: #387ef5;
        color: #fff;
      }
    }
    .member-font {
      width: 80%;
      line-height: 3.33rem;
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      .member-font1 {
        margin-left: 0.67rem;
      }
      .member-font2 {
        color: #409eff;
      }
    }
  }
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
}
</style>

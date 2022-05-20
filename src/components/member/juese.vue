<template>
  <div id="juese">
    <div class="content" v-for="(item, index) in systemList" :key="index">
      <div class="item_font" style="width: 70%">
        {{ item.name }}({{ item.num }})
      </div>
      <div
        v-if="item.name != '管理员'"
        class="item_font2"
        @click="caozuo(item.id)"
      >
        操作
      </div>
    </div>

    <div class="sureBtn">
      <van-button @click="newadd" type="info">新增角色</van-button>
    </div>
    <van-dialog
      class="jdiaog"
      v-model="dialogshow"
      title="角色名"
      show-cancel-button
      @confirm="confirm"
      @cancel="cancel"
    >
      <div class="jdiaog_item">
        <input
          v-model="roleName"
          class="jdiaog_item_input"
          type="text"
          :maxlength="50"
          placeholder="请输入角色名"
        />
      </div>
    </van-dialog>
    <van-dialog
      class="jdiaog"
      v-model="editdialog"
      title="修改角色名"
      show-cancel-button
      @confirm="editconfirm"
      @cancel="editcancel"
    >
      <div class="jdiaog_item">
        <input
          v-model="editname"
          class="jdiaog_item_input"
          type="text"
          :maxlength="50"
          placeholder="请输入新的角色名"
        />
      </div>
    </van-dialog>

    <van-action-sheet
      v-model:show="popupshow"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Dialog } from "vant";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  name: "juese",
  data() {
    return {
      actions: [{ name: "重命名" }, { name: "删除" }],
      popupshow: false,
      caozuoid: "",
      editid: "",
      editdialog: false,
      editname: "",
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
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.popupshow = false;
      if (item.name == "重命名") {
        this.editjuese(this.caozuoid);
      } else {
        this.delejuese(this.caozuoid);
      }
    },
    caozuo(id) {
      console.log("456", id);
      this.caozuoid = id;
      this.popupshow = true;
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
    //dialog确定
    confirm() {
      if (this.roleName == "") {
        Toast("角色名不能为空");
      } else {
        this.$axios
          .post("/finance/addqxuser", {
            role_name: this.roleName,
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.roleName = "";
              this.getsystem();

              this.dialogshow = false;
            } else {
              Toast(res.data.msg);
            }
          });
      }
    },
    //dialog取消
    cancel() {
      this.roleName = "";
    },
    editcancel() {
      this.editname = "";
    },
    editconfirm() {
      if (this.editname) {
        this.$axios
          .post("/erp_check/updateqxuser", {
            id: this.editid,
            name: this.editname,
            corp_id: this.$store.state.userData.cid,
            type: "update",
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.getsystem();
              this.editname = "";
              Toast(res.data.msg);
            } else {
              Toast(res.data.msg);
            }
          });
      } else {
        Toast("角色名不能为空");
      }
    },

    //角色列表
    getsystem() {
      this.$axios
        .post("/erp_check/qxuserlist", {
          corp_id: this.$store.state.userData.cid,
        })
        .then((res) => {
          this.systemList = res.data.data;
        });
    },
    //新增角色
    newadd() {
      this.dialogshow = true;
    },
    //修改角色名
    editjuese(id) {
      this.editid = id;
      this.editdialog = true;
    },
    //删除角色
    delejuese(id) {
      Dialog.confirm({
        title: "提示",
        message: "一旦删除,无法恢复,请确认是否删除",
      })
        .then(() => {
          this.$axios
            .post("/erp_check/updateqxuser", {
              corp_id: this.$store.state.userData.cid,
              id: id,
              type: "delete",
            })
            .then((res) => {
              if (res.data.code == 1) {
                this.getsystem();
                Toast(res.data.msg);
              } else {
                Toast(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
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
  .van-dialog__header {
    padding-top: 0;
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
      // .van-collapse-item__wrapper {
      //     .van-collapse-item__content {
      //     }
      // }
    }
  }
}
</style>

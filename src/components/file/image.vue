<template>
  <!--  -->
  <div id="image">
    <div v-for="(item, index) in personnelList" :key="index">
      <van-cell :value="item.type" @click="showPicke(item)">
        <template #title>
          <span class="imgspan" v-if="!item.avatar">
            {{
              item.name.length <= 2
                ? item.name
                : item.name.substr(item.name.length - 2, 2)
            }}
          </span>
          <img v-else :src="item.avatar" alt />
          <span class="custom-title">{{ item.name }}</span>
        </template>
      </van-cell>
    </div>

    <Empty v-if="Emptyshow"></Empty>
    <div class="addrenwu" @click="upcreat">
      <img
        src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/wjTTiyEM2R1598253823583.png"
        alt
      />
    </div>
    <div class="sureBtn">
      <van-button type="info" @click="calc1">确定</van-button>

      <van-button type="warning" @click="calc">重置</van-button>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm1"
      />
    </van-popup>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "../common/Empty.vue";
export default {
  name: "image",
  components: { Empty },
  data() {
    return {
      Emptyshow: false,
      showPicker: false,
      personnelList: [],
      uploadList: [],
      manageList: [],
      viewList: [],
      columns: "",
      typeList: ["可管理", "可编辑", "可查看", "删除"],
      checkedList: "",
      users: {
        manage: [],
        upload: [],
        view: [],
      },
      editPeople: [],
      selectPowerPeople: [],
    };
  },
  computed: {},

  watch: {},
  methods: {
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
      );
    },
    //下拉
    onConfirm1(value) {
      const _this = this;
      _this.showPicker = false;

      if (value == "可管理") {
        _this.users.manage = _this.deunique(
          _this.users.manage.concat([_this.checkedList])
        );
        _this.editPeople = _this.checkedList;
        _this.getRebort("edit");
      } else if (value == "可编辑") {
        _this.users.upload = _this.deunique(
          _this.users.upload.concat([_this.checkedList])
        );
        _this.editPeople = _this.checkedList;
        _this.getRebort("edit");
      } else if (value == "可查看") {
        _this.users.view = _this.deunique(
          _this.users.view.concat([_this.checkedList])
        );
        _this.editPeople = _this.checkedList;
        _this.getRebort("edit");
      } else if (value == "删除") {
        // this.users.view = this.deunique(
        //     this.users.view.concat(this.checkedList)
        // );
        _this.editPeople = _this.checkedList;
        _this.getRebort("delete");
      }
      console.log(_this.users);
      _this.addNewPowerPeople();
    },
    addNewPowerPeople() {
      const _this = this;
      _this.$axios
        .post("/cy_xiezhu/FileRoleAdd", {
          corp_id: _this.$store.state.userData.cid,
          userid: _this.$store.state.userData.userid,
          xmid: _this.$store.state.userData.Selecteddata.id,
          admin: _this.$store.state.userData.admin,
          users: _this.users,
          fids: [_this.$store.state.userData.managementList[0].id],
        })
        .then((res) => {
          _this.getPowerPeopleList();
          if (res.data.code == 200) {
            Toast(res.data.msg);
          }
        });
    },
    showPicke(val) {
      this.showPicker = true;
      // this.numble = val;

      this.columns = this.typeList;

      this.checkedList = val;

      if (val.type == "可管理") {
        this.users.manage.splice(this.users.manage.indexOf(val), 1);
        console.log(this.users.manage);
      } else if (val.type == "可编辑") {
        this.users.upload.splice(this.users.upload.indexOf(val), 1);
        console.log(this.users.upload);
      } else if (val.type == "可查看") {
        this.users.view.splice(this.users.view.indexOf(val), 1);
        console.log(this.users.view);
      }
    },
    calc1() {
      this.$router.push({
        path: "/tuzhi",
      });
    },
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
    },
    upcreat() {
      this.$router.push({
        path: "/addressimg",
        query: {
          nextid: 1,
        },
      });
      this.$store.commit("setimgtype", "wenjianji"); //
    },
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "权限管理", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    //操作执行记录
    getRebort(stype) {
      const _this = this;
      let name, czconten;
      if (stype == "delete") {
        czconten = "删除人员权限" + JSON.stringify(_this.editPeople);
        name = 6;
      } else if (stype == "delete2") {
        czconten = "删除人员权限" + JSON.stringify(_this.selectPowerPeople);
        name = 6;
      } else if (stype == "edit") {
        czconten = "更改人员权限" + JSON.stringify(_this.editPeople);
        name = 6;
      } else if (stype == "add") {
        czconten = "添加人员权限" + JSON.stringify(_this.editPeople);
        name = 6;
      } else if (stype == "preview") {
        czconten = "预览文件";
        name = 1;
      }
      _this.$axios
        .post("/cy_xiezhu/CreatedJiLu", {
          corp_id: _this.$store.state.userData.cid,
          userid: _this.$store.state.userData.userid,
          xmid: _this.$store.state.userData.Selecteddata.id,
          fid: _this.$store.state.userData.managementList[0].id,
          admin: _this.$store.state.userData.admin,

          name: 6,
          czconten: czconten,
        })
        .then((res) => {
          if (res.data.code == 200) {
          } else {
          }
        });
    },
    //获取权限人员列表
    getPowerPeopleList() {
      this.$axios
        .post("/cy_xiezhu/FileRoleUserLisst", {
          userid: this.$store.state.userData.userid,
          fid: this.$store.state.userData.managementList[0].id,
          admin: this.$store.state.userData.admin,
          type: 0,
        })
        .then((res) => {
          if (res.data.code == 200) {
            if (res.data.content.length == 0) {
              this.Emptyshow = true;
            }
            this.uploadList = res.data.content.filter((item) => {
              return item.type == "upload";
            });

            this.manageList = res.data.content.filter((item) => {
              return item.type == "manage";
            });

            this.viewList = res.data.content.filter((item) => {
              return item.type == "view";
            });

            this.$store.commit("setuploadList", this.uploadList);
            this.$store.commit("setmanageList", this.manageList);
            this.$store.commit("setviewList", this.viewList);

            this.personnelList = this.$store.state.userData.manageList.concat(
              this.$store.state.userData.uploadList.concat(
                this.$store.state.userData.viewList
              )
            );

            for (var i = 0; i < this.personnelList.length; i++) {
              if (this.personnelList[i].type == "manage") {
                this.personnelList[i].type = "可管理";
              }
              if (this.personnelList[i].type == "upload") {
                this.personnelList[i].type = "可编辑";
              }
              if (this.personnelList[i].type == "view") {
                this.personnelList[i].type = "可查看";
              }
            }
            this.users.manage = this.$store.state.userData.manageList;
            this.users.upload = this.$store.state.userData.uploadList;
            this.users.view = this.$store.state.userData.viewList;
          } else {
            Toast(res.data.msg);
          }
        });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getPowerPeopleList();
  },
  mounted() {},
};
</script>
<style lang='less' >
#image {
  .van-cell {
    padding: 0 0.5rem;
    height: 3.33rem;
    .van-field__label {
      width: initial;
    }

    .van-cell__title {
      display: flex;
      align-items: center;

      height: 100%;
      line-height: 3.33rem;
      font-size: 1.17rem;
      padding-left: 0.33rem;
      img {
        display: inline-block;

        width: 3.33rem;
        height: 3.33rem;
        border-radius: 50%;
        margin-right: 0.67rem;
      }
      .imgspan {
        margin-right: 0.67rem;
        display: inline-block;
        background-color: #3595fc;
        width: 3.33rem;
        height: 3.33rem;
        border-radius: 50%;
        line-height: 3.33rem;
        text-align: center;

        color: #fff;
      }
      .custom-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 3.33rem;
      }
    }
    .van-cell__value {
      font-size: 1.17rem;
      line-height: 3.33rem;
      color: red;
    }
    .van-icon {
      font-size: 1.17rem;
      line-height: 3.33rem;
    }
  }
  .addrenwu {
    position: fixed;
    width: 30%;
    bottom: 15%;
    left: 35%;
    text-align: center;
    img {
      width: 3.33rem;
      height: 3.33rem;
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

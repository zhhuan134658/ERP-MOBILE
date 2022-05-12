<template>
  <!--     成员 -->
  <div id="jsmember">
    <div class="checked">
      <div
        class="checked_item"
        v-for="(item, index) in checkedList"
        :key="index"
        :class="num == index ? 'changeColor' : ''"
        @click="qiehuan(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div v-if="htshow">
      <div class="jstitle">人员列表</div>

      <div class="no" v-if="noshow">
        <img
          src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/RXFEa4Binr1595841603962.png"
          alt
        />
        <div class="nofont">暂无人员</div>
      </div>

      <div
        class="jsmember-item"
        v-for="(item, index) in poplelist"
        :key="index"
      >
        <div class="jsmember-img">
          <img v-if="item.avatar" :src="item.avatar" alt />
          <img
            v-else
            src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/fG6H84CW281592970680603.png"
            alt
          />
        </div>
        <div class="jsmember-font">
          <div class="jsmember-font1">{{ item.name }}</div>
          <div style="color: #409efe" @click="deleteren(item)">删除</div>
        </div>
      </div>
      <div class="tianjia">
        <img
          @click="getren"
          src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/tn2Fnceb371593679339801.png"
          alt
        />
      </div>
    </div>

    <div v-else>
      <div class="jstitle">功能权限</div>

      <div class="appCRBottom">
        <div>
          <div v-for="(item, index) in PowerList" :key="index">
            <div class="acrbHeader">
              <el-checkbox
                style="margin-right: 0; width: 100%"
                :indeterminate="item.isIndeterminate"
                v-model="item.checkAll"
                :label="item.id"
                :key="index"
                @change="handleCheckAllChange($event, item, index)"
                >{{ item.title }}</el-checkbox
              >
            </div>
            <div class="acrbFooter">
              <el-checkbox
                style="margin-right: 0; width: 40%; margin-left: 1rem"
                v-for="(ilist, lindex) in item.child"
                :label="ilist.id"
                v-model="ilist.checkAll"
                :key="lindex"
                @change="
                  handlecheckedRoleChange($event, item.title, ilist, index)
                "
                >{{ ilist.title }}</el-checkbox
              >
            </div>
          </div>
        </div>
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
  data() {
    return {
      noshow: false,
      htshow: true,
      poplelist: [],
      name: "",
      PowerList: [],

      zdata: [],
      checkedList: [
        { id: 1, name: "人员列表" },
        { id: 2, name: " 功能权限" },
      ],
      num: "",

      chshow: true,
      dialogshow: false,
      roleName: "",
      systemList: [],
      activeNames: ["1", "2"],
      list: ["a", "b"],
      result: [],
      result1: [],

      rolePower: [],
      postPowerId: [],
    };
  },
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "人员列表", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    qiehuan(index) {
      this.num = index;
      if (index == 0) {
        this.htshow = true;
        this.getlist();
      } else if (index == 1) {
        this.htshow = false;
        this.getfindAllRes();
      }
    },

    getlist() {
      axios
        .post("/index.php/api/dapplication/userShow", {
          group_id: this.$route.query.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            if (res.data.data.length == 0) {
              this.noshow = true;
            } else {
              this.poplelist = res.data.data;
              this.noshow = false;
            }
          }
        });
    },

    getren() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: "通讯录", //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1, //最大可选人数
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
            that.$axios
              .post("/index.php/api/dapplication/userAdd", {
                group_id: that.$route.query.id,
                userinfo: result.users[0],
              })
              .then((res) => {
                if (res.data.code == 1) {
                  Toast(res.data.msg);
                  that.getlist();
                }
              });
          },
          onFail: function (err) {},
        });
      });
    },
    deleteren(item) {
      this.$axios
        .post("/index.php/api/dapplication/userDel", {
          id: item.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            Toast(res.data.msg);
            this.getlist();
          }
        });
    },
    handleCheckAllChange(e, item, index) {
      item.checkAll = e;
      if (e == false) item.isIndeterminate = false; //去掉不确定状态
      this.PowerList[index].child.checkedRole = e;
      var childrenArray = this.PowerList[index].child;
      let noneArray = [];
      if (childrenArray) {
        for (let i = 0, len = childrenArray.length; i < len; i++) {
          childrenArray[i].checkAll = e;
        }
      }
      this.PowerList = this.PowerList.concat(noneArray);
      this.updateRolePower();
    },
    //子级选择
    handlecheckedRoleChange(e, list, ilist, index) {
      let tickCount = 0,
        unTickCount = 0;
      let noneArray = [];
      ilist.checkAll = e;
      for (let i = 0; i < list.length; i++) {
        if (list[i].checkAll == true) tickCount++;
        if (list[i].checkAll == false) unTickCount++;
      }
      if (tickCount == list.length) {
        //子级全勾选
        this.PowerList[index].checkAll = true;
        this.PowerList[index].isIndeterminate = false;
      } else if (unTickCount == list.length || tickCount < list.length) {
        //子级全不勾选或没有全勾选
        this.PowerList[index].checkAll = false;
        this.PowerList[index].isIndeterminate = false;
      } else {
        this.PowerList[index].checkAll = false;
        this.PowerList[index].isIndeterminate = true; //添加不确定状态
      }
      this.PowerList = this.PowerList.concat(noneArray);
      this.updateRolePower();
    },

    //获取所有权限
    getfindAllRes() {
      this.$axios
        .post("/index.php/api/dapplication/getUserRule", {
          id: this.$route.query.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.PowerList = res.data.data;
            this.PowerList = this.PowerList.map((item) => {
              return Object.assign(item, {
                isIndeterminate: false,
                checkAll: false,
              });
            });
            this.PowerList.forEach((item) => {
              item.child = item.child.map((item) => {
                return Object.assign(item, {
                  checkAll: false,
                });
              });
            });
            this.getRolePower();
          }
        });
    },
    //获取角色权限
    getRolePower() {
      const _this = this;
      _this.$axios
        .post("/index.php/api/dapplication/roleAuth", {
          id: _this.$route.query.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            let newArray = res.data.data;
            if (newArray.length > 0) {
              _this.rolePower = newArray.map((item) => {
                return item;
              });

              _this.comparison(_this.PowerList, _this.rolePower);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //对比相同值更改是否checked
    comparison(arr, Newarr) {
      const _this = this;
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        for (let j = 0; j < Newarr.length; j++) {
          let items = Newarr[j];
          if (item.id == items) {
            // item.isIndeterminate;
            item.checkAll = true;
          }
        }
        if (item.child.length > 0) {
          for (let k = 0; k < item.child.length; k++) {
            for (let p = 0; p < Newarr.length; p++) {
              let items = Newarr[p];
              if (item.child[k].id == items) {
                // item.isIndeterminate;
                item.child[k].checkAll = true;
              }
            }
          }
        }
      }
      let noneArray = [];
      _this.PowerList = _this.PowerList.concat(noneArray);
    },
    //更改角色权限
    updateRolePower() {
      const _this = this;
      _this.getPostPowerId();
      _this.$axios
        .post("/index.php/api/dapplication/distributeRoleAuth", {
          id: _this.$route.query.id,
          rules: _this.postPowerId.toString(),
        })
        .then((res) => {
          if (res.data.code == 1) {
            // _this.getAllPower();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //抽取更改权限id
    getPostPowerId() {
      const _this = this;
      _this.postPowerId = [];
      for (let i = 0, len = _this.PowerList.length; i < len; i++) {
        if (_this.PowerList[i].checkAll == true)
          _this.postPowerId.push(_this.PowerList[i].id);
        if (_this.PowerList[i].child && _this.PowerList[i].child.length > 0) {
          let sonPermissionArray = _this.PowerList[i].child;
          for (let j = 0, leng = sonPermissionArray.length; j < leng; j++)
            if (sonPermissionArray[j].checkAll == true) {
              _this.postPowerId.push(sonPermissionArray[j].id);
            }
        }
      }
    },
  },
  mounted() {},
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getlist();
  },
};
</script>
<style lang="less">
#jsmember {
  height: 100%;
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
  .no {
    background-color: #f3f6fd;
    width: 100%;
    text-align: center;
    padding-top: 50%;

    img {
      width: 348px;
      height: 6.67rem;
    }
    .nofont {
      font-size: 1.67rem;
      text-align: center;
      color: #bfbfbf;
    }
  }
  .jsmember-item {
    border-bottom: 0.1rem solid #f3f6fd;

    padding: 0.3rem;
    background-color: #fff;
    display: flex;
    .jsmember-img {
      width: 2.67rem;
      height: 2.67rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .jsmember-font {
      width: 80%;
      line-height: 2.67rem;
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      .jsmember-font1 {
        margin-left: 0.67rem;
      }
      .jsmember-font2 {
        color: #409eff;
        float: right;
      }
    }
  }
  .tianjia {
    width: 100%;
    height: 3.33rem;
    position: fixed;
    bottom: 3.33rem;
    text-align: center;
  }
  .appCRBottom {
    padding: 0.67rem;
    box-sizing: border-box;
    background-color: #fff;
    .acrbHeader {
      display: flex;
      .el-checkbox {
        height: 2.67rem;
        width: 40%;
        display: flex;
        // justify-content: center;

        align-items: center;
        margin-right: 0 !important;
        .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
          height: 0.1rem;
        }
        .el-checkbox__input {
          display: inline;
          .el-checkbox__inner {
            width: 1rem;
            height: 1rem;
          }
          .el-checkbox__inner::after {
            width: 1rem;
            height: 1rem;
            top: -0.5rem;
            left: -7px;
          }
        }
        .el-checkbox__label {
          display: inline;
          font-size: 1.33rem;
          line-height: 1.33rem;
        }
      }
    }
    .acrbFooter {
      .el-checkbox {
        height: 2.67rem;
        display: flex;

        // display: inline;

        // justify-content: center;

        align-items: center;

        .el-checkbox__input {
          .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
            height: 0.1rem;
          }
          display: block;
          .el-checkbox__inner {
            width: 1rem;
            height: 1rem;
          }
          .el-checkbox__inner::after {
            width: 1rem;
            height: 1rem;
            top: -0.5rem;
            left: -7px;
          }
        }
        .el-checkbox__label {
          display: block;
          font-size: 1rem;
          line-height: 1.33rem;
        }
      }
    }
  }
  .changeColor {
    color: #409eff !important;
    border-bottom: 0.03rem solid #409efe;
  }
  .jstitle {
    height: 3.33rem;
    background-color: #f3f6fd;
    line-height: 3.33rem;
    color: #409efe;
    font-size: 1.5rem;
    margin-left: 1rem;
  }
}
</style>

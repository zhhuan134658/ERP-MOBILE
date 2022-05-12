<template>
  <!--  -->
  <div id="FileJiaGou">
    <div class="moveClass">
      <el-tree
        :props="sDefaultProps"
        :load="sloadNode"
        node-key="parentid"
        lazy
        :expand-on-click-node="false"
        ref="stree"
        show-checkbox
        check-strictly
        @check="handleCheck"
      ></el-tree>
    </div>
    <div class="sureBtn">
      <van-button type="info" @click="moveFileClick">确定</van-button>
      <van-button type="warning" @click="closeMove">重置</van-button>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "FileJiaGou",
  components: {},
  data() {
    return {
      sDefaultProps: {
        id: "prantid",
        label: "name",
        children: "content",
        isLeaf: "leaf",
      },
      movefilesid: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "文件架构", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
    },
    //el-tree执行单选
    handleCheck(a, b) {
      //a为传递给 data 属性的数组中该节点所对应的对象；b为树目前的选中状态对象
      this.$refs.stree.setCheckedNodes([a]);
      this.moveId = a.parentid;
      console.log(this.moveId);
    },
    sloadNode(node, resolve) {
      const that = this;

      if (node.level === 0) {
        that.$axios
          .post("/cy_xiezhu/FileJiaGou", {
            corp_id: that.$store.state.userData.cid,
            userid: that.$store.state.userData.userid,
            parentid: 1,
            xmid: that.$store.state.userData.Selecteddata.id,
            admin: that.$store.state.userData.admin,
          })
          .then((res) => {
            if (res.data.code == 200) {
              let result = res.data.content;
              return resolve(result);
            }
          });
      } else if (node.level > 0) {
        let _id = node.data.parentid;
        console.log("77+++" + JSON.stringify(node.data));
        //-----获取子级组织
        that.$axios
          .post("/cy_xiezhu/FileJiaGou", {
            xmid: that.$store.state.userData.Selecteddata.id,
            userid: that.$store.state.userData.userid,
            parentid: _id,
            corp_id: that.$store.state.userData.cid,
            admin: that.$store.state.userData.admin,
          })
          .then((res) => {
            if (res.data.code == 200) {
              let result = res.data.content;
              return resolve(result);
            }
          });
      }
    },
    moveFileClick() {
      const _this = this;

      if (_this.moveId) {
        _this.$axios
          .post("/cy_xiezhu/YiDongFile", {
            corp_id: _this.$store.state.userData.cid,
            xmid: _this.$store.state.userData.Selecteddata.id,
            userid: _this.$store.state.userData.userid,
            admin: _this.$store.state.userData.admin,
            parentid: _this.moveId,
            fids: _this.movefilesid,
          })
          .then((res) => {
            if (res.data.code == 200) {
              Toast("移动文件成功");
              _this.$router.go(-1);
            }
          });
      } else {
        Toast("请先选择文件夹");
      }
    },
    closeMove() {
      _this.$router.go(-1);
    },
  },
  created() {
    this.movefilesid = this.$route.query.moveid;
    this.utils.checkding();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
#FileJiaGou {
  padding: 0.67rem;
  .el-tree {
    .el-tree-node {
      .el-tree-node__content {
        height: inherit;
        .el-checkbox {
          .el-checkbox__input {
            .el-checkbox__inner {
              width: 1.67rem;
              height: 1.67rem;
            }
            .el-checkbox__inner:after {
              width: 0.5rem;
              height: 1rem;

              left: 0.47rem;
            }
          }
        }
        .el-tree-node__expand-icon {
          font-size: 1.5rem;
        }
        .el-tree-node__label {
          font-size: 1.5rem;
        }
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
}
</style>

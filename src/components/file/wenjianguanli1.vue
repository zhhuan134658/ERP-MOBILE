<template>
  <!--  -->
  <div id="wenjianguanli1">
    <div v-for="(item, index) in personnelList" :key="index">
      <van-cell value="删除" @click="deleteren1(item)">
        <template #title>
          <img :src="item.avatar" alt />
          <span class="custom-title">{{ item.name }}</span>
        </template>
      </van-cell>
    </div>

    <Empty v-if="addshow"></Empty>
    <div class="addrenwu" @click="upcreat">
      <img
        src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/wjTTiyEM2R1598253823583.png"
        alt
      />
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import Empty from "../common/Empty.vue";
import qs from "qs";
export default {
  name: "wenjianguanli1",
  components: { Empty },
  data() {
    return {
      Emptyshow: false,
      addshow: false,
      personnelList: [],
      users: {
        manage: this.$store.state.userData.manageList,
        upload: this.$store.state.userData.uploadList,
        view: this.$store.state.userData.viewList,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "文件管理", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
      );
    },
    upcreat() {
      this.$router.push({
        path: "/addressimg",
        query: {
          nextid: 1,
        },
      });
      this.$store.commit("setimgtype", "wenjian"); //
    },
    deleteren1(tag) {
      this.personnelList.splice(this.personnelList.indexOf(tag), 1);

      if (this.$store.state.userData.filetype == "view") {
        // this.$store.commit('setviewList', this.personnelList);
        this.users.view = this.deunique(
          this.users.view.concat(this.personnelList)
        );
        this.$store.commit("setviewList", this.users.view); //
      } else if (this.$store.state.userData.filetype == "upload") {
        this.users.upload = this.deunique(
          this.users.upload.concat(this.personnelList)
        );
        this.$store.commit("setuploadList", this.users.upload); //
      } else if (this.$store.state.userData.filetype == "manage") {
        this.users.manage = this.deunique(
          this.users.manage.concat(this.personnelList)
        );
        this.$store.commit("setmanageList", this.users.manage); //
      }
      this.addNewPowerPeople();
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
          if (res.data.code == 200) {
            Toast(res.data.msg);
          } else {
            Toast(res.data.msg);
          }
        });
    },
  },
  created() {
    if (this.$store.state.userData.filetype == "view") {
      this.personnelList = this.$store.state.userData.viewList;
    } else if (this.$store.state.userData.filetype == "upload") {
      this.personnelList = this.$store.state.userData.uploadList;
    } else if (this.$store.state.userData.filetype == "manage") {
      this.personnelList = this.$store.state.userData.manageList;
    }
    if (this.personnelList.length == 0) {
      this.addshow = true;
    }
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
#wenjianguanli1 {
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
        height: 3.33rem;
        width: 3.33rem;
        border-radius: 50%;
        margin-right: 0.67rem;
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
}
</style>

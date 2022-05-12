<template>
  <!--  -->
  <div id="wenjianguanli">
    <van-cell
      title="谁可以管理"
      is-link
      :value="managevalue"
      @click="goguanli('manage')"
    />
    <van-cell
      title="谁可以编辑/上传"
      is-link
      :value="uploadvalue"
      @click="goguanli('upload')"
    />
    <van-cell
      title="谁可以查看"
      is-link
      :value="viewvalue"
      @click="goguanli('view')"
    />
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "wenjianguanli",
  components: {},
  data() {
    return {
      managevalue: "",
      uploadvalue: "",
      viewvalue: "",
      uploadList: [],
      manageList: [],
      viewList: [],
      managementList: this.$route.query.managementList,
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
    //获取权限人员列表
    getPowerPeopleList() {
      this.$axios
        .post("/cy_xiezhu/FileRoleUserLisst", {
          xmid: this.$store.state.userData.Selecteddata.id,
          userid: this.$store.state.userData.userid,
          fid: this.$store.state.userData.managementList[0].id,
          admin: this.$store.state.userData.admin,
          type: 0,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.uploadList = res.data.content.filter((item) => {
              return item.type == "upload";
            });

            this.uploadvalue = this.uploadList.length + "人";
            this.manageList = res.data.content.filter((item) => {
              return item.type == "manage";
            });
            this.managevalue = this.manageList.length + "人";
            this.viewList = res.data.content.filter((item) => {
              return item.type == "view";
            });
            console.log(this.viewList);
            this.viewvalue = this.viewList.length + "人";

            this.$store.commit("setuploadList", this.uploadList);
            this.$store.commit("setmanageList", this.manageList);
            this.$store.commit("setviewList", this.viewList);
            // if()
          }
        });
    },
    goguanli(typename) {
      this.$router.push({
        path: "/wenjianguanli1",
        query: {
          type: typename,
        },
      });

      this.$store.commit("setfiletype", typename);

      if (typename == "upload") {
        this.$store.commit("setuploadList", this.uploadList);
      } else if (typename == "manage") {
        this.$store.commit("setmanageList", this.manageList);
      } else if (typename == "view") {
        this.$store.commit("setviewList", this.viewList);
      }
    },
  },
  created() {
    this.getPowerPeopleList();
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
#wenjianguanli {
  .van-cell {
    padding: 0 0.5rem;
    height: 3.33rem;
    .van-field__label {
      width: initial;
    }
    .van-cell__title {
      height: 100%;
      line-height: 3.33rem;
      font-size: 1.17rem;
      padding-left: 0.33rem;
    }
    .van-cell__value {
      font-size: 1.17rem;
      line-height: 3.33rem;
    }
    .van-icon {
      font-size: 1.17rem;
      line-height: 3.33rem;
    }
  }
}
</style>

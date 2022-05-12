<template>
  <!--  -->
  <div id="mubanlist">
    <!-- <van-sticky>
            <div class="inputdiv">
                <van-search
                    v-model="Searchname"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                >
                    <div slot="action">
                        <van-button
                            @click="onLoad"
                            type="default"
                        >搜索</van-button>
                        <van-button
                            v-if="caozuoshow"
                            @click="operating"
                            type="default"
                        >操作</van-button>
                    </div>
                </van-search>
            </div>
        </van-sticky> -->

    <div class="content">
      <div
        class="content_item"
        v-for="(item, index) in FilesList"
        @click="active(index, item)"
      >
        <img :src="item.tmpimg" alt="" />

        <div class="item_font">{{ item.tmpname }}</div>
        <!-- <div v-if="datanumber[index] != 0" class="tag">
                    {{ datanumber[index] }}
                </div> -->
      </div>
    </div>

    <Empty v-if="Emptyshow"></Empty>

    <van-dialog
      v-model="zxmdialog"
      title="请选择项目"
      show-cancel-button
      @confirm="confirmd"
      @cancel="quxiao"
    >
      <van-field
        input-align="right"
        v-model="datainfo.tmpname"
        name="模板名称"
        maxlength="50"
        label="模板名称"
        placeholder="请填写模板名称"
        :rules="[{ required: true, message: '请填写模板名称' }]"
        readonly
      />
      <van-field
        class="zh_vant_isprop"
        readonly
        @click="showPopup"
        input-align="right"
        v-model="zxmname"
        name="项目名称"
        label="项目名称"
        placeholder="请选择项目名称"
        maxlength="50"
        :rules="[{ required: false, message: '请选择项目名称' }]"
      />
    </van-dialog>
    <van-popup v-model="zxmshow" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @cancel="zxmshow = false"
        @confirm="onConfirm1"
      />
    </van-popup>
  </div>
</template>

<script>
import Empty from "../common/Empty.vue";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "mubanlist",
  components: { Empty },
  data() {
    return {
      zxmid: "",
      newitem: "",
      columns: [],
      selecval: "",
      zhuxnname: "",
      zxmname: "",
      zxmshow: false,
      zxmList: [],
      zxmdialog: false,
      jiaoshow: false,
      currentSort: "",
      plfile: [],
      Emptyshow: false,
      dialogshow: false,
      commontext: "",
      itemdata: "",
      caozuoshow: false,
      // 分页列表
      Searchname: "",
      FilesList: [],
      isLoading: false,
      loading: false, // 当loading为true时，转圈圈
      current_page: 1,

      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了
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
    // 选择框
    showPopup(val) {
      this.$router.replace({
        path: "/projectnewlist",
        query: {
          datainfo: this.datainfo,
          type: "1",
        },
      });
      // this.zxmshow = true;

      // this.selecval = 'name';
      // this.columns = this.zxmList;
    },
    onConfirm1(value) {
      console.log(value);

      this.zxmname = value.name;
      this.zxmid = value.id;

      this.zxmshow = false;
    },
    quxiao() {
      this.zxmname = "";
      this.zxmid = "";
    },
    confirmd() {
      this.sure(this.newitem);
    },
    active(index, item) {
      // this.currentSort = index;

      // if (this.zxmList.length > 0) {
      //     this.datainfo = item;
      //     this.zxmdialog = true;
      //     this.newitem = item;
      // } else {
      //     this.sure(item);
      // }
      let _this = this;
      _this.$axios
        .post("/task/gettmpcode", {
          corp_id: _this.$store.state.userData.cid,
          tmpname: item.tmpname,

          // xmname: _this.zxmname,
          userid: _this.$store.state.userData.userid,
        })
        .then((res) => {
          const openurl =
            "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=" +
            _this.$store.state.userData.cid +
            "&swfrom=qrshareh5&tempalteName=" +
            _this.datainfo.tmpname +
            "&processCode=" +
            res.data.process_code +
            "&back=native#/custom";
          // _this.openurl =
          //     'https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?corpid=' +
          //     _this.$store.state.userData.cid +
          //     '#/custom/?processCode=' +
          //     res.data.process_code;
          dd.ready(function () {
            dd.biz.util.openLink({
              url: openurl, //要打开链接的地址
              onSuccess: function (result) {
                /**/
              },
              onFail: function (err) {},
            });
          });
        });
    },
    setTitle() {
      dd.biz.navigation.setTitle({
        title: "审批模板", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
      });
    },

    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.tmpname) && res.set(arr.tmpname, 1)
      );
    },
    getmbList() {
      this.$axios.post("/task/tmptypelist").then((res) => {
        if (res.data.code == 1) {
          this.FilesList = res.data.content;
          this.datainfo = this.FilesList[0];
        }
      });
    },

    calc() {
      this.$router.push({
        path: "/application",
      });
    },
    sure(item) {
      const _this = this;
      console.log(_this.datainfo);

      _this.$axios
        .post("/task/gettmpcode", {
          corp_id: _this.$store.state.userData.cid,
          tmpname: _this.datainfo.tmpname,
          xmid: _this.zxmid,
          xmname: _this.zxmname,
          userid: _this.$store.state.userData.userid,
        })
        .then((res) => {
          _this.openurl =
            "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=" +
            _this.$store.state.userData.cid +
            "&swfrom=qrshareh5&tempalteName=" +
            _this.datainfo.tmpname +
            "&processCode=" +
            res.data.process_code +
            "&back=native#/custom";
          // _this.openurl =
          //     'https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?corpid=' +
          //     _this.$store.state.userData.cid +
          //     '#/custom/?processCode=' +
          //     res.data.process_code;
          dd.ready(function () {
            dd.biz.util.openLink({
              url: _this.openurl, //要打开链接的地址
              onSuccess: function (result) {
                /**/
              },
              onFail: function (err) {},
            });
          });
        });
    },
    //获取子项目列表
    getzxmList() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        if (res.data.code == 1) {
          this.zxmList = res.data.data;
        }
      });
    },
  },
  activated() {
    this.$utils.checkding();
    this.setTitle();
    // alert(this.$route.query.pro_name);
    if (this.$route.query.datainfo) {
      this.datainfo = this.$route.query.datainfo;
    } else {
      this.getmbList();
    }

    this.zxmname = this.$route.query.pro_name.name;
    this.zxmid = this.$route.query.pro_name.id;
    // this.zxmdialog = this.$route.query.isshow;

    this.getzxmList();
  },
  mounted() {},
};
</script>
<style lang='less' >
#mubanlist {
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
      padding: 0;
      margin: 0.25rem;
      .van-search__action {
        font-size: 1rem;
        line-height: 1rem;
        background-color: #409efe;
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
  .van-list {
    margin-top: 0.67rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    box-sizing: border-box;

    .mubanitem {
      width: 33.3333%;

      .mubanimg {
        border: 0.1rem solid #e4e4e4;
        height: 350px;
        margin: 3%;
        border-radius: 0.67rem;
        position: relative;
        overflow: hidden;
        .itemimg {
          width: 100%;
          height: 100%;
        }
        .jiaobiao {
          opacity: 0;
          position: absolute !important;
          top: -5px !important;
          right: -5px !important;
          width: 3.33rem !important;
        }
      }
      .numanfont {
        text-align: center;
        color: #767779;
      }
    }
  }
  .sureBtn {
    position: fixed;
    width: 100%;
    background-color: #fff;
    padding: 0 20px;
    bottom: 0;
    height: 5rem;
    line-height: 2.67rem;
    text-align: center;

    overflow: hidden;
    .van-button {
      margin-top: 0.5rem;
      width: 40%;
      height: 2.67rem;
      border-radius: 0.27rem;
      span {
        font-size: 1.2rem;
      }
    }
  }
  .surecolor {
    border: 0.13rem solid #328df8 !important;
  }
  .jiaoshow {
    opacity: 1 !important;
    position: absolute !important;
    top: -5px !important;
    right: -5px !important;
    width: 3.33rem !important;
  }
  .content {
    border-bottom-left-radius: 0.33rem;
    border-bottom-right-radius: 0.33rem;

    background-color: #fff;
    display: flex;

    flex-wrap: wrap;
    .content_item {
      padding: 0.67rem 0;
      width: 25%;
      text-align: center;
      position: relative;
      img {
        width: 2.33rem;
        border-radius: 50%;
      }
      .item_font {
        margin-top: 0.33rem;
      }
      .tag {
        background-color: red;
        position: absolute;
        border-radius: 50%;
        width: 0.83rem;
        height: 0.83rem;
        line-height: 0.83rem;
        padding: 0.16rem;
        font-size: 0.5rem;
        color: #fff;
        font-weight: 500;
        top: 0.16rem;
        right: 20%;
      }
    }
  }
}
</style>

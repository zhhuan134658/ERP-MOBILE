<template>
  <!-- 项目列表 -->
  <div id="jinduplay">
    <van-sticky>
      <div class="inputdiv">
        <van-search
          v-model="Searchname"
          placeholder="请填写搜索条件"
          shape="round"
          @change="searchonLoad"
        >
          <!-- <div slot="action">
            <van-button @click="showPopup(1)" type="default">筛选</van-button>
            <van-button @click="showPopup(2)" type="default">分类</van-button>
          </div> -->
        </van-search>
      </div>
    </van-sticky>
    <!-- 项目主体 -->
    <div
      style="
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 0px 13px;
      "
    >
      <div>项目名称:</div>

      <van-dropdown-menu style="flex: 1" active-color="#1989fa">
        <van-dropdown-item
          @change="changeDrop"
          v-model="value1"
          :options="xmList"
        />
      </van-dropdown-menu>
    </div>

    <van-tabs v-model="active" color="#1989fa" @click="clickTab">
      <van-tab
        v-for="(item, index) in columnsList"
        :key="index"
        :title="item.name"
        :name="item.id"
      ></van-tab>
    </van-tabs>
    <div class="pr_list">
      <div
        class="list_item"
        v-for="item in ProjectList"
        :key="item"
        @click="goedit(item)"
      >
        <div class="item_name">
          <div class="pr_name">{{ item.name }}</div>
          <div class="pr_edit">
            <!-- <van-icon name="edit" />编辑 -->
          </div>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div>
            <div class="item_tel" style="margin-bottom: 0.5rem">
              负责人:{{
                item.personincharge.map((person) => person.name).join("，")
              }}
            </div>
            <div class="item_tel">
              计划状态：<span
                v-if="item.schedule_status.includes('已完成')"
                style="color: #0089ff"
                >{{ item.schedule_status }}</span
              >
              <span
                v-else-if="item.schedule_status.includes('进行中')"
                style="color: #e8a54c"
                >{{ item.schedule_status }}</span
              >
              <span v-else style="color: #f17070">{{
                item.schedule_status
              }}</span>
            </div>
          </div>
          <div>
            <van-circle
              size="80px"
              layer-color="#EBEDF0"
              :stroke-width="60"
              v-model="item.schedule"
              :rate="item.schedule"
              :speed="90"
              :text="item.schedule + '%'"
            />
          </div>
        </div>
      </div>
    </div>

    <Empty v-if="Emptyshow"></Empty>
    <div class="footle">
      <div class="footle_font" @click="gocreat">新增进度计划</div>
    </div>
    <van-popup v-model="popupshow" position="bottom" :style="{ height: '38%' }">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @confirm="onConfirm1"
      />
    </van-popup>
    <van-action-sheet
      @select="onSelect"
      v-model="sheetshow"
      :actions="actions1"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
import Empty from "../../common/Empty.vue";
export default {
  name: "jinduplay",
  components: { Empty },
  data() {
    return {
      active: 1,
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      selecval: "",
      is_complete: 1,
      selectype: "",
      columns: [],
      columnsList: [
        { name: "周计划", id: 1 },
        { name: "月计划", id: 2 },
        { name: "年计划", id: 3 },
        { name: "总计划", id: 4 },
      ],
      xuanze: true,
      itemdata: "",
      // actions: [{ name: '完成' }, { name: '删除' }, { name: '编辑信息' }],
      actions1: [{ name: "上报" }, { name: "删除" }, { name: "编辑信息" }],
      actions2: [{ name: "编辑信息" }],
      sheetshow: false,
      checkid: "",
      checkname: "",
      popupshow: false,
      xmList: [],
      show: true,
      Emptyshow: false,
      Searchname: "",

      val: "",
      //分页
      ProjectList: [
        // {
        //     day: 28,
        //     fid: '测试',
        //     id: '24',
        //     jdstatus: null,
        //     jdtitle: '21323',
        //     jduser: '张欢欢',
        //     jindu: '42.86',
        //     speed: 'NaN',
        //     starttime: '2021-08-01',
        //     status: 2,
        //     stoptime: '2021-08-28',
        //     sytime: '已使用12天',
        //     xmid: '19'
        // }
      ],
      list: [],
      loading: false,
      finished: false,
      total: "",
      current_page: 1,
    };
  },
  computed: {},
  watch: {
    ProjectList: {
      handler(val) {
        if (val && val.length > 0) {
          this.Emptyshow = false;
        } else {
          this.Emptyshow = true;
        }
      },
    },
  },
  methods: {
    setTitle() {
      const that = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: that.checkname, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function () {},
          onFail: function () {},
        });
      });
    },
    shaixuan() {},
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.sheetshow = false;
      //       this.itemdata

      if (item.name == "上报") {
        this.$router.push({
          path: "/jinduReport",
          query: {
            itemdata: this.itemdata,
          },
        });
      } else if (item.name == "删除") {
        Dialog.confirm({
          title: "提示",
          message: "一旦删除,无法恢复,请确认是否删除",
        })
          .then(() => {
            this.deleitem(this.itemdata.id);
          })
          .catch(() => {
            // on cancel
          });
      } else if (item.name == "编辑信息") {
        this.$router.push({
          path: "/jinduplayedit",
          query: {
            itemdata: this.itemdata,
          },
        });
      }
    },
    //删除
    deleitem(id) {
      this.$axios
        .post("/finance/schedule_del", {
          id: id,
        })
        .then((res) => {
          Toast(res.data.msg);
          this.onLoadlist();
        });
    },

    gocreat() {
      this.$router.push({
        path: "/jinduplaycreat",
        query: {
          type: "creat",
        },
      });
    },
    goedit(item) {
      // this.$router.push({
      //     path: '/shijianedit',
      //     query: {
      //         itemdata: item
      //     }

      // });
      // if (item.status != '1') {
      this.sheetshow = true;
      this.itemdata = item;
      this.actions = this.actions1;
      // if (this.itemdata.jdstatus == 3) {
      //     this.xuanze = false;
      //     this.actions = this.actions2;
      // } else {
      //     this.xuanze = true;
      //     this.actions = this.actions1;
      // }
      // }
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    searchonLoad() {
      this.onLoadlist(this.checkid);
    },

    sear() {},
    onLoadlist() {
      this.$axios
        .post("/finance/schedule_list", {
          name: this.Searchname, //搜索参数，项目名称搜索
          xmid: this.checkid,

          type: 1,
          is_complete: this.is_complete,
          current_page: this.current_page,
          number: 99999,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.ProjectList = res.data.content.list;
          } else {
            Toast(res.data.msg);
          }
        });
    },
    // 选择框
    showPopup(val) {
      this.selectype = val;
      if (val == 1) {
        this.popupshow = true;

        this.selecval = "name";
        this.columns = this.xmList;
      } else {
        this.popupshow = true;

        this.selecval = "name";
        this.columns = this.columnsList;
      }
    },
    onConfirm1(value) {
      if (this.selectype == 1) {
        this.checkid = value.id;
        this.checkname = value.name;
        this.$store.commit("setlcxminfo", value);
        this.onLoadlist();
        this.popupshow = false;
        this.setTitle();
      } else {
        this.is_complete = value.id;

        this.onLoadlist();
        this.popupshow = false;
        this.setTitle();
      }
    },
    clickTab(name, title) {
      console.log(name, title);
      this.is_complete = name;
      this.$nextTick(() => {
        this.onLoadlist();
      });
    },
    changeDrop(value) {
      console.log("789456", value);
      this.xmList.forEach((item) => {
        if (item.id === value) {
          console.log(item);
          this.checkid = value;
          this.$store.commit("setlcxminfo", item);
          this.$nextTick(() => {
            this.onLoadlist();
          });
        }
      });
    },
    getxmlist() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.xmList = res.data.data;
        this.xmList.map((item) => {
          item["text"] = item["name"];
          item["value"] = item["id"];
        });

        if (this.$store.state.userData.lcxminfo.id) {
          this.value1 = this.$store.state.userData.lcxminfo.id;
          this.checkid = this.$store.state.userData.lcxminfo.id;
        } else {
          this.value1 = this.xmList[0].id;
          this.$store.commit("setlcxminfo", this.xmList[0]);
          this.checkid = this.xmList[0].id;
        }

        // this.checkname = this.xmList[0].name;
        // this.checkid = this.xmList[0].id;

        this.onLoadlist();
      });
    },
  },
  mounted() {},
  created() {
    // this.checkname = this.$store.state.userData.lcxminfo.name;
    // this.checkid = this.$store.state.userData.lcxminfo.id;
    this.$utils.checkding();
    // this.setTitle();

    // this.onLoadlist();
    this.getxmlist();
  },
};
</script>
<style lang="less">
#jinduplay {
  .van-dropdown-menu__bar {
    box-shadow: inherit;
  }
  .van-dropdown-menu__title {
    display: flex;
    width: 100%;
  }
  .van-dropdown-menu__title::after {
    right: 4px;
  }
  .inputdiv {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    width: 100%;
    height: 4.5rem;

    background-color: #e6e6e6;
    .van-search {
      width: 100%;
      height: 100%;

      .van-search__action {
        font-size: 0.6rem;

        background-color: #fff;
        .van-button {
          height: 1.8rem;
          width: 4rem;

          .van-button__text {
            font-size: 1rem;
          }
        }
      }
      .van-search__action {
        height: 100%;
        line-height: 3rem;
        .van-button--normal {
          border-radius: 0.33rem;
          height: 2.5rem;
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
          height: 2.5rem;
          line-height: 2.2rem;
          font-size: 1rem;
          .van-field__left-icon {
            .van-icon {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
  .van-circle__text {
    font-size: 1.17rem;
  }
  .pr_list {
    .list_item {
      position: relative;
      margin: 0.67rem;

      background-color: #fff;
      border-radius: 0.67rem;
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
      padding: 0.7rem 1.3rem;
      .van-overlay {
        position: absolute;
        border-radius: 0.67rem;

        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 3.33rem;
          line-height: 180px;
        }
      }
      .item_img {
        width: 30%;
        text-align: center;
        img {
          width: 4.33rem;
          height: 4.33rem;
        }
        .van-circle {
          .van-circle__text {
            font-size: 1.17rem;
          }
        }
      }
      .item_name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .pr_name {
          width: 60%;
          font-weight: 600;
          font-size: 1.33rem;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .pr_edit {
          font-size: 0.87rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;
        }
        .item_span {
          color: #adafe9;
          border: 0.03rem solid #adafe9;
        }
      }
      .item_tel {
        color: #2b2b2b;
        font-size: 1rem;
      }
    }
    .list_foot {
      text-align: center;
      color: #58595b;
    }
  }
  .tbutton {
    text-align: center;
    position: fixed;
    bottom: 5rem;
    width: 100%;
    z-index: 99;
    img {
      width: 3.33rem;
      height: 3.33rem;
    }
  }
  .van-action-sheet__item {
    line-height: 1.73333rem;
    .van-action-sheet__name {
      font-size: 1rem;
    }
  }
  .van-action-sheet__cancel {
    line-height: 1.73333rem;

    font-size: 1rem;
  }
}
.footle {
  width: 100%;
  position: fixed;
  bottom: 2rem;
  .footle_font {
    margin: auto;
    width: 11.37rem;
    height: 2.33rem;
    background: #0089ff;
    box-shadow: 0rem 0rem 0rem 0rem rgba(0, 137, 255, 0.34);
    border-radius: 1rem;
    color: #fff;
    text-align: center;
    line-height: 2.33rem;
    font-size: 1rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>

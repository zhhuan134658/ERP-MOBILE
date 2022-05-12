<template>
  <!--  -->
  <div id="workren">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="member-item" v-for="(item, index) in FilesList" :key="index">
        <!--     @click="addguamli(2)" -->
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
          <div class="member-font1">
            <!-- <div class="item_name1"> {{ item.name }}</div> -->
            <div class="item_name2">日薪:{{ item.wages }}</div>
            <div class="item_name2">工种:{{ item.work_type }}</div>
          </div>
          <div class="member-font2" @click="goInfo(item)">删除</div>
        </div>
      </div>
    </van-list>

    <Empty v-if="Emptyshow"></Empty>
    <!-- {{ this.$store.state.userData.xminfo}} -->
    <div class="sureBtn">
      <van-button @click="addguamli(1)" type="info">添加人员</van-button>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import { Dialog } from "vant";
import Empty from "../../../common/Empty.vue";
import qs from "qs";
export default {
  name: "workren",
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
      Dialog.confirm({
        title: "提示",
        message: "是否删除",
      })
        .then(() => {
          this.$axios
            .post("/projectthree/workerDel", {
              id: item.id,
            })
            .then((res) => {
              if (res.data.code == 1) {
                Toast(res.data.msg);
                this.getList();
              } else {
                Toast(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "记工成员", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },

    addguamli(val) {
      this.$router.push({
        path: "/Record_add",
        query: {
          val: val,
        },
      });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    onLoad() {
      this.$axios
        .post("/projectthree/workerList", {
          ban_id: this.$store.state.userData.workitemdata.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.loading = false;
            if (!this.Searchname) {
              if (res.data.data.length > 0) {
                this.FilesList = this.deunique(
                  this.FilesList.concat(res.data.data)
                ); //追加数据
                // this.FilesList.push(...res.data.data);
              } else {
                this.FilesList = res.data.data;
                this.finished = true;
                // this.Emptyshow = true;
              }
            } else {
              if (res.data.data.length > 0 || res.data.data == null) {
                this.FilesList = [];
                this.FilesList = this.deunique(res.data.data);
                // this.Emptyshow = false;
              } else {
                this.FilesList = [];
                // this.Emptyshow = true;
              }
            }

            // page
            if (
              this.current_page == res.data.page ||
              res.data.data.length == 0 ||
              res.data.data == null
            ) {
              //数据全部加载完成

              this.finished = true;
            } else {
              this.current_page += 1;
              this.finished = false;
            }
          } else {
            Toast(res.data.msg);
            this.finished = true;
          }
        });
    },
    getList() {
      console.log("1");
      this.$axios
        .post("/projectthree/banZuList", {
          page: 1,
          number: 9999,
          name: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            // this.workList = res.data.data;
            this.$store.commit("setworklist", res.data.data);
            this.FilesList = [];
            this.current_page = 1;
            this.loading = false;
            this.finished = false;
          } else {
            Toast(res.data.msg);
          }
        });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
#workren {
  padding-top: 0.33rem;
  padding-bottom: 6.67rem;
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
      line-height: 1.67rem;
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      .member-font1 {
        margin-left: 0.67rem;
        .item_name1 {
          font-size: 1.17rem;
          font-weight: 600;
        }
        .item_name2 {
          font-size: 1.06rem;
          color: #858b96;
        }
      }
      .member-font2 {
        color: #409eff;
        line-height: 5rem;
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

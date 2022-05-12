<template>
  <!--施工进度计划  -->
  <div id="newtasklist">
    <!--项目搜索  -->
    <van-sticky>
      <div class="inputdiv">
        <van-search
          v-model="Searchname"
          placeholder="请填写搜索条件"
          show-action
          shape="round"
        >
          <div slot="action">
            <van-button @click="sear" type="default">搜索</van-button>
          </div>
        </van-search>
      </div>
    </van-sticky>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div
        class="Record_content"
        v-for="(item, index) in FilesList"
        :key="index"
      >
        <img
          @click="gocreat(2, item)"
          class="biaoqian"
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/wZTf7cBmC61613782951127.png"
          alt=""
        />
        <img
          @click="gocreat(2, item)"
          class="shezhi"
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/sT4SCf8pFP1613785695966.png"
          alt=""
        />

        <div @click="goin(item)" class="swiper_title">{{ item.name }}</div>
        <div @click="goin(item)" class="swiper_bzname">
          班组长:{{ item.foreman }}
        </div>
        <div
          @click="goin(item)"
          class="swiper_bzname"
          style="border-bottom: 0.06rem dashed #edeef0; padding-bottom: 0.5rem"
        >
          创建时间:{{ item.created }}
        </div>
        <div class="swiper_number" @click="goin(item)">
          <div class="num_item">
            <div class="num_title">总工钱(元)</div>
            <div class="num_num">{{ item.all_money }}</div>
          </div>
          <div class="num_item">
            <div class="num_title">今日记工(人)</div>
            <div class="num_num">{{ item.td_jg_num }}</div>
          </div>
        </div>
      </div>
    </van-list>

    <Empty v-if="Emptyshow"></Empty>

    <!-- 筛选 -->
    <van-popup v-model="popupshow" position="bottom">
      <div class="acaa" @click="goedit(2)">编辑工本信息</div>
      <div class="acaa" @click="dele">删除记工本</div>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "../../../common/Empty.vue";
import commonList from "../../../common/commonList.vue";
export default {
  name: "newtasklist",
  components: { Empty, commonList },
  data() {
    return {
      valname: "ji_gong_class",
      waringdata: false,
      // 筛选
      typename: "",
      shenpitype: "",
      Searchname: "",
      shenpival: "",
      timeshow: false,
      starttime: "",
      stoptime: "",
      starcurrentDate: new Date(),
      typenum: "",
      shenpinum: "",
      TypyList: [],
      shenpiList: [],
      popupshow: false,
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
    setTitle() {
      dd.biz.navigation.setTitle({
        title: "全部记工本", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
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
            this.$store.commit("setworklist", res.data.data);
            this.popupshow = false;
          } else {
            Toast(res.data.msg);
          }
        });
    },
    dele() {
      Dialog.confirm({
        title: "提示",
        message: "是否删除",
      })
        .then(() => {
          this.$axios
            .post("/projectthree/banZuDel", {
              id: this.itemdata.id,
            })
            .then((res) => {
              if (res.data.code == 1) {
                this.getList();
                this.popupshow = false;
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
    goedit(val) {
      this.$router.push({
        path: "/Record_creat",
        query: {
          val: val,
        },
      });
    },
    gocreat(val, item) {
      if (val == 1) {
        this.$router.push({
          path: "/Record_creat",
          query: {
            val: val,
          },
        });
      } else if (val == 2) {
        this.popupshow = true;
        this.itemdata = item;
      }
      this.$store.commit("setworkitemdata", item);
    },

    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    goin(item) {
      this.$router.push({
        path: "/Record_book",
      });
      this.$store.commit("setworkitemdata", item);
    },

    onLoad() {
      this.$axios
        .post("/projectthree/banZuList", {
          page: this.current_page,
          number: "10",

          name: this.Searchname,
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
    deleteitem(item) {
      console.log(item);
      Dialog.confirm({
        title: "提示",
        message: "是否删除",
      })
        .then(() => {
          this.$axios
            .post("/project/constructionProgressPlanDel", {
              id: [item.id],
            })
            .then((res) => {
              if (res.data.code == 1) {
                Toast(res.data.msg);
                this.FilesList = [];
                this.current_page = 1;
                this.loading = false;
                this.finished = false;

                this.onLoad();
              } else {
                Toast(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },

    // 筛选
    sear() {
      this.FilesList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;

      this.onLoad();
    },
    shaixuan() {
      this.popupshow = true;
      // this.typename = this.TypyList[0].tmpname;
      // this.shenpitype = this.shenpiList[0].tmpname;
    },

    shenpiclick(item, index) {
      this.shenpinum = index;
      this.shenpitype = item;
      this.shenpival = item.id;
    },
    shuaixuan() {
      this.popupshow = false;
      this.FilesList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;

      this.onLoad();
    },
  },
  created() {
    this.TypyList = this.$utils.utilProjectStatus();
    this.shenpiList = this.$utils.utilApprovalStatus();
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
.acaa {
  font-size: 1.17rem;
  text-align: center;
  line-height: 2.67rem;
}
.Record_content {
  padding: 0.67rem;
  width: 90%;
  border-radius: 0.67rem;

  background-color: #fff;
  box-shadow: 0.16rem 5px 5px 5px #f1f2f6;
  margin: 0.67rem auto;
  position: relative;
  .biaoqian {
    width: 2.5rem;
    height: 3.5rem;
    position: absolute;
    top: 0;
    right: 1rem;
    z-index: 66;
  }
  .shezhi {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 1rem;
    right: 1.8rem;
    z-index: 7777;
  }
  .swiper_title {
    font-weight: 600;
    font-size: 1.33rem;
  }
  .swiper_bzname {
    margin-top: 0.16rem;
    color: #858b96;
    font-size: 1rem;
  }
  .swiper_number {
    display: flex;
    padding: 1.33rem 0;
    .num_item {
      width: 50%;
      text-align: center;
      .num_title {
        color: #9297a1;
        font-size: 1rem;
      }
      .num_num {
        font-weight: 600;
        font-size: 1.33rem;
      }
    }
  }
}
</style>

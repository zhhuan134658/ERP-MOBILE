<template>
  <!-- 订单 -->
  <div id="dingdan" class="clearfix">
    <!--  -->
    <div class="leibiao">
      <div class="inputdiv">
        <van-search
          v-model="name"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div slot="action">
            <van-button type="default" @click="goshaixuan(2)">筛选</van-button>
          </div>
        </van-search>
      </div>

      <div class="content1">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <div
            class="content1_item"
            v-for="(item, index) in dingdanList"
            :key="index"
          >
            <div class="item_top">
              <div class="top_img">
                <img
                  src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/CJx74NkSxt1593500100356.jpg"
                  alt
                />
              </div>
              <div class="top_name">{{ item.name }}提交</div>
              <div class="top_xq">
                <div>￥56000.00</div>
                <div style="color: #000000">已完成</div>
              </div>
            </div>
            <div class="item_content">
              <div class="content_left">
                <div class="left_font">开通人数: {{ item.maxOfPeople }}</div>
                <div class="left_font">开通年限: {{ item.nianxian }}</div>
                <div class="left_font">提交人: {{ item.tijiao }}</div>
                <div class="left_font">
                  {{ item.createTime }}
                </div>
              </div>
            </div>
            <div class="item_btn">
              <van-button plain type="info">朴素按钮</van-button>
              <van-button plain type="info">朴素按钮</van-button>
            </div>
          </div>
        </van-list>
        <Empty v-if="Emptyshow"></Empty>
      </div>
    </div>
  </div>
</template>

<script>
import Empty from "../common/Empty.vue";
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  components: { Empty },
  name: "dingdan",
  data() {
    return {
      num: 0,
      name: "",
      zhifushow: true,
      dingdanList: [],
      Emptyshow: false,
      list: [],
      loading: false,
      finished: false,
      total: "",
      current_page: 1,
      Searchname: "",
      num: 0,
      dingdanList: [],
      numList: [
        { id: 1, text: 12 },
        { id: 2, text: 12 },
        { id: 3, text: 12 },
        { id: 4, text: 12 },
      ],
    };
  },
  watch: {
    dingdanList: {
      handler(val, oldval) {
        if (val.length > 0) {
          this.Emptyshow = false;
        } else {
          this.Emptyshow = true;
        }
      },
    },
  },
  computed: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "订单中心", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    htchange(index) {
      this.num = index;
      if (index == 0) {
        this.zhifushow = true;
      } else if (index == 1) {
        this.zhifushow = false;
      }
    }, //财务支付审批列表
    onSearch() {
      this.dingdanList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;

      this.onLoad();
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    onLoad() {
      this.$axios
        .post("/index.php/api/dapplication/orderList", {
          page: this.current_page,
          number: 10,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.loading = false;
            if (!this.Searchname) {
              this.dingdanList = this.deunique(
                this.dingdanList.concat(res.data.data.data)
              ); //追加数据
            } else {
              this.dingdanList = [];
              this.dingdanList = this.deunique(res.data.data.data); //追加数据
            }

            // page
            if (
              this.current_page == res.data.data.all_page ||
              res.data.data.data.length == 0
            ) {
              //数据全部加载完成
              this.finished = true;
            } else {
              this.current_page += 1;
              this.finished = false;
            }
          }
        });
    },
    // getqueryOrder() {
    //     this.$axios
    //         .post('/index.php/api/dapplication/orderList', {
    //             page: '',
    //             number: '',
    //         })
    //         .then((res) => {
    //             this.dingdanList = res.data.data;
    //         });
    // },
  },
  mounted() {},
  created() {
    this.$utils.checkding();
    this.setTitle();
  },
};
</script>
<style lang="less">
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
#dingdan {
  //   margin-bottom: 3.33rem;

  .leibiao {
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
    .content1 {
      padding: 0.67rem;

      .content1_item {
        margin-top: 0.67rem;
        width: 100%;
        padding: 0.67rem;
        box-sizing: border-box;
        background-color: #ffffff;
        box-shadow: 0px 1px 8px 0px rgba(20, 20, 20, 0.17);
        border-radius: 0.33rem;

        .item_top {
          height: 2.67rem;
          .top_img {
            float: left;
            width: 2.67rem;
            text-align: center;
            img {
              margin-top: 0.33rem;
              width: 1.67rem;
              height: 1.67rem;
            }
          }
          .top_name {
            float: left;
            font-size: 1.33rem;
            font-weight: 600;

            line-height: 2.67rem;
            letter-spacing: 0px;
            color: #191f25;
          }

          .top_xq {
            float: right;

            text-align: center;
            font-size: 1rem;
            color: #f98002;
            img {
              width: 1rem;
              height: 1rem;
            }
          }
        }
        .item_content {
          margin-left: 2.67rem;
          box-sizing: border-box;

          padding: 0.67rem 20px 0 0;
          display: flex;

          .content_left {
            width: 100%;
            color: #9ea0a3;
            .left_font {
              line-height: 1.5rem;
            }
          }
        }
        .item_btn {
          margin-top: 1rem;
          text-align: right;
          .van-button {
            background-color: #f3f6fd;
            box-shadow: 0px 1px 3px 0px rgba(20, 20, 20, 0.22);
            width: 5.33rem;
            height: 2rem;
            font-size: 1rem;
          }
        }
      }
    }
  }
  .changeColor {
    background-color: #ffffff !important;
    border-radius: 0.33rem !important;
    color: #409eff !important;
  }

  .tbutton {
    text-align: center;
    position: fixed;
    bottom: 5rem;
    width: 100%;
    img {
      width: 3.33rem;
      height: 3.33rem;
    }
  }
}
</style>

<template>
  <div id="personnelindex">
    <div class="renwucontent" v-for="(item, index) in qualityList" :key="index">
      <div class="item_heard" @click="lookinfo(item)">
        <div class="item_heard_title" style="width: 50%">
          {{ item.name }}
        </div>

        <div>
          {{ item.push_date }}
        </div>
      </div>
      <div class="btem" @click="lookinfo(item)">
        <div class="btem1">状态:{{ item.status == 1 ? "未读" : "已读" }}</div>
      </div>

      <!-- <div class="btem" @click="lookinfo(item)" v-if="item.jtcount == 1">
                <div class="btem1">证书类型:个人证书</div>
            </div>
            <div class="btem" @click="lookinfo(item)" v-if="item.jtcount == 2">
                <div class="btem1">证书类型:企业证书</div>
            </div>
            <div class="btem" @click="lookinfo(item)">
                <div class="btem1">预警内容:{{ item.content }}</div>
            </div>
            <div class="btem" @click="lookinfo(item)">
                <div class="btem1">发送预警时间:{{ item.created }}</div>
            </div> -->

      <div class="newbottom">
        <div class="item_img">
          <div class="newbottom_item"></div>
        </div>
        <div style="color: #f56c6c"></div>
      </div>
    </div>

    <Empty v-if="Emptyshow"></Empty>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "../common/Empty.vue";
export default {
  name: "personnelindex",
  components: { Empty },
  data() {
    return {
      shaixuanshow: false,
      Emptyshow: false,
      Searchname: "",
      typenum: "",
      val: "",
      //分页
      qualityList: [],
      list: [],
      loading: false,
      finished: false,
      total: "",
      current_page: 1,
      contentList: [
        // {
        //     id: '1',
        //     name: '进度管理',
        //     imgurl:
        //         'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/yFpcaHn7nF1606447914088.png'
        // },

        {
          id: "质量",
          name: "质量管理",
          imgurl:
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/FZYnwChwPR1606449155201.png",
        },
        {
          id: "安全",
          name: "安全管理",
          imgurl:
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/SzpYxRF2D51606449188221.png",
        },
        {
          id: "成本",
          name: "成本控制",
          imgurl:
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/3yX2tdsYXH1606447914062.png",
        },
        {
          id: "合同",
          name: "合同管理",
          imgurl:
            "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/4Epypf5fYW1606447914068.png",
        },
      ],
      handleClick: "1",
      title: "",
    };
  },
  computed: {},
  watch: {
    qualityList: {
      handler(val, oldval) {
        if (val.length > 0) {
          this.Emptyshow = false;
        } else {
          this.Emptyshow = true;
        }
      },
    },
    handleClick(val, oldval) {
      if (val == "2") {
        setTimeout(function () {
          this.handleClick = "1";
          console.log("555" + this.handleClick);
        }, 1000);
      }
    },
  },
  methods: {
    setTitle() {
      const _this = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "预警列表", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    //删除
    deleitem(item) {
      if (this.$store.state.userData.role == "2") {
        return Toast("请联系管理员分配权限");
      }
      this.$axios
        .post("/zhengshu/MessageDanDelete", {
          yjid: item.yjid, //分页参数
        })
        .then((res) => {
          Toast(res.data.msg);
          this.qualityList = [];
          this.current_page = 1;

          this.getdata();
        });
    },

    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.yjid) && res.set(arr.yjid, 1));
    },

    lookinfo(item) {
      this.$router.push({
        path: "/yujinginfo",
        query: {
          itemdata: item,
        },
      });
      // this.$axios
      //     .post('/zhengshu/MessageGengGaiD', {
      //         yjid: item.zid //分页参数
      //         // zsuser: this.Searchname
      //     })
      //     .then((res) => {});
    },

    getdata() {
      this.$axios
        .post("/finance/warning_news", {
          type: this.$route.query.valdata,
          corp_id: this.$route.query.corp_id,
          userid: this.$route.query.userid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.qualityList = res.data.content;
          }
        });
    },
  },
  created() {
    this.setTitle();
    this.getdata();
    this.$utils.checkding();
  },
};
</script>
<style lang='less' >
#personnelindex {
  .van-popup {
    .typecontent {
      margin: 1.5%;
      width: 30%;
      float: left;
      height: 2.33rem;
      background-color: #f4f4f4;
      border-radius: 0.33rem;

      font-size: 0.93rem;
      text-align: center;

      line-height: 2.33rem;

      color: #7a7d81;
    }
    .sureBtn {
      position: absolute;
      bottom: 0.67rem;
      width: 100%;

      margin-bottom: 0.67rem;
      margin-top: 1rem;
      height: 2.67rem;
      line-height: 2.67rem;
      text-align: center;

      overflow: hidden;
      .van-button {
        width: 40%;
        height: 100%;
        border-radius: 0.27rem;
        span {
          font-size: 1rem;
        }
      }
    }
    .zstype {
      width: 100%;
      height: 80%;
      overflow: auto;

      background-color: #fff;
      .van-cell {
        padding: 0 0.5rem;
        height: 3.33rem;
        .van-cell__title {
          height: 100%;
          line-height: 3.33rem;
          font-size: 1rem;
          padding-left: 0.33rem;
        }
        .van-cell__value {
          .van-field__body {
            height: 100%;
            line-height: 3.33rem;
            .van-field__control {
              font-size: 1rem !important;
              line-height: 1rem !important;
              color: #000;
            }
          }
        }
      }

      .typetitle {
        display: flex;
        width: 100%;

        align-items: center; /*定义body的元素垂直居中*/
        // justify-content: center; /*定义body的里的元素水平居中*/
        padding: 1rem;
        box-sizing: border-box;
        .titlepoint {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #409efe;
        }
        .titlefont {
          margin-left: 0.67rem;
          color: #191f25;
          font-size: 0.93rem;
        }
      }
      .typecontent {
        margin: 1.5%;
        width: 30%;
        float: left;
        height: 2.33rem;
        background-color: #f4f4f4;
        border-radius: 0.33rem;

        font-size: 0.93rem;
        text-align: center;

        line-height: 2.33rem;

        color: #7a7d81;
      }
    }
  }
  .typeColor {
    background-color: #e5f2fb !important;
    color: #409efe !important;
  }
  .inputdiv {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    width: 100%;
    height: 4rem;
    background-color: #fff;
    .van-search {
      width: 95%;
      background-color: #fff !important;
      padding: 0;
      margin: 0.25rem;
      .van-search__action {
        font-size: 1rem;
        line-height: 1rem;
        background-color: #fff;
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
  .zstype {
    width: 100%;

    background-color: #fff;
    margin-bottom: 1rem;
    .typetitle {
      display: flex;

      align-items: center; /*定义body的元素垂直居中*/
      // justify-content: center; /*定义body的里的元素水平居中*/
      padding: 1rem;
      box-sizing: border-box;
      .titlepoint {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #409efe;
      }
      .titlefont {
        margin-left: 0.67rem;
        color: #191f25;
        font-size: 0.93rem;
      }
    }
  }
  .renwucontent {
    margin-top: 0.67rem;
    background-color: #fff;
    padding: 0.33rem 1rem;
    border-radius: 0.33rem;
    position: relative;
    .ready {
      position: absolute;
      right: 0.67rem;
      top: 4rem;
      img {
        width: 2rem;
        height: 2rem;
      }
    }
    .btem {
      display: flex;
      // margin-left: 0.33rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.33rem;

      .btem1 {
        max-width: 50%;
        font-size: 0.83rem;
        overflow: hidden;
        color: #9a9a9a;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btem2 {
        max-width: 50%;
        font-size: 0.83rem;
        color: #9a9a9a;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item_heard {
      line-height: 1.67rem;
      font-size: 1rem;
      color: #323232;
      align-items: center;
      display: flex;
      justify-content: space-between;

      .item_heard_title {
        font-size: 1.17rem;
        font-weight: 600;
        width: 50%;
      }
    }
    .item_time {
      font-size: 1rem;
      color: #3b4045;
      margin: 0.33rem 0;
    }
    .fenge {
      border-bottom: 1px solid #eeeff3;
      margin-top: 0.5rem;
    }
    .item_bottom {
      padding: 0.5rem;
      display: flex;
      color: #485985;
      align-items: center;
    }
    .newbottom {
      // margin-top: 0.67rem;
      display: flex;
      justify-content: space-between;
      .item_img {
        // display: flex;
        // align-items: center;
        font-size: 1.17rem;
        width: 80%;
        img {
          border-radius: 50%;
          width: 2.67rem;
          height: 2.67rem;
          margin-right: 0.33rem;
        }
        span {
          font-size: 0.83rem;
          display: inline-block;
          border-radius: 50%;
          width: 2.67rem;
          height: 2.67rem;
          line-height: 2.67rem;
          text-align: center;
          background-color: #387ef5;
          color: #fff;
        }

        color: #000000;

        .newbottom_item {
          // width: 50%;
          display: flex;
          align-items: center;
          font-size: 0.83rem;
          img {
            border-radius: 50%;
            width: 1.67rem;
            height: 1.67rem;
            margin-right: 0.33rem;
          }
          span {
            font-size: 0.67rem;
            display: inline-block;
            border-radius: 50%;
            width: 1.67rem;
            height: 1.67rem;
            line-height: 1.67rem;
            text-align: center;
            background-color: #387ef5;
            color: #fff;
          }

          .item_img_title2 {
            font-size: 0.67rem;
            color: #9f99a1;
          }
        }
      }
    }
  }
}
</style>

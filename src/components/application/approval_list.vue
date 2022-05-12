<template>
  <!-- 人员库 -->
  <div id="personnelindex">
    <van-sticky>
      <div class="inputdiv">
        <van-search
          v-model="sousuoname"
          placeholder="请填写搜索条件"
          show-action
          shape="round"
        >
          <div slot="action">
            <van-button @click="searchonLoad" type="default">搜索</van-button>
            <van-button @click="gocreat" type="default">筛选</van-button>
          </div>
        </van-search>
      </div>
    </van-sticky>
    <!-- 项目主体 -->

    <div class="renwucontent" v-for="(item, index) in qualityList" :key="index">
      <!-- <div
                    class="ready"
                    v-if="item.extend_two==0"
                >
                    <img
                        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/nHD5XGhj3d1609138530398.png"
                        alt=""
                    >

                </div>
                <div
                    class="ready"
                    v-else
                >
                    <img
                        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/NM8JE5N5ns1609138530772.png"
                        alt=""
                    >

                </div> -->
      <div class="item_heard" @click="lookinfo(item)">
        <div class="item_heard_title">
          {{ item.name.substring(0, item.name.length - 5) }}
        </div>

        <div style="color: #bcbcbc; font-size: 0.5rem; line-height: 1.67rem">
          {{ item.created }}
        </div>
      </div>
      <div class="btem" @click="lookinfo(item)">
        <div class="btem1">{{ item.field_one }}</div>
      </div>
      <div class="btem" @click="lookinfo(item)">
        <div class="btem1">{{ item.field_two }}</div>
      </div>
      <div class="btem" @click="lookinfo(item)">
        <div class="btem1">{{ item.field_three }}</div>
      </div>

      <div class="newbottom">
        <div class="item_img">
          <div class="newbottom_item">
            <img v-if="item.userurl" :src="item.userurl" alt />
            <span v-else>
              {{
                item.send_name.length <= 2
                  ? item.send_name
                  : item.send_name.substr(item.send_name.length - 2, 2)
              }}
            </span>
            <div style="margin-left: 0.33rem">由{{ item.send_name }}提交</div>
          </div>
        </div>
        <div style="color: rgb(230, 162, 60)" v-if="item.status == 1">
          审批中
        </div>

        <div style="color: rgb(103, 194, 58)" v-if="item.status == 2">
          已同意
        </div>
        <div style="color: rgb(245, 108, 108)" v-if="item.status == 3">
          已拒绝
        </div>
      </div>
    </div>

    <Empty v-if="Emptyshow"></Empty>
    <van-popup
      v-model="popupshow"
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="zstype">
        <!-- <div
                    class="typecontent"
                    v-for="(item, index) in namelist"
                    :key="index"
                    @click="Typeclick(item, index)"
                    :class="typenum == index ? 'typeColor' : ''"
                >
                    {{ item.text }}
                </div> -->
        <div
          class="typecontent"
          v-for="(item, index) in allList"
          :key="index"
          @click="Typeclick(item, index)"
          :class="typenum == index ? 'typeColor' : ''"
        >
          {{ item.name }}
        </div>
      </div>

      <div class="sureBtn">
        <van-button type="info" @click="shuaixuan">确定</van-button>
        <van-button type="warning" @click="clac">重置</van-button>
      </div>
    </van-popup>
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
      sousuoname: "",
      namelist: [{ name: "全部" }],
      allList: [],
      popupshow: false,
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
    // handleClick(val, oldval) {
    //     if (val == '2') {
    //         setTimeout(function () {
    //             this.handleClick = '1';
    //             console.log('555' + this.handleClick);
    //         }, 1000);
    //     }
    // }
  },
  methods: {
    shuaixuan() {
      this.popupshow = false;
      this.FilesList = [];
      this.current_page = 1;

      this.onLoad();
    },
    setTitle() {
      dd.biz.navigation.setTitle({
        title: "审批列表", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
      });
    },
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
    },
    //删除
    deleitem(item) {
      this.$axios
        .post("/zhengshu/UpdateUserContent", {
          uids: [item.id], //分页参数
          type: "delete",
        })
        .then((res) => {
          Toast(res.data.msg);
          this.qualityList = [];
          this.current_page = 1;
          this.loading = false;
          this.finished = false;

          this.onLoad();
        });
    },

    Typeclick(item, index) {
      this.typenum = index;
      this.popupshow = false;
      if (item.name == "全部") {
        this.Searchname = "";
        this.qualityList = [];
        this.onLoad();
      } else {
        this.Searchname = item.name;
        this.qualityList = [];
        this.onLoad();
      }

      // this.firstdata = id;
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },
    searchonLoad() {
      this.Searchname = this.sousuoname;
      this.qualityList = [];
      this.current_page = 1;

      this.onLoad();
    },
    lookinfo(item) {
      const _this = this;
      _this.getUseridStatus(item.id);
      dd.ready(function () {
        dd.biz.util.openLink({
          url: item.url, //要打开链接的地址
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
      });
    },
    gocreat() {
      this.popupshow = true;
    },
    gonew() {
      this.$router.push({ path: "/personnelcreat" });
    },
    goshenpi(item) {},
    onLoad() {
      this.$axios
        .post("/mobile/dingApprovalList", {
          page: this.current_page, //分页参数
          type: this.$route.query.type,
          number: 99999,
          name: this.Searchname,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.loading = false;
            if (!this.Searchname) {
              if (res.data.data.length > 0) {
                this.qualityList = this.deunique(
                  this.qualityList.concat(res.data.data)
                );
              } else {
                this.qualityList = res.data.data;
                this.finished = true;
                // this.Emptyshow = true;
              }
            } else {
              this.qualityList = [];
              this.qualityList = this.deunique(res.data.data); //追加数据
            }

            console.log(this.qualityList);
            // page
            if (
              this.current_page == res.data.page_number ||
              res.data.data.length == 0
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
    //所有分类列表
    getTypeAllList() {
      this.$axios.post("/mobile/commonlyTypeAllList").then((res) => {
        // this.allList = res.data.data;

        for (var i = 0; i < res.data.data.length; i++) {
          for (var j = 0; j < res.data.data[i].itemlist.length; j++) {
            this.allList.push(res.data.data[i].itemlist[j]);
          }
        }
        this.allList = this.namelist.concat(this.allList);

        // this.allList = res.data.data.map((item) => {
        //     item.itemlist.map((item1) => {
        //         return item1.name;
        //     });
        // });
        console.log(this.allList);
      });
    },
    //抄送我的状态修改已读
    getUseridStatus(itemdata) {
      this.$axios
        .post("/mobile/ccUseridStatus", {
          id: itemdata,
        })
        .then((res) => {});
    },
  },
  created() {
    this.$utils.checkding();
    this.onLoad();
    this.setTitle();
    this.getTypeAllList();
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
    padding: 0.33rem 20px;
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
      margin-left: 0.33rem;
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
        width: 70%;
      }
    }
    .item_time {
      font-size: 1rem;
      color: #3b4045;
      margin: 0.33rem 0;
    }
    .fenge {
      border-bottom: 0.03rem solid #eeeff3;
      margin-top: 0.5rem;
    }
    .item_bottom {
      padding: 0.5rem;
      display: flex;
      color: #485985;
      align-items: center;
    }
    .newbottom {
      margin-top: 0.67rem;
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
          width: 50%;
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

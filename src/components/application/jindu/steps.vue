<template>
  <!--  -->
  <div id="steps">
    <van-steps direction="vertical" :active="10000000">
      <van-step v-for="(item, index) in EventList" :key="index">
        <div class="steptitle">
          <div class="steptitle_left">{{ item.name }}</div>
          <div class="steptitle_right">
            {{ item.createdtime }}
          </div>
        </div>
        <div class="jindu">
          进度:
          <span style="color: #2e7cfa"> {{ item.milepostjd + "%" }}</span>
        </div>

        <div class="steptitle_content">进展情况: {{ item.describe }}</div>
        <div class="imgupload">
          <div class="upList">
            <div
              class="xiangmu"
              v-for="(item1, index) in item.biz_data"
              :key="index"
            >
              <div class="xmdiv xmimg">
                <div class="img">{{ item1.fileType }}</div>
              </div>
              <div class="xmdiv xmjindu">
                <div class="xmjindu-item">
                  <div class="xmjindu-item-font">
                    {{ item1.fileName }}
                  </div>
                  <div class="xmjindu-item-font1">
                    {{ (item1.fileSize / 1024 / 1024).toFixed(2) }}MB
                  </div>
                </div>
                <div class="yulan" @click="lookfile(item1)">预览</div>
              </div>
            </div>
          </div>
        </div>
      </van-step>
    </van-steps>
    <Empty v-if="Emptyshow"></Empty>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import Empty from "../../common/Empty.vue";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "",
  components: { Empty },
  data() {
    return {
      Emptyshow: false,
      EventList: [
        {
          jdtitle: "123",
          jdcontent: "1564165",
        },
      ],
    };
  },
  computed: {},
  watch: {
    EventList: {
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
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "里程碑", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    stop() {
      document.body.style.overflow = "hidden"; //禁止页面划动
    },
    move() {
      document.body.style.overflow = ""; //出现滚动条
    },
    // 与拉美盯盘文件

    lookfile(item) {
      const _this = this;
      var fileSizea = parseInt(item.fileSize);
      _this.$axios
        .post("/dingding/getAuthUp", {
          auth: "download",

          fields: item.fileId,
        })
        .then((res) => {
          dd.ready(function () {
            dd.biz.cspace.preview({
              corpId: _this.$store.state.userData.cid,
              spaceId: item.spaceId,
              fileId: item.fileId,
              fileName: item.fileName,
              fileSize: fileSizea,
              fileType: item.fileType,
              onSuccess: function () {
                //无，直接在native显示文件详细信息
              },
              onFail: function (err) {
                // 无，直接在native页面显示具体的错误
              },
            });
          });
        });
    },
    //里程碑列表
    getJinDuList() {
      this.$axios
        .post("/task/modifyrecord", {
          corp_id: this.$store.state.userData.cid,
          milepostid: this.$route.query.itemdata.id,
        })
        .then((res) => {
          this.EventList = res.data.content;
        });
    },
  },
  destroyed() {
    this.move();
  },
  created() {
    this.setTitle();
    this.stop();
    this.getJinDuList();
  },
  mounted() {},
};
</script>
<style lang='less' >
#steps {
  height: 100vh;
  overflow: scroll;
  background-color: #fff;
  .van-steps {
    padding: 0 0 0 2rem;
    .van-steps__items {
      .van-step--vertical {
        line-height: inherit;
      }
      .van-hairline {
        .van-step__title {
          .steptitle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .steptitle_left {
              font-size: 1.1rem;
              font-weight: bold;
            }
            .steptitle_right {
              color: #676767;
              font-size: 0.9rem;
            }
          }
          .steptitle_content {
            padding: 0.5rem;
            font-size: 1.1rem;
            color: #000;
            line-height: 1.5rem;
          }
          .jindu {
            font-size: 0.8rem;
          }
        }
      }
    }
    .van-step__circle-container {
      left: -1rem;
      top: 1.1rem;
      .van-icon {
        color: #2e7cfa;
        font-size: 1.5rem;
      }
      .van-step__circle {
        width: 1rem;
        height: 1rem;
        background-color: #2e7cfa;
      }
    }
    .van-step__line {
      left: -1rem;
      top: 1.1rem;
      background: #2e7cfa;
    }
  }
  .imgupload {
    margin-top: 0.67rem;
    .imgfont {
      margin-left: 1.17rem;
      font-size: 1.17rem;
    }

    box-sizing: border-box;
    background-color: #fff;
    .upList {
      margin-top: 0.67rem;

      .xiangmu {
        border: 0.06rem solid #f3f6fd;
        height: 3.33rem;
        margin: 0.33rem 0;
        display: flex;
        background-color: #fff;
        .xmdiv {
          height: 100%;
        }
        .xmimg {
          width: 20%;
          display: flex;
          align-items: center; /*定义body的元素垂直居中*/
          justify-content: center;

          .img {
            text-transform: uppercase;
            border-radius: 0.33rem;
            width: 2.67rem;
            height: 2.67rem;
            border: 0.03rem solid #a5a3a6;
            background-color: #f45457;
            color: #fff;
            line-height: 2.67rem;
            text-align: center;
          }
        }
        .xmjindu {
          width: 80%;
          display: flex;
          align-items: center; /*定义body的元素垂直居中*/
          position: relative;
          .yulan {
            width: 3.33rem;
            font-size: 1.17rem;
            color: #409eff;
          }
          .van-icon {
            position: absolute;
            top: -5px;
            right: -5px;
            color: #969799;
            line-height: 1rem;
            width: 1rem;
            height: 1rem;
            background-color: red;
            border-radius: 100%;
          }
          .xmjindu-item {
            width: 75% !important;
            height: 3.33rem;

            padding-right: 0.33rem;

            .xmjindu-item-font {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
              font-size: 1rem;
              height: 50%;
              line-height: 1.83rem;
              color: #000;
            }
            .xmjindu-item-font1 {
              font-size: 0.67rem;
              height: 45%;
              line-height: 1.67rem;
              color: #555555;
            }
          }
        }
      }

      //   .upList_item {
      //     width: 100%;
      //     height: 3rem;
      //     border: 0.03rem solid #f3f6fd;
      //     border-radius: 0.33rem;
      //     margin: 0.33rem;
      //     border-radius: 0.2rem;

      //     .clear {
      //       position: relative;
      //       .van-icon {
      //         position: absolute;
      //         top: -5px;
      //         right: -5px;
      //         color: #969799;
      //         line-height: 1rem;
      //         width: 1rem;
      //         height: 1rem;
      //         background-color: red;
      //         border-radius: 100%;
      //       }
      //     }
      //   }
      .upbtn {
        display: inline-block;
        margin-top: 0.67rem;
        margin-left: 1.33rem;

        width: 3rem;
        height: 3rem;
        background-color: #e6e6e7;
        border-radius: 0.2rem;
        .el-button {
          width: 100%;
          height: 100%;
          font-size: 1.67rem;
        }
      }
    }
  }
}
</style>

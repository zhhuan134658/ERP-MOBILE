<template>
  <!--  -->
  <div id="templatel">
    <div class="mubanitem">
      <!-- :class="{ surecolor: currentSort == index1 }" -->
      <div
        class="mubanimg"
        v-for="(item1, index1) in newtypelist"
        @click="active(index1, item1)"
      >
        <div class="itemtitle" style="text-align: center">
          <!-- <img :src="item1.icon" alt="" /> -->
          <div class="itemtitle1">
            {{ item1.tmpname }}
          </div>
        </div>
        <div class="xitem">
          <div class="xitem1">{{ item1.date }}:</div>
          <div class="xitem2">{{ item1.datetext }}</div>
        </div>
        <div class="xitem">
          <div class="xitem1">{{ item1.text1 }}:</div>
          <div class="xitem2">{{ item1.text2 }}</div>
        </div>
        <div class="xitem">
          <div class="xitem1">{{ item1.text3 }}:</div>
          <div class="xitem2">{{ item1.text4 }}</div>
        </div>

        <!-- <img
                                :class="{ jiaoshow: currentSort == index1 }"
                                class="jiaobiao"
                                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/iBbRzCZdY81605581886349.png"
                                alt=""
                            /> -->
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "templatel",
  components: {},
  data() {
    return {
      newtypelist: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "新建日志", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    getnewlist() {
      this.$axios.post("/journal/loglisttype").then((res) => {
        this.newtypelist = res.data.tmpname;
      });
    },
    creatin(item) {
      const _this = this;
      console.log(_this.datainfo);

      _this.$axios
        .post("/journal/logapproval", {
          tmpname: item.tmpname,
        })
        .then((res) => {
          _this.openurl =
            "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?dd_share=true&showmenu=false&dd_progress=false&corpid=" +
            _this.$store.state.userData.cid +
            "&swfrom=qrshareh5&tempalteName=" +
            item.tmpname +
            "&processCode=" +
            res.data.process_code +
            "&back=native#/custom";

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
    active(index, item) {
      this.creatin(item);
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getnewlist();
  },
  mounted() {},
};
</script>
<style lang='less' >
#templatel {
  margin-top: 0.67rem;
  width: 100%;

  // flex-wrap: wrap;
  background-color: #fff;
  box-sizing: border-box;
  .zongtitle {
    font-size: 1.17rem;
    line-height: 2.33rem;
    border-bottom: 0.03rem solid #f0f0f0;
    margin-left: 0.33rem;
  }

  .mubanitem {
    // width: 33%;
    display: flex;
    flex-wrap: wrap;
    .mubanimg {
      width: 26%;
      border: 0.13rem solid #e4e4e4;
      padding: 0.33rem 0;
      margin: 0.33rem 3%;
      border-radius: 0.67rem;
      position: relative;
      overflow: hidden;
      .itemtitle {
        font-size: 1.17rem;
        display: flex;
        justify-content: center;
        img {
          width: 1.67rem;
          height: 1.67rem;
          vertical-align: middle;
        }

        .itemtitle1 {
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .xitem {
        text-align: left;
        padding: 0.33rem;
        .xitem1 {
          line-height: 1.33rem;
          font-size: 0.33rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .xitem2 {
          color: #606266;
          font-size: 0.33rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .itemimg {
        width: 100%;
        height: 100%;
      }
      .jiaobiao {
        opacity: 0;
        position: absolute !important;
        top: -5px !important;
        right: -5px !important;
        width: 1.67rem !important;
      }
    }
    .numanfont {
      text-align: center;
      color: #767779;
    }
  }
}
</style>

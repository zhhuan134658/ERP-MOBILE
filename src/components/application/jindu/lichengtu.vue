<template>
  <!-- 项目进度 -->
  <div id="schedule">
    <!-- <div class="shijian" :style="{ height: curHeight }"> -->
    <!-- <div class="creatimg" @click="goclick">
            <img
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/DyaTppQ4rn1603863488759.png"
                alt=""
            />
        </div> -->
    <div class="shijian">
      <!-- <div class="creatimg" @click="goclick">
                <img
                    src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/DyaTppQ4rn1603863488759.png"
                    alt=""
                />
            </div> -->
      <!-- https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/YwewfTbStF1603870551182.png 白 -->
      <!-- https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/mXQhdsW38y1603870508684.png -->
      <!-- https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/K5YASQRcXs1603872022452.png -->
      <div class="content">
        <div class="content_item">
          <div class="item_cstart">
            <img
              class="item_rcimg"
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/mXQhdsW38y1603870508684.png"
              alt=""
            />
          </div>
          <div class="item_rstart">
            <img
              class="item_rimg"
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/MM55ytYYNM1603869566509.png"
              alt=""
            />
          </div>
        </div>
        <!-- 开始 -->
        <!-- @click="gotouchend(item)" -->
        <div class="content_item" v-for="(item, index) in EventList">
          <div v-if="index % 2 == 0">
            <div class="item_zcdiv">
              <img
                style="pointer-events: none"
                class="item_zcimg"
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/mXQhdsW38y1603870508684.png"
                alt=""
              />
            </div>
            <div class="item_zdiv" @click="goedit(item)">
              <img
                style="pointer-events: none"
                v-if="item.status == 1"
                class="item_zimg imgs"
                src=" https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/JJjzaPZeia1603933236662.png"
                alt=""
              />
              <img
                style="pointer-events: none"
                class="item_zimg"
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/K5YASQRcXs1603872022452.png"
                alt=""
              />
              <div class="item_zfont">
                <div class="zfont1">{{ item.jdtitle }}</div>
                <div class="zfont2">开始时间:{{ item.starttime }}</div>
                <div class="zfont2">结束时间:{{ item.stoptime }}</div>
                <div class="zfont3">
                  <van-progress :percentage="item.jindu" stroke-width="10" />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="item_rcdiv">
              <img
                style="pointer-events: none"
                class="item_zcimg"
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/mXQhdsW38y1603870508684.png"
                alt=""
              />
            </div>
            <div class="item_rdiv" @click="goedit(item)">
              <img
                style="pointer-events: none"
                v-if="item.status == 1"
                class="item_zimg imgs"
                src=" https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/JJjzaPZeia1603933236662.png"
                alt=""
              />
              <img
                style="pointer-events: none"
                class="item_zimg"
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/K5YASQRcXs1603872022452.png"
                alt=""
              />
              <div class="item_zfont">
                <div class="zfont1">{{ item.jdtitle }}</div>
                <div class="zfont2">开始时间:{{ item.starttime }}</div>
                <div class="zfont2">结束时间:{{ item.stoptime }}</div>
                <div class="zfont3">
                  <van-progress :percentage="item.jindu" stroke-width="10" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="content_item">
                    <div class="item_rcdiv">
                        <img
                            class="item_zcimg"
                            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/mXQhdsW38y1603870508684.png"
                            alt=""
                        />
                    </div>
                    <div class="item_rdiv">
                        <img
                            class="item_zimg"
                            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/K5YASQRcXs1603872022452.png"
                            alt=""
                        />
                        <div class="item_zfont">
                            <div class="zfont1">里程碑</div>
                            <div class="zfont2">开始时间：2020-10-10</div>
                            <div class="zfont2">结束时间：2020-20-20</div>
                            <div class="zfont3">
                                <van-progress
                                    :percentage="50"
                                    stroke-width="10"
                                />
                            </div>
                        </div>
                    </div>


                </div> -->

        <!-- 结束 -->
        <!-- https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/JJjzaPZeia1603933236662.png -->
        <!-- https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/7rWyMaM8781603875058309.png -->
        <div class="content_item">
          <div class="item_zstop" v-if="EventList.length % 2 == 0">
            <img
              class="item_rimg"
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/TDbYhXn6Mt1607485202754.png"
              alt=""
            />
          </div>

          <div class="item_rstop" v-else>
            <img
              class="item_rimg"
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/TDbYhXn6Mt1607485202754.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="caozuoshow" position="bottom">
      <div class="options" @click="lookinfo">查看/编辑</div>
      <div class="options" @click="gonext">查看下一级</div>
    </van-popup>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "schedule",
  components: {},
  data() {
    return {
      caozuoshow: false,
      scheduleinfo: "",
      EventList: [],
    };
  },

  watch: {},

  methods: {
    setTitle() {
      dd.biz.navigation.setRight({
        show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },
    gotouchend(item) {
      this.caozuoshow = true;
      this.scheduleinfo = item;
    },
    lookinfo() {
      this.$router.push({
        path: "/editschedule",
      });
      this.$store.commit("setscheduleid", this.scheduleinfo.id);
    },
    goclick() {
      this.$router.push({
        path: "/creatschedule",
      });
    },
    goedit(item) {
      console.log("4563");
      this.$router.push({
        path: "/jinduedit",
      });

      this.$store.commit("seteventinfo", item);
    },
    gonext() {},
    // lichengren
    //里程碑列表
    getJinDuList() {
      this.$axios
        .post("/task/JinDuList", {
          corp_id: this.$store.state.userData.cid,
          xmid: this.$store.state.userData.Selecteddata.id,
          jdstatus: "",
          fid: "",
          status: 2,
        })
        .then((res) => {
          this.EventList = res.data.content;
        });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getJinDuList();
  },
  mounted() {},
};
</script>
<style lang='less' >
#schedule {
  .van-popup--bottom {
    .options {
      text-align: center;
      font-size: 1.27rem;
      font-weight: 600;
      margin: 0.83rem 0;
      color: #606266;
    }
  }
  .creatimg {
    width: 3.33rem;
    height: 3.33rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 99;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .shijian {
    display: flex;
    flex-direction: column-reverse;
    overflow: scroll;
    width: 100%;
    height: 100%;
    position: fixed;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    background-image: url("https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/J3dhsWWtsh1603848924827.png");

    .content {
      width: 100%;
      // position: fixed;
      // bottom: 0;
      display: flex;
      flex-direction: column-reverse;
      .content_item {
        width: 100%;
        box-sizing: border-box;
        padding: 0 30px;
        .item_rstart {
          text-align: right;
          .item_rimg {
            width: 3.33rem;
            height: 3.33rem;
          }
        }
        .item_zstop {
          text-align: left;
          .item_rimg {
            width: 10rem;
            height: 6.67rem;
          }
        }
        .item_rstop {
          text-align: right;
          .item_rimg {
            width: 10rem;
            height: 6.67rem;
          }
        }
        .item_cstart {
          text-align: center;
          .item_rcimg {
            -moz-transform: scaleX(-1);
            -webkit-transform: scaleX(-1);
            -o-transform: scaleX(-1);
            transform: scaleX(-1);
            /*兼容IE*/
            filter: FlipH;
            width: 66%;
          }
        }
        // 分割
        .item_zdiv {
          display: flex;
          text-align: left;
          align-items: center;
          .item_zimg {
            width: 6.67rem;
            height: 6.67rem;
          }
          .imgs {
            position: absolute;
            width: 3.33rem;
            height: 3.33rem;
            left: 2.33rem;
          }
          .item_zfont {
            color: #fff;
            .zfont1 {
              font-size: 1.17rem;
            }
            .zfont2 {
              line-height: 1.33rem;
            }
            .zfont3 {
              padding: 0.33rem 0;
              .van-progress__pivot {
                line-height: 3;
              }
            }
          }
        }
        .item_zcdiv {
          text-align: center;
          .item_zcimg {
            width: 66%;
            // -moz-transform: scaleX(-1);
            // -webkit-transform: scaleX(-1);
            // -o-transform: scaleX(-1);
            // transform: scaleX(-1);
            // /*兼容IE*/
            // filter: FlipH;
          }
        }
        // 分割
        .item_rdiv {
          display: flex;
          text-align: right;
          align-items: center;
          flex-direction: row-reverse;
          .item_zimg {
            width: 6.67rem;
            height: 6.67rem;
          }
          .imgs {
            position: absolute;
            width: 3.33rem;
            height: 3.33rem;
            right: 2.67rem;
          }
          .item_zfont {
            color: #fff;
            .zfont1 {
              font-size: 1.17rem;
            }
            .zfont2 {
              line-height: 1.33rem;
            }
            .zfont3 {
              padding: 0.33rem 0;
              .van-progress__pivot {
                line-height: 3;
              }
            }
          }
        }
        .item_rcdiv {
          text-align: center;
          .item_zcimg {
            width: 66%;
            -moz-transform: scaleX(-1);
            -webkit-transform: scaleX(-1);
            -o-transform: scaleX(-1);
            transform: scaleX(-1);
            /*兼容IE*/
            filter: FlipH;
          }
        }
      }
    }
  }
}
</style>

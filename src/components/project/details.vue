<template>
  <!-- 项目详情 -->
  <div id="details">
    <!-- 头部 -->
    <div class="details_header">
      <div class="header_1">
        <!-- <div class="item_img">
                    <img
                        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/7iA4kTkpZF1615359536241.jpg"
                        alt
                    />
                </div> -->
        <div class="item_font">
          <div
            style="
              width: 60%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            {{ iteminfo.name }}
          </div>
          <div style="width: 40%; text-align: right" @click="goinfo">
            <span style="vertical-align: middle">查看更多</span>
            <img
              style="vertical-align: middle"
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/WT5p4NFQiB1615455121889.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="header_2">
        <div class="pr_time">
          <div class="pr_time_item">
            <div class="pr_time_child">项目负责人</div>
            <div class="pr_time_child font_color">
              {{ iteminfo.stalker_name }}
            </div>
          </div>
          <div class="pr_time_item">
            <div class="pr_time_child">计划开始时间</div>
            <div class="pr_time_child font_color">
              {{ iteminfo.plan_start_riqi.substring(0, 10) }}
            </div>
          </div>
          <div class="pr_time_item">
            <div class="pr_time_child">计划竣工时间</div>
            <div class="pr_time_child font_color">
              {{ iteminfo.plan_end_riqi.substring(0, 10) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 进度 -->
    <div class="progress">
      <div class="progress_font">
        总进度
        <span style="color: #8a9ff5">{{ parseInt(jindu) }}%</span>
      </div>
      <div class="progress_jindu">
        <van-progress
          :percentage="jindu"
          stroke-width="8"
          :show-pivot="false"
        />
      </div>
    </div>
    <!-- 资金 -->
    <div class="capitalcdc">
      <div class="capitalcdc_title">
        <img src="../../../static/images/lingxing.png" alt />
        <span>项目资金</span>
      </div>
      <div class="capitalcdc_concent">
        <div class="capitalcdc_bl">
          项目总造价
          <span style="font-size: 0.5rem">(万元)</span>：
          <span style="color: #89a1fe">{{ iteminfo.make_cost }}</span>
        </div>
      </div>
    </div>

    <!-- 进度 -->
    <!-- <div class="journal">
            <div class="journal_title">
                <img
                    src="../../../static/images/lingxing.png"
                    alt
                />
                <span>进度管理</span>
            </div>
            <div
                class="journal_chakan"
                @click="lookschedule(iteminfo)"
            >
                查看进度
            </div>
        </div> -->
    <!-- 质量 -->
    <!-- <div class="journal">
            <div class="journal_title">
                <img
                    src="../../../static/images/lingxing.png"
                    alt
                />
                <span>质量管理</span>

            </div>
            <div
                v-if="this.datanumber[0] == 0"
                class="journal_chakan"
                @click="lookquailty(iteminfo)"
            >
                查看质量
            </div>
            <div
                v-else
                class="journal_chakan"
                @click="lookquailty(iteminfo)"
            >
                未处理({{ this.datanumber[0] }})条
            </div>
        </div> -->

    <!-- <van-popup position="top" :style="{ height: '13%' }" v-model="popupshow">
            <van-button @click="lookinfo(iteminfo.id)" type="info">编辑查看</van-button>
            <van-button @click="guidang(iteminfo.id)" type="warning">归档项目</van-button>
            <van-button @click="deletex(iteminfo.id)" type="danger">删除项目</van-button>
        </van-popup>-->
    <van-popup position="top" v-model="popupshow">
      <van-button @click="lookinfo(iteminfo.id)" type="info"
        >编辑查看</van-button
      >
      <van-button @click="guidang(iteminfo.id)" type="warning"
        >归档项目</van-button
      >
      <van-button @click="deletex(iteminfo.id)" type="danger"
        >删除项目</van-button
      >
      <van-button @click="lookren(iteminfo.id)" type="info"
        >查看成员</van-button
      >
      <van-button
        v-if="iteminfo.guanli == 2"
        @click="withdraw(iteminfo.id)"
        type="warning"
        >退出项目</van-button
      >
    </van-popup>
    <van-popup v-model="jindushow" position="bottom">
      <div class="options" @click="lookjindu">查看进度</div>
      <div class="options" @click="looklichengbei">查看里程碑</div>
      <!-- <div class="options" @click="looklitongji">查看统计</div> -->
    </van-popup>
    <van-popup v-model="contshow" position="bottom">
      <div class="options" @click="inJoint">收入合同</div>
      <div class="options" @click="outJoint">支出合同</div>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  data() {
    return {
      datanumber: [],
      jindu: "",
      contshow: false,
      superlist: [{ name: "", avatar: "", userid: "" }],
      ProjectList: [],
      iteminfolist: [],
      popupshow: false,
      iteminfo: "",
      jindushow: false,
      // iteminfo: {
      //     name: '啦啦啦啦',
      //     stand_termer: '啦啦啦啦',
      //     plan_start_riqi: '2023-01-26 16:06',
      //     plan_end_riqi: '2023-01-26 16:06',
      //     jindu: 0.25,
      //     make_cost: 8500
      // }
    };
  },
  computed: {},
  methods: {
    setTitle() {
      dd.biz.navigation.setRight({
        show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "项目详情", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },
    cheaced() {
      this.contshow = true;
    },
    inJoint() {
      this.$store.commit("setSelecteddata", this.iteminfo);
      this.$router.push({
        path: "/incontract",
      });
    },
    outJoint() {
      this.$store.commit("setSelecteddata", this.iteminfo);
      this.$router.push({
        path: "/outcontract",
      });
    },
    looklog() {
      this.$store.commit("setSelecteddata", this.iteminfo);
      this.$router.push({
        path: "/journal",
      });
    },
    looktask() {
      this.$store.commit("setSelecteddata", this.iteminfo);
      this.$router.push({
        path: "/application",
      });
    },
    lookschedule() {
      // this.$router.push({
      //     path: '/schedule',
      // });
      //
      // this.$router.push({
      //     path: '/xmevent',
      // });
      this.jindushow = true;
    },

    goinfo() {
      const _this = this;
      dd.ready(function () {
        dd.biz.util.openLink({
          url: _this.iteminfo.url, //要打开链接的地址
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
      });
    },
    lookinfo(xmid) {
      this.$router.push({
        path: "/editxm",
        query: {
          xmid: xmid,
        },
      });
    },
    guidang(xmid) {
      axios
        .post("/cy_xiezhu/UpdateProject", {
          cytype: "guidang",
          xmid: xmid,
          admin: this.$store.state.userData.admin,
          userid: this.$store.state.userData.userid,
        })
        .then((res) => {
          Toast(res.data.msg);
          this.popupshow = false;
          this.$router.push({
            path: "/task",
          });
        });
    },

    lookren(xmid) {
      this.$router.push({
        path: "/chengyuan",
      });
    },
    withdraw(xmid) {
      axios
        .post("/cy_xiezhu/DeleceCorpProject", {
          admin: this.$store.state.userData.admin,
          xmid: xmid,
          corp_id: this.$store.state.userData.cid,
          userid: this.$store.state.userData.userid,
        })
        .then((res) => {
          Toast(res.data.msg);
        });
    },
    deletex(xmid) {
      Dialog.confirm({
        title: "删除项目",
        message: "一旦删除将无法找回，请谨慎删除！",
      })
        .then(() => {
          axios
            .post("/cy_xiezhu/UpdateProject", {
              cytype: "delete",
              admin: this.$store.state.userData.admin,
              xmid: xmid,
              userid: this.$store.state.userData.userid,
            })
            .then((res) => {
              //

              Toast(res.data.msg);
              this.popupshow = false;
              this.$router.push({
                path: "/task",
              });

              this.getProjectList(xmid);
              // if (this.ProjectList) {
              // }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  mounted() {},
  created() {
    this.iteminfo = this.$store.state.userData.xminfo;
    this.jindu = this.$store.state.userData.xminfo.jindu * 100;
    this.$utils.checkding();
    this.setTitle();
  },
};
</script>
<style lang="less">
#details {
  .van-popup--top {
    min-height: 15% !important;
    padding: 0.67rem 0;
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
    text-align: center;
    .van-button--normal {
      width: 60%;
      height: 2.33rem;
      margin-top: 0.5rem;
      border-radius: 0.5rem;
      font-size: 1.1rem;
    }
  }
  .van-popup--bottom {
    .options {
      text-align: center;
      font-size: 1.27rem;
      font-weight: 600;
      margin: 0.83rem 0;
      color: #606266;
    }
  }
  .details_header {
    height: 400px;
    background-color: #238bfe;
    background-size: 100% 100%;
    background-image: url(https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/CAraXZfKkz1615359535724.jpg);
    margin-bottom: 3rem;
    .header_1 {
      box-sizing: border-box;
      height: 6.67rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_img {
        width: 20%;
        text-align: center;
        img {
          width: 3.33rem;
          height: 3.33rem;
          border-radius: 50%;
        }
      }
      .item_font {
        padding: 0 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 1.17rem;
        .van-icon {
          font-size: 1.67rem;
        }
        img {
          width: 1.5rem;
          height: 2rem;
        }
      }
    }
    .header_2 {
      height: 6.67rem;
      // background-color: rgba(0, 0, 0, 0.1);
      .pr_time {
        height: 3.33rem;
        display: flex;
        justify-content: space-around;
        font-size: 1rem;
        .pr_time_item {
          width: 30%;

          .pr_time_child {
            height: 1.67rem;
            text-align: center;
            line-height: 1.67rem;
            color: #a1d3fd;
          }
          .font_color {
            color: #fff;
          }
        }
      }
    }
  }
  .progress {
    width: 90%;
    background-color: #fff;
    border-radius: 0.67rem;
    height: 5rem;

    position: absolute;
    top: 325px;
    left: 5%;
    .progress_font {
      font-size: 1.17rem;
      font-weight: 600;
      text-align: center;
      height: 3.33rem;
      line-height: 3.33rem;
    }
    .progress_jindu {
      width: 90%;
      margin: auto;
    }
  }
  .capitalcdc {
    width: 100%;
    height: 6.67rem;
    margin-top: 0.67rem;
    background-color: #fff;
    .capitalcdc_title {
      display: flex;
      align-items: center;
      height: 2.67rem;
      img {
        width: 1.67rem;
        height: 1.67rem;
      }
      span {
        font-size: 1.17rem;
        font-weight: 600;
      }
    }
    .capitalcdc_concent {
      display: flex;
      align-items: center;
      justify-content: center;
      .capitalcdc_bl {
        width: 90%;
        line-height: 3.33rem;
        text-align: center;
        box-shadow: 0px 1px 8px 0px rgba(20, 20, 20, 0.17);
        border-radius: 0.33rem;
        font-size: 1.33rem;
        color: #a5a4a9;
      }
    }
  }
  .journal {
    width: 100%;
    height: 5rem;
    margin-top: 0.67rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .journal_title {
      display: flex;
      align-items: center;
      height: 5rem;
      img {
        width: 1.67rem;
        height: 1.67rem;
      }
      span {
        font-size: 1.17rem;
        font-weight: 600;
      }
    }
    .journal_chakan {
      line-height: 5rem;
      height: 5rem;
      color: #428ded;
      margin-right: 1rem;
    }
  }
}
</style>

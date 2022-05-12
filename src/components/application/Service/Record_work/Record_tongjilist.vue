<template>
  <!--  -->
  <div id="Record_duv">
    <div class="div_top">
      <div class="podiv"></div>
    </div>
    <div>
      <img
        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/QNE62NzfrF1619515651223.jpg"
        alt=""
      />
    </div>
    <div class="conten">
      <div class="conte_top">
        <div class="cont_left">
          {{
            itemdata.name.length <= 2
              ? itemdata.name
              : itemdata.name.substr(itemdata.name.length - 2, 2)
          }}
        </div>
        <div class="cont_mid">
          <div class="cont_mid_top">{{ datariqi }}</div>
          <!-- <div> {{itemdata.name}}</div> -->
        </div>
      </div>
      <div class="conte_m">
        <div class="conte_m_left">
          <!-- <div class="conte_m_font">
                        日期: <span style="color:#181818">{{ datariqi }}</span>
                    </div>
                    <div class="conte_m_font">
                        姓名: <span style="color:#3A6FC8">{{itemdata.name}}</span>
                    </div> -->
          <div class="conte_m_font">
            点工: <span style="color: #78b097">{{ total_duration }}</span>
          </div>
        </div>
        <div class="conte_m_right">
          <!-- <div class="conte_m_font">点工: <span style="color:#78B097">{{total_duration}}</span> </div> -->
          <div class="conte_m_font">
            工钱(元): <span style="color: #78b097">{{ total_money }}</span>
          </div>
        </div>
        <div class="conte_m_right">
          <!-- <div class="conte_m_font">点工: <span style="color:#78B097">{{total_duration}}</span> </div> -->
          <div class="conte_m_font">
            借支(元): <span style="color: #78b097">{{ jz }}</span>
          </div>
        </div>
      </div>
      <div class="conten_list" v-for="(item, index) in alllist">
        <div class="conten_list_left">
          {{
            item.name.length <= 2
              ? item.name
              : item.name.substr(item.name.length - 2, 2)
          }}
        </div>
        <div class="conten_list_rigth">
          <div class="conten_list_rigth_font">日期:{{ item.riqi }}</div>
          <div class="conten_list_rigth_font">
            点工: {{ item.duration }}个工
          </div>
          <div class="conten_list_rigth_font">
            工钱(元): {{ item.wages[0] }}
          </div>
          <div class="conten_list_rigth_font">
            借支(元): {{ item.sf_total }}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "",
  components: {},
  data() {
    return {
      datariqi: "",
      total_duration: "",
      total_money: "",
      jz: "",
      alldata: "",
      itemdata: "",
      alllist: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "记工信息", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    getdata() {
      this.$axios
        .post("/projectthree/getMonthTongjiDetail", {
          start_riqi: this.$route.query.startriqi,
          end_riqi: this.$route.query.stopriqi,
          ban_id: this.$store.state.userData.workitemdata.id,
          identity_id: this.$route.query.item.id,
          number: 999,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.alldata = res.data.data;
            this.total_money = res.data.data.total_money;
            this.total_duration = res.data.data.total_duration;
            this.jz = res.data.data.jz;
            this.alllist = res.data.data.worker_list;

            // Toast(res.data.msg);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    stop() {
      document.body.style.overflow = "hidden"; //禁止页面划动
    },
    move() {
      document.body.style.overflow = ""; //出现滚动条
    },
  },
  created() {
    this.setTitle();
    this.itemdata = this.$route.query.item;
    this.getdata();
    this.stop();
  },
  destroyed() {
    this.move();
  },
  mounted() {
    this.datariqi =
      this.$route.query.startriqi + "至" + this.$route.query.stopriqi;
  },
};
</script>
<style lang='less' >
#Record_duv {
  height: 100vh;
  position: relative;
  .div_top {
    height: 1.5rem;
    background: #fff;
    display: flex;
    align-items: center;
    .podiv {
      margin: auto;
      width: 90%;
      height: 0.8rem;
      background: #3b64b8;
      border-radius: 0.3rem;
    }
  }
  .conten {
    box-sizing: border-box;
    padding: 0.67rem;
    width: 86%;
    height: 85%;
    background: #fff;
    position: absolute;
    top: 0.8rem;
    left: 7%;
    overflow: scroll;
    .conte_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cont_left {
        display: inline-block;
        width: 3.33rem;
        height: 3.33rem;
        font-size: 1rem;

        border-radius: 50%;
        line-height: 3.33rem;
        text-align: center;
        background-color: #387ef5;
        color: #fff;
      }
      .cont_mid {
        // width: 60%;
        .cont_mid_top {
          font-size: 1.17rem;
        }
      }
    }
    .conte_m {
      margin: 1rem 0;
      display: flex;
      padding: 0.67rem 10px;
      border-top: 0.16rem dashed #f2f2f2;
      border-bottom: 0.16rem dashed #f2f2f2;
      .conte_m_left {
        width: 50%;
        .conte_m_font {
          color: #030303;
          line-height: 1.8rem;
        }
      }
      .conte_m_right {
        width: 50%;
        .conte_m_font {
          color: #030303;
          line-height: 1.8rem;
        }
      }
    }
    .conten_list {
      display: flex;
      align-items: center;
      .conten_list_left {
        width: 30%;
        color: #1d2024;
        font-size: 1rem;
        font-weight: bold;
      }
      .conten_list_rigth {
        .conten_list_rigth_font {
          color: #77797f;
        }
      }
    }
  }
}
</style>

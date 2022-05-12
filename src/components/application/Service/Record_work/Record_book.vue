<template>
  <!--  -->
  <div id="Record_book">
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div style="height: 100%; position: relative" @click="changday(data)">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split("-").slice(1)[1] }}
            {{ data.isSelected ? "✔️" : "" }}
          </p>
          <div v-for="(item, index) in dataList">
            <p v-if="item.day == data.day && item.num > 0" style="color: red">
              +{{ item.num }}

              <!--   -->
            </p>

            <div
              v-if="item.day == data.day && item.sign == '1'"
              class="lvtag"
            ></div>
          </div>
        </div>
      </template>
    </el-calendar>
    <div class="title1" @click="aaa">
      <div class="weikai">统计</div>
      <div>></div>
    </div>
    <div class="title">
      <div class="weikai">未记工工人({{ weidata }}人)</div>
      <div class="all" @click="allcheck">全选</div>
    </div>
    <div class="weicontent">
      <div
        v-for="(item, index) in alldataList.no_jg_worker"
        @click="changeSpan(item, index)"
        :class="{ chanfeclor: spanIndex.indexOf(index) > -1 }"
      >
        <div class="weicontent_item">
          <span>
            {{
              item.name.length <= 2
                ? item.name
                : item.name.substr(item.name.length - 2, 2)
            }}
          </span>
        </div>
        <div class="weicontent_name">{{ item.name }}</div>
      </div>
      <div>
        <div class="weicontent_item" @click="addren">
          <van-icon size="50" name="plus" />
        </div>
      </div>
    </div>
    <div class="title">
      <div class="weikai">已记工工人({{ yidata }}人)</div>
      <div></div>
    </div>
    <div class="yicontent">
      <div
        class="yicontent_item"
        v-for="(item, index) in alldataList.jg_worker"
        @click="lookinfo(item)"
      >
        <div class="item_name">
          {{ item.name }}
        </div>
        <div class="item_content">
          <!-- <div @click="lookinfo(item.jg_url,2,item)"> -->
          <div>
            <div v-if="item.duration" class="gongshi">
              点工: <span style="color: #377fee">{{ item.wages }}</span> ({{
                item.duration + "个工"
              }})
            </div>
            <div v-else class="gongshi">
              点工: <span style="color: #377fee"></span> 0个工
            </div>
            <!-- <div class="gongshi">工钱(元):{{item.wages}}</div> -->
          </div>
          <!--   @click="lookinfo(item1.extend_first,1,item1)" -->
          <div
            v-if="item.skill"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
            v-for="(item1, index1) in item.skill"
          >
            <div class="gongshi">
              借支(元):
              <span style="color: #6be4a4"> {{ item1.jz_money }}</span>
            </div>
          </div>

          <div
            v-if="!item.skill"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div class="gongshi">
              借支(元): <span style="color: #6be4a4"> 0</span>
            </div>
          </div>
        </div>
        <div class="imgimg" style="display: flex; align-items: center">
          <img
            style="width: 0.33rem; height: 0.67rem"
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ysScaYttYP1619505979922.png"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="sureBtn">
      <van-button type="info" @click="gojig">{{ buttontext }}</van-button>
    </div>
    <van-popup v-model="popupshow">
      <!-- <div
                class="bianji"
                @click="fofile"
                style="background-color: #07c160"
            >编辑</div> -->
      <div class="bianji" @click="lookfile" style="background-color: #1989fa">
        查看
      </div>
      <div class="bianji" @click="delefile" style="background-color: #ee0a24">
        删除
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "Record_book",
  components: {},
  data() {
    return {
      numData: "",
      lookurl: "",
      popupshow: false,
      yidata: "",
      weidata: "",
      buttontext: "请选择要记工的工人",
      spanTime: "",
      spanIndex: [],
      spanItem: [],
      name: "12346",
      value: new Date(),
      dataList: [],
      alldataList: "",
      // alldataList: {
      //     jg_worker: [
      //         {
      //             duration: 1,
      //             id: 1,
      //             name: '大黄',
      //             wages: '100(审批中)',
      //             skill: [
      //                 {
      //                     extend_first:
      //                         'https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?corpid=dinga090000f57c90b3eee0f45d8e4f7c288&dd_share=false&showmenu=true&dd_progress=false&back=native&procInstId=870db7c7-4a42-4869-9388-3d9ab43189ec&taskId=&dinghash=approval&dd_from=isv#approval',
      //                     jz_money: '100',
      //                     status: '1'
      //                 },
      //                 {
      //                     extend_first:
      //                         'https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?corpid=dinga090000f57c90b3eee0f45d8e4f7c288&dd_share=false&showmenu=true&dd_progress=false&back=native&procInstId=870db7c7-4a42-4869-9388-3d9ab43189ec&taskId=&dinghash=approval&dd_from=isv#approval',
      //                     jz_money: '100',
      //                     status: '1'
      //                 }
      //             ]
      //         }
      //     ]
      // }
    };
  },
  computed: {},
  watch: {
    spanIndex(val, oldval) {
      this.spanItem = [];

      for (var i = 0; i < val.length; i++) {
        this.spanItem.push(this.alldataList.no_jg_worker[val[i]]);
        // console.log('22');
      }
      if (val.length == 0) {
        this.buttontext = "请选择要记工的工人";
      } else {
        this.buttontext = "去记工(已选" + val.length + ")人";
      }

      // this.$store.commit('setworklist', this.spanItem);
    },
    value(val, oldval) {
      this.$axios
        .post("/projectthree/workerStatus", {
          day: this.dateFormat(val),
          ban_id: this.$store.state.userData.workitemdata.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.alldataList = res.data.data;
            this.yidata = res.data.data.jg_worker.length;
            this.weidata = res.data.data.no_jg_worker.length;
          } else {
            Toast(res.data.msg);
          }
        });
    },
  },
  methods: {
    aaa() {
      this.$router.push({
        path: "/Record_tongji",
      });
    },
    allcheck() {
      var newindex = [];

      this.spanItem = this.alldataList.no_jg_worker;
      for (var i = 0; i < this.spanItem.length; i++) {
        newindex.push(i);
      }

      this.spanIndex = newindex;
    },
    changeSpan(item, index) {
      const _this = this;
      let arrIndex = _this.spanIndex.indexOf(index);

      if (arrIndex > -1) {
        _this.spanIndex.splice(arrIndex, 1);
      } else {
        _this.spanIndex.push(index);
      }
    },
    setTitle() {
      const _this = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: _this.$store.state.userData.workitemdata.name, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    addren() {
      this.$router.push({
        path: "/Record_add",
      });
    },
    changday(val) {
      this.spanTime = val.day;
      this.getdataList();

      // this.$axios
      //     .post('/projectthree/workerStatus', {
      //         day: val.day,
      //         ban_id: this.$store.state.userData.workitemdata.id
      //     })
      //     .then((res) => {
      //         if (res.data.code == 1) {
      //             this.alldataList = res.data.data;
      //             this.yidata = res.data.data.jg_worker.length;
      //             this.weidata = res.data.data.no_jg_worker.length;
      //         } else {
      //             Toast(res.data.msg);
      //         }
      //     });
    },
    bbb() {
      console.log("1");
    },
    dateFormat(dateData) {
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
    getdataList() {
      // this.dateFormat(new Date());
      console.log(this.dateFormat(new Date()));

      this.$axios
        .post("/projectthree/calendarJg", {
          day: this.dateFormat(new Date()),
          ban_id: this.$store.state.userData.workitemdata.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.dataList = res.data.data;
          } else {
            Toast(res.data.msg);
          }
        });
    },
    gojig() {
      this.$store.commit("setspanTime", this.spanTime);
      if (this.spanItem.length < 1) {
        Toast("请选择人员");
      } else {
        this.$router.push({
          path: "/Record_sp",
          query: {
            spanItem: this.spanItem,
            spanTime: this.spanTime,
          },
        });
      }
    },
    getrenList() {
      this.$axios
        .post("/projectthree/workerStatus", {
          day: this.dateFormat(new Date()),
          ban_id: this.$store.state.userData.workitemdata.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.alldataList = res.data.data;
            this.yidata = res.data.data.jg_worker.length;

            this.weidata = res.data.data.no_jg_worker.length;
          } else {
            Toast(res.data.msg);
          }
        });
    },
    // 查看
    lookfile() {
      const _this = this;
      dd.ready(function () {
        dd.biz.util.openLink({
          url: _this.lookurl, //要打开链接的地址
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
      });
    },
    // 编辑
    fofile() {
      if (this.numData == 1) {
        this.$router.push({
          path: "/Record_jie",
          query: {
            plpData: this.plpData.jz_id,
            spanTime: this.spanTime,
          },
        });
      } else {
        this.$router.push({
          path: "/Record_ji",
          query: {
            plpData: this.plpData.jg_id,
            spanTime: this.spanTime,
          },
        });
      }
    },
    // 删除
    delefile() {
      if (this.numData == 1) {
        this.$axios
          .post("/projectthree/jzjgdel", {
            status: this.numData,
            id: this.plpData.jz_id,
          })
          .then((res) => {
            if (res.data.code == 1) {
              Toast(res.data.msg);
              this.popupshow = false;
              this.getrenList();
            } else {
              Toast(res.data.msg);
            }
          });
      } else {
        this.$axios
          .post("/projectthree/jzjgdel", {
            status: this.numData,
            id: this.plpData.jg_id,
          })
          .then((res) => {
            if (res.data.code == 1) {
              Toast(res.data.msg);
              this.popupshow = false;
              this.getrenList();
            } else {
              Toast(res.data.msg);
            }
          });
      }
    },
    // lookinfo(url, num, item) {

    //     this.popupshow = true;
    //     this.plpData = item;
    //     this.lookurl = url;
    //     this.numData = num;
    //     console.log(this.plpData);
    // }
    lookinfo(item) {
      this.$router.push({
        path: "/Record_jlist",
      });
      this.$store.commit("setjiitemdata", item);
      this.$store.commit("setspanTime", this.spanTime);
    },
  },
  created() {
    this.setTitle();
    this.getdataList();
    this.getrenList();
    this.spanTime = this.dateFormat(new Date());
  },
  mounted() {},
};
</script>
<style lang='less' >
#Record_book {
  padding-bottom: 6.67rem;
  p {
    line-height: 0;
  }
  .lvtag {
    width: 0.33rem;
    height: 0.33rem;
    background-color: #67c23a;
    border-radius: 50%;
    position: absolute;
    top: -25px;
    right: 0.16rem;
  }
  .is-selected {
    color: #1989fa;
  }
  .el-calendar {
    .el-calendar__header {
      .el-calendar__button-group {
        .el-button--mini {
          font-size: 1rem;
        }
        .el-button-group {
          .el-button--mini:last-child {
            display: none;
          }
        }
      }
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.67rem 20px;
    font-size: 1.17rem;
    .weikai {
      color: #212732;
    }
    .all {
      font-size: 0.83rem;
      padding: 0.37rem;
      text-align: center;
      width: 3.33rem;
      border: 0.03rem solid #717882;
      color: #717882;
      border-radius: 0.33rem;
    }
  }
  .title1 {
    display: flex;
    justify-content: space-between;
    padding: 0.67rem 20px;
    font-size: 1.17rem;
    background-color: #377fee;
    color: #fff;
    .weikai {
      color: #fff;
    }
  }
  .weicontent {
    background-color: #fff;
    padding: 0.67rem;
    display: flex;
    flex-wrap: wrap;
    .weicontent_item {
      margin: 0.33rem;
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
      background-color: #377fee;
      border-radius: 0.5rem;
      text-align: center;

      font-size: 1rem;
      color: #fff;
      font-weight: 600;
      .van-icon {
        font-size: 1rem;
      }
    }
    .weicontent_name {
      width: 3.5rem;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .yicontent {
    background-color: #fff;
    padding: 0.67rem;
    .yicontent_item {
      // border-bottom: 0.06rem solid #f3f6fd;
      display: flex;
      align-items: center;
      // border-bottom: 0.06rem solid #f3f6fd;

      .item_name {
        font-size: 1.17rem;
        font-weight: 600;
        width: 20%;
        text-align: center;
        display: flex;
        align-items: center;
      }
      .item_content {
        width: 80%;
        .gongshi {
          font-size: 0.93rem;
          line-height: 1.67rem;
        }
      }
      .imgimg {
        width: 0.33rem;
        height: 0.67rem;
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
  .chanfeclor {
    .weicontent_item {
      background-color: red !important;
    }
  }
  .van-popup {
    // height: 30%;
    width: 70%;
    border-radius: 0.5rem;
    .bianji {
      color: #fff;
      width: 70%;

      border-radius: 0.5rem;
      line-height: 3rem;
      margin: 0.33rem auto;
      text-align: center;
    }
  }
}
</style>

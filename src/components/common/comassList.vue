<template>
  <!--  -->
  <div id="comassList">
    <div class="twobtn">
      <div class="btnbtn" @click="ckeckAss" type="info">选择资产</div>
      <div class="btnbtn" @click="deleList" type="info">移除资产</div>
    </div>
    <van-checkbox-group
      v-model="resulted"
      ref="chedboxGroup"
      @change="groupChecked"
    >
      <div
        class="renwucontent"
        v-for="(item, index) in checkedList"
        :key="index"
      >
        <div style="padding: 0.5rem 1rem">
          <div class="item_heard">
            <div class="item_img">
              <div class="item_img_title">
                <div class="item_img_title1">
                  {{ item.name }}
                </div>

                <div class="item_img_title2">
                  <van-checkbox shape="square" :name="item"></van-checkbox>
                </div>
              </div>
            </div>
          </div>

          <div class="btem">
            <div class="btem1">分类-名称:</div>
            <div class="btem2">{{ item.type }}-{{ item.name }}</div>
          </div>
          <div class="btem">
            <div class="btem1">品牌-型号:</div>
            <div class="btem2">{{ item.brand }}-{{ item.model }}</div>
          </div>
          <div class="btem">
            <div class="btem1">设备序列号:</div>
            <div class="btem2">{{ item.shsn }}</div>
          </div>
          <div class="btem">
            <div class="btem1">所在位置:</div>
            <div class="btem2">{{ item.address }}</div>
          </div>
          <div class="btem">
            <div class="btem1">管理员:</div>
            <div class="btem2">{{ item.bid_riqi }}</div>
          </div>
        </div>
      </div>
      <div style="height: 6rem; width: 100%"></div>
    </van-checkbox-group>
    <van-popup v-model="listshow">
      <div style="height: 100%">
        <van-checkbox-group
          v-model="result"
          ref="checkboxGroup"
          @change="groupCheck"
        >
          <div
            class="renwucontent"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <div style="padding: 0.5rem 1rem">
              <div class="item_heard">
                <div class="item_img">
                  <div class="item_img_title">
                    <div class="item_img_title1">
                      {{ item.name }}
                    </div>

                    <div class="item_img_title2">
                      <van-checkbox shape="square" :name="item"></van-checkbox>
                    </div>
                  </div>
                </div>
              </div>

              <div class="btem">
                <div class="btem1">分类-名称:</div>
                <div class="btem2">{{ item.type }}-{{ item.name }}</div>
              </div>
              <div class="btem">
                <div class="btem1">品牌-型号:</div>
                <div class="btem2">{{ item.brand }}-{{ item.model }}</div>
              </div>
              <div class="btem">
                <div class="btem1">设备序列号:</div>
                <div class="btem2">{{ item.shsn }}</div>
              </div>
              <div class="btem">
                <div class="btem1">所在位置:</div>
                <div class="btem2">{{ item.address }}</div>
              </div>
              <div class="btem">
                <div class="btem1">管理员:</div>
                <div class="btem2">{{ item.bid_riqi }}</div>
              </div>
            </div>
          </div>
          <div style="height: 6rem; width: 100%"></div>
        </van-checkbox-group>
        <div class="fotter">
          <div class="fotter-f">
            <div>已选择({{ result.length }})</div>
            <div>
              <van-checkbox shape="square" @change="isAll" v-model="allchecked"
                >全选</van-checkbox
              >
            </div>
          </div>

          <div class="fotter-btn">
            <div class="vandiv" @click="sureBtn">确定</div>
          </div>
        </div>
        <Empty v-if="Emptyshow"></Empty>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "./Empty.vue";
export default {
  name: "comassList",
  components: {},
  props: {},
  components: { Empty },
  data() {
    return {
      checkedList: [],
      listshow: false,
      frompathUrl: "",
      allchecked: false,
      result: [],
      resulted: [],
      Emptyshow: false,
      searchFormData: {
        corp_id: this.$store.state.userData.cid,
        sortname: "", //排序参数 资产状态extendone，资产编码zznumber，资产名称name，资产分类type，品牌brand，型号model，设备序列号shsn
        sort: "", //正序ASC，倒叙DESC
        current_page: 1, //页码必填
        num: 999999, //每页显示数量
        mohu: 2, //搜索前缀  1位模糊搜索2位精准搜索，3为高级搜索
        content: "", //mohu参数1.2时必填
        name: "", //资产名称
        brand: "", //品牌
        model: "", //型号填
        shsn: "", //设备序列号
        adminuser: "", //管理员
        orderid: "", //订单号
        remark: "", //备注
        zznumber: "", //资质编码
        extendone: "", //资产状态
        type: "", //资产分类，分类数组
        usestatus: "", //使用状况
        shoptype: "", //购置方式
        starttime: "", //购置起租开始日期
        stoptime: "", //购置起租结束日期填
        address: "", //位置
        chengzuorg: "", //所属承租公司
      },
      dataList: [],
      deleteshow: "",
      editdata: false,
      name: "name",
      showFileddata: [],
    };
  },
  computed: {},
  watch: {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log("to", to);
      console.log(from);
      vm.frompathUrl = from;
    });
  },
  methods: {
    ckeckAss() {
      console.log("resulted", this.checkedList);
      this.result = this.checkedList;
      //   this.allchecked = false;
      this.listshow = true;
    },
    groupChecked(val) {},
    deleList() {
      if (this.resulted.length == 0) {
        return Toast("请选择资产");
      }

      let resultedid = [];
      this.resulted.map((item) => {
        resultedid.push(item.id);
      });
      let newcheckedList = [];
      this.checkedList.forEach((item) => {
        if (!resultedid.includes(item.id)) {
          newcheckedList.push(item);
        }
      });
      this.checkedList = newcheckedList;
    },
    sureBtn() {
      //   this.resulted = [];
      this.listshow = false;
      this.checkedList = this.result;
    },
    isAll(val) {
      console.log(val);
      if (val) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    },
    groupCheck(name) {
      console.log("787", name, this.result);
      if (name.length == this.dataList.length) {
        this.allchecked = true;
      } else {
        this.allchecked = false;
      }
    },
    lookinfo(item) {
      if (this.fatherMethod1) {
        this.fatherMethod1(item);
      }
    },
    deleteitem(item) {
      if (this.fatherMethod2) {
        this.fatherMethod2(item);
      }
    },

    goinfo(item, val) {
      if (item.status == 2 || item.status == 5) {
        if (this.fatherMethod4) {
          this.fatherMethod4(item, val);
        }
      } else {
        Toast("只能修改同意或外部数据");
      }
    },
    getTimej(item) {
      if (this.fatherMethod3) {
        this.fatherMethod3(item);
      }
    },
    getList() {
      this.$axios
        .post("/erp_check/assetlists", this.searchFormData)
        .then((res) => {
          if (res.data.code == 1) {
            this.dataList = res.data.content.list;
            if (this.dataList && this.dataList.length > 0) {
              this.Emptyshow = false;
            } else {
              this.Emptyshow = true;
            }
          } else {
            Toast(res.data.msg);
          }
        });
    },
  },
  created() {
    this.getList();
  },
  mounted() {},
};
</script>
<style lang='less' >
#comassList {
  .twobtn {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    padding: 0.5rem 0;
    .btnbtn {
      background-color: #1989fa;
      color: #fff;
      padding: 0.5rem;
    }
  }
  .renwucontent {
    margin-top: 0.67rem;
    background-color: #fff;
    // padding: 0.33rem 20px;
    border-radius: 0.33rem;
    .btem {
      display: flex;
      margin-left: 0.33rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      font-size: 0.87rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      line-height: 2rem;

      .btem1 {
        width: 35%;

        overflow: hidden;

        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btem2 {
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item_heard {
      padding-bottom: 0.5rem;
      border-bottom: 0.1rem solid #eceff3;
      display: flex;
      justify-content: space-between;
      line-height: 2.33rem;
      font-size: 1rem;
      color: #3b4045;
      align-items: center;
      margin-left: 0.33rem;
      .item_name {
        margin: 0.33rem 0;
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item_img {
        display: flex;
        align-items: center;
        font-size: 1.17rem;
        width: 100%;
        img {
          border-radius: 50%;
          width: 1.7rem;
          height: 1.7rem;
          // margin-right: 0.33rem;
        }

        .item_img_title {
          margin-left: 0.33rem;
          line-height: 1.17rem;
          // padding-top: 0.33rem;
          width: 90%;
          display: flex;
          justify-content: space-between;

          .item_img_title1 {
            width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000000;
            font-weight: 600;

            font-size: 1rem;

            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
          }

          .item_img_title2 {
            text-align: right;
            font-size: 0.8rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
          }
        }
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
  }
  .van-checkbox-group {
    height: 100%;
    margin-bottom: 3rem;
    overflow-y: scroll;
  }
  .fotter {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    .fotter-f {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 2.5%;
      border-bottom: 0.1rem solid #eceff3;
    }
    .fotter-btn {
      padding: 0.3rem 0;

      .vandiv {
        margin: auto;
        width: 95%;
        text-align: center;
        background-color: #409fee;
        color: #fff;
        line-height: 2.5rem;
      }
    }
  }
  .van-popup {
    width: 100%;
    height: 100%;
    background-color: #f3f6fd;
  }
}
</style>

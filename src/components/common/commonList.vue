<template>
  <!--  -->
  <div id="commonList">
    <div class="renwucontent" v-for="(item, index) in dataList" :key="index">
      <div style="padding: 0.5rem 1rem" @click="lookinfo(item)">
        <div class="item_heard">
          <div class="item_img">
            <img
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/nkKrYbEW2m1615339826337.jpg"
              alt
            />

            <div class="item_img_title">
              <div v-if="item.project_name" class="item_img_title1">
                {{ item.project_name }}
              </div>
              <div v-else class="item_img_title1">
                {{ item.name }}
              </div>

              <div class="item_img_title2">
                {{ item.created }}
              </div>
            </div>
          </div>
        </div>
        <div class="btem" v-for="(idata, iindex) in showFileddata">
          <div class="btem1">{{ idata.label }}:</div>
          <div class="btem2">{{ item[idata.value] }}</div>
        </div>
        <!-- <div class="btem">
                    <div class="btem1">投标负责人:</div>
                    <div class="btem2">{{ item.applicant }}</div>
                </div>
                <div class="btem">
                    <div class="btem1">类型:</div>
                    <div class="btem2">{{ item.type }}</div>
                </div>
                <div class="btem">
                    <div class="btem1">投标时间:</div>
                    <div class="btem2">{{ item.bid_riqi }}</div>
                </div> -->
      </div>

      <div class="item_bottom">
        <div @click="lookinfo(item)">
          <div
            class="btem2"
            style="color: rgb(230, 162, 60)"
            v-if="item.status == 1"
          >
            审批中
          </div>
          <div
            class="btem2"
            style="color: rgb(103, 194, 58)"
            v-else-if="item.status == 2"
          >
            已同意
          </div>
          <div
            class="btem2"
            style="color: #67c23a"
            v-else-if="item.status == 3"
          >
            已拒绝
          </div>
          <div class="btem2" style="color: #409eff" v-else>外部数据</div>
        </div>
        <div class="dele_bottom">
          <span
            v-if="editdata"
            class="delet_t"
            @click="goinfo(item, 2)"
            style="color: #387ef5"
          >
            编辑信息
          </span>
          &nbsp;

          <span
            v-if="waringdata"
            class="delet_t"
            @click="getTimej(item)"
            style="color: #387ef5"
            >提醒日期</span
          >
          &nbsp;

          <span v-if="deleteshow" class="delet_d" @click="deleteitem(item)"
            >删除</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "commonList",
  components: {},
  props: {
    waringdata: Boolean,
    dataList: Array,
    fatherMethod1: {
      type: Function,
    }, //查看详情
    fatherMethod2: {
      type: Function,
    }, //删除
    fatherMethod3: {
      type: Function,
    }, //提醒日期
    fatherMethod4: {
      type: Function,
    }, //立项修改
    valname: String,
  },
  data() {
    return {
      deleteshow: "",
      editdata: false,
      name: "name",
      showFileddata: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
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
    //获取展示字段   /spread/
    getshowlist(valname) {
      this.$axios
        .post("/spread/showFiledList", {
          name: valname,
        })
        .then((res) => {
          this.showFileddata = res.data.data.slice(1, 4);
        });
    },
    getshowlist1(valname) {
      this.$axios
        .post("/spread/showFiledCurrencyList", {
          name: valname,
        })
        .then((res) => {
          this.showFileddata = res.data.data.slice(1, 4);
        });
    },
  },
  created() {
    this.$utils.checkding();
    if (this.valname == "zhiliang" || this.valname == "anquanzhiliang") {
      this.deleteshow = false;
    } else {
      this.deleteshow = true;
    }
  },
  mounted() {
    if (this.valname == "zk_project_spreadfield") {
      this.getshowlist(this.valname);
    } else if (this.valname == "bidding_file_buy_spreadfield") {
      this.getshowlist(this.valname);
    } else if (this.valname == "project_info_register") {
      this.getshowlist1(this.valname);
      this.editdata = true;
    } else {
      this.getshowlist1(this.valname);
    }
  },
};
</script>
<style lang='less' >
#commonList {
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
        max-width: 50%;

        overflow: hidden;

        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btem2 {
        max-width: 50%;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item_heard {
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
            width: 40%;
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
    .item_bottom {
      border-top: 0.1rem solid #eceff3;
      padding: 0.6rem 1rem;
      display: flex;
      color: #485985;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;

        align-items: center;
      }

      .dele_bottom {
        color: red;
        .delet_t {
          text-align: center;
          display: block;
          width: 4.2rem;
          height: 1.3rem;
          border: 0px solid #387ef5;
          border-radius: 0.3rem;
          padding: 0.1rem;
          border: 0.03rem solid #387ef5;
        }
        .delet_d {
          text-align: center;
          display: block;
          width: 2.97rem;
          height: 1.3rem;
          border: 0px solid red;
          border-radius: 0.3rem;
          padding: 0.1rem;
          border: 0.03rem solid red;
        }
      }
    }
  }
}
</style>

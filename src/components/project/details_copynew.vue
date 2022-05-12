<template>
  <!-- 项目详情 -->
  <div id="details_copynew">
    <!-- 头部 -->
    <div class="details_copynew_header">
      <div class="header_1">
        <div class="item_font">
          <div
            style="
              width: 60%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            {{ iteminfo.project_name }}
          </div>
          <div style="width: 40%; text-align: right">
            <span style="vertical-align: middle"></span>
          </div>
        </div>
      </div>
      <div class="header_2">
        <div class="pr_time">
          <div class="pr_time_item">
            <div class="pr_time_child">项目负责人</div>
            <div class="pr_time_child font_color">
              {{ iteminfo.stalker }}
            </div>
          </div>
          <div class="pr_time_item">
            <div class="pr_time_child">开工时间</div>
            <div class="pr_time_child font_color">
              {{ iteminfo.actual_date }}
            </div>
          </div>
          <div class="pr_time_item">
            <div class="pr_time_child">开工累计天数</div>
            <div class="pr_time_child font_color">
              {{ iteminfo.start_days }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 切换 -->
    <!-- <div class="change_item">
            <div class="item_click">
                <div
                    class="item_click1"
                    v-for="(item,index ) in changeData"
                    @click="chclick(item,index)"
                    :class="numindex==index? 'imcolor':''"
                >
                    {{item.name}}
                </div>

            </div>

        </div> -->
    <!-- 施工看板 -->
    <div class="shigong">
      <!-- 进度分析 -->

      <!-- 质量分析 -->
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">产量分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>
      <!-- 单日产量 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">单日产量</div>
        </div>
        <!-- <div class="chart-wrapper">
                    <canvas id="mountNode"></canvas>
                </div> -->
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">土层</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output.days_layermetre
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">岩层</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output.days_rockmetre
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">孤石/溶洞</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output.days_subsidymetre
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">空孔</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output.days_emptyholemetre
          }}</van-col>
        </van-row>

        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">当日打桩总数量</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output.days_number
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">当日打桩总米数</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output.days_totalmetre
          }}</van-col>
        </van-row>
      </div>
      <!-- 合计产量 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">合计产量</div>
        </div>
        <!-- <div class="chart-wrapper">
                    <canvas id="mountNode1"></canvas>
                </div> -->
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">土层</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.addup_output.addup_layermetre
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">岩层</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.addup_output.addup_rockmetre
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">孤石/溶洞</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.addup_output.addup_subsidymetre
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">空孔</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.addup_output.addup_emptyholemetre
          }}</van-col>
        </van-row>

        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">打桩总数量 </van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.addup_output.addup_number
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">累计产量 </van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.addup_output.addup_totalmetre
          }}</van-col>
        </van-row>
      </div>
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">产值分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>
      <!-- 单日产值 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">单日产值</div>
        </div>
        <!-- <div class="chart-wrapper">
                    <canvas id="mountNode2"></canvas>
                </div> -->
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">土层</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output_val.days_layerbvalue
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">岩层</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output_val.days_rockvalue
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">孤石/溶洞</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output_val.days_subsidyvalue
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">空孔</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output_val.days_emptyholevalue
          }}</van-col>
        </van-row>

        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">当日产值 </van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.daily_output_val.days_totalvalue
          }}</van-col>
        </van-row>
      </div>
      <!-- 合计产值 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">合计产值</div>
        </div>
        <!-- <div class="chart-wrapper">
                    <canvas id="mountNode3"></canvas>
                </div> -->
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">土层</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.total_val.addup_layerbvalue
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">岩层</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.total_val.addup_rockvalue
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">孤石/溶洞</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.total_val.addup_subsidyvalue
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">空孔</van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.total_val.addup_emptyholevalue
          }}</van-col>
        </van-row>

        <van-row type="flex" justify="center">
          <van-col span="9" style="text-align: center">累计产值 </van-col>
          <van-col span="9" style="text-align: center">{{
            allecharts.total_val.addup_totalvalue
          }}</van-col>
        </van-row>
      </div>
      <!-- 设备单日产值 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">设备单日产值</div>
        </div>
        <!-- <div v-show="alldata.length == 0" class="chart-wrapper">
                    <img
                        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//rSCbcZcCd61635384972998.png"
                        alt=""
                    />
                </div> -->
        <!-- <div
                    v-if="alldata.length == 0"
                    style="
                        height: 30rem;
                        z-index: 10;
                        position: absolute;
                        align-items: center;
                        width: 95%;
                        background-color: rgb(255, 255, 255);
                    "
                    class="chart-wrapper"
                >
                    <img
                        style="height: 5rem; width: 5rem"
                        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//xeaXGTDNSC1635400194498.png"
                        alt=""
                    />
                </div> -->
        <div class="chart-wrapper">
          <!-- <canvas id="mountNode4"></canvas> -->

          <div id="mountNode4" ref="newmountNode4"></div>
        </div>
      </div>
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">回款情况</div>
        </div>
        <div class="log_list">
          <div class="liet_item">项目</div>
          <div class="liet_item">金额</div>
          <div class="liet_item">时间</div>
          <div class="liet_item">收款类型</div>
          <div class="liet_item">付款单位</div>
        </div>
        <div
          class="log_list"
          style="background: #fff"
          v-for="(item, index) in qualityaccident"
        >
          <div class="liet_item">
            {{ item.project_name }}
          </div>

          <div class="liet_item">
            {{ item.collection_money }}
          </div>
          <div class="liet_item">
            {{ item.riqi }}
          </div>
          <div class="liet_item">
            {{ item.type }}
          </div>
          <div class="liet_item">
            {{ item.party_a }}
          </div>
        </div>
        <van-row type="flex" justify="center">
          <van-col span="9">累计完成产值 </van-col>
          <van-col span="9" style="text-align: center">{{
            cz_contrast.addup_totalvalue
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9">累计回款 </van-col>
          <van-col span="9" style="text-align: center">{{
            cz_contrast.collection_money
          }}</van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="9">未回款 </van-col>
          <van-col span="9" style="text-align: center">{{
            cz_contrast.w_return
          }}</van-col>
        </van-row>
      </div>
      <!-- 单日产值 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">产值日志</div>
        </div>
        <!-- <div
                    v-if="divView.length == 0"
                    style="
                        height: 20rem;
                        z-index: 10;
                        position: absolute;
                        align-items: center;
                        width: 95%;
                        background-color: rgb(255, 255, 255);
                    "
                    class="chart-wrapper"
                >
                    <img
                        style="height: 5rem; width: 5rem"
                        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//xeaXGTDNSC1635400194498.png"
                        alt=""
                    />
                </div> -->

        <div class="chart-wrapper">
          <div id="mountNode5"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import F2 from "@antv/f2";
import * as echarts from "echarts";
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  data() {
    return {
      allecharts: "",
      cz_contrast: {
        addup_totalvalue: "",
        collection_money: "",
        w_return: "",
      },
      divView: [],
      alldata: [],
      shouruData5: [],
      dangchan: 0,
      hachan: 0,
      dangchan1: 0,
      hachan1: 0,
      dangchan2: 0,
      dangchan3: 0,
      profitAnalysis: "",
      anquanzhiliantj: [],
      zhiliantj: [],
      expenditureAnalysis: "",
      incomeAnalysis: "",
      qualityaccident: [],
      invoiceAnalysis: "",
      Statleft: true,
      Statright: false,
      qualitytesting: "",
      projectspeed: "",
      numindex: 0,
      changeData: [{ name: "施工看板" }, { name: "经营看板" }],
      datanumber: [],
      jindu: "",
      contshow: false,

      ProjectList: [],
      iteminfolist: [],
      popupshow: false,
      iteminfo: {
        // name: 'da1',
        // stalker_name: 'gzhaygba',
        // plan_start_riqi: '2022-01-26',
        // plan_end_riqi: '2022-01-26'
      },
      jindushow: false,
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
    // 切换
    chclick(item, index) {
      //  Statleft: true,
      // Statright: false,
      this.numindex = index;

      if (index == 0) {
        this.Statleft = true;
        this.Statright = false;
      } else {
        this.Statleft = false;
        this.Statright = true;
      }
    },

    boxCanvas1() {
      var chartDom = document.getElementById("mountNode");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
          triggerOn: "click",
        },
        legend: {
          itemWidth: 5,
          orient: "vertical",
          top: "5%",
          right: "right",
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "60%"],
            center: ["40%", "50%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              // formatter: '{c}',
              // position: 'inside'
            },
            labelLine: {
              show: true,
              length: 3,
              length2: 15,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#FFA200",
                    "#0089FF",
                    "#00D0AF",
                    "#FF3A3A",
                    "#F77400",
                    "#0CCB5D",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
            data: [],
          },
        ],
      };
      this.$axios
        .post("/task/peoject_news", {
          project_name: this.iteminfo.project_name,
        })
        .then((res) => {
          // this.qualitytesting = res.data.content;
          let newData = JSON.parse(JSON.stringify(res.data));

          this.dangchan = newData.daily_output.days_number;
          this.hachan = newData.daily_output.days_totalmetre;
          let data = [
            {
              name: "土层",
              value: newData.daily_output.days_layermetre,
            },
            {
              name: "岩层",
              value: newData.daily_output.days_rockmetre,
            },
            {
              name: "孤石/溶洞",
              value: newData.daily_output.days_subsidymetre,
            },
            {
              name: "空孔",
              value: newData.daily_output.days_emptyholemetre,
            },
          ];
          myChart.setOption({
            legend: {
              itemWidth: 5,
              orient: "vertical",
              top: "5%",
              right: "right",
              formatter: function (name) {
                let a = "";
                data.map((item) => {
                  if (item.name == name) {
                    a = item;
                  }
                });
                return name + " " + a.value;
              },
            },

            series: [
              {
                // 根据名字对应到相应的系列

                data,
              },
            ],
          });
        });
      option && myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    boxCanvas2() {
      var chartDom = document.getElementById("mountNode1");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
          triggerOn: "click",
        },
        legend: {
          itemWidth: 5,
          orient: "vertical",
          top: "5%",
          right: "right",
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "60%"],
            center: ["40%", "50%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            labelLine: {
              show: true,
              length: 3,
              length2: 15,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#FFA200",
                    "#0089FF",
                    "#00D0AF",
                    "#FF3A3A",
                    "#F77400",
                    "#0CCB5D",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
            data: [],
          },
        ],
      };
      this.$axios
        .post("/task/peoject_news", {
          project_name: this.iteminfo.project_name,
        })
        .then((res) => {
          // this.qualitytesting = res.data.content;
          let newData = JSON.parse(JSON.stringify(res.data));
          this.allecharts = JSON.parse(JSON.stringify(res.data));
          this.dangchan1 = newData.addup_output.addup_number;
          this.hachan1 = newData.addup_output.addup_totalmetre;
          let data = [
            {
              name: "土层",
              value: newData.addup_output.addup_layermetre,
            },
            {
              name: "岩层",
              value: newData.addup_output.addup_rockmetre,
            },
            {
              name: "孤石/溶洞",
              value: newData.addup_output.addup_subsidymetre,
            },
            {
              name: "空孔",
              value: newData.addup_output.addup_emptyholemetre,
            },
          ];
          myChart.setOption({
            legend: {
              itemWidth: 5,
              orient: "vertical",
              top: "5%",
              right: "right",
              formatter: function (name) {
                let a = "";
                data.map((item) => {
                  if (item.name == name) {
                    a = item;
                  }
                });
                return name + " " + a.value;
              },
            },

            series: [
              {
                // 根据名字对应到相应的系列

                data,
              },
            ],
          });
        });
      option && myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    boxCanvas3() {
      var chartDom = document.getElementById("mountNode2");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
          triggerOn: "click",
        },
        legend: {
          itemWidth: 5,
          orient: "vertical",
          top: "5%",
          right: "right",
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "60%"],
            center: ["40%", "50%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            labelLine: {
              show: true,
              length: 3,
              length2: 15,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#FFA200",
                    "#0089FF",
                    "#00D0AF",
                    "#FF3A3A",
                    "#F77400",
                    "#0CCB5D",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
            data: [],
          },
        ],
      };
      this.$axios
        .post("/task/peoject_news", {
          project_name: this.iteminfo.project_name,
        })
        .then((res) => {
          // this.qualitytesting = res.data.content;
          let newData = JSON.parse(JSON.stringify(res.data));
          this.dangchan2 = newData.daily_output_val.days_totalvalue;
          let data = [
            {
              name: "土层",
              value: newData.daily_output_val.days_layerbvalue,
            },
            {
              name: "岩层",
              value: newData.daily_output_val.days_rockvalue,
            },
            {
              name: "孤石/溶洞",
              value: newData.daily_output_val.days_subsidyvalue,
            },
            {
              name: "空孔",
              value: newData.daily_output_val.days_emptyholevalue,
            },
          ];
          myChart.setOption({
            legend: {
              itemWidth: 5,
              orient: "vertical",
              top: "5%",
              right: "right",
              formatter: function (name) {
                let a = "";
                data.map((item) => {
                  if (item.name == name) {
                    a = item;
                  }
                });
                return name + " " + a.value;
              },
            },
            series: [
              {
                // 根据名字对应到相应的系列

                data,
              },
            ],
          });
        });
      option && myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    boxCanvas4() {
      var chartDom = document.getElementById("mountNode3");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
          triggerOn: "click",
        },
        legend: {
          itemWidth: 5,
          orient: "vertical",
          top: "5%",
          right: "right",
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "60%"],
            center: ["40%", "50%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            labelLine: {
              show: true,
              length: 3,
              length2: 15,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#FFA200",
                    "#0089FF",
                    "#00D0AF",
                    "#FF3A3A",
                    "#F77400",
                    "#0CCB5D",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
            data: [],
          },
        ],
      };
      this.$axios
        .post("/task/peoject_news", {
          project_name: this.iteminfo.project_name,
        })
        .then((res) => {
          // this.qualitytesting = res.data.content;
          let newData = JSON.parse(JSON.stringify(res.data));
          this.dangchan3 = newData.total_val.addup_totalvalue;

          let data = [
            {
              name: "土层",
              value: newData.total_val.addup_layerbvalue,
            },
            {
              name: "岩层",
              value: newData.total_val.addup_rockvalue,
            },
            {
              name: "孤石/溶洞",
              value: newData.total_val.addup_subsidyvalue,
            },
            {
              name: "空孔",
              value: newData.total_val.addup_emptyholevalue,
            },
          ];
          myChart.setOption({
            legend: {
              itemWidth: 5,
              orient: "vertical",
              top: "5%",
              right: "right",

              formatter: function (name) {
                let a = "";
                data.map((item) => {
                  if (item.name == name) {
                    a = item;
                  }
                });
                return name + " " + a.value;
              },
            },
            series: [
              {
                // 根据名字对应到相应的系列
                data,
              },
            ],
          });
        });
      option && myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    boxCanvas5() {
      this.$axios
        .post("/task/peoject_news", {
          // project_name: '我是大范甘迪',
          project_name: this.iteminfo.project_name,
          start_time: "",
          end_time: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            let newData = JSON.parse(JSON.stringify(res.data));
            let newalldata = newData.device_val;

            let newList = [];

            if (newalldata.length > 3) {
              newList = newalldata.slice(
                newalldata.length - 3,
                newalldata.length
              );
            } else {
              newList = newalldata;
            }
            // this.alldata = newData.device_val;
            this.alldata = newList;
            // 柱形图

            let newChar5x = [];
            newChar5x = newData.device_number;

            let newChar5d = [];
            newChar5d = newList.map((item) => {
              return item.map((item1) => {
                return item1.now_date;
              });
            });
            let newChar5a = newList;

            this.shouruData5 = newData.linechart;

            // 柱图
            this.$nextTick(() => {
              this.getPie(newChar5x, newChar5d, newChar5a);
            });

            //折线
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.now_date) && res.set(arr.now_date, 1)
      );
    },

    getPie(arrx, arrd, arra) {
      // var chartDom = document.getElementById('mountNode4');
      var chartDom = this.$refs.newmountNode4;

      if (chartDom) {
        console.log("bu为空!");
        var myChart = echarts.init(chartDom);

        console.log("888888", arra);
        let newlist = ["now_date", ...arrx];
        let arrd1 = [].concat.apply([], arrd);

        let arrd2 = arrd1.reduce((prev, cur) => {
          prev.indexOf(cur) === -1 && prev.push(cur);
          return prev;
        }, []);

        console.log(arrd2); //日期
        let arra1 = [].concat.apply([], this.alldata);
        arra1 = this.unique(arra1);

        for (let i in arra1) {
          for (let j in arrx) {
            arra1[i][arrx[j]] = 0;
          }

          // delete arra1[i].spread1;
          // delete arra1[i].today_cz;
          // delete arra1[i].today_wcgl;
        }
        console.log("9999", arra1);

        for (let j in arra) {
          console.log("1", arra[j]);
          for (let i in arra[j]) {
            console.log("2", arra[j][i].spread1);

            for (let k in arrx) {
              console.log("3", arrx[k]);
              if (arrx[k] == arra[j][i].spread1) {
                console.log(arrx[k]);
                arra1[j][arrx[k]] = arra[j][i].today_cz;
                // console.log('4', arra[i][arrx[k]]);
              }
            }
          }
        }

        console.log("22121122", arra1, this.alldata);

        console.log("1213112323", arrx, arrd);
        let series = [
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
        ];
        let series1 = series.slice(0, arrx.length);
        console.log("series:", series.slice(0, arrx.length));
        let option;
        option = {
          legend: {},
          tooltip: {},
          dataset: {
            dimensions: newlist,
            source: arra1,
          },
          xAxis: { type: "category" },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: series1,
        };
        this.$nextTick(() => {
          option && myChart.setOption(option);
          window.onresize = myChart.resize;
        });
      } else {
        console.log("为空!");
      }
    },
    boxCanvas6() {
      this.$axios
        .post("/task/peoject_news", {
          project_name: this.iteminfo.project_name,
        })
        .then((res) => {
          let newData = JSON.parse(JSON.stringify(res.data));

          this.divView = newData.linechart;
          let data = [];

          if (newData.linechart.length > 7) {
            data = newData.linechart.slice(
              newData.linechart.length - 7,
              newData.linechart.length
            );
          } else {
            data = newData.linechart;
          }
          // xian图
          let newChar6x = [];
          newChar6x = data.map((item) => {
            return item.tj_date;
          });
          let newChar6y = [];
          newChar6y = data.map((item) => {
            return item.total;
          });

          var chartDom = document.getElementById("mountNode5");
          var myChart = echarts.init(chartDom);
          var option;
          option = {
            tooltip: {
              trigger: "item",
            },
            xAxis: {
              type: "category",
              data: newChar6x,
            },
            yAxis: {
              type: "value",
              axisLabel: {
                interval: 0,
                rotate: 40,
              },
            },
            series: [
              {
                name: "123",
                type: "line",
                itemStyle: {
                  normal: {
                    color: "#3A9AFA", //折线点的颜色
                    lineStyle: {
                      color: "#3A9AFA", //折线的颜色
                    },
                  },
                },

                // avoidLabelOverlap: true,
                label: {
                  show: true,
                  position: "outside",
                },
                labelLine: {
                  show: true,
                },
                emphasis: {
                  label: {
                    show: true,
                  },
                },

                data: newChar6y,
              },
            ],
          };
          option && myChart.setOption(option);
          window.onresize = myChart.resize;
        });
    },
    // 项目进度
    // getspeed() {
    //     this.$axios
    //         .post('/task/projectspeed', {
    //             id: this.iteminfo.id
    //         })
    //         .then((res) => {
    //             this.projectspeed = res.data.speed;
    //         });
    // },
    //质量检查统计
    getqualitytesting() {
      this.$axios
        .post("/task/qualitytesting", {
          project_name: this.iteminfo.name,
          corp_id: this.$store.state.userData.cid,
        })
        .then((res) => {
          this.qualitytesting = res.data.content;
        });
    },
    //发票分析
    getinvoiceAnalysis() {
      this.$axios.post("/projectfour/invoiceAnalysis").then((res) => {
        this.invoiceAnalysis = res.data.data;
      });
    },
    //工程日志综合统计
    getqualityaccident() {
      this.$axios
        .post("/task/singlereturn", {
          project_name: this.iteminfo.project_name,
          party_a: "",
          now_time: "",
          num: "999",
          current_page: "1",
        })
        .then((res) => {
          this.cz_contrast = res.data.cz_contrast;
          this.qualityaccident = res.data.content.list;
        });
    },

    // 质量事故
    getincomeAnalysis() {
      this.$axios
        .post("/projectfour/incomeAnalysis", {
          project_name: this.iteminfo.name,
          // corp_id: this.$store.state.userData.cid,
          // id: this.iteminfo.id
        })
        .then((res) => {
          this.incomeAnalysis = res.data.data;
        });
    },
    // 质量事故
    getexpenditureAnalysis() {
      this.$axios
        .post("/projectfour/expenditureAnalysis", {
          project_name: this.iteminfo.name,
          // corp_id: this.$store.state.userData.cid,
          // id: this.iteminfo.id
        })
        .then((res) => {
          this.expenditureAnalysis = res.data.data;
        });
    },
    // 利润分析
    getprofitAnalysis() {
      this.$axios
        .post("/projectfour/profitAnalysis", {
          project_name: this.iteminfo.name,
          // corp_id: this.$store.state.userData.cid,
          // id: this.iteminfo.id
        })
        .then((res) => {
          this.profitAnalysis = res.data.data;
        });
    },
    // 质量事故
    getzhiliantj() {
      this.$axios
        .post("/finance/zhiliantj", {
          proname: this.iteminfo.name,
          corp_id: this.$store.state.userData.cid,
          id: this.iteminfo.id,
          userid: this.$store.state.userData.userid,
          type: 1,
        })
        .then((res) => {
          this.zhiliantj = res.data.jibie;
        });
    },
    // anquan事故
    getanquanzhiliantj() {
      this.$axios
        .post("/finance/anquanzhiliantj", {
          proname: this.iteminfo.name,
          corp_id: this.$store.state.userData.cid,
          id: this.iteminfo.id,
          userid: this.$store.state.userData.userid,
          type: 1,
        })
        .then((res) => {
          this.anquanzhiliantj = res.data.jibie;
        });
    },
    getakk() {
      this.$axios
        .post("/task/peoject_news", {
          project_name: this.iteminfo.project_name,
        })
        .then((res) => {
          // this.qualitytesting = res.data.content;
          this.allecharts = JSON.parse(JSON.stringify(res.data));
        });
    },
  },
  updated() {
    this.$nextTick(() => {
      this.boxCanvas5();
      this.boxCanvas6();
    });
  },
  mounted() {
    this.getqualityaccident();
    this.getakk();
    // this.boxCanvas1();
    // this.boxCanvas2();
    // this.boxCanvas3();
    // this.boxCanvas4();
  },
  created() {
    this.iteminfo = this.$store.state.userData.xminfo;

    console.log(this.iteminfo);

    this.$utils.checkding();
    // this.setTitle();

    // this.getincomeAnalysis();
    // this.getexpenditureAnalysis();
    // this.getinvoiceAnalysis();
    // this.getprofitAnalysis();
    // this.getzhiliantj();
    // this.getanquanzhiliantj();
    // this.getspeed();
  },
};
</script>
<style lang="less">
#details_copynew {
  #mountNode4 {
    // height: 6.67rem;
    width: 100%;
    height: 900px;
  }
  #mountNode5 {
    // height: 6.67rem;
    width: 100%;
    height: 600px;
  }
  .imcolor {
    height: 100%;
    background-color: #0089ff !important;
    color: #fff !important;
    line-height: 2rem;
  }
  .details_copynew_header {
    height: 12rem;
    background-color: #238bfe;
    background-size: 100% 100%;
    background-image: url(https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/CAraXZfKkz1615359535724.jpg);

    .header_1 {
      box-sizing: border-box;
      height: 180px;
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
      // height: 6.67rem;
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

            font-size: 0.8rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #a1baff;
          }
          .font_color {
            color: #fff;
            font-size: 0.8rem;
            font-family: PingFang SC;
          }
        }
      }
    }
  }
  .change_item {
    height: 3.87rem;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #f0f0f0;
    display: flex;
    align-items: center;

    .item_click {
      margin: auto;
      width: 16.3rem;
      height: 2.07rem;
      border: 0.03rem solid #0089ff;
      border-radius: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item_click1 {
        width: 50%;
        font-size: 1rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #0089ff;
        text-align: center;
      }
    }
  }
  .shigong {
    position: absolute;
    width: 100%;
    .item_title {
      margin: 0.63rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .s_circular {
        width: 0.2rem;
        margin: 0 0.35rem;
        height: 0.2rem;
        background: #0089ff;
        border-radius: 50%;
      }
      .b_circular {
        width: 0.3rem;
        height: 0.3rem;
        margin: 0 0.35rem;
        background: #0089ff;
        border-radius: 50%;
      }
      .titlename {
        font-size: 1rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #0089ff;
      }
    }
    .Progress {
      margin: auto;
      width: 95%;
      height: 6.3rem;
      background: #ffffff;
      box-shadow: 0rem 0rem 0.3rem 0.3rem #f0f0f0;
      border-radius: 0.5rem;
      .num_title {
        margin-top: 0.67rem;
        padding: 0.67rem 0;
        background-color: #fff;
        line-height: 2rem;
        color: #000;
        border-radius: 0.5rem;

        // border-bottom: 0.03rem solid #eceeed;
        padding-left: 0.67rem;
        display: flex;
        .color_div {
          width: 0.33rem;
          height: 1.17rem;
          background: #0089ff;
          border-radius: 0.13rem;
        }
        .color_font {
          margin-left: 0.47rem;
          // width: 119px;
          height: 0.97rem;
          font-size: 1rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 1.17rem;
        }
      }
      .Progress_name {
        .Progress_name_item {
          margin-top: 0.5rem;
          text-align: center;
          height: 0.83rem;
          font-size: 0.87rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #0089ff;
          line-height: 1rem;
        }
        .Progress_name_jindu {
          margin-top: 1rem;
          .van-progress {
            width: 95%;
            margin: auto;
          }
        }
      }
    }
    .quality {
      padding-bottom: 0.5rem;
      margin: 0.83rem auto;
      width: 95%;
      // height: 10.23rem;
      background: #ffffff;
      box-shadow: 0rem 0rem 0.3rem 0.3rem #f0f0f0;
      border-radius: 0.5rem;
      .van-row {
        line-height: 1.5rem;
        .van-col {
          background-color: #f8f9fe;
        }
      }
      .num_title {
        margin-top: 0.67rem;
        padding: 0.67rem 0;
        background-color: #fff;
        line-height: 2rem;
        color: #000;
        border-radius: 0.5rem;
        // border-bottom: 0.03rem solid #eceeed;
        padding-left: 0.67rem;
        display: flex;
        .color_div {
          width: 0.33rem;
          height: 1.17rem;
          background: #0089ff;
          border-radius: 0.13rem;
        }
        .color_font {
          margin-left: 0.47rem;
          // width: 119px;
          height: 0.97rem;
          font-size: 1rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 1.17rem;
        }
      }
      .chart-wrapper {
        display: flex;
        justify-content: center;
        #mountNode {
          // width: 100% !important;
        }
        #anmountNode {
          // width: 100% !important;
          // height: 16.67rem;
        }
        #mountNodegou {
          // width: 100% !important;
        }
      }
      .quality_item {
        .list_item {
          display: flex;
          align-items: center;
          line-height: 1.5rem;
          justify-content: space-between;
          padding: 0 20px;

          .y_font {
            font-size: 0.73rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
            display: flex;
            align-items: center;
            .y_circular {
              width: 0.37rem;
              height: 0.37rem;
              background: #ffa200;
              border-radius: 50%;
              margin: 0 0.5rem;
            }
          }
        }
      }
    }
    .engineering {
      // height: 13.73rem;
      padding-bottom: 1rem;
      margin: auto;
      width: 95%;
      // height: 10.23rem;
      background: #ffffff;
      box-shadow: 0rem 0rem 0.3rem 0.3rem #f0f0f0;
      border-radius: 0.5rem;
      .van-row {
        width: 87%;
        margin: auto;
        font-size: 0.73rem;
        background-color: #f8f9fe;
        // .van-col {

        // }
      }
      .num_title {
        margin-top: 0.67rem;
        padding: 0.67rem 0;
        background-color: #fff;
        line-height: 2rem;
        border-radius: 0.5rem;
        color: #000;

        // border-bottom: 0.03rem solid #eceeed;
        padding-left: 0.67rem;
        display: flex;
        .color_div {
          width: 0.33rem;
          height: 1.17rem;
          background: #0089ff;
          border-radius: 0.13rem;
        }
        .color_font {
          margin-left: 0.47rem;
          // width: 119px;
          height: 0.97rem;
          font-size: 1rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 1.17rem;
        }
      }
      .log_list {
        width: 87%;
        margin: auto;
        height: 1.87rem;
        background: #f8f9fe;
        display: flex;
        font-size: 0.73rem;
        .liet_item {
          width: 20%;
          text-align: center;
          line-height: 1.87rem;
          border: 0.03rem solid #f3f4f9;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .liet_item1 {
          width: 50%;
          text-align: center;
          line-height: 1.87rem;
          border: 0.03rem solid #f3f4f9;
        }
        .liet_item2 {
          width: 33%;
          text-align: center;
          line-height: 1.87rem;
          border: 0.03rem solid #f3f4f9;
        }
      }
    }
    .fapiao {
      height: 10.6rem;

      margin: auto;
      width: 95%;
      // height: 10.23rem;
      background: #ffffff;
      box-shadow: 0rem 0rem 0.3rem 0.3rem #f0f0f0;
      border-radius: 0.5rem;
      .fapiao_top {
        font-size: 0.8rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 1rem;
        padding: 0.7rem;
        span {
          color: #0089ff;
        }
      }
      .fapiao_body {
        display: flex;
        justify-content: space-between;
        padding: 0 0.7rem;
        .fapiao_body_item {
          height: 3.23rem;
          width: 47%;

          border-radius: 0.3rem;

          .fapiao_font {
            margin-top: 0.35rem;
            margin-left: 1.13rem;
            font-size: 0.8rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;
            span {
              vertical-align: middle;
            }

            img {
              width: 0.7rem;
              height: 0.7rem;
              vertical-align: middle;
            }
          }
        }
        .fapiao_body_color1 {
          background: linear-gradient(182deg, #24dd93, #00d27e);
        }
        .fapiao_body_color2 {
          background: linear-gradient(182deg, #ff3e3e, #ff6a5b);
        }
        .fapiao_body_color3 {
          background: linear-gradient(182deg, #ff9b39, #ffb81e);
        }
        .fapiao_body_color4 {
          background: linear-gradient(182deg, #0089ff, #1e73ff);
        }
      }
    }
  }
}
</style>

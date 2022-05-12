<template>
  <!-- 项目详情 -->
  <div id="details_copy">
    <!-- 头部 -->
    <div class="details_copy_header">
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
    <!-- 切换 -->
    <div class="change_item">
      <div class="item_click">
        <div
          class="item_click1"
          v-for="(item, index) in changeData"
          @click="chclick(item, index)"
          :class="numindex == index ? 'imcolor' : ''"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 施工看板 -->
    <div class="shigong" v-show="Statleft">
      <!-- 进度分析 -->
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">进度分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>
      <div class="Progress">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">工程进度(计划工期）</div>
        </div>
        <div class="Progress_name">
          <div class="Progress_name_item">项目总进度:{{ projectspeed }}%</div>
          <div class="Progress_name_jindu">
            <van-progress
              :show-pivot="false"
              :percentage="projectspeed"
              color="#FF4848"
              stroke-width="8"
            />
          </div>
        </div>
      </div>
      <!-- 质量分析 -->
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">质量分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>
      <!-- 质量检查 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">质量检查</div>
        </div>
        <div class="chart-wrapper">
          <canvas id="mountNode"></canvas>
        </div>
      </div>
      <!-- 质量事故 -->
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">质量事故</div>
        </div>
        <div class="log_list">
          <div class="liet_item2">事故类别</div>
          <div class="liet_item2">事故数量</div>
          <div class="liet_item2">事故金额</div>
        </div>

        <div class="log_list" v-for="(item, index) in zhiliantj">
          <div class="liet_item2">
            {{ item.accidentGrade }}
          </div>
          <div class="liet_item2">
            {{ item.Gradenum }}
          </div>
          <div class="liet_item2">
            {{ item.accidenmoney }}
          </div>
        </div>
      </div>
      <!-- 安全分析 -->
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">安全分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>
      <!-- 安全检查 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">安全检查</div>
        </div>
        <div class="chart-wrapper">
          <canvas id="anmountNode"></canvas>
        </div>
      </div>
      <!-- 安全事故 -->
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">安全事故</div>
        </div>
        <div class="log_list">
          <div class="liet_item2">事故类别</div>
          <div class="liet_item2">事故数量</div>
          <div class="liet_item2">事故金额</div>
        </div>

        <div class="log_list" v-for="(item, index) in anquanzhiliantj">
          <div class="liet_item2">
            {{ item.accidentGrade }}
          </div>
          <div class="liet_item2">
            {{ item.Gradenum }}
          </div>
          <div class="liet_item2">
            {{ item.accidenmoney }}
          </div>
        </div>
      </div>
      <!-- 工程日志分析 -->
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">工程日志分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>

      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">工程日志</div>
        </div>
        <div class="log_list">
          <div class="liet_item">类别</div>
          <div class="liet_item">篇数</div>
          <div class="liet_item">工期比</div>
          <div class="liet_item">开工日期</div>
        </div>
        <div
          class="log_list"
          style="background: #fff"
          v-for="(item, index) in qualityaccident"
        >
          <div class="liet_item">
            {{ item.type }}
          </div>
          <div class="liet_item">
            {{ item.anquan_number }}
          </div>
          <div class="liet_item">
            {{ item.anquan_gqb }}
          </div>
          <div class="liet_item">
            {{ item.riqi }}
          </div>
        </div>
      </div>
    </div>
    <!-- 经营看板 -->
    <div class="shigong" v-show="Statright">
      <!-- 收入分析 -->
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">收入分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>
      <!-- 收入构成 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">收入构成</div>
        </div>
        <div class="chart-wrapper">
          <canvas id="mountNodegou"></canvas>
        </div>
      </div>

      <!-- 收入工程款状况 -->
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">收入工程款状况</div>
        </div>

        <div class="log_list">
          <div class="liet_item1">完成结算产值</div>

          <div class="liet_item1">
            {{ incomeAnalysis.income_money }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">累计回款</div>
          <div class="liet_item1">
            {{ incomeAnalysis.shou_kuan }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">甲方欠款</div>
          <div class="liet_item1">
            {{ incomeAnalysis.party_a_qian }}
          </div>
        </div>
      </div>
      <!-- 产值修正 -->
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">工程款状况</div>
        </div>
        <div class="log_list">
          <div class="liet_item1">实际完成产值</div>

          <div class="liet_item1">
            {{ incomeAnalysis.chanzhi_xiuz }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">已结算产值</div>
          <div class="liet_item1">
            {{ incomeAnalysis.yi_js_chanzhi }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">产值修正</div>
          <div class="liet_item1">
            {{ incomeAnalysis.cha_chanzhi }}
          </div>
        </div>
      </div>

      <!-- 支出分析 -->
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">支出分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>
      <!-- 支出构成 -->
      <div class="quality">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">支出构成</div>
        </div>
        <div class="chart-wrapper">
          <canvas id="shouruNodegou"></canvas>
        </div>
      </div>

      <!-- 工程款状况 -->
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">支出工程款状况</div>
        </div>
        <div class="log_list">
          <div class="liet_item1">完成结算产值</div>

          <div class="liet_item1">
            {{ expenditureAnalysis.settlement }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">累计支付</div>

          <div class="liet_item1">
            {{ expenditureAnalysis.payment_lj }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">未支付</div>

          <div class="liet_item1">
            {{ expenditureAnalysis.no_pay_money }}
          </div>
        </div>
      </div>
      <!-- 产值修正 -->
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">工程款状况</div>
        </div>
        <div class="log_list">
          <div class="liet_item1">待结算金额</div>

          <div class="liet_item1">
            {{ expenditureAnalysis.dai_js_res }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">实际应付金额</div>

          <div class="liet_item1">
            {{ expenditureAnalysis.shiji_pay }}
          </div>
        </div>
      </div>
      <!-- 发票分析 -->
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">发票分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>
      <div class="fapiao">
        <div class="fapiao_top">应交增值税 ：<span>4104.98</span></div>
        <div class="fapiao_body">
          <div class="fapiao_body_item fapiao_body_color1">
            <div class="fapiao_font">
              <span>销项发票</span>

              <img
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/nhafefGjE41621251064536.png"
                alt=""
              />
            </div>
            <div class="fapiao_font">
              ￥{{ invoiceAnalysis.invoice_money_in }}
            </div>
          </div>
          <div class="fapiao_body_item fapiao_body_color2">
            <div class="fapiao_font">
              <span>进项发票</span>

              <img
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/nhafefGjE41621251064536.png"
                alt=""
              />
            </div>
            <div class="fapiao_font">
              ￥{{ invoiceAnalysis.invoice_money_out }}
            </div>
          </div>
        </div>
        <div class="fapiao_body" style="margin-top: 0.33rem">
          <div class="fapiao_body_item fapiao_body_color3">
            <div class="fapiao_font">
              <span>销项税额</span>

              <img
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/nhafefGjE41621251064536.png"
                alt=""
              />
            </div>
            <div class="fapiao_font">
              ￥{{ invoiceAnalysis.tax_amount_out }}
            </div>
          </div>
          <div class="fapiao_body_item fapiao_body_color4">
            <div class="fapiao_font">
              <span>进项税额</span>

              <img
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/nhafefGjE41621251064536.png"
                alt=""
              />
            </div>
            <div class="fapiao_font">￥{{ invoiceAnalysis.tax_amount_in }}</div>
          </div>
        </div>
      </div>
      <!-- 利润分析 -->
      <div class="item_title">
        <div class="s_circular"></div>
        <div class="b_circular"></div>
        <div class="titlename">利润分析</div>
        <div class="b_circular"></div>
        <div class="s_circular"></div>
      </div>
      <!-- 收支差 -->
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">收支差</div>
        </div>
        <div class="log_list">
          <div class="liet_item1">收入总金额</div>

          <div class="liet_item1">
            {{ profitAnalysis.shou_money }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">支出总金额</div>

          <div class="liet_item1">
            {{ profitAnalysis.expenditure }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">利润</div>

          <div class="liet_item1">
            {{ profitAnalysis.li_run }}
          </div>
        </div>
      </div>
      <!-- 结算差 -->
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">结算差</div>
        </div>
        <div class="log_list">
          <div class="liet_item1">累计收入结算</div>

          <div class="liet_item1">
            {{ profitAnalysis.income_money }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">累计支出结算</div>

          <div class="liet_item1">
            {{ profitAnalysis.settlement }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">结算差</div>

          <div class="liet_item1">
            {{ profitAnalysis.js_cha }}
          </div>
        </div>
      </div>
      <!-- 现金流差 -->
      <div class="engineering" style="margin-top: 0.5rem">
        <div class="num_title" style="margin-top: 0">
          <div class="color_div"></div>
          <div class="color_font">现金流差</div>
        </div>
        <div class="log_list">
          <div class="liet_item1">累计回款金额</div>

          <div class="liet_item1">
            {{ profitAnalysis.collection_money }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">累计支出金额</div>

          <div class="liet_item1">
            {{ profitAnalysis.zc_lj }}
          </div>
        </div>
        <div class="log_list">
          <div class="liet_item1">现金流差</div>

          <div class="liet_item1">
            {{ profitAnalysis.liu_cha }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
          confine: true,
        },

        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image:
                  "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/kf3pfsPkiA1619084333464.png",
                width: 25,
                height: 30,
              },

              left: "center",
              top: "60",
            },
          ],
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            silent: true,
            color: [
              "#1890FF",
              "#13C2C2",
              "#2FC25B",
              "#FACC14",
              "#F04864",
              "#8543E0",
              "#3436C7",
              "#223273",
            ],
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              // formatter: '{a} <br/>{b}: {c} ({d}%)',
              formatter: "{b}\n{c}",
              position: "outside",

              // show: false,
              // position: 'center'
            },
            // emphasis: {
            //     label: {
            //         show: true,
            //         fontSize: '20'
            //         // fontWeight: 'bold'
            //     }
            // },
            labelLine: {
              show: true,
              length: 3,
              length2: 15,
            },
            data: [
              // { value: 1048, name: '搜索引擎' },
              // { value: 735, name: '直接访问' },
              // { value: 580, name: '邮件营销' },
              // { value: 484, name: '联盟广告' },
              // { value: 484, name: '联盟1广告' },
              // { value: 484, name: '联盟3广告' },
              // { value: 300, name: '视频广告' }
            ],
          },
        ],
      };
      this.$axios
        .post("/task/qualitytesting", {
          project_name: this.iteminfo.name,
          corp_id: this.$store.state.userData.cid,
        })
        .then((res) => {
          // this.qualitytesting = res.data.content;
          myChart.setOption({
            series: [
              {
                // 根据名字对应到相应的系列

                data: [
                  {
                    value: res.data.content.inspectnumbeer,
                    name: "质量检查",
                  },
                  {
                    value: res.data.content.rectificationnumbeer,
                    name: "质量整改",
                  },
                  {
                    value: res.data.content.toberectified,
                    name: "待整改",
                  },
                ],
              },
            ],
          });
        });
      option && myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    boxCanvas2() {
      var chartDom = document.getElementById("anmountNode");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
          confine: true,
        },

        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image:
                  "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/kf3pfsPkiA1619084333464.png",
                width: 25,
                height: 30,
              },

              left: "center",
              top: "60",
            },
          ],
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            silent: true,
            color: [
              "#1890FF",
              "#13C2C2",
              "#2FC25B",
              "#FACC14",
              "#F04864",
              "#8543E0",
              "#3436C7",
              "#223273",
            ],
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              // formatter: '{a} <br/>{b}: {c} ({d}%)',
              formatter: "{b}\n{c}",
              position: "outside",

              // show: false,
              // position: 'center'
            },
            // emphasis: {
            //     label: {
            //         show: true,
            //         fontSize: '20'
            //         // fontWeight: 'bold'
            //     }
            // },
            labelLine: {
              show: true,
              length: 3,
              length2: 15,
            },
            data: [
              // { value: 1048, name: '搜索引擎' },
              // { value: 735, name: '直接访问' },
              // { value: 580, name: '邮件营销' },
              // { value: 484, name: '联盟广告' },
              // { value: 484, name: '联盟1广告' },
              // { value: 484, name: '联盟3广告' },
              // { value: 300, name: '视频广告' }
            ],
          },
        ],
      };
      this.$axios
        .post("/task/securitycheck", {
          project_name: this.iteminfo.name,
          corp_id: this.$store.state.userData.cid,
        })
        .then((res) => {
          // this.qualitytesting = res.data.content;
          myChart.setOption({
            series: [
              {
                // 根据名字对应到相应的系列

                data: [
                  {
                    value: res.data.content.aq_inspectnumbeer,
                    name: "检查总数",
                  },
                  {
                    value: res.data.content.aq_rectificationnumbeer,
                    name: "整改总数",
                  },
                  {
                    value: res.data.content.aq_toberectified,
                    name: "待整改",
                  },
                ],
              },
            ],
          });
        });
      option && myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    boxCanvas3() {
      var chartDom = document.getElementById("mountNodegou");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
          confine: true,
        },

        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image:
                  "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/kf3pfsPkiA1619084333464.png",
                width: 25,
                height: 30,
              },

              left: "center",
              top: "60",
            },
          ],
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            silent: true,
            color: [
              "#1890FF",
              "#13C2C2",
              "#2FC25B",
              "#FACC14",
              "#F04864",
              "#8543E0",
              "#3436C7",
              "#223273",
            ],
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              // formatter: '{a} <br/>{b}: {c} ({d}%)',
              formatter: "{b}\n{c}",
              position: "outside",

              // show: false,
              // position: 'center'
            },
            // emphasis: {
            //     label: {
            //         show: true,
            //         fontSize: '20'
            //         // fontWeight: 'bold'
            //     }
            // },
            labelLine: {
              show: true,
              length: 3,
              length2: 15,
            },
            data: [
              // { value: 1048, name: '搜索引擎' },
              // { value: 735, name: '直接访问' },
              // { value: 580, name: '邮件营销' },
              // { value: 484, name: '联盟广告' },
              // { value: 484, name: '联盟1广告' },
              // { value: 484, name: '联盟3广告' },
              // { value: 300, name: '视频广告' }
            ],
          },
        ],
      };
      // // 异步加载数据
      // $.get('data.json').done(function (data) {
      //     // 填入数据
      //     myChart.setOption({
      //         xAxis: {
      //             data: data.categories
      //         },
      //         series: [
      //             {
      //                 // 根据名字对应到相应的系列
      //                 name: '销量',
      //                 data: data.data
      //             }
      //         ]
      //     });
      // });
      this.$axios
        .post("/projectfour/incomeAnalysis", {
          project_name: this.iteminfo.name,
          // corp_id: this.$store.state.userData.cid
        })
        .then((res) => {
          // this.qualitytesting = res.data.content;
          myChart.setOption({
            series: [
              {
                // 根据名字对应到相应的系列

                data: [
                  {
                    value: res.data.data.shou_money,
                    name: "合同收入",
                  },
                  {
                    value: res.data.data.qian_money,
                    name: "签证变更",
                  },
                ],
              },
            ],
          });
        });
      option && myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    boxCanvas4() {
      var chartDom = document.getElementById("shouruNodegou");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
          confine: true,
        },

        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image:
                  "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/kf3pfsPkiA1619084333464.png",
                width: 25,
                height: 30,
              },

              left: "center",
              top: "60",
            },
          ],
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            silent: true,
            color: [
              "#1890FF",
              "#13C2C2",
              "#2FC25B",
              "#FACC14",
              "#F04864",
              "#8543E0",
              "#3436C7",
              "#223273",
            ],
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              // formatter: '{a} <br/>{b}: {c} ({d}%)',
              formatter: "{b}\n{c}",
              position: "outside",

              // show: false,
              // position: 'center'
            },
            // emphasis: {
            //     label: {
            //         show: true,
            //         fontSize: '20'
            //         // fontWeight: 'bold'
            //     }
            // },
            labelLine: {
              show: true,
              length: 3,
              length2: 15,
            },
            data: [
              // { value: 1048, name: '搜索引擎' },
              // { value: 735, name: '直接访问' },
              // { value: 580, name: '邮件营销' },
              // { value: 484, name: '联盟广告' },
              // { value: 484, name: '联盟1广告' },
              // { value: 484, name: '联盟3广告' },
              // { value: 300, name: '视频广告' }
            ],
          },
        ],
      };
      this.$axios
        .post("/projectfour/expenditureAnalysis", {
          project_name: this.iteminfo.name,
          // corp_id: this.$store.state.userData.cid
        })
        .then((res) => {
          // this.qualitytesting = res.data.content;
          myChart.setOption({
            series: [
              {
                // 根据名字对应到相应的系列

                data: [
                  {
                    value: res.data.data.material,
                    name: "材料",
                  },
                  {
                    value: res.data.data.service,
                    name: "劳务",
                  },
                  {
                    value: res.data.data.lease,
                    name: "租赁",
                  },
                  {
                    value: res.data.data.sub,
                    name: "分包",
                  },
                  {
                    value: res.data.data.reimbursement,
                    name: "间接费",
                  },
                  {
                    value: res.data.data.other,
                    name: "其他",
                  },
                ],
              },
            ],
          });
        });
      option && myChart.setOption(option);
      window.onresize = myChart.resize;
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
        .post("/task/qualityaccident", {
          project_name: this.iteminfo.name,
          corp_id: this.$store.state.userData.cid,
          id: this.iteminfo.id,
        })
        .then((res) => {
          this.qualityaccident = res.data.content;
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
  },
  mounted() {
    this.boxCanvas1();
    this.boxCanvas2();
    this.boxCanvas3();
    this.boxCanvas4();
  },
  created() {
    this.iteminfo = this.$store.state.userData.xminfo;
    this.projectspeed = Math.round(this.$store.state.userData.xminfo.jindu);
    console.log(this.iteminfo);

    this.$utils.checkding();
    this.setTitle();
    this.getqualityaccident();
    this.getincomeAnalysis();
    this.getexpenditureAnalysis();
    this.getinvoiceAnalysis();
    this.getprofitAnalysis();
    this.getzhiliantj();
    this.getanquanzhiliantj();
    // this.getspeed();
  },
};
</script>
<style lang="less">
#details_copy {
  .imcolor {
    height: 100%;
    background-color: #0089ff !important;
    color: #fff !important;
    line-height: 2rem;
  }
  .details_copy_header {
    height: 12rem;
    background-color: #238bfe;
    background-size: 100% 100%;
    background-image: url(https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/CAraXZfKkz1615359535724.jpg);

    .header_1 {
      box-sizing: border-box;
      height: 6rem;
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
      margin: auto;
      width: 95%;
      // height: 10.23rem;
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
          width: 25%;
          text-align: center;
          line-height: 1.87rem;
          border: 0.03rem solid #f3f4f9;
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

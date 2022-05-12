<template>
  <!-- 项目看板 -->
  <div id="Kanban">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="1" />
      <canvas id="container" style="width: 100%; height: 6.67rem"></canvas>

      <van-index-anchor index="2" />
      <canvas id="mountNode" style="width: 100%; height: 10rem"></canvas>
      <van-index-anchor index="3" />
      <canvas id="mountNode2" style="width: 100%; height: 10rem"></canvas>
      <van-index-anchor index="4" />
      <canvas id="mountNode4" style="width: 100%; height: 10rem"></canvas>
    </van-index-bar>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "Kanban",
  components: {},
  data() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "应用中心", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    boxCanvas() {
      const data = [
        {
          name: "股票类",
          percent: 83.59,
          a: "1",
        },
        {
          name: "债券类",
          percent: 2.17,
          a: "1",
        },
        {
          name: "现金类",
          percent: 14.24,
          a: "1",
        },
      ];

      const map = {};
      data.forEach(function (obj) {
        map[obj.name] = obj.percent + "%";
      });

      const chart = new this.F2.Chart({
        id: "container",
        pixelRatio: window.devicePixelRatio,
        padding: [20, "auto"],
      });
      chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            return val + "%";
          },
        },
      });
      chart.tooltip(false);
      chart.legend({
        position: "right",
        itemFormatter: function itemFormatter(val) {
          return val + "    " + map[val];
        },
      });
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85,
      });
      chart.axis(false);
      chart
        .interval()
        .position("a*percent")
        .color("name", ["#FE5D4D", "#3BA4FF", "#737DDE"])
        .adjust("stack");

      chart.guide().html({
        position: ["50%", "45%"],
        html: `<div style="width: 8.33rem;height: 1.33rem;text-align: center;">
      <div style="font-size: 0.53rem">总资产</div>
      <div style="font-size: 0.8rem">133.08 亿</div>
    </div>`,
      });
      chart.render();
    },
    boxCanvas2() {
      var data = [
        {
          year: "1951 年",
          sales: 38,
        },
        {
          year: "1952 年",
          sales: 52,
        },
        {
          year: "1956 年",
          sales: 61,
        },
        {
          year: "1957 年",
          sales: 145,
        },
        {
          year: "1958 年",
          sales: 48,
        },
        {
          year: "1959 年",
          sales: 38,
        },
        {
          year: "1960 年",
          sales: 38,
        },
        {
          year: "1962 年",
          sales: 38,
        },
      ];
      var chart = new this.F2.Chart({
        id: "mountNode",
        pixelRatio: window.devicePixelRatio,
      });

      chart.source(data, {
        sales: {
          tickCount: 5,
        },
      });
      chart.tooltip(false);
      chart.interval().position("year*sales");
      chart.render();

      // 绘制柱状图文本
      var offset = -5;
      var canvas = chart.get("canvas");
      var group = canvas.addGroup();
      var shapes = {};
      data.map(function (obj) {
        var point = chart.getPosition(obj);
        var text = group.addShape("text", {
          attrs: {
            x: point.x,
            y: point.y + offset,
            text: obj.sales,
            textAlign: "center",
            textBaseline: "bottom",
            fill: "#808080",
          },
        });

        shapes[obj.year] = text; // 缓存该 shape, 便于后续查找
      });

      var lastTextShape = void 0; // 上一个被选中的 text
      // 配置柱状图点击交互
      chart.interaction("interval-select", {
        selectAxisStyle: {
          fill: "#000",
          fontWeight: "bold",
        },
        mode: "range",
        defaultSelected: {
          year: "1962 年",
          sales: 38,
        },
        onEnd: function onEnd(ev) {
          var data = ev.data,
            selected = ev.selected;

          lastTextShape &&
            lastTextShape.attr({
              fill: "#808080",
              fontWeight: "normal",
            });
          if (selected) {
            var textShape = shapes[data.year];
            textShape.attr({
              fill: "#000",
              fontWeight: "bold",
            });
            lastTextShape = textShape;
          }
          canvas.draw();
        },
      });
    },
    boxCanvas3() {
      var data = [
        {
          year: "2001",
          population: 41.8,
        },
        {
          year: "2002",
          population: 25.8,
        },
        {
          year: "2003",
          population: 31.7,
        },
        {
          year: "2004",
          population: 46,
        },
        {
          year: "2005",
          population: 28,
        },
      ];

      var chart = new this.F2.Chart({
        id: "mountNode2",
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(data);
      chart.coord("polar");
      chart.legend({
        position: "right",
      });
      chart.axis(false);
      chart.interval().position("year*population").color("year").style({
        lineWidth: 1,
        stroke: "#fff",
      });
      chart.render();
    },
    boxCanvas4() {
      var Util = this.F2.Util;
      var G = this.F2.G;
      var Group = G.Group;

      function drawLabel(shape, coord, canvas) {
        var center = coord.center;
        var origin = shape.get("origin");
        var points = origin.points;
        var x1 = (points[2].x - points[1].x) * 0.75 + points[1].x;
        var x2 = (points[2].x - points[1].x) * 1.8 + points[1].x;
        var y = (points[0].y + points[1].y) / 2;
        var point1 = coord.convertPoint({
          x: x1,
          y: y,
        });
        var point2 = coord.convertPoint({
          x: x2,
          y: y,
        });

        var group = new Group();
        group.addShape("Line", {
          attrs: {
            x1: point1.x,
            y1: point1.y,
            x2: point2.x,
            y2: point2.y,
            lineDash: [0, 2, 2],
            stroke: "#808080",
          },
        });
        var text = group.addShape("Text", {
          attrs: {
            x: point2.x,
            y: point2.y,
            text: origin._origin.type + "  " + origin._origin.cost + " 元",
            fill: "#808080",
            textAlign: "start",
            textBaseline: "bottom",
          },
        });
        var textWidth = text.getBBox().width;
        var baseLine = group.addShape("Line", {
          attrs: {
            x1: point2.x,
            y1: point2.y,
            x2: point2.x,
            y2: point2.y,
            stroke: "#808080",
          },
        });
        if (point2.x > center.x) {
          baseLine.attr("x2", point2.x + textWidth);
        } else if (point2.x < center.x) {
          text.attr("textAlign", "end");
          baseLine.attr("x2", point2.x - textWidth);
        } else {
          text.attr("textAlign", "center");
          text.attr("textBaseline", "top");
        }
        canvas.add(group);
        shape.label = group;
      }

      var data = [
        {
          type: "饮食",
          cost: 669.47,
          a: "1",
        },
        {
          type: "服饰美容",
          cost: 338,
          a: "1",
        },
        {
          type: "健康",
          cost: 118.5,
          a: "1",
        },
        {
          type: "生活用品",
          cost: 78.64,
          a: "1",
        },
        {
          type: "其他",
          cost: 14.9,
          a: "1",
        },
        {
          type: "交通出行",
          cost: 8.7,
          a: "1",
        },
      ];

      var sum = 0;
      data.map(function (obj) {
        sum += obj.cost;
      });
      var chart = new this.F2.Chart({
        id: "mountNode4",
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(data);
      var lastClickedShape;
      chart.legend({
        position: "bottom",
        offsetY: -5,
        marker: "square",
        align: "center",
        onClick: function onClick(ev) {
          var clickedItem = ev.clickedItem;
          var dataValue = clickedItem.get("dataValue");
          var canvas = chart.get("canvas");
          var coord = chart.get("coord");
          var geom = chart.get("geoms")[0];
          var container = geom.get("container");
          var shapes = geom.get("shapes"); // 只有带精细动画的 geom 才有 shapes 这个属性

          var clickedShape;
          // 找到被点击的 shape
          Util.each(shapes, function (shape) {
            var origin = shape.get("origin");
            if (origin && origin._origin.type === dataValue) {
              clickedShape = shape;
              return false;
            }
          });

          if (lastClickedShape) {
            lastClickedShape
              .animate()
              .to({
                attrs: {
                  lineWidth: 0,
                },
                duration: 200,
              })
              .onStart(function () {
                if (lastClickedShape.label) {
                  lastClickedShape.label.hide();
                }
              })
              .onEnd(function () {
                lastClickedShape.set("selected", false);
              });
          }

          if (clickedShape.get("selected")) {
            clickedShape
              .animate()
              .to({
                attrs: {
                  lineWidth: 0,
                },
                duration: 200,
              })
              .onStart(function () {
                if (clickedShape.label) {
                  clickedShape.label.hide();
                }
              })
              .onEnd(function () {
                clickedShape.set("selected", false);
              });
          } else {
            var color = clickedShape.attr("fill");
            clickedShape
              .animate()
              .to({
                attrs: {
                  lineWidth: 5,
                },
                duration: 350,
                easing: "bounceOut",
              })
              .onStart(function () {
                clickedShape.attr("stroke", color);
                clickedShape.set("zIndex", 1);
                container.sort();
              })
              .onEnd(function () {
                clickedShape.set("selected", true);
                clickedShape.set("zIndex", 0);
                container.sort();
                lastClickedShape = clickedShape;
                if (clickedShape.label) {
                  clickedShape.label.show();
                } else {
                  drawLabel(clickedShape, coord, canvas);
                }
                canvas.draw();
              });
          }
        },
      });
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85,
      });
      chart.axis(false);
      chart.tooltip(false);
      chart
        .interval()
        .position("a*cost")
        .color("type", [
          "#1890FF",
          "#13C2C2",
          "#2FC25B",
          "#FACC14",
          "#F04864",
          "#8543E0",
        ])
        .adjust("stack");

      chart.guide().text({
        position: ["50%", "50%"],
        content: sum.toFixed(2),
        style: {
          fontSize: 24,
        },
      });
      chart.render();
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {
    this.boxCanvas();
    this.boxCanvas2();
    this.boxCanvas3();
    this.boxCanvas4();
  },
};
</script>
<style lang='less' >
#Kanban {
  .van-index-bar {
    .van-index-anchor {
      line-height: 1.67rem;
      font-size: 1rem;
      text-align: center;
    }
  }
  #mountNode4,
  #mountNode2,
  #mountNode,
  #container {
    background-color: #fff;
  }
}
</style>

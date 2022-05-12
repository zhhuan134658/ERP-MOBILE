import axios from "axios";
import * as dd from "dingtalk-jsapi";
import store from "../../vuex/store.js";
export default {
  // 时间戳转日期
  formateTime: function(time) {
    let date;
    if (time.length < 11) {
      // 秒
      date = new Date(time * 1000);
    } else {
      // 豪秒
      date = new Date(time);
    }

    let Y = date.getFullYear();
    let M =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return Y + "-" + M + "-" + D;
  },
  //周岁
  ages(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (
      d.getFullYear() == r[1] &&
      d.getMonth() + 1 == r[3] &&
      d.getDate() == r[4]
    ) {
      var Y = new Date().getFullYear();
      return Y - r[1];
    }
    return "输入的日期格式错误！";
  },
  //时间转换

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
  myTime(date) {
    var arr = date.split("T");
    var d = arr[0];
    var darr = d.split("-");

    var t = arr[1];
    var tarr = t.split(".000");
    var marr = tarr[0].split(":");

    var dd =
      parseInt(darr[0]) + "-" + parseInt(darr[1]) + "-" + parseInt(darr[2]);
    // +
    // " " +
    // parseInt(marr[0]) +
    // ":" +
    // parseInt(marr[1]) +
    // ":" +
    // parseInt(marr[2]);
    return dd;
  },
  //
  renderTime(date) {
    var dateee = new Date(date).toJSON();
    return new Date(dateee)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
  },
  timeChange: function(val, type) {
    let chinaStandard = val;
    let newTime;

    console.log(chinaStandard.replace(/-/g, "/"));

    let date = new Date(chinaStandard);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let minute = date.getMinutes();
    let s = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    s = s < 10 ? "0" + s : s;
    if (type == 1) {
      newTime = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
    } else if (type == 2) {
      newTime = y + "/" + m + "/" + d;
    }
    return newTime;
  },
  utilProjectStatus1: function() {
    let valdata = [
      { name: "项目登记" },
      { name: "施工中" },
      { name: "竣工验收" },
      { name: "竣工资料移交" },
      { name: "竣工结算" }
    ];
    let val = [
      { name: "信息立项" },
      { name: "资格审查" },
      { name: "放弃" },
      { name: "竣工" },
      { name: "中标" },
      { name: "投标" },
      { name: "落标" },
      { name: "立项分析" }
    ];

    if (
      store.state.userData.cid == "ding0ae1ff624a5a383e35c2f4657eb6378f" ||
      store.state.userData.cid == "dinga090000f57c90b3eee0f45d8e4f7c288"
    ) {
      return valdata;
    } else {
      return val;
    }
  },
  utilProjectStatus: function() {
    let newval = [];
    newval = store.state.userData.typeDtat;
    return newval;
    // let valdata = [
    //   {
    //     tmpname: "全部"
    //   },
    //   {
    //     tmpname: "建筑工程"
    //   },
    //   {
    //     tmpname: "市政工程"
    //   },
    //   {
    //     tmpname: "小区入户工程"
    //   },
    //   {
    //     tmpname: "工福用户工程"
    //   },
    //   {
    //     tmpname: "散户安装"
    //   },
    //   {
    //     tmpname: "改管工程"
    //   }
    // ];

    // let val = [
    //   {
    //     tmpname: "全部"
    //   },
    //   {
    //     tmpname: "房建"
    //   },
    //   {
    //     tmpname: "市政"
    //   },
    //   {
    //     tmpname: "园林景观"
    //   },
    //   {
    //     tmpname: "机电安装"
    //   },
    //   {
    //     tmpname: "电力"
    //   },
    //   {
    //     tmpname: "铁路"
    //   },
    //   {
    //     tmpname: "装饰"
    //   },
    //   {
    //     tmpname: "公路"
    //   },
    //   {
    //     tmpname: "路桥"
    //   },
    //   {
    //     tmpname: "电梯"
    //   },
    //   {
    //     tmpname: "隧道施工"
    //   },
    //   {
    //     tmpname: "通信"
    //   },
    //   {
    //     tmpname: "轨道"
    //   },
    //   {
    //     tmpname: "环保"
    //   },
    //   {
    //     tmpname: "桥梁"
    //   },
    //   {
    //     tmpname: "电子电气"
    //   },
    //   {
    //     tmpname: "土建"
    //   },
    //   {
    //     tmpname: "钢结构"
    //   },
    //   {
    //     tmpname: "系统集成"
    //   },
    //   {
    //     tmpname: "照明"
    //   },
    //   {
    //     tmpname: "消防"
    //   },
    //   {
    //     tmpname: "水利"
    //   },
    //   {
    //     tmpname: "弱电"
    //   },
    //   {
    //     tmpname: "高校基建"
    //   },
    //   {
    //     tmpname: "安防"
    //   },
    //   {
    //     tmpname: "空调安装"
    //   }
    // ];
    // if (
    //   store.state.userData.cid == "ding0ae1ff624a5a383e35c2f4657eb6378f" ||
    //   store.state.userData.cid == "dinga090000f57c90b3eee0f45d8e4f7c288"
    // ) {
    //   return valdata;
    // } else {
    //   return val;
    // }
  },
  utilApprovalStatus: function() {
    let val = [
      { id: "", tmpname: "全部" },
      { id: 1, tmpname: "待我审批" },
      { id: 2, tmpname: "我已审批" },
      { id: 3, tmpname: "我发起的审批" },
      { id: 4, tmpname: "抄送我的" },
      { id: 5, tmpname: "审批中" },
      { id: 6, tmpname: "审批不通过" },
      { id: 7, tmpname: "审批通过" }
    ];
    return val;
  },
  utilWorkerType: function() {
    let val = [
      { name: "电工", value: "电工" },
      { name: "测量工", value: "测量工" },
      { name: "钣金工", value: "钣金工" },
      { name: "电气设备安装工", value: "电气设备安装工" },
      { name: "吊篮操作工", value: "吊篮操作工" },
      { name: "焊工", value: "焊工" },
      { name: "管道工", value: "管道工" },
      { name: "钢筋工", value: "钢筋工" },
      { name: "防水工", value: "防水工" },
      { name: "混凝土工", value: "混凝土工" },
      { name: "机械设备安装工", value: "机械设备安装工" },
      { name: "架子工", value: "架子工" },
      { name: "建筑门窗安装工", value: "建筑门窗安装工" },
      { name: "建筑门窗幕墙安装工", value: "建筑门窗幕墙安装工" },
      { name: "脚手架拆卸工", value: "脚手架拆卸工" },
      { name: "绿化工", value: "绿化工" },
      { name: "模板工", value: "模板工" },
      { name: "花卉工", value: "花卉工" },
      { name: "木工", value: "木工" },
      { name: "抹灰工", value: "抹灰工" },
      { name: "幕墙安装工", value: "幕墙安装工" },
      { name: "幕墙制作工", value: "幕墙制作工" },
      { name: "起重工", value: "起重工" },
      { name: "起重信号工", value: "起重信号工" },
      { name: "砌筑工", value: "砌筑工" },
      { name: "弱电工", value: "弱电工" },

      { name: "石工", value: "石工" },
      { name: "室内成套设施安装工", value: "室内成套设施安装工" },
      { name: "水暖工", value: "水暖工" },
      { name: "通风工", value: "通风工" },
      { name: "线路架设工", value: "线路架设工" },
      { name: "镶贴工", value: "镶贴工" },
      { name: "窑炉修筑工", value: "窑炉修筑工" },
      { name: "油漆工", value: "油漆工" },
      { name: "桩机操作工", value: "桩机操作工" },
      { name: "装饰装修工", value: "装饰装修工" },
      { name: "测量放线工", value: "测量放线工" },
      { name: "安装起重工", value: "安装起重工" },
      { name: "石雕工", value: "石雕工" },
      { name: "石作业工", value: "石作业工" },
      { name: "瓦工", value: "瓦工" },
      { name: "司泵工", value: "司泵工" },
      { name: "推光漆工", value: "推光漆工" },
      { name: "匾额工", value: "匾额工" },
      { name: "变电安装工", value: "变电安装工" },
      { name: "彩绘工", value: "彩绘工" },
      { name: "电焊工", value: "电焊工" },
      { name: "管工", value: "管工" },
      { name: "建筑电工", value: "建筑电工" },
      {
        name: "附着升降脚手架安装拆卸工",
        value: "附着升降脚手架安装拆卸工"
      },
      { name: "建筑起重机械安装拆卸工", value: "建筑起重机械安装拆卸工" },
      { name: "木雕工", value: "木雕工" },
      { name: "泥塑工", value: "泥塑工" },
      { name: "起重信号司索工", value: "起重信号司索工" },
      { name: "砌花接工", value: "砌花接工" },
      { name: "钻刻工", value: "钻刻工" },
      { name: "钻细工", value: "钻细工" },
      { name: "装饰金属工", value: "装饰金属工" },
      { name: "装饰涂表工", value: "装饰涂表工" },
      { name: "装饰装修木工", value: "装饰装修木工" },
      { name: "打桩工", value: "打桩工" },
      { name: "其他", value: "其他" }
    ];
    return val;
  },
  checkding: function() {
    axios
      .post("/dingding/jsapiAuth", {
        url: window.location.href
      })
      .then(res => {
        if (res.data.code == 1) {
          let tokenData = res.data.data;
          dd.config({
            agentId: tokenData.agentId, // 必填，微应用ID
            corpId: store.state.userData.cid, //必填，企业ID
            timeStamp: tokenData.timeStamp, // 必填，生成签名的时间戳
            nonceStr: tokenData.nonceStr, // 必填，生成签名的随机串
            signature: tokenData.signature, // 必填，签名
            type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList: [
              "biz.util.datepicker",
              "device.screen.resetView",
              "device.screen.rotateView",
              "ui.webViewBounce.disable",
              "ui.webViewBounce.enable",
              "requestAuthInfo",
              "biz.map.search",
              "biz.map.locate",
              "device.geolocation.get",
              "biz.contact.complexPicker",
              "biz.contact.choose",
              "runtime.info",
              "device.notification.confirm",
              "device.notification.alert",
              "device.notification.prompt",
              "biz.ding.post",
              "biz.util.openLink",
              "biz.util.uploadAttachment",
              "biz.cspace.preview",
              "biz.navigation.setTitle",
              "biz.navigation.setRight",
              "biz.util.scan",
              "biz.navigation.setMenu",
              "biz.util.previewImage",
              "biz.util.downloadFile",
              "biz.telephone.showCallMenu",
              "biz.ding.create"
            ] // 必填，需要使用的jsapi列表，注意：不要带dd。
          });
        }
      });
  },
  steWebview: function() {
    console.log("99999999999999999");
    dd.ready(function() {
      dd.ui.webViewBounce.disable();
    });
  },
  //阿拉伯数字转换成大写汉字
  numberParseChina: function(money) {
    //汉字的数字
    var cnNums = new Array(
      "零",
      "壹",
      "贰",
      "叁",
      "肆",
      "伍",
      "陆",
      "柒",
      "捌",
      "玖"
    );
    //基本单位
    var cnIntRadice = new Array("", "拾", "佰", "仟");
    //对应整数部分扩展单位
    var cnIntUnits = new Array("", "万", "亿", "兆");
    //对应小数部分单位
    var cnDecUnits = new Array("角", "分", "毫", "厘");
    //整数金额时后面跟的字符
    var cnInteger = "整";
    //整型完以后的单位
    var cnIntLast = "圆";
    //最大处理的数字
    var maxNum = 9999999999999999.99;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = "";
    //分离金额后用的数组，预定义
    var parts;
    if (money == "") {
      return "";
    }
    money = parseFloat(money);
    if (money >= maxNum) {
      //超出最大处理数字
      return "大写转换最多支持16位数的金额!";
    }
    if (money == 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf(".") == -1) {
      integerNum = money;
      decimalNum = "";
    } else {
      parts = money.split(".");
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      var IntLen = integerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == "0") {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          //归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != "") {
      var decLen = decimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = decimalNum.substr(i, 1);
        if (n != "0") {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr == "") {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == "") {
      chineseStr += cnInteger;
    }
    return chineseStr;
  }
};

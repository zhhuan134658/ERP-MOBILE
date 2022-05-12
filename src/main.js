// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* jshint esversion: 6 */
import Vue from "vue";
import VueRouter from "vue-router";
// import axios from "axios";
import axios from "./components/common/https.js";

// import "style-loader!css-loader!less-loader!../static/style/global.less";
// 引入
// import echarts from "echarts";

// // 注册
// Vue.prototype.$echarts = echarts;

import { Toast } from "vant";
import { Dialog } from "vant";
Toast.setDefaultOptions({ duration: 1500 });
// import F2 from "@antv/f2";
import F2 from "@antv/f2/lib/index-all";
import insertCss from "insert-css";
Vue.prototype.F2 = F2;
Vue.prototype.insertCss = insertCss;
// axios.defaults.baseURL = "https://dingzhukuai.zzdingyun.com"; //线上
// axios.defaults.baseURL = "http://oazhukuai.zzdingyun.com"; //下
// axios.defaults.headers["Content-Type"] =
//   "application/x-www-form-urlencoded; charset=UTF-8";

Vue.prototype.$axios = axios;

Vue.prototype.HOST = "/api";

import "./libs/rem.js";

import VueResource from "vue-resource";
//-将所有组件注册
Vue.use(VueResource);

// Vue.http.options.root = "https://dingzhukuai.zzdingyun.com";

import appVue from "./App.vue"; //引入app.vue组件
import router from "./router/index.js"; //引入路由实例

Vue.use(VueRouter);

Vue.config.productionTip = false;

import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(Mint);

// import VueAwesomeSwiper from "vue-awesome-swiper";
// import "swiper/swiper.min.css";
// Vue.use(VueAwesomeSwiper /* { default global options } */);

import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

import store from "./vuex/store.js";
import utils from "./components/common/util.js";
Vue.prototype.$utils = utils;

/* eslint-disable no-new */
new Vue({
  el: "#indexApp", //这里取的是html里的id=indexApp
  router: router, //这里可以写router或者router:router//router模块
  store,
  components: { appVue },
  render: h => h(appVue),
  template: "<app-vue></app-vue>" //<appVue/> 或者<app-vue/>都可以。在vue里代码块的定义使用驼峰式时，引入时可以原名字引入也可以通过在每个大写字母前加-引入。
});

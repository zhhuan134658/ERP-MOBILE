<template>
  <!--  -->

  <div id="loading">
    <div id="loading-center">
      <div id="loading-center-absolute">
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "loading",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style>
#loading {
  background-color: #fff;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  margin-top: 0px;
  top: 0px;
}
#loading-center {
  width: 100%;
  height: 100%;

  display: flex;
}
#loading-center-absolute {
  margin: auto;
}
.object {
  width: 0.6rem;
  height: 5rem;
  margin-right: 0.16rem;
  background-color: #409eff;
  -webkit-animation: animate 1s infinite;
  animation: animate 1s infinite;
  float: left;
}

.object:last-child {
  margin-right: 0px;
}

.object:nth-child(10) {
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.object:nth-child(9) {
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.object:nth-child(8) {
  -webkit-animation-delay: 0.7s;
  animation-delay: 0.7s;
}
.object:nth-child(7) {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.object:nth-child(6) {
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}
.object:nth-child(5) {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.object:nth-child(4) {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.object:nth-child(3) {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.object:nth-child(2) {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
@-webkit-keyframes animate {
  50% {
    -ms-transform: scaleY(0);
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
  }
}
@keyframes animate {
  50% {
    -ms-transform: scaleY(0);
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
  }
}
</style>

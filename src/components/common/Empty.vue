<template>
  <!--  -->
  <div id="Empty">
    <van-empty
      class="custom-image"
      image="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/6cQxaHJxGs1615277090739.png"
      description="暂无数据"
    />
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "Empty",
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
<style lang='less' >
#Empty {
  background-color: #f3f6fd;
  height: 100vh;
  .custom-image {
    padding: 1.33rem 0;
    .van-empty__image {
      width: 12rem;
      height: 12rem;
      margin-top: 8rem;
    }
    .van-empty__description {
      font-size: 0.87rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      line-height: 1rem;

      // margin-top: 1.03rem;
    }
  }
}
</style>

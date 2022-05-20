
<template>
  <div id="materialPlanReport">
    <!-- 材料出库报表 -->
    <div class="changtype" style="background-color: #fff">
      <div
        class="left_item"
        v-for="(item, index) in toptitleList"
        :style="activeindex == index ? 'color:#409EFF' : ''"
        @click="activechange(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "materialSettleReport",

  data() {
    return {
      activeindex: 0,
      toptitleList: [{ name: "资产派发" }, { name: "资产退库" }],
    };
  },
  methods: {
    activechange(index) {
      this.activeindex = index;
      if (index == 0) {
        this.$router.replace(
          { path: "/DistributedListout" },
          () => {},
          () => {}
        );
      } else {
        this.$router.replace(
          { path: "/DistributedListin" },
          () => {},
          () => {}
        );
      }
    },
  },
  mounted() {},
  created() {},
  computed: {},
};
</script>
<style lang='less' >
#materialPlanReport {
  .changtype {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-around;
    .left_item {
      line-height: 3rem;
    }
  }
}
</style>
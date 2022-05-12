<template>
  <!--  -->
  <div id="pdfview">
    <!-- 分页 -->
    <!-- <div class="pdf">
            <p class="arrow">
                <span
                    @click="changePdfPage(0)"
                    class="turn"
                    :class="{ grey: currentPage == 1 }"
                    >Preview</span
                >
                {{ currentPage }} / {{ pageCount }}

                <span
                    @click="changePdfPage(1)"
                    class="turn"
                    :class="{ grey: currentPage == pageCount }"
                    >Next</span
                >
            </p>

            <pdf
                :src="pdfSrc"
                :page="currentPage"
                @num-pages="pageCount = $event"
                @page-loaded="currentPage = $event"
                @loaded="loadPdfHandler"
            >
            </pdf>
        </div> -->
    <!-- 不分页 -->
    <div class="pdf-box">
      <!-- <pdf
                v-for="i in numPages"
                :key="i"
                :src="pdfSrc"
                :page="i"
                @num-pages="pageCount = $event"
            >
            </pdf> -->
    </div>
  </div>
</template>

<script>
// import pdf from 'vue-pdf';
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  metaInfo: {
    title: "This is the test",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes",
      },
    ],
  },
  name: "pdfview",
  components: { pdf },
  data() {
    return {
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf", // 文件类型
      pdfSrc: this.$route.query.pdfurl, // pdf文件地址
      numPages: 0,
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
    //分页
    // // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    // changePdfPage(val) {
    //     // console.log(val)
    //     if (val === 0 && this.currentPage > 1) {
    //         this.currentPage--;
    //         // console.log(this.currentPage)
    //     }
    //     if (val === 1 && this.currentPage < this.pageCount) {
    //         this.currentPage++;
    //         // console.log(this.currentPage)
    //     }
    // },
    // // pdf加载时
    // loadPdfHandler(e) {
    //     this.currentPage = 1; // 加载的时候先加载第一页
    // },
    // -----------------------------------
    //不分页
    async loadPdfHandler() {
      //src为你服务器上存放pdf的路径
      this.pdfSrc = pdf.createLoadingTask(this.pdfSrc);
      this.pdfSrc.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
    },
  },
  created() {
    // this.$utils.checkding();
    // this.setTitle();
    // this.pdfSrc = pdf.createLoadingTask(this.pdfSrc);
    // this.pdfSrc.then((pdf) => {
    //     this.numPages = pdf.numPages;
    // });
  },
  mounted() {
    this.loadPdfHandler();
  },
};
</script>
<style lang='less' >
#pdfview {
  .pdf-box {
    span {
      margin: 0.67rem;
    }
  }
}
</style>

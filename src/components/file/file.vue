<template>
  <!-- 文档 -->
  <div id="file">
    <!-- <div class="dangqian">
            <div style="width: 60%">
                <div
                    @click="gochecd"
                    style="
                        font-size: 0.7rem;
                        width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    "
                >
                测试项目
                </div>
                <div class="xmjindu-item-jindu">
                    <van-progress
                        :show-pivot="false"
                        color="#fff"
                        :percentage="
                           50
                        "
                    />
                </div>
                <div class="xmjindu-item-font1">
                    项目总进度：50%
                </div>
            </div>

            <div>
                <van-button @click="gochecd" type="default">切换</van-button>
            </div>
        </div> -->
    <van-sticky>
      <div class="content">
        <div class="content_item" @click="gofile(2, 1)">
          <img src="../../../static/images/file5.png" alt />

          <div class="item_font">图纸文件</div>
        </div>
        <div class="content_item" @click="gofile(3, 1)">
          <img src="../../../static/images/file4.png" alt />

          <div class="item_font">模型文件</div>
        </div>
        <div class="content_item" @click="gofile(4, 1)">
          <img src="../../../static/images/cj.png" alt />

          <div class="item_font">参建各方文件</div>
        </div>
        <div class="content_item" @click="gofile(5, 1)">
          <img src="../../../static/images/file1.png" alt />
          <div class="item_font">私人文件</div>
        </div>
        <div class="content_item" @click="gofile(6, 1)">
          <img src="../../../static/images/file2.png" alt />
          <div class="item_font">规范图集</div>
        </div>
        <div class="content_item" @click="gofile(8, 1)">
          <img src="../../../static/images/file3.png" alt />
          <div class="item_font">回收站</div>
        </div>
        <div class="content_item" @click="gofile(7, 1)">
          <img src="../../../static/images/file6.png" alt />
          <div class="item_font">我的收藏</div>
        </div>
        <div class="content_item" @click="dongtai">
          <img src="../../../static/images/dt.png" alt />
          <div class="item_font">文件动态</div>
        </div>
      </div>
    </van-sticky>
    <div class="file-content">
      <div class="zuijin">最近打开的文档</div>
      <div class="xiangmu" v-for="(item, index) in FileList" :key="index">
        <div class="xmdiv xmimg">
          <img v-if="item.gurl" :src="item.gurl" alt />
          <img
            v-else
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/cP3jnxmJbM1599028432693.png"
            alt
          />
        </div>
        <div class="xmdiv xmjindu">
          <div class="xmjindu-item" @click="previewFiles(item)">
            <div class="xmjindu-item-font">{{ item.name }}</div>
            <div class="xmjindu-item-font1">
              {{ item.time }} {{ item.size }}
            </div>
          </div>
        </div>
      </div>
      <Empty v-if="Emptyshow"></Empty>
    </div>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
import Empty from "../common/Empty.vue";
export default {
  components: { Empty },
  data() {
    return {
      Emptyshow: false,
      FileList: [
        {
          collect: "0",
          filetype: "2",
          gurl: "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/cP3jnxmJbM1599028432693.png",
          id: "6",
          name: "88888.pdf",
          quanxian: "1",
          sid: null,
          size: "28.15 KB",
          time: "2020-10-13",
          type: "OSS",
          url: "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/nxxw4skZ2S1602550484462.pdf",
        },
        {
          collect: "0",
          filetype: "2",
          gurl: "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/cP3jnxmJbM1599028432693.png",
          id: "6",
          name: "88888.pdf",
          quanxian: "1",
          sid: null,
          size: "28.15 KB",
          time: "2020-10-13",
          type: "OSS",
          url: "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/nxxw4skZ2S1602550484462.pdf",
        },
      ],
      editPeople: [],
    };
  },
  methods: {
    gochecd() {
      this.$router.push({
        path: "/checproject",
      });
    },

    setTitle() {
      const that = this;
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "测试项目", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
        // dd.biz.navigation.setRight({
        //     show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
        //     control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
        //     text: '切换项目', //控制显示文本，空字符串表示显示默认文本
        //     onSuccess: function (result) {
        //         that.$router.push({
        //             path: '/checproject'
        //         });
        //     },
        //     onFail: function (err) {}
        // });
      });
    },
    previewFiles(row) {
      this.editPeople.push(row.id);
      this.getRebort("preview", row.id);
      const _this = this;
      if (row.type == "bimface") {
        _this.$router.push({
          path: "/BIMview",
          query: {
            id: row.id,
          },
        });
        // _this.preViewVisible = true;
        // _this.previewBIM(row.id);
      } else if (row.type == "OSS") {
        if (row.quanxian == 3) {
          _this.previewpdf(row.url);
        } else {
          let newType = row.name.substring(row.name.lastIndexOf(".") + 1);
          if (
            newType == "png" ||
            newType == "jpg" ||
            newType == "jpeg" ||
            newType == "gif" ||
            newType == "bmp"
          ) {
            _this.previewPic(row.url);
          } else if (newType == "pdf") {
            _this.previewpdf(row.url);
          } else {
            _this.previewOffice(row.url);
          }
        }
      }
    },
    previewpdf(url) {
      this.$router.push({
        path: "pdfview",
        query: {
          pdfurl: url,
        },
      });
      // dd.ready(function () {
      //     dd.biz.util.openLink({
      //         url: url,
      //         onSuccess: function (result) {
      //             /**/
      //         },
      //         onFail: function (err) {},
      //     });
      // });
    },
    //预览图片
    previewPic(url) {
      dd.ready(function () {
        dd.biz.util.previewImage({
          urls: [url], //图片地址列表
          current: url, //当前显示的图片链接
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
      });
    },
    //预览office
    previewOffice(url) {
      window.location.href =
        "https://view.officeapps.live.com/op/view.aspx?src=" + url;
      // dd.ready(function () {
      //     dd.biz.util.openLink({
      //         url: url,
      //         onSuccess: function (result) {
      //             /**/
      //         },
      //         onFail: function (err) {},
      //     });
      // });
    },
    //操作执行记录
    getRebort(stype, fid) {
      const _this = this;
      let name, czconten;
      if (stype == "delete") {
        czconten = "删除人员权限" + JSON.stringify(_this.editPeople);
        name = 6;
      } else if (stype == "delete2") {
        czconten = "删除人员权限" + JSON.stringify(_this.selectPowerPeople);
        name = 6;
      } else if (stype == "edit") {
        czconten = "更改人员权限" + JSON.stringify(_this.editPeople);
        name = 6;
      } else if (stype == "add") {
        czconten = "添加人员权限" + JSON.stringify(_this.editPeople);
        name = 6;
      } else if (stype == "preview") {
        czconten = "预览文件" + fid;
        name = 1;
      }
      _this.$axios
        .post("/cy_xiezhu/CreatedJiLu", {
          corp_id: _this.$store.state.userData.cid,
          userid: _this.$store.state.userData.userid,
          xmid: _this.$store.state.userData.Selecteddata.id,
          fid: fid,
          admin: _this.$store.state.userData.admin,
          name: name,
          czconten: czconten,
        })
        .then((res) => {
          if (res.data.code == 200) {
          } else {
          }
        });
    },
    dongtai() {
      this.$router.push({
        path: "/dtfile",
      });
    },
    showPreviewFiles() {
      this.$axios
        .post("/index.php/api/cy_xiezhu/WenJianDongTaiList", {
          xmid: this.$store.state.userData.Selecteddata.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            if (res.data.content.list.length > 0) {
              this.FileList = res.data.content.list;
            } else {
              this.Emptyshow = true;
            }
          }
        });
    },
    gofile(typeId, filesPower) {
      this.$store.commit("settypeId", typeId);
      this.$store.commit("setparentid", typeId);
      if (typeId == 8) {
        this.$router.push({
          path: "/recycle",
          query: { id: "2", filesPower: filesPower },
        });
      } else {
        this.$router.push({
          path: "/tuzhi",
          query: { id: typeId, filesPower: filesPower },
        });
      }
    },
  },
  mounted() {},
  created() {
    this.showPreviewFiles();
    this.$utils.checkding();
    this.setTitle();
    console.log(
      "989989" + JSON.stringify(this.$store.state.userData.Selecteddata)
    );
  },
};
</script>
<style lang="less">
#file {
  background-color: #fff;
  height: 100%;
  .content {
    border-bottom-left-radius: 0.33rem;
    border-bottom-right-radius: 0.33rem;

    background-color: #fff;
    display: flex;

    flex-wrap: wrap;
    .content_item {
      padding: 0.67rem 0;
      width: 25%;
      text-align: center;
      position: relative;
      img {
        width: 2.33rem;
        border-radius: 50%;
      }
      .item_font {
        margin-top: 0.33rem;
      }
      .tag {
        background-color: red;
        position: absolute;
        border-radius: 50%;
        width: 0.83rem;
        height: 0.83rem;
        line-height: 0.83rem;
        padding: 0.16rem;
        font-size: 0.5rem;
        color: #fff;
        font-weight: 500;
        top: 0.16rem;
        right: 20%;
      }
    }
  }
  .dangqian {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: space-between; /*定义body的里的元素水平居中*/
    padding: 0 30px;
    height: 4rem;
    background-color: #409efe;
    color: #fff;
    .xmjindu-item {
      width: 100%;
      height: 3.33rem;
      border-right: 0.03rem solid #fff;
      padding-right: 0.33rem;
      .xmjindu-item-font {
        font-family: "SourceHanSansCN-Medium";
        font-size: 1.33rem;
        height: 48%;
        line-height: 1.33rem;
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .xmjindu-item-font1 {
        font-size: 0.67rem;
        height: 48%;
        line-height: 1.67rem;
        color: #fff;
      }
      .xmjindu-item-jindu {
        .van-progress {
          background: #1b47b4;
        }
      }
    }
    .van-button {
      height: 1.8rem;
      border-radius: 0.5rem;
      .van-button__text {
        font-size: 1rem;
      }
    }
    .van-icon {
      font-size: 1.67rem;
    }
  }
  .van-row {
    background-color: #fff;
    padding: 0.33rem 0;
    .van-col {
      .van-col-item {
        margin-top: 0.67rem;
        width: 100%;
        text-align: center;
        .vanimg1 {
          background-color: #fb776a;
        }
        .vanimg2 {
          background-color: #fbb737;
        }
        .vanimg3 {
          background-color: #08c492;
        }
        .vanimg4 {
          background-color: #16baf4;
        }
        .vanimg5 {
          background-color: #f9bb2a;
        }
        .vanimg6 {
          background-color: #fe7662;
        }
        .vanimg7 {
          background-color: #0bbefd;
        }
        .vanimg8 {
          background-color: #0cc697;
        }

        .vanimg {
          width: 2.67rem;
          height: 2.67rem;
          margin: auto;
          display: flex;
          align-items: center; /*定义body的元素垂直居中*/
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
          padding: 0.33rem;
          img {
            width: 1.67rem;
            height: 1.67rem;
          }
        }
        .vanfont {
          color: #737373;
          margin-top: 0.5rem;
          font-size: 1rem;
        }
      }
    }
  }
  .file-content {
    background-color: #fff;
    border-top: 1rem solid #eeeff3;
    .zuijin {
      font-size: 1rem;
      color: #ababab;
      height: 2.33rem;
      line-height: 2.33rem;
      padding-left: 0.67rem;
      border-bottom: 0.06rem solid #f6f6f6;
    }
    .xiangmu {
      border-bottom: 0.06rem solid #f6f6f6;
      height: 3.33rem;

      display: flex;
      background-color: #fff;
      .xmdiv {
        height: 100%;
      }
      .xmimg {
        width: 20%;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center;

        img {
          border-radius: 0.33rem;
          width: 2.33rem;
          height: 2.33rem;

          color: #fff;
          line-height: 2.67rem;
          text-align: center;
        }
      }
      .xmjindu {
        width: 70%;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        .xmjindu-item {
          width: 100%;
          height: 3.33rem;

          padding-right: 0.33rem;

          .xmjindu-item-font {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 90%;
            font-size: 0.87rem;
            height: 50%;
            line-height: 2rem;
            color: #000;
          }
          .xmjindu-item-font1 {
            font-size: 0.67rem;
            height: 45%;
            line-height: 1.83rem;
            color: #555555;
          }
        }
      }
    }
  }
}
</style>

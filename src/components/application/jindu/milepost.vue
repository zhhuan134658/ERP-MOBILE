<template>
  <!-- 项目进度 -->
  <div id="schedulecopy">
    <van-sticky style="background-color: #f0f0f0">
      <div class="inputdiv">
        <van-search
          v-model="checkname"
          placeholder="请填写搜索条件"
          show-action
          label="当前项目:"
          shape="round"
          @click="showPopup"
          readonly
        >
          <div slot="action">
            <van-button @click="searchonLoad" type="default">上报</van-button>

            <!-- <van-button
                        @click="creatin"
                        type="default"
                    >新建</van-button> -->
          </div>
        </van-search>
      </div>
    </van-sticky>
    <div class="main_body" v-if="EventList.length > 0">
      <div
        class="main_item"
        v-for="(item, index) in EventList"
        @click="golist(item, index)"
      >
        <!-- 蓝色 -->
        <div class="main_item_x" v-if="item.sbjindu == 100">
          <div class="main_img">
            <div class="main_img1_a">
              {{ item.sbjindu + "%" }}
            </div>
            <div class="main_img2">
              {{ item.jdtitle }}
            </div>
          </div>
          <div class="main_progress">
            <van-progress
              :show-pivot="false"
              stroke-width="7"
              color="#1EB8FF"
              :percentage="item.sbjindu"
            />
          </div>
        </div>
        <!-- 绿色 -->

        <div class="main_item_x" v-else>
          <div class="main_img">
            <div class="main_img1">
              {{ item.sbjindu + "%" }}
            </div>
            <div class="main_img2">
              {{ item.jdtitle }}
            </div>
          </div>
          <div class="main_progress">
            <van-progress
              :show-pivot="false"
              stroke-width="7"
              color="#35E85A"
              :percentage="55"
            />
          </div>
        </div>
      </div>
      <!--完成  -->
      <div class="main_item">
        <div class="main_img">
          <div class="main_img1_c"></div>
          <div class="main_img2">完成</div>
        </div>
        <div class="main_progress">
          <!-- <van-progress
                        :show-pivot="false"
                        stroke-width="7"
                        color="#35E85A"
                        :percentage="55"
                    /> -->
        </div>
      </div>
    </div>
    <Empty v-if="Emptyshow"></Empty>
    <div class="newcreat" @click="gocreat">
      <img
        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yZJmD5QyfX1619581757616.png"
        alt=""
      />
    </div>
    <van-popup v-model="popupshow" position="bottom" :style="{ height: '38%' }">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @cancel="mxcancel"
        @confirm="onConfirm1"
      />
    </van-popup>
    <van-action-sheet
      @select="onSelect"
      v-model="sheetshow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import Empty from "../../common/Empty.vue";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "schedule",
  components: { Empty },
  data() {
    return {
      itemdata: "",
      actions: [{ name: "查看进度" }, { name: "编辑信息" }, { name: "删除" }],
      sheetshow: false,
      checkname: "",
      checkid: "",
      selecval: "",
      popupshow: false,
      Emptyshow: false,
      aa: 2,
      caozuoshow: false,
      scheduleinfo: "",
      EventList: [],
    };
  },

  watch: {
    EventList: {
      handler(val, oldval) {
        if (val.length > 0) {
          this.Emptyshow = false;
        } else {
          this.Emptyshow = true;
        }
      },
    },
  },

  methods: {
    setTitle() {
      dd.biz.navigation.setRight({
        show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.sheetshow = false;
      //       this.itemdata

      if (item.name == "查看进度") {
        this.$router.push({
          path: "/steps",
          query: {
            itemdata: this.itemdata,
          },
        });
      } else if (item.name == "编辑信息") {
        this.$router.push({
          path: "/jinduedit",
          query: {
            itemdata: this.itemdata,
          },
        });
      } else if (item.name == "删除") {
        this.deleitem(this.itemdata.id);
      }
    },
    golist(item, index) {
      this.sheetshow = true;
      this.itemdata = item;
      // this.$router.push({
      //     path: '/steps',
      //     query: {
      //         itemdata: item
      //     }
      // });
    },
    //删除
    deleitem(id) {
      this.$axios
        .post("/task/UpdateJinDu", {
          type: "delete",
          jid: id,

          user_id: this.$store.state.userData.userid,

          status: 2,
        })
        .then((res) => {
          this.EventList = res.data.content;
          this.getJinDuList(this.checkid);
        });
    },

    gotouchend(item) {
      this.caozuoshow = true;
      this.scheduleinfo = item;
    },

    gonext() {},
    // lichengren
    //里程碑列表
    getJinDuList(xmid) {
      this.$axios
        .post("/task/newJinDuList", {
          corp_id: this.$store.state.userData.cid,
          xmid: xmid,
          user_id: this.$store.state.userData.userid,
          // xmid: 37,
          jdstatus: "",
          fid: "",
          status: 2,
          licheng: 1,
          name: "",
        })
        .then((res) => {
          this.EventList = res.data.content;
        });
    },
    searchonLoad() {
      this.$router.push({ path: "/Report" });
    },
    // 选择框
    showPopup(val) {
      // this.selectype = val;
      this.popupshow = true;

      this.selecval = "name";
      this.columns = this.xmList;
    },
    onConfirm1(value) {
      this.checkid = value.id;
      this.checkname = value.name;
      this.$store.commit("setlcxminfo", value);
      this.getJinDuList(value.id);
      this.popupshow = false;
    },
    // 项目下拉列表
    getxmlist() {
      this.$axios.post("/project/projectInfoRegisterZbList").then((res) => {
        this.xmList = res.data.data;

        // this.checkname = this.xmList[0].name;
        // this.checkid = this.xmList[0].id;

        // this.$store.commit('setlcxminfo', this.xmList[0]);
        // this.getJinDuList(this.xmList[0].id);
      });
    },
    gocreat() {
      this.$router.push({ path: "/jinducreat" });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.getxmlist();

    console.log("sdasokdaosd", this.$store.state.userData.lcxminfo);
    this.checkname = this.$store.state.userData.lcxminfo.name;
    this.checkid = this.$store.state.userData.lcxminfo.id;
    this.getJinDuList(this.checkid);
  },
  mounted() {},
};
</script>
<style lang='less' >
#schedulecopy {
  .inputdiv {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    width: 100%;
    height: 4.5rem;

    background-color: #e6e6e6;
    .van-search {
      width: 100%;
      height: 100%;

      .van-search__action {
        font-size: 0.6rem;

        background-color: #fff;
        .van-button {
          height: 1.8rem;
          width: 4rem;

          .van-button__text {
            font-size: 1rem;
          }
        }
      }
      .van-search__action {
        height: 100%;
        line-height: 3.5rem;
        .van-button--normal {
          border-radius: 0.33rem;
          height: 2.5rem;
          .van-button__text {
            color: #409eff;
          }
        }
      }
      .van-search__content--round {
        border-radius: 0.33rem;
      }
      .van-search__content {
        .van-search__label {
          height: 2.5rem;
          line-height: 2.5rem;
          font-size: 1rem;
        }
        .van-cell {
          height: 2.5rem;
          line-height: 2.2rem;
          font-size: 1rem;
          .van-field__left-icon {
            display: none;
            .van-icon {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
  .main_body {
    background-color: #fff;
    display: flex;
    padding: 0.33rem;
    flex-direction: row;
    flex-wrap: wrap;
    .main_item {
      margin: 0.4rem 0;
      width: 25%;
      height: 140px;

      .main_item_x {
        width: 100%;
        height: 100%;

        display: flex;
      }

      .main_img {
        height: 140px;
        width: 60%;
        .main_img1 {
          text-align: center;
          line-height: 110px;
          color: #fff;
          width: 100%;
          height: 4rem;
          background-repeat: no-repeat;
          background-size: 100%; /*按比例缩放*/
          background-image: url("https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/4XXeTWRpAm1618881893399.png");
        }
        .main_img1_a {
          text-align: center;
          line-height: 110px;
          color: #fff;
          width: 100%;
          height: 4rem;
          background-repeat: no-repeat;
          background-size: 100%; /*按比例缩放*/
          background-image: url("https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yDD8dtDzTY1618881893679.png");
        }
        .main_img1_c {
          text-align: center;
          line-height: 110px;
          color: #fff;
          width: 100%;
          height: 4rem;
          background-repeat: no-repeat;
          background-size: 100%; /*按比例缩放*/
          background-image: url("https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/snZcxZriGN1618881893830.png");
        }
        .main_img2 {
          font-size: 0.8rem;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .main_progress {
        display: flex;
        align-items: center;
        width: 40%;
        height: 4rem;
        .van-progress {
          width: 100%;
        }
      }
    }
  }
  .newcreat {
    width: 5rem;
    height: 5rem;
    position: fixed;
    right: 2rem;
    bottom: 4rem;
    img {
      width: 100%;
    }
  }
  .van-action-sheet__item {
    line-height: 1.73333rem;
    .van-action-sheet__name {
      font-size: 1rem;
    }
  }
  .van-action-sheet__cancel {
    line-height: 1.73333rem;

    font-size: 1rem;
  }
}
</style>

<template>
  <!--劳务记工index  -->
  <div id="Record_work">
    <div class="title">
      <div class="title_left" @click="goall">
        <div class="font1">我管理的</div>
        <div>点击可查看全部</div>
      </div>
      <div class="title_rigit" @click="gocreat(1)">
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/YzR5BxZepz1613715288820.png"
          alt=""
        />
        <div style="text-align: center">新建</div>
      </div>
    </div>

    <div class="swiper-content">
      <swiper ref="mySwiper" :options="swiperOption" class="show-swiper">
        <template v-for="(item, index) in worklist">
          <swiper-slide :key="index">
            <div class="swiper-item">
              <img
                @click="gocreat(2, item)"
                class="biaoqian"
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/wZTf7cBmC61613782951127.png"
                alt=""
              />
              <img
                @click="gocreat(2, item)"
                class="shezhi"
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/sT4SCf8pFP1613785695966.png"
                alt=""
              />
              <div class="swiper_div">
                <div class="swiper_title">{{ item.name }}</div>
                <div class="swiper_bzname">班组长:{{ item.foreman }}</div>
                <div class="swiper_bzname">创建时间:{{ item.created }}</div>
                <div class="swiper_name">
                  <span
                    class="renname"
                    v-for="(item1, index1) in item.participants.slice(0, 5)"
                  >
                    {{
                      item1.length <= 2
                        ? item1
                        : item1.substr(item1.length - 2, 2)
                    }}
                  </span>

                  <span class="numb" @click="goren(item)"
                    >{{ item.all_people_num }}人></span
                  >
                </div>
                <div class="swiper_number">
                  <div class="num_item">
                    <div class="num_title">总工钱(元)</div>
                    <div class="num_num">{{ item.all_money }}</div>
                  </div>
                  <div class="num_item">
                    <div class="num_title">今日记工(人)</div>
                    <div class="num_num">{{ item.td_jg_num }}</div>
                  </div>
                </div>
                <!-- <div class="swiper_jq">
                                    未结清: <span>0</span> >
                                </div> -->
                <div class="jin_botton" @click="goin(item)">进入记工本</div>
              </div>
            </div>
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </template>
      </swiper>
    </div>
    <div class="swiper-item1" v-if="worklist.length == 0">
      <div class="swiper_div">
        <div class="div_img">
          <img
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/RK5WYjAmPd1619490603397.png"
            alt=""
          />
        </div>
        <div class="div_botton" @click="gocreat(1)">创建新记工本</div>
      </div>
    </div>
    <!-- <van-popup
            v-model="popupshow"
            position="bottom"
        >
            <div
                class="acaa"
                @click="goedit(2)"
            >编辑工本信息</div>
            <div
                class="acaa"
                @click="dele"
            >删除记工本</div>
        </van-popup> -->
    <!-- <van-action-sheet
            v-model="popupshow"
            :actions="actions"
            cancel-text="取消"
            close-on-click-action
            @cancel="onCancel"
        /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import { Dialog } from "vant";

// import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import * as dd from "dingtalk-jsapi";

export default {
  name: "Record_work",
  components: { swiper, swiperSlide },
  data() {
    return {
      itemdata: "",
      popupshow: false,
      worklist: [],
      // worklist: [
      //     {
      //         all_money: 0,
      //         all_people_num: 4,
      //         created: '2021-04-14 18:15',
      //         foreman: '彭',
      //         id: '2',
      //         name: '长城',
      //         participants: ['1111', '2222', '张三', '132465'],
      //         participants_ext: '2,3,4,14',
      //         td_jg_num: 0
      //     }
      // ],

      swiperOption: {
        pagination: ".swiper-pagination", //这里修改
        // pagination: {
        //     el: '.swiper-pagination'
        // },
        slidesPerView: "auto",
        watchSlidesProgress: true,
        // 设定slide与左边框的预设偏移量（单位px）
        slidesOffsetBefore: 0,
        // 设置slide之间的距离（单位px）
        spaceBetween: 37,
        centeredSlides: true,
        init: false,
        on: {
          progress: function () {
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i);
              const slideProgress = this.slides[i].progress;

              const scale = 1 - Math.abs(slideProgress) / 10; // 缩放权重值，随着progress由中向两边依次递减，可自行调整
              slide.transform(`scale3d(${scale}, ${scale}, 1)`);
            }
          },
          slideChange: function () {
            store.commit("SET_ACTIVE_INDEX", this.activeIndex);
          },
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    ...mapState({
      activeItemIndex: (state) => state.activeIndex,
    }),
  },
  watch: {
    workList: {
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
      dd.biz.navigation.setTitle({
        title: "工人记工", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
      });
    },
    initSwiper() {
      console.log("2");
      this.$nextTick(async () => {
        await this.swiper.init(); // 现在才初始化
        await this.swiper.slideTo(this.activeItemIndex);
      });
    },
    dele() {
      Dialog.confirm({
        title: "提示",
        message: "是否删除",
      })
        .then(() => {
          this.$axios
            .post("/projectthree/banZuDel", {
              id: this.itemdata.id,
            })
            .then((res) => {
              if (res.data.code == 1) {
                this.worklist.splice(this.worklist.indexOf(this.itemdata), 1);
                this.getList();
                this.popupshow = false;
                Toast(res.data.msg);
              } else {
                Toast(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },

    goedit(val) {
      this.$router.push({
        path: "/Record_creat",
        query: {
          val: val,
        },
      });
    },
    gocreat(val, item) {
      if (val == 1) {
        this.$router.push({
          path: "/Record_creat",
          query: {
            val: val,
          },
        });
      } else if (val == 2) {
        this.goall(val);
        // this.popupshow = true;
        // this.itemdata = item;
      }
      this.$store.commit("setworkitemdata", item);
    },
    goren(item) {
      this.$router.push({
        path: "/Record_ren",
        query: {
          item: item,
        },
      });
      this.$store.commit("setworkitemdata", item);
    },
    goall() {
      this.$router.push({
        path: "/Record_index",
      });
    },
    goin(item) {
      this.$router.push({
        path: "/Record_book",
      });
      this.$store.commit("setworkitemdata", item);
    },
    getList() {
      console.log("1");
      this.$axios
        .post("/projectthree/banZuList", {
          page: 1,
          number: 9999,
          name: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.workList = res.data.data;
            this.$store.commit("setworklist", res.data.data);
            this.popupshow = false;
          } else {
            Toast(res.data.msg);
          }
        });
    },
  },

  created() {
    this.TypyList = this.$utils.utilProjectStatus();
    this.shenpiList = this.$utils.utilApprovalStatus();
    this.$utils.checkding();
    this.setTitle();
    this.worklist = this.$store.state.userData.worklist;
    console.log(this.$store.state.userData.worklist);
    // this.getList();
  },
  mounted() {
    this.initSwiper();
  },
};
</script>
<style lang='less' >
#Record_work {
  overflow: hidden;
  .title {
    height: 5rem;
    background-color: #377fee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 20px;
    .title_left {
      .font1 {
        font-size: 1.67rem;
        font-family: PingFang SC;
      }
    }
    .title_rigit {
      width: 3.33rem;
      text-align: center;
      img {
        width: 2rem;
      }
    }
  }
  .swiper-content {
    width: 100%;
    height: 100%;
    position: relative;
    // overflow: hidden;
    margin: 0 auto;
    padding: 1.67rem 0;
    .swiper-container {
      overflow: initial;
      .swiper-pagination {
        bottom: -50px;
        .swiper-pagination-bullet {
          width: 0.67rem;
          height: 0.67rem;
          background: #cccccc;
        }
        .swiper-pagination-bullet-active {
          background: #377fee !important;
        }
      }
    }

    .show-swiper {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      // .swiper-wrapper {
      //     transform: translate3d(100px, 0px, 0px) !important;
      // }

      .swiper-slide {
        width: 580px;
        // 表示所有属性都有动作效果，过度时间为0.4s，以慢速开始和结束的过渡效果
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

        .swiper-item {
          background: url("https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/37w2KaCwbA1619490602889.png");
          background-size: 100% 100%;
          width: 100%;
          height: 900px;
          // background: #62a6fd;
          border-radius: 0.53rem;
          // color: orangered;
          font-size: 0.8rem;
          line-height: 1.5;
          // padding: 1rem;
          box-sizing: border-box;
          position: relative;
          .biaoqian {
            width: 3rem;
            height: 4rem;
            position: absolute;
            top: 0;
            right: 1rem;
            z-index: 6666;
          }
          .shezhi {
            width: 1.33rem;
            height: 1.33rem;
            position: absolute;
            top: 1rem;
            right: 1.83rem;
            z-index: 7777;
          }
          .swiper_div {
            border-radius: 0.5rem;
            height: 740px;
            //background-size: 100% 100%;
            //background: url('https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/37w2KaCwbA1619490602889.png');
            padding: 1.6rem;
            box-sizing: border-box;
            .swiper_title {
              font-weight: 600;
              font-size: 1.33rem;
            }
            .swiper_bzname {
              margin-top: 0.16rem;
              color: #858b96;
              font-size: 1rem;
            }
            .swiper_name {
              margin-top: 0.5rem;
              font-size: 0.83rem;

              display: flex;

              .renname {
                margin-right: 0.33rem;
                border-radius: 50%;
                overflow: hidden;
                display: inline-block;
                width: 2rem;
                height: 2rem;
                line-height: 2rem;
                text-align: center;
                background-color: #387ef5;
                color: #fff;
              }
              .numb {
                margin-top: 0.33rem;
                font-size: 1rem;
                width: 3.33rem;
                height: 1.33rem;
                line-height: 1.33rem;
                border-radius: 1rem;
                text-align: center;
                color: #828891;
                border: 0.03rem solid #828891;
              }
            }
            .swiper_number {
              display: flex;
              padding: 1.67rem 0;
              .num_item {
                width: 50%;
                text-align: center;
                .num_title {
                  color: #9297a1;
                  font-size: 1rem;
                }
                .num_num {
                  font-weight: 600;
                  font-size: 1.33rem;
                }
              }
            }
            .swiper_jq {
              color: #212732;
              font-size: 1.33rem;
              text-align: center;
              border-top: 0.06rem dashed #edeef0;
              border-bottom: 0.06rem dashed #edeef0;
              line-height: 2.67rem;
              margin-bottom: 1.33rem;
              span {
                color: #4286ef;
                font-weight: 600;
              }
            }
            .jin_botton {
              background-image: linear-gradient(to right, #69b5f8, #377fee);
              width: 80%;
              margin: 2.67rem auto 0;
              height: 3.33rem;

              border-radius: 0.5rem;
              line-height: 3.33rem;
              text-align: center;
              font-size: 1.33rem;
              color: #fff;
            }
            .div_img {
              padding: 1rem;
              text-align: center;
            }
            .div_botton {
              width: 80%;
              margin: auto;
              height: 3.33rem;
              border: 0.03rem solid #377fee;
              border-radius: 0.5rem;
              line-height: 3.33rem;
              text-align: center;
              font-size: 1.33rem;
              color: #377fee;
            }
          }
        }
      }
    }
  }
  .swiper-item1 {
    margin: auto;
    width: 80%;
    height: 900px;
    // background: #62a6fd;
    border-radius: 0.53rem;
    background: url("https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/37w2KaCwbA1619490602889.png");
    background-size: 100% 100%;
    // color: orangered;
    font-size: 0.8rem;
    line-height: 1.5;
    // padding: 1rem;
    box-sizing: border-box;
    position: relative;
    .biaoqian {
      width: 2.5rem;
      height: 3.5rem;
      position: absolute;
      top: 0;
      right: 1rem;
      z-index: 6666;
    }
    .shezhi {
      width: 1rem;
      height: 1rem;
      position: absolute;
      top: 1rem;
      right: 1.8rem;
      z-index: 7777;
    }
    .swiper_div {
      border-radius: 0.5rem;
      height: 740px;
      // background: rgba(255, 255, 255, 0.9);
      padding: 1.6rem;
      box-sizing: border-box;
      .swiper_title {
        font-weight: 600;
        font-size: 1.33rem;
      }
      .swiper_bzname {
        margin-top: 0.16rem;
        color: #858b96;
        font-size: 1rem;
      }
      .swiper_name {
        margin-top: 0.5rem;
        font-size: 0.83rem;

        display: flex;

        .renname {
          margin-right: 0.33rem;
          border-radius: 50%;
          overflow: hidden;
          display: inline-block;
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          // background-color: #387ef5;
          color: #fff;
        }
        .numb {
          margin-top: 0.33rem;
          font-size: 1rem;
          width: 3.33rem;
          height: 1.33rem;
          line-height: 1.5rem;
          border-radius: 1rem;
          text-align: center;
          color: #828891;
          border: 0.03rem solid #828891;
        }
      }
      .swiper_number {
        display: flex;
        padding: 1.67rem 0;
        .num_item {
          width: 50%;
          text-align: center;
          .num_title {
            color: #9297a1;
            font-size: 1rem;
          }
          .num_num {
            font-weight: 600;
            font-size: 1.33rem;
          }
        }
      }
      .swiper_jq {
        color: #212732;
        font-size: 1.33rem;
        text-align: center;
        border-top: 0.06rem dashed #edeef0;
        border-bottom: 0.06rem dashed #edeef0;
        line-height: 2.67rem;
        margin-bottom: 1.33rem;
        span {
          color: #4286ef;
          font-weight: 600;
        }
      }
      .jin_botton {
        background-image: linear-gradient(to right, #69b5f8, #377fee);
        width: 80%;
        margin: 2.67rem auto 0;
        height: 3.33rem;

        border-radius: 0.5rem;
        line-height: 3.33rem;
        text-align: center;
        font-size: 1.33rem;
        color: #fff;
      }
      .div_img {
        padding: 1rem;
        margin-top: 5.3rem;
        text-align: center;
        img {
          height: 6.67rem;
        }
      }
      .div_botton {
        width: 80%;
        margin: 3.33rem auto 0;
        height: 3.33rem;
        // border: 0.03rem solid #377fee;
        border-radius: 0.5rem;
        line-height: 3.33rem;
        text-align: center;
        font-size: 1.33rem;
        color: #377fee;
      }
    }
  }
  .acaa {
    font-size: 1.17rem;
    text-align: center;
    line-height: 2.67rem;
  }
}
</style>

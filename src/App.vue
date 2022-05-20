<template>
  <div id="indexApp">
    <keep-alive include="Module,taskcreat,Recordsp,spcreat,mubanlist">
      <router-view></router-view>
    </keep-alive>

    <!-- <router-view></router-view> -->

    <div class="claldiv" v-if="claldivshpw"></div>
    <van-tabbar
      v-model="active"
      class="appBottom"
      @change="change"
      v-if="tabbarshow"
    >
      <van-tabbar-item to="/application">
        <span>工作台</span>
        <template #icon="props2">
          <img
            style="height: 1.875rem"
            :src="props2.active ? icon2.active : icon2.inactive"
          />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/financeindex">
                <span>财务</span>
                <template #icon="props1">
                    <img
                        style="height: 1.875rem"
                        :src="props1.active ? icon1.active : icon1.inactive"
                    />
                </template>
            </van-tabbar-item> -->

      <!-- <van-tabbar-item to="/projectindexnew">
                <span>项目看板</span>
                <template #icon="props3">
                    <img
                        style="height: 1.875rem"
                        :src="props3.active ? icon3.active : icon3.inactive"
                    />
                </template>
            </van-tabbar-item> -->
      <van-tabbar-item to="/projectindex">
        <span>项目看板</span>
        <template #icon="props3">
          <img
            style="height: 1.875rem"
            :src="props3.active ? icon3.active : icon3.inactive"
          />
        </template>
      </van-tabbar-item>

      <!-- <van-tabbar-item to="/taskindex">
        <span>任务</span>
        <template #icon="props4">
          <img
            style="height: 1.875rem"
            :src="props4.active ? icon4.active : icon4.inactive"
          />
        </template>
      </van-tabbar-item> -->

      <van-tabbar-item to="/member">
        <span>我的</span>
        <template #icon="props5">
          <img
            style="height: 1.875rem"
            :src="props5.active ? icon5.active : icon5.inactive"
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      claldivshpw: true,
      //   keepAlive: [
      //     "creatzhifu",
      //     "creatcaigou",
      //     "creatshouruht",
      //     "creatzhichuht"
      //   ],

      tabbarshow: true,
      active: 0,
      //   routerLink: "",
      //
      icon1: {
        active:
          "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/KGi8JfNaJm1597367908905.png",
        inactive:
          "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/372xaMB4aG1597366614900.png",
      },

      //工作台
      icon2: {
        active:
          "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/zZ2Jb7tNWJ1614826928581.png",
        inactive:
          "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/YSJHbFJee41614826928172.png",
      },
      //项目看板
      icon3: {
        active:
          "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/EFYEpizCB21614826996585.png",
        inactive:
          "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yE4P8eZmwp1614826996255.png",
      },
      //任务
      icon4: {
        active:
          "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/E3Xfzk2kkC1614827049624.png",
        inactive:
          "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/CmFjDpB8ad1614827049835.png",
      },
      //我的
      icon5: {
        active:
          "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/6Y2frhmMBe1614827094409.png",
        inactive:
          "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/FM2NsEh8Np1614827094184.png",
      },
    };
  },

  mounted() {},
  methods: {
    change(active) {
      localStorage.setItem("active", active);
      //   this.routerLink = this.$route.path;
    },
  },

  // activated、deactivated
  //   activated() {
  //     this.active = JSON.parse(localStorage.getItem("active")); // 每次进入组价的时候 从本地缓存中取出
  //   },
  created() {
    this.active = JSON.parse(localStorage.getItem("active")); // 每次进入组价的时候 从本地缓存中取出

    // this.framework();
  },
  watch: {
    $route() {
      switch (this.$route.path) {
        case "/application":
          this.tabbarshow = true;
          this.claldivshpw = true;

          this.active = 0;
          break;

        case "/projectindex":
          this.tabbarshow = true;
          this.claldivshpw = true;

          this.active = 1;
          break;
        // case "/taskindex":
        //   this.tabbarshow = true;
        //   this.claldivshpw = true;
        //   this.active = 2;
        //   break;
        case "/member":
          this.tabbarshow = true;
          this.claldivshpw = true;
          this.active = 2;
          break;
        default:
          this.tabbarshow = false;
          this.claldivshpw = true;
          break;
      }
    },
  },
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
@supports (bottom: env(safe-area-inset-bottom)) {
  // #indexApp,
  .appBottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
#indexApp {
  // padding-bottom: constant(safe-area-inset-bottom);
  // margin-bottom: constant(safe-area-inset-bottom);
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", "Avenir",
    Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #000;
  min-height: 100vh;
  font-size: 0.93rem;

  background-color: #f3f6fd;
  // .claldiv {
  //     height: 4.33rem;
  // }

  .claldiv {
    height: calc(4.33rem + constant(safe-area-inset-bottom));

    height: calc(4.33rem + env(safe-area-inset-bottom));
  }
  .van-form {
    .muban {
      margin-bottom: 0.67rem;
      .textarea {
        height: 11rem !important;
        .van-cell {
          padding: inherit;
          display: inherit !important;
          height: 100%;
          .van-field__label {
            width: 50%;
            color: #1b2730;
          }
          .van-cell__title {
            // line-height: 3.33rem;
            width: 100%;
            font-size: 1rem;
            padding-left: 1rem;
            height: 3.125rem !important;
          }
          .van-cell__value {
            .van-field__body {
              align-items: inherit;
              // line-height: 3.33rem;
              line-height: 1.2rem;
              .van-field__control {
                height: 8.33rem !important;
                font-size: 1rem !important;
                // line-height: 1rem !important;
                max-height: 6.67rem !important;
                color: #000;
                padding: 0 1.1rem;
              }

              .van-field__control--right {
                text-align: left;
              }
            }
            .van-field__word-limit {
              height: 1rem;
              line-height: 1rem;
              span {
                font-size: 0.53rem;
              }
            }
          }
        }
      }
    }
    .van-cell {
      margin-bottom: 0.67rem;
      padding: inherit;
      display: inherit !important;
      height: 5rem;
      .van-field__label {
        width: 50%;
        color: #1b2730;
      }
      .van-cell__title {
        line-height: 2.33rem;
        width: 100%;
        font-size: 1rem;
        padding-left: 1rem;
        height: 2.33rem;
      }
      .van-cell__value {
        .van-field__body {
          align-items: inherit;
          // line-height: 3.33rem;
          line-height: 2.33rem;
          .van-field__control {
            height: 2.33rem;
            font-size: 1rem !important;
            // line-height: 1rem !important;
            max-height: 6.67rem !important;
            color: #000;
            padding: 0 1.1rem;
            .van-radio-group {
              height: 100%;
              .van-radio {
                .van-radio__icon {
                  .van-icon {
                    font-size: inherit;
                  }
                }
              }
            }
          }
          .van-field__control--right {
            text-align: left;
          }
        }
      }
    }
  }
  .appBottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 3.33rem;
    // line-height: 2.67rem;
    .van-tabbar-item__icon .van-icon {
      font-size: 2rem;
    }
    .van-tabbar-item__text {
      font-size: 0.83rem;
    }
  }
  .zh_vant_isprop::before {
    position: absolute !important;
    left: 0.27rem !important;
    top: 0.5rem !important;
    color: #ee0a24 !important;
    font-size: 1.33rem !important;
    content: "*" !important;
  }
}

//下拉
.van-popup {
  .van-picker {
    .van-picker__toolbar {
      height: 2.67rem;
      .van-picker__confirm {
        font-size: 1.17rem;
      }
      .van-picker__cancel {
        font-size: 1.17rem;
      }
    }
    .van-hairline--top-bottom {
      height: 2.67rem;
      line-height: 2.67rem;
      .van-picker__cancel {
        padding: 0.06rem 5px;
        font-size: 1.17rem;
      }
      .van-picker__confirm {
        padding: 0.06rem 5px;
        font-size: 1.17rem;
      }
    }
    .van-picker__columns {
      background-color: #c0c4cc;
      .van-picker-column {
        .van-ellipsis {
          font-size: 1.33rem;
        }
        .van-picker-column__item--selected {
          color: #1989fa;
        }
      }
      // .van-hairline-unset--top-bottom {
      //   // border-bottom: 0.06rem solid #909399;
      //   // border-top: 0.06rem solid #909399;
      // }
    }
  }
}
.el-select-dropdown {
  .el-scrollbar {
    .el-select-dropdown__wrap {
      .el-scrollbar__view {
        .el-select-dropdown__item {
          span {
            height: 1.83rem;
            font-size: 1rem;
            line-height: 1.67rem;
          }
        }
      }
    }
  }
}
.van-toast {
  border-radius: 0.5rem !important;
  min-height: 4rem;
  background-color: rgba(219, 219, 219, 0.8) !important;
  line-height: 1.625rem;
  .van-toast__text {
    font-size: 1.17rem;
    padding: 0.83rem;
    color: #080808 !important;
    line-height: 1.625rem;
  }
}
.van-dialog {
  width: 80% !important;
  .van-dialog__header {
    height: 2.67rem !important;
    font-size: 1.33rem !important;
    line-height: 2.67rem !important;
  }
  .van-dialog__content {
    padding: 0 0.5rem;
    .van-cell {
      border-bottom: 0.03rem solid #ebedf0;
      padding: 0 0.5rem;
      height: 2.67rem;
      margin-bottom: 0.67rem;
      .van-field__label {
        width: 50%;
      }
      .van-cell__title {
        height: 100%;
        line-height: 2.67rem;
        font-size: 0.93rem;
        padding-left: 0.33rem;
      }
      .van-cell__value {
        .van-field__body {
          height: 100%;
          line-height: 2.67rem;
          .van-field__control {
            font-size: 0.93rem !important;
            // line-height: 1.17rem !important;
            color: #000;
          }
        }
      }
    }
    .van-cell-group {
      .van-cell {
        .van-cell__value {
          .van-field__body {
            .van-field__control {
              padding: 0.33rem !important;
              height: 5rem !important;
              font-size: 1rem !important;
            }
          }
        }
      }
    }
  }
  .van-hairline--top {
    height: 3rem !important;
    .van-button {
      height: 100% !important;
      .van-button__text {
        font-size: 1.17rem !important;
      }
    }
  }
}
</style>

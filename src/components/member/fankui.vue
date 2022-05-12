<template>
  <!-- 反馈 -->
  <div id="fankui">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="phoneOrEmail"
        onkeyup="this.value=this.value.replace(/\D/g,'')"
        name="手机号"
        label="手机号"
        placeholder="请填写手机号"
        maxlength="11"
        :rules="[{ required: true }]"
      />
      <!-- 上传 -->
      <!-- <div class="imgupload">
                <div class="imgfont">
                    <div>附件</div>
                    <div
                        class="imgfont1"
                        @click="getspaceID('1')"
                    >
                        添加文件
                    </div>
                </div>
                <div class="upList">
                    <div
                        class="xiangmu"
                        v-for="(item, index) in fiurl"
                        :key="index"
                    >
                        <div class="xmdiv xmimg">
                            <div class="img">{{ item.fileType }}</div>
                        </div>
                        <div class="xmdiv xmjindu">
                            <div class="clear">
                                <van-icon
                                    name="cross"
                                    @click="deletefile('1', item)"
                                />
                            </div>
                            <div class="xmjindu-item">
                                <div class="xmjindu-item-font">
                                    {{ item.fileName }}
                                </div>
                                <div class="xmjindu-item-font1">
                                    {{
                                                (
                                                    item.fileSize /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)
                                            }}MB
                                </div>
                            </div>
                            <div
                                class="yulan"
                                @click="lookfile(item)"
                            >
                                预览
                            </div>
                        </div>
                    </div>

                </div>
            </div> -->
      <div class="muban">
        <div class="textarea">
          <van-field
            class="zh_vant_isprop"
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            maxlength="200"
            v-model="description"
            name="问题描述"
            label="问题描述"
            placeholder="请填写问题描述"
          />
        </div>
      </div>
    </van-form>

    <div class="sureBtn">
      <van-button type="info" @click="sure">确定</van-button>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
Toast.setDefaultOptions({ duration: 1500 });
import pxupload from "../common/hupload.vue";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  components: { pxupload },
  name: "fankui",
  data() {
    return {
      phoneOrEmail: "",
      fiurl: [],
      description: "",
      upImgList: [],
      licenceImg: [],
      isShow: [],
      pxurl: "",
      radio: 1,
      message: "",
      tel: "",
      imageList: [],
    };
  },
  computed: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "意见反馈", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    imgshow(data) {
      this.imageList = data;
      console.log(data);
    },
    sure() {
      if (this.description == "") {
        Toast("请填写意见");
      } else if (this.phoneOrEmail == "") {
        Toast("请填写手机号");
      } else {
        this.$axios
          .post("/finance/parereadd", {
            parere: this.description, //	描述
            img: this.imageList,
            tel: this.phoneOrEmail, //联系方式
          })
          .then((res) => {
            if (res.data.code == 1) {
              Toast("反馈成功");
              this.$router.go(-1);
            }
          });
      }
    },
  },
  mounted() {},
  created() {
    this.$utils.checkding();
    this.setTitle();
  },
};
</script>
<style lang="less">
#fankui {
  .imgupload {
    margin: 0.67rem 0;

    .imgfont {
      margin-left: 0.67rem;
      margin-right: 0.67rem;
      font-size: 1rem;
      color: #646566;
      display: flex;
      justify-content: space-between;
      .imgfont1 {
        font-size: 0.83rem;
        color: #409efe;
      }
    }
    padding: 0.67rem 0;
    box-sizing: border-box;
    background-color: #fff;
    .upList {
      // margin-top: 0.67rem;
      .xiangmu {
        border: 0.06rem solid #f3f6fd;
        height: 3.33rem;
        margin: 0.33rem 0;
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

          .img {
            text-transform: uppercase;
            border-radius: 0.33rem;
            width: 2.67rem;
            height: 2.67rem;
            border: 0.03rem solid #a5a3a6;
            background-color: #f45457;
            color: #fff;
            line-height: 2.67rem;
            text-align: center;
          }
        }
        .xmjindu {
          width: 79%;
          display: flex;
          align-items: center; /*定义body的元素垂直居中*/
          position: relative;
          .yulan {
            width: 3.33rem;
            font-size: 1.17rem;
            color: #409eff;
          }
          .van-icon {
            position: absolute;
            top: -5px;
            right: -5px;
            color: #969799;
            line-height: 1rem;
            width: 1rem;
            height: 1rem;
            background-color: red;
            border-radius: 100%;
          }
          .xmjindu-item {
            width: 75% !important;
            height: 3.33rem;

            padding-right: 0.33rem;

            .xmjindu-item-font {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
              font-size: 1rem;
              height: 50%;
              line-height: 1.83rem;
              color: #000;
            }
            .xmjindu-item-font1 {
              font-size: 0.67rem;
              height: 45%;
              line-height: 1.67rem;
              color: #555555;
            }
          }
        }
      }

      .upbtn {
        display: inline-block;
        margin-top: 0.67rem;
        margin-left: 1.33rem;

        width: 3.33rem;
        height: 3.33rem;
        background-color: #e6e6e7;
        border-radius: 0.2rem;
        .el-button {
          width: 100%;
          height: 100%;
          font-size: 1.67rem;
        }
      }
    }
  }
  .van-cell-group {
    .van-cell {
      line-height: 2.75rem;
      border-bottom: 0.03rem solid #e6e6e7;
      .van-cell__title {
        font-size: 1.17rem;
        color: #575b60;
      }
      .van-cell__value {
        font-size: 1.17rem;
        flex: inherit;
      }
      .van-icon {
        font-size: 1rem;
        line-height: 3.75rem;
      }
      .van-radio {
        .van-radio__icon {
          height: 2em;
        }
      }
    }
  }
  .van-field {
    border-bottom: 0.03rem solid #e6e6e7;
    .van-cell__title {
      font-size: 1.17rem;
      line-height: 1.67rem;
      color: #575b60;
      width: 30%;
    }
    .van-cell__value {
      font-size: 1.17rem;
      .van-field__body {
        line-height: 1.67rem;
      }
      .van-field__word-limit {
        font-size: 1rem;
      }
    }
  }
  .phone {
    height: 2.75rem;
    .van-cell {
      height: 100%;
      line-height: 2.75rem;
      border-bottom: 0.03rem solid #e6e6e7;
      .van-cell__title {
        font-size: 1.17rem;
        line-height: 2rem;
        color: #575b60;
      }
      .van-cell__value {
        font-size: 1.17rem;
        flex: inherit;
        line-height: 2rem;
        .van-field__body {
          height: 100% !important;
        }
      }
      .van-icon {
        line-height: 2rem;
        font-size: 1rem;
        line-height: 2.75rem;
      }
    }
  }
  .sureBtn {
    padding: 0 20px;
    margin-bottom: 4rem;
    margin-top: 1.33rem;
    height: 2.67rem;
    line-height: 2.67rem;
    text-align: center;

    overflow: hidden;
    .van-button {
      width: 100%;
      height: 100%;
      border-radius: 0.27rem;
      span {
        font-size: 1.2rem;
      }
    }
  }
  .pcont-list {
    box-sizing: border-box;
    .upimg {
      background-color: #fff;
      margin-top: 0.33rem;
      width: 100%;
      min-height: 5rem !important;
      // background-color: #e6e6e6;
      box-sizing: border-box;
      display: flex;
      #mpupload {
        .shangchuan {
          // margin-bottom: 0.67rem;
          .imgfont {
            margin-left: 1.33rem;
            font-size: 1.17rem;
            border-left: 0;
            height: 1.67rem;
            margin-top: 0.67rem;
            line-height: 1.67rem;
          }
        }
        #arr_li {
          position: relative;
          margin-bottom: 0.33rem;
          margin-left: 3%;
          margin-top: 0.33rem;
          width: 3.33rem;
          height: 3.33rem;
          .tukuang {
            border: 0;
            border-radius: 0;
            padding: 0;
            display: block;
            width: 100%;
            height: 100%;
            overflow: hidden;
            img {
              width: 100%;
              height: 3.33rem;
            }
          }
        }
        #container {
          width: 3.33rem;
          height: 3.33rem;
          margin-bottom: 0.33rem;
          margin-left: 0.67rem;
          margin-top: 0.33rem;
          overflow: hidden;
          #selectfiles {
            display: inline-block;
            width: 3.33rem !important;
            height: 3.33rem !important;
            .el-button {
              width: 100%;
              height: 100%;
              font-size: 1.67rem;
            }
          }
          .moxie-shim {
            width: 100%;
            height: 100%;
            input {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      // .upimg-item {
      //     margin-left: 0.33rem;
      //     align-self: center;
      //     width: 4.33rem;
      //     height: 4.33rem;
      //     background-color: #fff;
      // }
    }
  }
}
</style>

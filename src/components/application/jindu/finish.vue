<template>
  <div id="creatschedule">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <!--  -->

      <van-field
        class="zh_vant_isprop"
        input-align="right"
        readonly
        clickable
        v-model="eventFrom.jdstoptime"
        name="完成时间"
        label="完成时间"
        placeholder="请填写完成时间"
        :rules="[{ required: true }]"
        @click="settime(1)"
      />

      <div class="textarea">
        <van-field
          type="textarea"
          input-align="right"
          maxlength="50"
          v-model="eventFrom.jdyuanyin"
          name="完成说明"
          label="完成说明"
          placeholder="请填写完成说明"
          :maxlength="200"
          clickable
        />
      </div>
      <!-- 附件 -->
      <div class="imgupload">
        <div class="imgfont">
          <div>附件</div>
          <div class="imgfont1" @click="getspaceID('4')">添加附件</div>
        </div>
        <div class="upList">
          <div
            class="xiangmu"
            v-for="(item, index) in eventFrom.jdstopurl"
            :key="index"
          >
            <div class="xmdiv xmimg">
              <div class="img">{{ item.fileType }}</div>
            </div>
            <div class="xmdiv xmjindu">
              <div class="clear">
                <van-icon name="cross" @click="deletefile('4', item)" />
              </div>
              <div class="xmjindu-item">
                <div class="xmjindu-item-font">
                  {{ item.fileName }}
                </div>
                <div class="xmjindu-item-font1">
                  {{ (item.fileSize / 1024 / 1024).toFixed(2) }}MB
                </div>
              </div>
              <div class="yulan" @click="lookfile(item)">预览</div>
            </div>
          </div>

          <!-- <div class="upbtn" @click="getspaceID">
                                <el-button
                                    plain
                                    class="el-icon-plus"
                                ></el-button>
                            </div> -->
        </div>
      </div>
      <div class="sureBtn">
        <van-button native-type="submit" type="info">确定完成</van-button>
      </div>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        :value-key="selecval"
        @cancel="showPicker = false"
        @confirm="onConfirm1"
      />
    </van-popup>
    <!-- 时间 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="starcurrentDate"
        type="date"
        @confirm="gettime1"
        @cancel="close"
      />
    </van-popup>
  </div>
</template>
<script>
import * as dd from "dingtalk-jsapi";

import axios from "axios";
import { Toast } from "vant";
Toast.setDefaultOptions({ duration: 1500 });
import { setTimeout } from "timers";

export default {
  name: "creatschedule",

  data() {
    return {
      uptype: "",
      minDate: new Date(
        this.$route.query.itemdata.starttime.replace(/\-/g, ",")
      ),
      xmlist: [],
      selecval: "",
      fuzerenzong: "",
      fuzeren: this.$store.state.userData.personnelList,
      test: "",
      eventFrom: {
        jid: this.$route.query.itemdata.id,
        jdstoptime: "",
        jdgongqi: "",
        jdyuanyin: "",
        jdstopurl: [],
        type: "",

        userid: this.$store.state.userData.userid,
      },
      neweventFrom: {
        jid: "",
        jdstoptime: "",
        jdgongqi: "",
        jdyuanyin: "",
        jdstopurl: [],
        type: "",

        userid: this.$store.state.userData.userid,
      },
      show: false,
      stoptime: "",
      starcurrentDate: new Date(),
      endcurrentDate: new Date(),
      showPicker: false,
      numble: "",
      columns: "",
      shijanName: "",
      lichengList: [],
      lichengzList: [],
    };
  },
  methods: {
    setTitle() {
      dd.biz.navigation.setRight({
        show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "完成信息", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },
    // 时间选择
    settime(val) {
      this.show = true;
      this.valtime = val;
      console.log(val);
    },
    gettime1(value) {
      const startdata = value;
      //日期
      const resDate =
        startdata.getFullYear() +
        "-" +
        this.p(startdata.getMonth() + 1) +
        "-" +
        this.p(startdata.getDate());

      if (this.valtime == "1") {
        this.eventFrom.jdstoptime = resDate;
        this.startdata = value;
      }

      this.show = false;
    },

    p(s) {
      return s < 10 ? "0" + s : s;
    },
    close() {
      this.show = false;
    },
    clac() {
      this.$router.push({
        path: "/xmevent",
      });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.fileId) && res.set(arr.fileId, 1)
      );
    },
    imguploadAtta(newspaceid) {
      const _this = this;

      dd.ready(function () {
        dd.biz.util.uploadAttachment({
          image: {
            multiple: true,
            compress: false,
            max: 9,
            spaceId: newspaceid,
          },
          space: {
            corpId: _this.$store.state.userData.cid,
            spaceId: newspaceid,
            isCopy: 1,
            max: 9,
          },
          file: { spaceId: newspaceid, max: 1 },
          types: ["photo", "camera", "file", "space"], //PC端支持["photo","file","space"]
          onSuccess: function (result) {
            if (_this.uptype == "1") {
              // _this.eventFrom .ldenclosure = result.data;
              _this.eventFrom.ldenclosure = _this.deunique(
                _this.eventFrom.ldenclosure.concat(result.data)
              );
            } else if (_this.uptype == "4") {
              _this.eventFrom.jdstopurl = _this.deunique(
                _this.eventFrom.jdstopurl.concat(result.data)
              );
            }
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    //获取企业自定义空间
    getspaceID(val) {
      this.uptype = val;
      this.$axios
        .post("/dingding/getAuthUp", {
          type: "add",

          fileids: "",
        })
        .then((res) => {
          console.log(res.data.data);
          if (val == "1" || val == "2") {
            this.imguploadAtta(res.data.data.toString());
          } else if (val == "3" || val == "4") {
            this.imguploadAtta(res.data.data.toString());
          }
        });
    },

    onSubmit() {
      const _this = this;
      //否 “1” 是 “2”
      let newTime = new Date(_this.minDate).getTime();
      let newT = new Date(_this.eventFrom.jdstoptime).getTime();
      if (newT < newTime) {
        _this.eventFrom.type = 1;
        _this.eventFrom.jdgongqi = (newTime - newT) / (1000 * 60 * 60 * 24);
      } else if (newT > newTime) {
        _this.eventFrom.type = 2;
        _this.eventFrom.jdgongqi = (newT - newTime) / (1000 * 60 * 60 * 24);
      } else {
        _this.eventFrom.type = 0;
        _this.eventFrom.jdgongqi = 0;
      }

      _this.$axios.post("/task/FinishJinDu", _this.eventFrom).then((res) => {
        if (res.data.code == 1) {
          Toast(res.data.msg);

          this.$router.go(-1);
        } else if (res.data.code == 2) {
          Toast(res.data.msg);
        } else {
          Toast(res.data.msg);
        }
      });
    },
    failure(errorInfo) {
      console.log(errorInfo.errors);

      Toast(errorInfo.errors[0].name + "未填写");
    },
  },
  watch: {},
  created() {
    this.$utils.checkding();
    this.setTitle();
    // this.getList();
    // this.$route.query.itemdata.starttime;
    console.log(this.$store.state.userData.Selecteddata);
  },
  mounted() {},
};
</script>
<style lang="less">
#creatschedule {
  padding: 0.5rem 0;

  .van-form {
    .textarea {
      height: 10rem !important;
      .van-cell {
        padding: 0 0.5rem;
        display: inherit !important;
        height: 100%;
        .van-field__label {
          width: 50%;
        }
        .van-cell__title {
          // line-height: 3.33rem;
          font-size: 1.17rem;
          padding-left: 0.33rem;
          height: 3.125rem !important;
        }
        .van-cell__value {
          .van-field__body {
            align-items: inherit;
            // line-height: 3.33rem;
            line-height: 1.2rem;
            .van-field__control {
              padding: 0 0.5rem;
              height: 8.33rem !important;
              font-size: 1.17rem !important;
              // line-height: 1.17rem !important;
              max-height: 6.67rem !important;
              color: #000;
            }
            .van-field__control--right {
              text-align: left;
            }
          }
        }
      }
    }
  }

  .sureBtn {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding: 0.67rem 0 70px;
    text-align: center;

    .van-button--info {
      width: 85%;
      font-size: 1rem;
      border-radius: 0.67rem;
      height: 2.33rem;
    }
  }
  .imgupload {
    margin-top: 0.67rem;
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
}
</style>

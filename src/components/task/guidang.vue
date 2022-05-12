<template>
  <!--  -->
  <div id="guidang">
    <van-form
      @submit="onSubmit"
      :colon="true"
      @failed="failure"
      :scroll-to-error="true"
    >
      <van-field
        class="zh_vant_isprop"
        input-align="right"
        v-model="contractDrawerForm.guidangsite"
        name="归档位置"
        :readonly="isready"
        maxlength="50"
        label="归档位置"
        placeholder="请填写归档位置"
        :rules="[{ required: true }]"
      />
      <van-field
        v-if="isready"
        :readonly="isready"
        input-align="right"
        v-model="contractDrawerForm.username"
        name="归档人"
        maxlength="50"
        label="归档人"
        placeholder="请填写归档人"
        :rules="[{ required: false }]"
      />
      <van-field
        input-align="right"
        v-model="contractDrawerForm.guidangnumber"
        type="number"
        onkeyup="this.value=this.value.replace(/\D/g,'')"
        name="归档份数"
        maxlength="50"
        :readonly="isready"
        label="归档份数"
        placeholder="请填写归档份数"
        :rules="[{ required: false, message: '请填写归档份数' }]"
      />

      <div class="imgupload">
        <div class="imgfont"><span style="color: red">*</span> 归档文件</div>
        <div class="upList">
          <div
            class="xiangmu"
            v-for="(item, index) in contractDrawerForm.guidangfile"
            :key="index"
          >
            <div class="xmdiv xmimg">
              <div class="img">{{ item.fileType }}</div>
            </div>
            <div class="xmdiv xmjindu">
              <div class="clear" v-if="taskliststatus == '2'">
                <van-icon name="cross" @click="deletefile(item)" />
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

          <div v-if="taskliststatus == '2'" class="upbtn" @click="getspaceID">
            <el-button plain class="el-icon-plus"></el-button>
          </div>
        </div>
      </div>
      <div class="muban">
        <div class="textarea">
          <van-field
            :readonly="isready"
            rows="1"
            show-word-limit
            type="textarea"
            input-align="right"
            v-model="contractDrawerForm.guidangremarks"
            name="归档备注"
            label="归档备注"
            placeholder="请填写归档"
          />
        </div>
      </div>

      <div class="sureBtn">
        <van-button type="info" native-type="submit">确 定</van-button>
      </div>
      <!-- <div
                class="sureBtn"
                v-if="taskliststatus == '4'"
            >
                <van-button
                    type="info"
                    native-type="submit"
                >确定</van-button>

                <van-button
                    type="warning"
                    @click="calc"
                >重置</van-button>
            </div> -->
    </van-form>

    <!-- ssssssssssssssssssssssssssssssssssssssssss -->
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "guidang",
  components: {},
  data() {
    return {
      isready: false,
      taskliststatus: this.$route.query.taskliststatus,
      contractDrawerForm: {
        taskid: this.$route.query.taskid,
        guidangfile: [],
        guidangsite: "",
        guidangnumber: "",
        guidangremarks: "",
        username: this.$store.state.userData.username,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.biz.navigation.setTitle({
        title: "任务归档", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
      });
    },

    onSubmit() {
      if (this.contractDrawerForm.guidangfile.length == 0) {
        Toast("请上传归档文件");
      } else {
        this.$axios
          .post("/task/approvalguidang", this.contractDrawerForm)
          .then((res) => {
            if (res.data.code == 1) {
              Toast(res.data.msg);
              this.$router.go(-1);
            } else {
              Toast(res.data.msg);
            }
          });
      }
    },
    deletefile(tag) {
      this.contractDrawerForm.guidangfile.splice(
        this.contractDrawerForm.guidangfile.indexOf(tag),
        1
      );
    },
    //获取企业自定义空间
    getspaceID() {
      this.$axios
        .post("/dingding/getAuthUp", {
          auth: "add",

          fields: "",
        })
        .then((res) => {
          console.log(res.data.data);

          this.uploadAtta(res.data.data.toString());
        });
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.fileId) && res.set(arr.fileId, 1)
      );
    },
    uploadAtta(newspaceid) {
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
            // _this.contractDrawerForm.guidangfile = result.data;
            _this.contractDrawerForm.guidangfile = _this.deunique(
              _this.contractDrawerForm.guidangfile.concat(result.data)
            );

            // _this.fileList = _this.deunique(
            //     _this.fileList.concat(result.data)
            // );
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    // 与拉美盯盘文件
    clac() {
      this.shenpinum = 0;
      this.typenum = 0;
      this.typename = "";
      this.shenpival = "";
    },

    lookfile(item) {
      const _this = this;
      _this.$axios
        .post("/dingding/getAuthUp", {
          auth: "download",

          fields: item.fileId,
        })
        .then((res) => {
          dd.ready(function () {
            dd.biz.cspace.preview({
              corpId: _this.$store.state.userData.cid,
              spaceId: item.spaceId,
              fileId: item.fileId,
              fileName: item.fileName,
              fileSize: item.fileSize,
              fileType: item.fileType,
              onSuccess: function () {
                //无，直接在native显示文件详细信息
              },
              onFail: function (err) {
                // 无，直接在native页面显示具体的错误
              },
            });
          });
        });
    },
    getinfo() {
      const _this = this;
      _this.$axios
        .post("/task/taskgdfilelist ", {
          taskid: _this.$route.query.taskid,
        })
        .then((res) => {
          _this.contractDrawerForm = res.data.content;
        });
    },
    calc() {
      this.$route.go(-1);
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {
    if (this.taskliststatus == "3") {
      this.getinfo();
      this.isready = true;
    }
  },
};
</script>
<style lang='less' >
#guidang {
  padding: 0.67rem 0px 6.67rem;

  .van-form {
    .imgupload {
      margin-top: 0.67rem;
      .imgfont {
        margin-left: 0.67rem;
        font-size: 1.17rem;
        color: #646566;
      }
      padding: 0.67rem 0;
      box-sizing: border-box;
      background-color: #fff;
      .upList {
        margin-top: 0.67rem;
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
    .liucheng {
      margin-top: 1rem;
      padding: 0.67rem;
      box-sizing: border-box;
      background-color: #fff;
      font-size: 1.17rem;
      .liucheng_item {
        display: flex;
        justify-content: space-between;
        padding: 0.67rem;
        .item_font {
          width: 25%;
          .item_font1 {
            color: #646566;
            font-size: 1rem;
            //   line-height: 2rem;
          }
          .item_font2 {
            color: #9ea0a3;
            font-size: 0.67rem;
            line-height: 1.67rem;
          }
        }

        .item_img {
          width: 75%;

          img {
            margin-left: 0.33rem;
            float: right;
            width: 2.67rem;
            height: 2.67rem;
          }
          .item_icon {
            float: right;
            width: 1rem;
            height: 3.33rem;
            line-height: 2.67rem;
            text-align: center;
          }
          .item_renyuan {
            position: relative;
            float: right;
            width: 3.33rem;
            height: 2.67rem;
            font-size: 0.67rem;
            text-align: center;

            .van-icon {
              position: absolute;
              top: -1px;
              right: -1px;
              color: #969799;
              line-height: 1rem;
              width: 1rem;
              height: 1rem;
              background-color: #000;
              border-radius: 100%;
            }

            .itemname {
              font-size: 1rem;
              margin: auto;
              width: 2.67rem;
              height: 2.67rem;
              background-color: red;
              border-radius: 50%;
              overflow: hidden;
              span {
                display: inline-block;
                width: 100%;
                height: 100%;
                line-height: 2.67rem;
                text-align: center;
                background-color: #387ef5;
                color: #fff;
              }
            }
          }
        }
      }
      // .shnpiren {
      //     .shnpiren_item {
      //     }
      // }
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
}
</style>

<template>
  <!--  -->
  <div id="tasklistnew">
    <!--项目搜索  -->
    <!-- <div class="inputdiv">
            <van-search
                v-model="Searchname"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
            >
                <div slot="action">

                    <van-button @click="onLoad" type="default">搜索</van-button>
                </div>
            </van-search>
        </div> -->

    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="renwucontent" v-for="(item, index) in FilesList" :key="index">
        <div class="item_heard" @click="lookinfo(item)">
          <div class="item_img">
            <img v-if="item.header" :src="item.header" alt />
            <span v-else>
              {{
                item.founder.length <= 2
                  ? item.founder
                  : item.founder.substr(item.founder.length - 2, 2)
              }}
            </span>

            <div class="item_img_title">
              <div class="item_img_title1">
                {{ item.tasktitle }}
              </div>

              <div class="item_img_title2">
                {{ item.createdtime }}
              </div>
            </div>
          </div>
          <div
            style="color: #1989fa; font-weight: 600; line-height: 1.67rem"
            @click="lookinfo(item)"
          >
            <van-icon name="ellipsis" />
          </div>
        </div>
        <div class="btem" @click="lookinfo(item)">
          <div class="btem1">待审批人:</div>
          <div class="btem2">{{ item.todoname }}</div>
        </div>
        <div class="btem" @click="lookinfo(item)">
          <div class="btem1">项目:</div>
          <div class="btem2">{{ item.project_name }}</div>
        </div>
        <div class="btem" @click="lookinfo(item)">
          <div class="btem1">创建时间:</div>
          <div class="btem2">{{ item.createdtime }}</div>
        </div>

        <div class="btem" @click="lookinfo(item)">
          <div class="btem1">任务类别:</div>
          <div class="btem2">{{ item.tasktype }}</div>
        </div>

        <div class="item_bottom">
          <span @click="lookinfo(item)"> <van-icon name="chat-o" />评论 </span>
          &nbsp;&nbsp;

          <span
            @click="lookinfo(item)"
            v-if="taskliststatus != '3' && item.status == '1'"
          >
            <van-icon name="coupon-o" />催办
          </span>
          &nbsp;&nbsp;

          <span v-if="taskliststatus != '2' && taskliststatus != '3'">
            <span @click="lookinfo(item)" v-if="item.taskstatus == '0'">
              <van-icon name="passed" />完成
            </span>
            <span @click="lookinfo(item)" v-else>
              <van-icon name="exchange" />重启
            </span>
          </span>

          &nbsp;&nbsp;
          <span
            @click="lookgd(item)"
            v-if="item.logspare3 == '1' && taskliststatus == '2'"
            style="color: #ff9f00"
          >
            <van-icon name="coupon-o" />归档
          </span>
          &nbsp;&nbsp;
          <span
            style="color: #ff9f00"
            @click="lookgd(item)"
            v-if="item.logspare3 == '1' && taskliststatus == '3'"
          >
            <van-icon name="coupon-o" />查看归档
          </span>
        </div>
      </div>
    </van-list>

    <Empty v-if="Emptyshow"></Empty>

    <van-dialog
      @confirm="queren"
      @cancel="quxiao"
      v-model="dialogshow"
      title="标题"
      show-cancel-button
    >
      <van-field
        v-model="commontext"
        placeholder="请输入标签名"
        right-icon="photo"
        @click-right-icon="righticon"
      />
    </van-dialog>
  </div>
</template>

<script>
import { Dialog } from "vant";
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
import Empty from "../common/Empty.vue";
export default {
  name: "tasklistnew",
  components: { Empty },
  data() {
    return {
      taskliststatus: "",
      plfile: [],
      Emptyshow: false,
      dialogshow: false,
      commontext: "",
      itemdata: "",
      caozuoshow: false,
      // 分页列表
      Searchname: "",
      FilesList: [
        // {
        //     by1: null,
        //     by2: null,
        //     enclosure: '[]',
        //     filedata1: null,
        //     founder: '赵勇',
        //     id: '203',
        //     pname: '协同建设问题汇总',
        //     processdata1: null,
        //     spare4: '46',
        //     starttime: '2020-09-25',
        //     stoptime: '2020-09-29',
        //     taskstatus: '0',
        //     tasktitle: '文明施工区检查',
        //     tasktype: '安全文明检查',
        //     todostaff: '125316554438038523',
        //     username: '陈莉娜',
        //     xmid: '63',
        // },
      ],
      isLoading: false,
      loading: false, // 当loading为true时，转圈圈
      current_page: 1,

      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了
    };
  },
  computed: {},
  watch: {
    FilesList: {
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
        title: "任务列表", //控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          /*结构
        {
        }*/
        },
        onFail: function (err) {},
      });
    },

    lookgd(item) {
      console.log(item);
      this.$router.push({
        path: "/guidang",
        query: {
          taskid: item.id,
          taskliststatus: this.taskliststatus,
        },
      });
    },
    righticon() {
      this.getspaceID();
    },

    //获取企业自定义空间
    getspaceID() {
      this.$axios
        .post("/dingyun/DingPanSaveFile", {
          corp_id: this.$store.state.userData.cid,
          type: "add",
          userid: this.$store.state.userData.userid,
          fileids: "",

          xmid: this.$store.state.userData.Selecteddata.id,
        })
        .then((res) => {
          console.log(res.data.spaceid);

          this.uploadAtta(res.data.spaceid.toString());
        });
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
          types: ["photo", "camera"], //PC端支持["photo","file","space"]
          onSuccess: function (result) {
            // Toast(result.data);
            _this.plfile = result.data;
            // _this.contractDrawerForm.enclosure = _this.deunique(
            //     _this.contractDrawerForm.enclosure.concat(
            //         result.data
            //     )
            // );

            // _this.fileList = _this.deunique(
            //     _this.fileList.concat(result.data)
            // );
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },

    onLoad() {
      this.$axios
        .post("/task/approvallist", {
          corp_id: this.$store.state.userData.cid,
          userid: this.$store.state.userData.userid,

          projectname: "",

          status: this.$store.state.userData.taskliststatus,
          current_page: this.current_page,
          starttime: "",
          stoptime: "",
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.loading = false;
            if (!this.Searchname) {
              if (res.data.content.list.length > 0) {
                this.FilesList = this.deunique(
                  this.FilesList.concat(res.data.content.list)
                ); //追加数据
                // this.FilesList.push(...res.data.content.list);
              } else {
                this.FilesList = res.data.content.list;
                this.finished = true;
                // this.Emptyshow = true;
              }
            } else {
              if (
                res.data.content.list.length > 0 ||
                res.data.content.list == null
              ) {
                this.FilesList = [];
                this.FilesList = this.deunique(res.data.content.list);
                // this.Emptyshow = false;
              } else {
                this.FilesList = [];
                // this.Emptyshow = true;
              }
            }

            // page
            if (
              this.current_page == res.data.content.page ||
              res.data.content.list.length == 0 ||
              res.data.content.list == null
            ) {
              //数据全部加载完成

              this.finished = true;
            } else {
              this.current_page += 1;
              this.finished = false;
            }
          } else {
            Toast(res.data.msg);
            this.finished = true;
          }
        });
    },
    caozuo(item) {
      this.itemdata = item;
      this.caozuoshow = true;
    },
    lookinfo(item) {
      if (item.logspare3 == "1") {
        dd.ready(function () {
          dd.biz.util.openLink({
            url: item.url, //要打开链接的地址
            onSuccess: function (result) {
              /**/
            },
            onFail: function (err) {},
          });
        });
        // }
      } else if (item.logspare3 == "0") {
        this.$router.push({
          path: "/taskedit",
        });
      }

      this.$store.commit("setitemdata", item);
    },
    //催办任务
    urge() {
      //  this.itemdata.todostaff
      const _this = this;
      dd.ready(function () {
        dd.biz.ding.create({
          users: [_this.itemdata.todostaff], // 用户列表，工号
          corpId: _this.$store.state.userData.cid, // 企业id
          type: 1, // 附件类型 1：image  2：link
          alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
          alertDate: {
            format: "yyyy-MM-dd HH:mm",
            value: "",
          },
          attachment: {
            images: [""],
          }, // 附件信息
          text: "", // 正文
          bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；

          onSuccess: function () {
            //onSuccess将在点击发送之后调用
          },
          onFail: function () {},
        });
      });

      // this.$axios
      //     .post('/task/tasknotice', {
      //         corp_id: this.$store.state.userData.cid,
      //         userid: this.itemdata.todostaff,
      //         user_id: this.$store.state.userData.userid,
      //         xmid: this.$store.state.userData.Selecteddata.id,

      //         id: this.itemdata.id,
      //         type: '1', // 1任务通知  2重启任务

      //         proname: this.$store.state.userData.Selecteddata.name,
      //         tasktitle: this.itemdata.tasktitle,
      //     })
      //     .then((res) => {
      //         if (res.data.code == 200) {
      //             Toast(res.data.msg);
      //             this.caozuoshow = false;
      //         } else {
      //             Toast(res.data.msg);
      //             this.caozuoshow = false;
      //         }
      //     });
    },
    //删除任务

    deletetask() {
      this.caozuoshow = false;
      this.complete(this.itemdata, 0);
    },
    //评论
    quxiao() {
      this.commontext = "";
    },
    queren() {
      if (this.commontext == "") {
        Toast("评论不能为空");
      } else {
        this.$axios
          .post("/task/taskcomment", {
            file: this.plfile,
            corp_id: this.$store.state.userData.cid,
            user_id: this.$store.state.userData.userid,

            xmid: this.$store.state.userData.Selecteddata.id,
            taskid: this.itemdata.id,

            username: this.$store.state.userData.username,
            content: this.commontext,
          })
          .then((res) => {
            if (res.data.code == 200) {
              Toast(res.data.msg);
              this.dialogshow = false;
              this.isLoading = false;
              this.FilesList = [];
              this.current_page = 1;
              this.loading = false;
              this.finished = false;
              this.onLoad();
            } else {
              Toast(res.data.msg);
            }
          });
      }
    },
    comment() {
      this.dialogshow = true;
    },
    //归档任务
    guidang(item, val) {
      this.$axios
        .post("/task/taskdelOrcom", {
          corp_id: this.$store.state.userData.cid,
          userid: this.$store.state.userData.userid,
          xmid: this.$store.state.userData.Selecteddata.id,
          proname: this.$store.state.userData.Selecteddata.name,
          tasktitle: item.tasktitle,
          id: item.id,
          status: val,
        })
        .then((res) => {
          if (res.data.code == 200) {
            Toast(res.data.msg);
            this.isLoading = false;
            this.FilesList = [];
            this.current_page = 1;
            this.loading = false;
            this.finished = false;
            this.onLoad();
          } else {
            Toast(res.data.msg);
          }
        });
    },

    // 完成任务

    complete(item, val) {
      Dialog.confirm({
        title: "是否归档任务",
        message: "一旦归档将无法操作",
      })
        .then(() => {
          //归档
          this.guidang(item, 3);
        })
        .catch(() => {
          this.$axios
            .post("/task/taskdelOrcom", {
              corp_id: this.$store.state.userData.cid,
              userid: this.$store.state.userData.userid,
              xmid: this.$store.state.userData.Selecteddata.id,
              proname: this.$store.state.userData.Selecteddata.name,
              tasktitle: item.tasktitle,
              id: item.id,
              status: val,
            })
            .then((res) => {
              if (res.data.code == 200) {
                Toast(res.data.msg);
                this.isLoading = false;
                this.FilesList = [];
                this.current_page = 1;
                this.loading = false;
                this.finished = false;
                this.onLoad();
              } else {
                Toast(res.data.msg);
              }
            });
        });
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
    this.taskliststatus = this.$store.state.userData.taskliststatus;
  },
  mounted() {},
};
</script>
<style lang='less' >
#tasklistnew {
  .inputdiv {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    width: 100%;

    background-color: #e6e6e6;
    .van-search {
      width: 100%;
      width: 100%;

      .van-search__action {
        font-size: 0.6rem;
        line-height: 1rem;
        .van-button {
          height: 1.8rem;
          .van-button__text {
            font-size: 0.7rem;
          }
        }
      }
      .van-search__action {
        .van-button--normal {
          border-radius: 0.33rem;
          .van-button__text {
            color: #409eff;
          }
        }
      }
      .van-search__content--round {
        border-radius: 0.33rem;
      }
      .van-search__content {
        .van-cell {
          height: 2rem;
          line-height: 1.8rem;
          font-size: 0.9rem;
          .van-field__left-icon {
            .van-icon {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
  .dialog {
    .van-dialog__content {
      padding: 0 0.5rem;
      .van-cell {
        .van-cell__value {
          .van-field__body {
            .van-field__control {
              padding: 0.33rem !important;
              height: 5rem !important;
              font-size: 1rem !important;
            }
            .van-field__right-icon {
              .van-icon {
                font-size: 2rem !important;
                color: #409efe;
              }
            }
          }
        }
      }
    }
  }

  // padding: 0.33rem;
  .renwucontent {
    margin-top: 0.67rem;
    background-color: #fff;
    padding: 0.33rem 20px;
    border-radius: 0.33rem;
    .btem {
      display: flex;
      margin-left: 0.33rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .btem1 {
        max-width: 50%;
        font-size: 0.83rem;
        overflow: hidden;
        color: #606266;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btem2 {
        max-width: 50%;
        font-size: 0.83rem;
        color: #606266;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item_heard {
      display: flex;
      justify-content: space-between;
      line-height: 2.33rem;
      font-size: 1rem;
      color: #3b4045;
      align-items: center;
      .item_name {
        margin: 0.33rem 0;
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item_img {
        display: flex;
        align-items: center;
        font-size: 1.17rem;
        img {
          border-radius: 50%;
          width: 2.33rem;
          height: 2.33rem;
          margin-right: 0.33rem;
        }
        span {
          font-size: 0.83rem;
          display: inline-block;
          border-radius: 50%;
          width: 2.33rem;
          height: 2.33rem;
          line-height: 2.33rem;
          text-align: center;
          background-color: #387ef5;
          color: #fff;
        }
        .item_img_title {
          line-height: 1.17rem;
          .item_img_title1 {
            color: #000000;
            font-weight: 600;
          }

          .item_img_title2 {
            font-size: 0.67rem;
            color: #9f99a1;
          }
        }
      }
    }
    .item_time {
      font-size: 1rem;
      color: #3b4045;
      margin: 0.33rem 0;
    }
    .fenge {
      border-bottom: 0.03rem solid #eeeff3;
      margin-top: 0.5rem;
    }
    .item_bottom {
      padding: 0.5rem;
      display: flex;
      color: #485985;
      align-items: center;
      span {
        display: flex;
        align-items: center;
      }
    }
  }
  // .renwucontent {
  //     margin-top: 0.67rem;
  //     background-color: #fff;
  //     padding: 0.33rem 20px;
  //     border-radius: 0.33rem;
  //     .item_heard {
  //         display: flex;
  //         justify-content: space-between;
  //         line-height: 2.33rem;
  //         font-size: 0.83rem;
  //         color: #3b4045;
  //         align-items: center;
  //         .item_name {
  //             margin: 0.33rem 0;
  //             width: 60%;
  //             overflow: hidden;
  //             text-overflow: ellipsis;
  //             white-space: nowrap;
  //         }
  //         .item_img {
  //             display: flex;
  //             align-items: center;
  //             font-size: 1rem;
  //             img {
  //                 width: 1.33rem;
  //                 height: 1.33rem;
  //                 margin-right: 0.33rem;
  //             }
  //         }
  //     }
  //     .item_time {
  //         font-size: 0.83rem;
  //         color: #e6e6e6;
  //         margin: 0.33rem 0;
  //     }
  // }
  .van-popup--bottom {
    .options {
      text-align: center;
      font-size: 1.27rem;
      font-weight: 600;
      margin: 0.83rem 0;
      color: #606266;
    }
  }
  .addrenwu {
    position: fixed;
    width: 30%;
    bottom: 15%;
    left: 35%;
    text-align: center;
    img {
      width: 3.33rem;
      height: 3.33rem;
    }
  }
}
</style>

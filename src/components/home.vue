<template>
  <div id="home">
    <Loadding v-if="gifshow"></Loadding>
    <!-- <div
            class="gifdiv"
            v-if="gifshow"
        >
            <img
                src="https://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/QWC4ZBYc5K1594893730810.gif"
                alt
            />
        </div> -->
    <div class="dialogfont" v-if="stoptime">
      <div style="text-align: center">
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/XecN6mrb6Z1616381892937.png"
          alt=""
        />
      </div>
      <h2 style="text-align: center; color: #333333; margin: 0.67rem 0 20px 0">
        版本到期提醒
      </h2>
      <div class="divfont1" v-if="cestatus == 0">
        您公司于<span style="color: #409eef">{{ dtime }}</span
        >开始试用的筑快OA已到期，感谢您的支持和信任，请您及时购买正式版。
      </div>
      <div class="divfont1" v-if="cestatus == 1">
        您公司于<span style="color: #409eef">{{ dtime }}</span
        >开始购买的筑快OA已到期，感谢您的支持和信任，请您及时续费购买。
      </div>

      <!-- 贵公司（{{
                    corp_name
                }}）的使用期已于{{dtime }}到期，
                若需继续使用，请前去应用市场购买，给您带来的不便请谅解！如有疑问，
                请联系客服：0371-56775558 -->
    </div>
    <div class="b_byn">
      <div class="sureBtnnew" @click="goumai">立即续费</div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import Loadding from "./common/loadding.vue";
import { Toast } from "vant";
import qs from "qs";
import toast$ from "dingtalk-jsapi/api/device/notification/toast";
export default {
  name: "home",
  components: { Loadding },
  data() {
    return {
      newall: {
        tmpname: "全部",
        value: "全部",
      },
      cestatus: "",
      corp_name: "",
      dtime: "",
      kt_time: "",
      access_token: "",

      gifshow: true,
      stoptime: false,
      // cid: 'dingea47c602975497f935c2f4657eb6378f',
      cid: "",
      userId: "",
      code: "",
    };
  },
  methods: {
    dingding() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    goumai() {
      dd.ready(function () {
        dd.biz.util.openLink({
          url: "https://h5.dingtalk.com/open-market/share.html?shareGoodsCode=D34E5A30A9AC7FC6AD8246C12A831FFADCFBB31D7EEA9E8598502A737A061B04656DFF9391876E2A&token=a97dac6e06de493caea89c7d85f9259c&shareUid=DC31C2D1600683EB6571C55DCF2818F9#/", //要打开链接的地址
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
      });
    },
    //测试
    framework1() {
      const _this = this;
      _this.$store.commit("setCid", "dingea47c602975497f935c2f4657eb6378f");
      _this.$store.commit("setUid", "1955162522782338");
      _this.$store.commit("setValue", "公司名");
      _this.$store.commit("setUrid", "5");
      _this.$store.commit("setName", "张欢欢");
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    framework() {
      const _this = this;

      if (_this.GetQueryString("corpid")) {
        var cid = _this.GetQueryString("corpid");
        console.log(cid);
        console.log("手机");
      } else {
        // var cid = 'dinga090000f57c90b3eee0f45d8e4f7c288'; //筑快测试
        var cid = "dingea47c602975497f935c2f4657eb6378f"; //筑快
        // var cid = 'ding0ae1ff624a5a383e35c2f4657eb6378f';//燃气
        console.log("电脑");
      }
      _this.cid = cid;
      _this.$store.commit("setCid", cid);
      console.log("123");
      dd.ready(function () {
        console.log("1234");
        dd.runtime.permission.requestAuthCode({
          corpId: cid, // 企业id

          onSuccess: function (info) {
            console.log("12345", info);

            var code = info.code; // 通过该免登授权码可以获取用户身份             console.log(code)
            _this.code = code;
            _this.$axios
              .post("/user/userinfo", {
                code: code,
                corp_id: cid,
              })
              .then((res) => {
                console.log("ews", res);
                // _this.$router.push({ path: '/application' });
                if (res.data.code == 1) {
                  //userid
                  _this.$store.commit(
                    "setuserid",
                    res.data.data.content.userid
                  );
                  //name
                  _this.$store.commit(
                    "setusername",
                    res.data.data.content.name
                  );
                  _this.$store.commit(
                    "setcompany",
                    res.data.data.content.company
                  );

                  //头像
                  _this.$store.commit(
                    "setavatarurl",
                    res.data.data.content.avatar
                  );

                  _this.$store.commit("setddtype", res.data.data.content.type); //判断是不是个人版   个人版 2  企业版 1
                  _this.$store.commit(
                    "setmaincorpid",
                    res.data.data.content.mainCorpId
                  );

                  // _this.$store.commit(
                  //     'setcropname',
                  //     res.data.data.content.avatar
                  // );

                  // _this.$router.push({
                  //     path: '/application'
                  // });
                  _this.getTypeCreate();
                  _this.getreateRoles();
                  if (res.data.data.content.jobnumber == 0) {
                    // _this.$router.replace({
                    //   path: "/first",
                    // });
                  } else {
                    _this.$router.replace({
                      path: "/application",
                    });
                  }
                } else if (res.data.code == 2) {
                  _this.$router.replace({
                    path: "/wuquanxian",
                    query: {
                      zhuname: "",
                    },
                  });
                  // Toast(res.data.msg);
                } else if (res.data.code == 3) {
                  _this.kt_time = res.data.data.kt_time;
                  _this.dtime = res.data.data.time;
                  _this.corp_name = res.data.data.name;
                  _this.cestatus = res.data.data.status;
                  _this.gifshow = false;
                  _this.stoptime = true;

                  // Toast(res.data.msg);
                } else if (res.data.code == 0) {
                  _this.$router.push({
                    path: "/quancode",
                    query: {
                      msg: res.data.msg,
                    },
                  });
                }
              });
          },
        });
      });
    },
    login() {
      console.log("123456");
      const _this = this;
      _this.$axios
        .post("/user/userinfo", {
          corp_id: "dinga090000f57c90b3eee0f45d8e4f7c288",
          code: "",
        })
        .then((res) => {
          console.log("123456", res.data.data.content.userid);
          if (res.data.code == 1) {
            //userid
            _this.$store.commit("setuserid", res.data.data.content.userid);
            //name
            _this.$store.commit("setusername", res.data.data.content.name);
            _this.$store.commit("setcompany", res.data.data.content.company);

            //头像
            _this.$store.commit("setavatarurl", res.data.data.content.avatar);

            _this.$store.commit("setddtype", res.data.data.content.type); //判断是不是个人版   个人版 2  企业版 1
            _this.$store.commit(
              "setmaincorpid",
              res.data.data.content.mainCorpId
            );

            // _this.$store.commit(
            //     'setcropname',
            //     res.data.data.content.avatar
            // );

            // _this.$router.push({
            //     path: '/application'
            // });
            _this.getTypeCreate();
            _this.getreateRoles();
            if (res.data.data.content.jobnumber == 0) {
              //   _this.$router.replace({
              //     path: "/first",
              //   });
            } else {
              _this.$router.replace({
                path: "/application",
              });
            }
          } else if (res.data.code == 2) {
            _this.$router.replace({
              path: "/wuquanxian",
              query: {
                zhuname: "",
              },
            });
            // Toast(res.data.msg);
          } else if (res.data.code == 3) {
            _this.kt_time = res.data.data.kt_time;
            _this.dtime = res.data.data.time;
            _this.corp_name = res.data.data.name;
            _this.cestatus = res.data.data.status;
            _this.gifshow = false;
            _this.stoptime = true;

            // Toast(res.data.msg);
          } else if (res.data.code == 0) {
            _this.$router.push({
              path: "/quancode",
              query: {
                msg: res.data.msg,
              },
            });
          }
        });
    },

    // getmainCorpId(userId, accessToken) {
    //     this.$axios
    //         .get(
    //             'https://api.dingtalk.com/v1.0/appMarket/personalExperiences?userId=' +
    //                 userId,

    //             {
    //                 headers: {
    //                     accessToken
    //                 }
    //             }
    //         )
    //         .then((res) => {
    //             alert('token' + JSON.stringify(res));
    //             this.$store.commit('setmaincorpid', res.mainCorpId);
    //         });
    // },
    getTypeCreate() {
      this.$axios.post("/project/supplierTypeCreate").then((res) => {});
    },
    getreateRoles() {
      this.$axios.post("/user/createRoles").then((res) => {});
    },
    // getxmList() {
    //     this.$axios
    //         .post('/project/projectInfoRegisterZbList')
    //         .then((res) => {
    //             let xmlist = res.data.data;
    //             this.$store.commit('setSelecteddata', xmlist[0]);
    //             this.$store.commit('setlcxminfo', xmlist[0]);
    //         });
    // },
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
            // this.workList = res.data.data;
            this.$store.commit("setworklist", res.data.data);
          } else {
            Toast(res.data.msg);
          }
        });
    },
    changeKeys(arr, key) {
      let newArr = [];
      arr.forEach((item) => {
        let obj = {};
        for (var i = 0; i < key.length; i++) {
          obj[key[i]] = item[Object.keys(item)[i]];
        }
        newArr.push(obj);
      });
      return newArr;
    },
    //获取项目状态
    getxmstatus() {
      this.$axios.post("/spread/projectStatus").then((res) => {
        this.$store.commit("setstatusDtat", res.data.data);
      });
    },
    //获取项目类型
    getxmtype() {
      this.$axios.post("/spread/projectType").then((res) => {
        let newarr = this.changeKeys(res.data.data, ["tmpname", "value"]);
        newarr.unshift(this.newall);
        newarr.map((item) => {
          return item.tmpname;
        });
        this.$store.commit("settypeDtat", newarr);
        console.log(newarr);
      });
    },
  },
  mounted() {},
  created() {
    const that = this;

    if (process.env.VUE_APP_AUTH_CODE == 666) {
      Toast("测试环境");
      //   that.$store.commit("setCid", "dinga090000f57c90b3eee0f45d8e4f7c288");
        that.$store.commit("setCid", "ding958cdfb717ce33bb35c2f4657eb6378f");
        that.login();
    //   that.framework();
    } else {
      that.framework();
    }
    that.dingding();
    // that.getxmList();
    that.getxmstatus();
    that.getxmtype();

    // this.getList();
    // that.$router.push({ path: '/application' });
  },
};
</script>
<style lang="less">
html,
body {
  width: 100%;
  height: 100%;

  #home {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: fixed;
    z-index: 9999;
    .gifdiv {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 16.67rem;
        height: 16.67rem;
      }
    }
    .dialogfont {
      width: 80%;
      margin: 3.33rem auto 0;
      img {
        width: 16rem;
      }
      .divfont1 {
        width: 80%;
        margin: auto;
        font-size: 1.11rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #999999;
        line-height: 1.84rem;
      }
    }
    .b_byn {
      position: fixed;
      bottom: 1rem;
      width: 100%;
      .sureBtnnew {
        width: 80%;
        margin: auto;
        height: 3.49rem;
        background: #639efc;
        box-shadow: 0rem 0rem 1rem 0rem rgba(99, 158, 252, 0.69);
        border-radius: 2rem;
        text-align: center;
        font-size: 1.38rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 3.49rem;
      }
    }
  }
}
</style>

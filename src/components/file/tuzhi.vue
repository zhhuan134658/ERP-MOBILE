<template>
  <div id="tuzhi">
    <!--项目搜索  -->
    <div class="inputdiv">
      <van-search
        v-model="Searchname"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
      >
        <div slot="action">
          <van-button @click="onLoad" type="default">搜索</van-button>
          <van-button v-if="caozuoshow" @click="operating" type="default"
            >操作</van-button
          >
        </div>
      </van-search>
    </div>

    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="file-content">
        <van-checkbox-group
          v-model="delet"
          direction="horizontal"
          @change="checkeddata2"
        >
          <div
            style="display: flex; width: 100%"
            v-for="(item, index) in FilesList"
          >
            <van-checkbox shape="square" :name="item"></van-checkbox>

            <div
              class="xiangmu"
              v-if="item.type == 'file'"
              @click="infile(item)"
            >
              <div class="xmdiv xmimg">
                <img :src="folderurl" alt />
              </div>
              <div class="xmdiv xmjindu">
                <div class="xmjindu-item">
                  <div
                    class="xmjindu-item-font"
                    style="display: flex; align-items: center; height: 100%"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="xiangmu" v-else>
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
                  <div class="xmjindu-item-font">
                    {{ item.name }}
                  </div>
                  <div class="xmjindu-item-font1">
                    {{ item.time }} {{ item.size }}
                  </div>
                </div>
              </div>
              <div class="xmimg-shoucang">
                <div class="img" @click="checkimg(item)">
                  <img
                    :src="item.collect == '1' ? iconList.aurl : iconList.url"
                    alt
                  />
                </div>
              </div>
            </div>
          </div>
        </van-checkbox-group>
      </div>
    </van-list>

    <Empty v-if="Emptyshow"></Empty>
    <div class="addrenwu" @click="upcreat" v-if="caozuoshow && upshow">
      <img
        src="http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/wjTTiyEM2R1598253823583.png"
        alt
      />
    </div>
    <van-popup position="bottom" v-model="popupbottpmshow">
      <el-upload
        class="upload-demo"
        action
        :http-request="httpUpload"
        :before-upload="beforeFilesUpload"
        multiple
        :limit="1000"
        :file-list="fileList"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :show-file-list="false"
      >
        <van-button type="info">上传文件</van-button>
      </el-upload>
      <div class="btondiv">
        <van-button type="warning" @click="creatfiles">新建文件夹</van-button>
      </div>
    </van-popup>
    <van-popup position="top" v-model="popupshow">
      <div v-if="guifanshow">
        <van-button type="info" @click="downflies">下载文件</van-button>
      </div>
      <div v-else>
        <van-button type="info" @click="downflies">下载文件</van-button>
        <van-button type="info" @click="renameflies">重命名</van-button>
        <van-button type="info" v-if="quanxianshow" @click="authorityflies"
          >权限管理</van-button
        >
        <van-button type="warning" @click="deledefiles">删除文件</van-button>
        <van-button type="danger" @click="movefiles">移动文件</van-button>
      </div>
    </van-popup>
    <van-dialog
      @confirm="suren"
      @cancel="caclename"
      v-model="renameshow"
      title="文件夹重命名"
      show-cancel-button
    >
      <van-field v-model="textname" placeholder="请输入文件名" />
    </van-dialog>
    <van-dialog
      @confirm="queren"
      @cancel="quxiao"
      v-model="dialogshow"
      title="新建文件夹"
      show-cancel-button
    >
      <van-field v-model="text" placeholder="请输入文件名" />
    </van-dialog>
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
      upJIA: "",
      upshow: true,
      Emptyshow: false,
      guifanshow: false,
      caozuoshow: true,
      quanxianshow: true,
      downLoadjudg: [],
      text: "",
      dialogshow: false,
      renameshow: false,
      textname: "",
      //
      g_object_name: "",
      g_object_name_type: "random_name",
      urlHost: "",
      policyBase64: "",
      accessid: "",
      signature: "",
      expire: 0,
      callbackbody: "",
      key: "",
      host: "",
      uploadType: 1,
      bimHost: "",
      bimObjectKey: "",
      bimPolicy: "",
      bimOSSAccessKeyId: "",
      bimCallback: "",
      bimSignature: "",
      viewUpload: true, //上传按钮是否可见
      filesPower: this.$route.query.filesPower,
      preViewVisible: false,
      viewToken: "",
      //
      fileData: "",
      queryid: "",
      routrval: "",
      delet: [],
      popupshow: false,
      popupbottpmshow: false,
      Searchname: "",
      iconurl: "",
      folderurl:
        "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/kPzaQyH4Q21599188211884.png",
      iconList: {
        url: "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/QKADdmM8Kc1594802787773.png",
        aurl: "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/ZeeAEG5MnN1594802810819.png",
      },

      deledrid: [],

      FilesList: [
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
      isLoading: false,
      loading: false, // 当loading为true时，转圈圈
      current_page: 1,
      loading: false, // 当loading为true时，转圈圈
      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -

      typeid: "",
      currentPageid: "",
      typeId: "",
      //
      queryid: "",
      editPeople: [],
    };
  },
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "文件夹", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    // 上传文件
    //上传
    httpUpload(reg) {
      const _this = this;

      if (_this.uploadType == 2) {
        _this.loading = true;
        _this.$axios
          .post("/cy_xiezhu/GetBimFacePolicy", {
            name: reg.file.name,
          })
          .then((res) => {
            if (res.data.code == "success") {
              let newData = res.data.data;
              _this.bimHost = newData.host;
              _this.bimObjectKey = newData.objectKey;
              _this.bimPolicy = newData.policy;
              _this.bimOSSAccessKeyId = newData.accessId;
              _this.bimCallback = newData.callbackBody;
              _this.bimSignature = newData.signature;
              _this.loading = true;
              _this.bimUpload(reg.file, 2, reg);
            } else {
              _this.loading = false;
            }
          });
      } else if (_this.uploadType == 1) {
        _this.loading = true;
        _this.$axios
          .post("/ossapi/sign/get", {
            corp_id: _this.$store.state.userData.cid,
          })
          .then(
            function (response) {
              _this.urlHost = response.data.host;
              let obj = response.data;

              _this.host = obj["host"];
              _this.policyBase64 = obj["policy"];
              _this.accessid = obj["accessid"];
              _this.signature = obj["signature"];
              _this.expire = parseInt(obj["expire"]);
              _this.callbackbody = obj["callback"];
              _this.key = obj["dir"];
              _this.loading = true;
              _this.set_upload_param(reg.file.name, true, reg.file, reg);
            },
            function (err) {
              _this.loading = false;
              console.log(err);
            }
          );
      }
    },
    //上传前验证
    beforeFilesUpload(file) {
      const _this = this;

      _this.loading = true;
      //判断上传

      let bimType = file.name.substring(file.name.lastIndexOf(".") + 1);

      if (file.type) {
        //图片
        _this.uploadType = 1;
      }
      // if (
      //     bimType == '3DS' ||
      //     bimType == '3ds' ||
      //     bimType == 'dwg' ||
      //     bimType == 'dae' ||
      //     bimType == 'dgn' ||
      //     bimType == '3dm' ||
      //     bimType == 'rvt' ||
      //     bimType == 'rfa' ||
      //     bimType == 'ifc' ||
      //     bimType == 'skp' ||
      //     bimType == 'nwc' ||
      //     bimType == 'nwd' ||
      //     bimType == 'dgn' ||
      //     bimType == 'stp' ||
      //     bimType == 'stl' ||
      //     bimType == 'dxf' ||
      //     bimType == 'obj' ||
      //     bimType == 'ply' ||
      //     bimType == 'igms' ||
      //     bimType == 'GDQ' ||
      //     bimType == 'zip' ||
      //     bimType == 'ggj' ||
      //     bimType == 'gmp'
      // )
      else {
        _this.uploadType = 2;
      }

      //大于1G
      if (file.size / 1024 / 1024 > 1024) {
        _this.loading = false;
        _this.$message.warning(`当前文件过大`);
        return false;
      }
      // _this.viewClose = true;
      // let newDom = document.getElementsByClassName('el-upload-list')[0];
      // newDom.style.display = 'block';
    },
    //超出上传数量
    handleExceed(files) {
      this.loading = false;
      this.$message.warning(
        `当前限制选择 6 个文件，本次选择了 ${files.length} 个文件`
      );
    },
    //上传成功
    handleSuccess(response, file, fileList) {
      // this.fileList = [];
      this.$message.success(`${file.name} 上传成功`);
    },
    //BIM上传
    bimUpload(file, type, reg) {
      const _this = this;
      let newData = new FormData();
      if (type == 2) {
        newData.append("name", file.name);
        newData.append("key", _this.bimObjectKey);
        newData.append("policy", _this.bimPolicy);
        newData.append("OSSAccessKeyId", _this.bimOSSAccessKeyId);
        newData.append("callback", _this.bimCallback);
        newData.append("signature", _this.bimSignature);
        newData.append("success_action_status", 200);
        newData.append("file", file);
        _this.$axios
          .post("" + _this.bimHost + "", newData, {
            onUploadProgress: (progressEvent) => {
              let percent =
                ((progressEvent.loaded / progressEvent.total) * 100) | 0;
              //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
              reg.onProgress({ percent: percent });
            },
          })
          .then((res) => {
            if (res.data.code == "success") {
              _this.saveFiles(res.data.data, 2);
            } else {
              _this.loading = false;
            }
          });
      } else if (type == 1) {
        newData.append("name", file.name);
        newData.append("key", _this.g_object_name);
        newData.append("policy", _this.policyBase64);
        newData.append("OSSAccessKeyId", _this.accessid);
        newData.append("success_action_status", "200");
        newData.append("callback", _this.callbackbody);
        newData.append("signature", _this.signature);
        newData.append("file", file);
        _this.$axios
          .post("" + _this.host + "", newData, {
            onUploadProgress: (progressEvent) => {
              let percent =
                ((progressEvent.loaded / progressEvent.total) * 100) | 0;
              //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
              reg.onProgress({ percent: percent });
            },
          })
          .then((res) => {
            if (res.data.success == "1") {
              let fileData = {};
              fileData.length = file.size;
              fileData.name = file.name;
              _this.fileData = fileData;

              _this.saveFiles(fileData, 1, newData.get("key"));
            } else {
            }
          });
      }
    },
    handleCurrentChange(val) {
      this.current_page = val;
      // this.onLoad();
      this.FilesList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;

      this.onLoad(this.queryid);
    },
    //保存上传成功的文件
    saveFiles(upData, type, newKey) {
      const _this = this;
      let upType = "OSS";
      let upUrl;
      if (type == "1") {
        upUrl = _this.host + "/" + newKey;
      } else if (type == "2") {
        upUrl = upData.fileId;
      }
      _this.fileData = upUrl;
      _this.$axios
        .post("/cy_xiezhu/SaveFile", {
          corp_id: _this.$store.state.userData.cid,
          userid: _this.$store.state.userData.userid,
          xmid: _this.$store.state.userData.Selecteddata.id,
          type: upType,
          admin: _this.$store.state.userData.admin,
          url: upUrl,
          number: upData.length,
          name: upData.name,
          // quanxian: _this.filesPower, //共享文件为1    只有私人文件为0
          quanxian: "", //共享文件为1    只有私人文件为0
          filetype: _this.$store.state.userData.typeId, //文件夹id
          parentid: _this.queryid,
        })
        .then((res) => {
          if (res.data.code === 200) {
            _this.loading = false;
            _this.popupbottpmshow = false;
            _this.FilesList = [];
            _this.current_page = 1;
            _this.loading = false;
            _this.finished = false;

            _this.onLoad(_this.queryid);

            // _this.onLoad();
          } else {
            _this.loading = false;
          }
        });
    },
    get_signature() {
      const _this = this;
      _this.$axios.post("/ossapi/sign/get").then(
        function (response) {
          _this.urlHost = response.data.host;
          let obj = response.data;

          _this.host = obj["host"];
          _this.policyBase64 = obj["policy"];
          _this.accessid = obj["accessid"];
          _this.signature = obj["signature"];
          _this.expire = parseInt(obj["expire"]);
          _this.callbackbody = obj["callback"];
          _this.key = obj["dir"];
          return true;
        },
        function (err) {
          console.log(err);
        }
      );
    },
    random_string(len) {
      var len = len || 32;
      var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var maxPos = chars.length;
      var pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd + new Date().getTime();
    },
    get_suffix(filename) {
      let pos = filename.lastIndexOf(".");
      let suffix = "";
      if (pos != -1) {
        suffix = filename.substring(pos);
      }
      return suffix;
    },
    calculate_object_name(filename) {
      const _this = this;
      if (_this.g_object_name_type == "local_name") {
        _this.g_object_name += "${filename}";
      } else if (_this.g_object_name_type == "random_name") {
        let suffix = _this.get_suffix(filename);
        _this.g_object_name = _this.key + _this.random_string(10) + suffix;
        // hostU = g_object_name;
      }
      return "";
    },
    get_uploaded_object_name(filename) {
      const _this = this;
      if (_this.g_object_name_type == "local_name") {
        tmp_name = _this.g_object_name;
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name;
      } else if (_this.g_object_name_type == "random_name") {
        return _this.g_object_name;
      }
    },
    set_upload_param(filename, ret, regFile, reg) {
      const _this = this;
      if (ret == false) {
        ret = _this.get_signature();
      }
      _this.g_object_name = _this.key;
      if (filename != "") {
        let suffix = _this.get_suffix(filename);
        _this.calculate_object_name(filename);
      }
      // hostU = _this.g_object_name;
      let new_multipart_params = new FormData();
      new_multipart_params.append("key", _this.g_object_name);
      new_multipart_params.append("policy", _this.policyBase64);
      new_multipart_params.append("OSSAccessKeyId", _this.accessid);
      new_multipart_params.append("success_action_status", "200");
      new_multipart_params.append("callback", _this.callbackbody);
      new_multipart_params.append("signature", _this.signature);

      _this.bimUpload(regFile, 1, reg);
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
      // window.location.href = url;
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
    // /cy_xiezhu/UpdateFile
    //权限管理
    authorityflies() {
      // this.$router.push({ path: '/Organization' });
      // this.$router.push({ path: '/wenjianguanli' });
      if (this.downLoadjudg.length == 0) {
        Toast("请选择文件");
      } else if (this.downLoadjudg.length > 1) {
        Toast("请选择一个的文件，请勿多选");
      } else if (this.downLoadjudg[0].type == "file") {
        this.$router.push({
          path: "/wenjianguanli",
        });
      } else {
        this.$router.push({
          path: "/image",
        });
      }
    },
    //重命名
    renameflies() {
      if (this.downLoadjudg.length == 0) {
        Toast("请选择文件");
      } else if (this.downLoadjudg.length > 1) {
        Toast("请选择一个的文件，请勿多选");
      } else {
        this.renameshow = true;
      }
    },
    suren() {
      if (this.textname == "") {
        Toast("文件名不能为空");
      } else {
        axios
          .post("/cy_xiezhu/UpdateFile", {
            corp_id: this.$store.state.userData.cid,
            userid: this.$store.state.userData.userid,
            xmid: this.$store.state.userData.Selecteddata.id,
            admin: this.$store.state.userData.admin,
            fid: this.downLoadjudg[0].id,
            name: this.textname,
            quanxian: "",
          })
          .then((res) => {
            if (res.data.code == 200) {
              Toast(res.data.msg);
              this.FilesList = [];
              this.current_page = 1;
              this.loading = false;
              this.finished = false;

              this.onLoad(this.queryid);
              this.popupshow = false;
            }
          });
      }
    },
    caclename() {
      this.text = "";
    },

    //下载
    downflies() {
      if (this.downLoadjudg.length == 0) {
        Toast("请选择要下载的文件");
      } else if (this.downLoadjudg.length > 1) {
        Toast("请选择一个的文件，请勿多选");
      } else if (this.downLoadjudg[0].type == "file") {
        Toast("请选择文件，请勿选择文件夹");
      } else {
        this.downLoad(this.downLoadjudg[0]);
      }
    },
    downLoad(row) {
      const _this = this;
      console.log(row.url);

      if (row.type == "bimface") {
        _this.$axios
          .post("/cy_xiezhu/GetBimFaceFileUrl", {
            fileId: row.url,
          })
          .then((res) => {
            if (res.data.code == "success") {
              window.location.href = res.data.data;
              // dd.ready(function () {
              //     dd.biz.util.downloadFile({
              //         url: res.data.data, //要下载的文件的url
              //         name: row.name, //定义下载文件名字
              //         onProgress: function (msg) {
              //             console.log('8888+++' + msg);
              //         },
              //         onSuccess: function (result) {},
              //         onFail: function () {},
              //     });
              // });
            } else {
              Toast(res.data.msg);
            }
          });
      } else if (row.type == "OSS") {
        let newType = row.name.substring(row.name.lastIndexOf(".") + 1);
        if (
          newType == "png" ||
          newType == "jpg" ||
          newType == "jpeg" ||
          newType == "gif" ||
          newType == "bmp"
        ) {
          _this.previewPic(row.url);
        } else {
          Toast("手机端暂不支持下载文件，请在电脑端下载");
          // window.location.href = row.url;
        }

        // dd.ready(function () {
        //     dd.biz.util.previewImage({
        //         urls: [row.url], //图片地址列表
        //         current: row.url, //当前显示的图片链接
        //         onSuccess: function (result) {
        //             /**/
        //         },
        //         onFail: function (err) {},
        //     });
        // });
      }
    },

    // 55555555555555555555555555555555555555555555555555555555555555555555
    checkeddata2(e) {
      console.log(e);
      this.downLoadjudg = e;
      this.deledrid = e.map((item) => {
        if (!item.id) return "";
        return item.id;
      });
      this.$store.commit("setmanagementList", e);
      if (this.downLoadjudg[0].quanxian == 3) {
        Toast("所选文件为固有文件，只能下载");
        this.guifanshow = true;
      }
      for (var i = 0; i < this.downLoadjudg; i++) {
        if (this.downLoadjudg[i].quanxian == 3) {
          Toast("所选文件为固有文件，只能下载");
          this.guifanshow = true;
        }
      }
    },
    deunique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },

    //
    // onRefresh() {
    //     setTimeout(() => {
    //         // 重新初始化这些属性
    //         this.isLoading = false;
    //         this.myLFilesListist = [];
    //         this.current_page = 1;
    //         this.loading = false;
    //         this.finished = false;

    //         // 请求信息
    //         this.getInfo();
    //     }, 500);
    // },
    onLoad(parentid) {
      this.getInfo(parentid);
      this.loading = true;
    },
    getInfo(parentid) {
      axios
        .post("/cy_xiezhu/FileList", {
          type: this.$store.state.userData.typeId,
          corp_id: this.$store.state.userData.cid,
          userid: this.$store.state.userData.userid,
          xmid: this.$store.state.userData.Selecteddata.id,
          admin: this.$store.state.userData.admin,

          parentid: this.queryid,
          name: this.Searchname,

          current_page: this.current_page,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            if (!this.Searchname) {
              if (res.data.content.list.length > 0) {
                this.FilesList = this.deunique(
                  this.FilesList.concat(res.data.content.list)
                ); //追加数据
                // this.FilesList.push(...res.data.content.list);
              } else {
                this.FilesList = res.data.content.list;
                // this.Emptyshow = true;
              }
            } else {
              this.FilesList = [];
              this.FilesList = this.deunique(res.data.content.list); //追加数据
            }
            // page
            if (
              this.current_page == res.data.content.page ||
              res.data.content.list.length == 0
            ) {
              //数据全部加载完成
              this.finished = true;
            } else {
              this.current_page += 1;
              this.finished = false;
            }
          }
        });
    },
    operating() {
      this.popupshow = true;
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
    // 收藏
    checkimg(fileinfo) {
      if (fileinfo.collect == "1") {
        axios
          .post("/cy_xiezhu/DeleteCollect", {
            userid: this.$store.state.userData.userid,
            xmid: this.$store.state.userData.Selecteddata.id,
            sid: fileinfo.sid,
            admin: this.$store.state.userData.admin,
          })
          .then((res) => {
            if (res.data.code === 200) {
              Toast(res.data.msg);
              this.FilesList = [];
              this.current_page = 1;
              this.loading = false;
              this.finished = false;

              this.onLoad(this.queryid);
            } else {
              Toast(res.data.msg);
            }
          });
      } else if (fileinfo.collect == "0") {
        axios
          .post("/cy_xiezhu/CreatedCollect", {
            fid: fileinfo.id,
            admin: this.$store.state.userData.admin,
            corp_id: this.$store.state.userData.cid,
            userid: this.$store.state.userData.userid,
            xmid: this.$store.state.userData.Selecteddata.id,
          })
          .then((res) => {
            if (res.data.code === 200) {
              Toast(res.data.msg);
              this.FilesList = [];
              this.current_page = 1;
              this.loading = false;
              this.finished = false;
              // this.FilesList  操作数组 删除元素 收藏

              this.onLoad(this.queryid);
            } else {
              Toast(res.data.msg);
            }
          });
      }
    },
    //移动文件
    movefiles() {
      if (this.deledrid.length == 0) {
        Toast("请选择要移动的文件");
      } else {
        this.$router.push({
          path: "/FileJiaGou",
          query: {
            moveid: this.deledrid,
          },
        });
      }
    },
    //新建文件集
    creatfiles() {
      this.dialogshow = true;
    },
    quxiao() {
      this.text = "";
    },
    queren() {
      if (this.text == "") {
        Toast("文件名不能为空");
      } else {
        axios
          .post("/cy_xiezhu/SaveFile", {
            corp_id: this.$store.state.userData.cid,
            userid: this.$store.state.userData.userid,
            xmid: this.$store.state.userData.Selecteddata.id,
            type: "file",
            url: " ",
            quanxian: "",
            name: this.text,
            filetype: this.$store.state.userData.typeId,
            parentid: this.queryid,
            admin: this.$store.state.userData.admin,
          })
          .then((res) => {
            if (res.data.code === 200) {
              this.dialogshow = false;
              this.FilesList = [];
              this.current_page = 1;
              this.loading = false;
              this.finished = false;

              this.onLoad(this.queryid);
              this.text = "";
              Toast("新建文件夹成功");
            } else {
              Toast("res.data.msg");
            }
          });
      }
    },

    //删除文件
    deledefiles() {
      if (this.deledrid.length == 0) {
        Toast("请选择要删除的文件");
      } else {
        const _this = this;
        _this.$axios
          .post("/cy_xiezhu/DeleteFile", {
            corp_id: _this.$store.state.userData.cid,
            xmid: _this.$store.state.userData.Selecteddata.id,
            admin: _this.$store.state.userData.admin,
            fids: _this.deledrid,
            userid: _this.$store.state.userData.userid,
          })
          .then((res) => {
            if (res.data.code === 200) {
              _this.popupshow = false;
              Toast(res.data.msg);
              _this.FilesList = [];
              _this.current_page = 1;
              _this.loading = false;
              _this.finished = false;
              _this.onLoad(this.queryid);
            } else {
              Toast(res.data.msg);
            }
          });
      }
    },
    //进入文件夹
    infile(item) {
      // if (item.quanxian == 3) {
      //     this.guifanshow = true;
      // }
      this.upJIA = item.quanxian;
      this.$store.commit("setparentid", item.id);
      this.FilesList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;

      // console.log(item);
      this.$router.push({
        path: "/tuzhi",
        query: { id: item.id, name: item.name },
      });
    },
    upcreat() {
      this.popupbottpmshow = true;
    },
  },
  mounted() {},
  created() {
    // this.FilesList = [];
    // this.current_page = 1;
    // this.loading = false;
    // this.finished = false;
    // this.queryid = this.$store.state.userData.typeId;
    // this.onLoad(this.$store.state.userData.typeId);
    // if (this.$store.state.userData.typeId == 5) {
    //     this.quanxianshow = false;
    // }
    // if (this.$store.state.userData.typeId == 7) {
    //     this.caozuoshow = false;
    // }
    // console.log(this.$store.state.userData.typeId);
    // this.$utils.checkding();
    // this.setTitle();
  },
  // activated() {},
  watch: {
    $route(to, from) {
      console.log(to);
      this.FilesList = [];
      this.current_page = 1;
      this.loading = false;
      this.finished = false;
      this.queryid = to.query.id;
      this.onLoad(to.query.id);
      if (this.queryid == 11 || this.queryid == 12 || this.queryid == 13) {
        this.upshow = false;
      } else {
        this.upshow = true;
      }
    },
    FilesList: {
      handler(val, oldval) {
        console.log(val.length);
        if (val.length > 0) {
          this.Emptyshow = false;
        } else {
          this.Emptyshow = true;
        }
      },
    },
    // upJIA(val, oldval) {
    //     if (val == 3) {
    //         this.upshow = false;
    //     } else {
    //         this.upshow = true;
    //     }
    // },
  },
};
</script>
<style lang="less">
#tuzhi {
  background-color: #fff;
  height: 100%;
  .van-pull-refresh {
    padding: 0.33rem;
  }
  .van-cell {
    font-size: 1.33rem;
    line-height: 1.83rem;
  }
  .van-popup {
    min-height: 15% !important;
  }

  .van-popup--top {
    min-height: 15% !important;
    padding: 0.67rem 0;
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
    text-align: center;
    .van-button--normal {
      width: 60%;
      height: 2.33rem;
      margin-top: 0.5rem;
      border-radius: 0.5rem;
      font-size: 1.1rem;
    }
  }
  .van-popup--bottom {
    display: flex;

    justify-content: space-around;
    align-items: center;
    .upload-demo {
      width: 50%;
      text-align: center;
      .el-upload {
        width: 100%;
        .van-button {
          width: 80%;
          height: 3.33rem;
          border-radius: 0.5rem;
          font-size: 1.1rem;
        }
      }
    }
    .btondiv {
      width: 50%;
      text-align: center;
      .van-button {
        width: 80%;
        height: 3.33rem;
        border-radius: 0.5rem;
        font-size: 1.1rem;
      }
    }
  }

  .inputdiv {
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    width: 100%;
    height: 3.33rem;
    background-color: #409efe;
    .van-search {
      width: 95%;
      background-color: #409efe !important;
      padding: 0;
      margin: 0.25rem;
      .van-search__action {
        font-size: 0.8rem;
        line-height: 1rem;
        background-color: #409efe;
        .van-button {
          height: 1.8rem;
          .van-button__text {
            font-size: 0.8rem;
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

  .file-content {
    background-color: #fff;
    .van-checkbox-group--horizontal {
      .van-checkbox--horizontal {
        width: 10%;
        margin-right: 0;
        .van-checkbox__icon {
          font-size: 1rem;
          margin-left: 0.67rem;
        }
        .van-checkbox__label {
          width: 95%;
        }
      }
    }
    .zuijin {
      font-size: 1.17rem;
      color: #ababab;
      height: 2.33rem;
      line-height: 2.33rem;
      padding-left: 0.67rem;
      border-bottom: 0.06rem solid #f6f6f6;
    }
    .xiangmu {
      border-bottom: 0.06rem solid #f6f6f6;
      height: 3.33rem;
      width: 90%;

      display: flex;
      background-color: #fff;
      .xmdiv {
        height: 100%;
      }
      .xmimg-delet {
        width: 10%;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center;
        font-size: 1.06rem;
        color: #f45457;
      }

      .xmimg {
        // width: 3.33rem;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center;

        img {
          border-radius: 0.33rem;
          width: 2.33rem;
          height: 2.33rem;

          color: #fff;
          line-height: 2.33rem;
          text-align: center;
        }
      }
      .xmjindu {
        width: 70%;
        margin-left: 0.5rem;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        .xmjindu-item {
          width: 100%;
          height: 3.33rem;

          .xmjindu-item-font {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 90%;
            font-size: 0.9rem;
            height: 50%;
            line-height: 1.67rem;
            color: #000;
          }
          .xmjindu-item-font1 {
            font-size: 0.77rem;
            height: 45%;
            line-height: 1.67rem;
            color: #555555;
          }
        }
      }
    }
  }
  .tbutton {
    text-align: center;
    position: fixed;
    bottom: 5rem;
    width: 100%;
    img {
      width: 3.33rem;
      height: 3.33rem;
    }
  }
  .xmimg-shoucang {
    width: 15%;
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center;
    img {
      width: 1.67rem;
      height: 1.67rem;

      line-height: 1.67rem;
      text-align: center;
      img {
        width: 1.67rem;
        height: 1.67rem;
      }
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

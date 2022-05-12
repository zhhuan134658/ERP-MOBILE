<template>
  <div id="cupload">
    <div class="uTopTitlt">
      <div>
        <div id="container">
          <img id="selectfiles" :src="licenceImg" alt />
        </div>
        <!-- licenceImg?licenceImg: -->
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
// import axios from 'axios';
var accessid = "";
var accesskey = "";
var host = "";
var policyBase64 = "";
var signature = "";
var callbackbody = "";
var filename = "";
var key = "";
var expire = 0;
var g_object_name = "";
var g_object_name_type = "random_name";
var now = Date.parse(new Date()) / 1000;
var timestamp = Date.parse(new Date()) / 1000;
var hostU = "";
var hostUp = "";
var uploader;

export default {
  props: {
    licenceImg: {
      type: String,
    },
    licenceImg2: {
      type: String,
    },
    upImgList: {
      type: String,
    },
    isShow: {
      type: Array,
    },
  },
  data() {
    return {
      newFiles: [],
      newUp: "",
      licenceImg: "",
      upImgList: "",
      // licenceImg: this.licenceImg,
      // upImgList: this.upImgList,
      touUrl:
        "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/J58AFjtkRF1597825191159.png",
      // touUrl: require('../../../static/images/sgdw.png'),
      // touUrl: "http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/J58AFjtkRF1597825191159.png",
    };
  },
  created() {},
  mounted() {
    this.initPlUploader();
  },
  methods: {
    get_signature() {
      const _this = this;
      _this.$axios
        .post("http://dingzhukuai.zzdingyun.com/ossapi/sign/get", {
          corp_id: _this.$store.state.cid,
        })
        .then(
          function (response) {
            hostUp = response.data.host;
            let obj = response.data;

            host = obj["host"];
            policyBase64 = obj["policy"];
            accessid = obj["accessid"];
            signature = obj["signature"];
            expire = parseInt(obj["expire"]);
            callbackbody = obj["callback"];
            key = obj["dir"];
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
      if (g_object_name_type == "local_name") {
        g_object_name += "${filename}";
      } else if (g_object_name_type == "random_name") {
        let suffix = _this.get_suffix(filename);
        g_object_name = key + _this.random_string(10) + suffix;
        // hostU = g_object_name;
      }
      return "";
    },
    get_uploaded_object_name(filename) {
      if (g_object_name_type == "local_name") {
        tmp_name = g_object_name;
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name;
      } else if (g_object_name_type == "random_name") {
        return g_object_name;
      }
    },
    set_upload_param(up, filename, ret) {
      const _this = this;
      if (ret == false) {
        ret = _this.get_signature();
      }
      g_object_name = key;
      if (filename != "") {
        let suffix = _this.get_suffix(filename);
        _this.calculate_object_name(filename);
      }
      hostU = g_object_name;
      let new_multipart_params = {
        key: g_object_name,
        policy: policyBase64,
        OSSAccessKeyId: accessid,
        success_action_status: "200", //让服务端返回200,不然，默认会返回204
        callback: callbackbody,
        signature: signature,
      };
      up.setOption({
        url: host,
        multipart_params: new_multipart_params,
      });
      up.start();
      up.refresh();
    },

    lookimg(item) {
      dd.ready(function () {
        dd.biz.util.previewImage({
          urls: [item], //图片地址列表
          current: item, //当前显示的图片链接
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
      });
    },
    /**
     * 初始化上传插件
     */
    initPlUploader() {
      const _this = this;
      uploader = new plupload.Uploader({
        runtimes: "html5,flash,silverlight,html4",
        browse_button: "selectfiles",
        //multi_selection: false,
        container: document.getElementById("container"),
        flash_swf_url: "../../../static/js/plupload-2.1.2/js/Moxie.swf",
        silverlight_xap_url: "../../../static/js/plupload-2.1.2/js/Moxie.xap",
        // flash_swf_url:
        //     '<%= BASE_URL %>static/js/plupload-2.1.2/js/Moxie.swf',
        // silverlight_xap_url:
        //     '<%= BASE_URL %>static/js/plupload-2.1.2/js/Moxie.xap',
        url: "https://oss.aliyuncs.com",

        filters: {
          mime_types: [
            //只允许上传图片和zip文件
            {
              title: "Image files",
              extensions: "jpg,gif,png,bmp,jpeg",
            },
          ],
          max_file_size: "20mb", //最大只能上传10mb的文件
          prevent_duplicates: false, //不允许选取重复文件
        },
        multi_selection: false,
        multiple_queues: true,
        init: {
          PostInit: function () {
            _this.get_signature();
          },

          FilesAdded: function (up, files) {
            if (uploader.files.length <= 9) {
              plupload.each(files, function (file) {
                if (uploader.files.length != 0) {
                  _this.set_upload_param(up, "", true);
                  return false;
                } else {
                  _this.$alert("请添加图片");
                }
              });
            } else {
              _this.$alert("最多只能上传9张图片");
              uploader.files.length = _this.licenceImg.length;
            }
          },

          BeforeUpload: function (up, file) {
            // check_object_radio();
            _this.set_upload_param(up, file.name, true);
          },

          // UploadProgress: function(up, file) {
          //     var d = document.getElementById(file.id);
          //     d.getElementsByTagName('b')[0].innerHTML =
          //         '<span>' + file.percent + '%</span>';
          //     var prog = d.getElementsByTagName('div')[0];
          //     var progBar = prog.getElementsByTagName('div')[0];
          //     progBar.style.width = 2 * file.percent + 'px';
          //     progBar.setAttribute('aria-valuenow', file.percent);
          // },

          FileUploaded: function (up, file, info) {
            if (info.status == 200) {
              _this.upImgList = "";
              // _this.newUp = plupload;
              _this.upImgList = _this.get_uploaded_object_name(file.name);
              // let len = _this.upImgList.length;

              _this.licenceImg = hostUp + "/" + _this.upImgList;

              _this.$emit("listenToChildEvent", _this.licenceImg);
              console.log("14++" + _this.licenceImg);
              _this.licenceImg = _this.licenceImg;
            } else if (info.status == 203) {
            } else {
            }
          },

          Error: function (up, err) {
            if (err.code == -600) {
              _this.$message({
                showClose: true,
                message: "上传文件过大",
                type: "error",
              });
            } else if (err.code == -601) {
              _this.$message({
                showClose: true,
                message: "暂不支持此类文件，请上传xls或者xlxs的格式文件",
                type: "error",
              });
            } else if (err.code == -602) {
              _this.$message({
                showClose: true,
                message: "已经上传过一次",
                type: "error",
              });
            } else {
              _this.$message({
                showClose: true,
                message: "上传错误",
                type: "error",
              });
            }
          },
        },
      });
      uploader.init();
      _this.upImgList = [];
    },
    deletePic(index) {
      uploader.files.splice(index, 1);
      this.newFiles.splice(index, 1);
      this.upImgList.splice(index, 1);
      this.licenceImg.splice(index, 1);
      this.$emit("listenToChildEvent", this.licenceImg);
    },
  },
  watch: {
    isShow: {
      handler(newValue, oldValue) {
        if (newValue.length === 0) {
          document.getElementById("ossfilea").innerHTML = "";
          uploader.files.length = 0;
          this.newFiles.length = 0;
        }
      },
      deep: true,
    },
    licenceImg: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        this.licenceImg = newValue;
      },
      deep: true,
    },
  },
};
</script>
<style lang="less">
#mpupload .dela {
  width: 0.53rem;
  height: 0.53rem;
  background: #e61b1b;
  display: block;
  text-align: center;
  line-height: 0.43rem;
  color: #fff;
  font-size: 0.67rem;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -6px;
  box-sizing: border-box;
  cursor: pointer;
}
#cupload {
  #container {
    width: 2.67rem;
    height: 2.67rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 2.67rem;
      height: 2.67rem;
    }
  }
}
</style>

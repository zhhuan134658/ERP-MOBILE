// import axios from "axios";
// import qs from "qs";
// import store from "../../vuex/store";
// import { Toast } from "vant";

// //axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
// // console.log("55555" + window.location.protocol);
// // if (window.location.protocol == "http:") {
// //   axios.defaults.baseURL = "http://oazhukuai.zzdingyun.com";
// //   //  axios.defaults.baseURL = "http://test.zhukuaikeji.com";
// // } else if (window.location.protocol == "https:") {
// //   axios.defaults.baseURL = "https://dingzhukuai.zzdingyun.com";
// // }

// axios.defaults.timeout = 16000;
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded;charset=UTF-8";

// // post传参序列化
// axios.interceptors.request.use(
//   function(config) {
//     // Toast.loading({
//     //   duration: 0,
//     //   message: "加载中...",
//     //   forbidClick: true,
//     //   loadingType: "spinner"
//     // });
//     // Do something before request is sent
//     // console.log(config)
//     if (config.method == "post") {
//       config.data = qs.stringify(config.data);
//     }
//     // if (store.state.userData.token) {
//     //   config.headers.token = `${store.state.userData.token}`;
//     // }
//     return config;
//   },
//   function(error) {
//     console.log(error);
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// //添加请求拦截器
// // axios.interceptors.request.use(
// //     function(config) {
// //         // 在发送请求之前做些什么
// //         return config;
// //     },
// //     function(error) {
// //         console.log(error);
// //         // 对请求错误做些什么
// //         return Promise.reject(error);
// //     }
// // );

// // 添加响应拦截器
// // axios.interceptors.response.use(
// //   response => {
// //     // Toast.clear();
// //     var res = response.data;
// //     if (res.code == 1) {
// //       console.log("请求成功");
// //     } else if (res.code == 403) {
// //       // this.$store.commit("setoverlayshow", true);
// //       Toast("暂无权限");
// //     }
// //     return response;
// //   }

//   // function(response) {
//   //   console.log(response);
//   //   // return response;
//   // },
//   // function(error) {
//   //   // window.history.pushState(null, null, "/login")
//   //   console.log("响应拦截器错误信息");
//   //   console.log(error);
//   //   // if(error.response.data.status==401){
//   //   //   Dialog('会话过期,请重新登录').then(action => {
//   //   //     Router.push({path:'/login'})
//   //   //   });
//   //   // }
//   //   return Promise.reject(error.response);
//   // }
// // );

// export default axios;
import axios from "axios";
import qs from "qs";

//axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
// axios.defaults.timeout = 16000;//上传大文件取消默认
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded;charset=UTF-8';

// post传参序列化
const interceptor = axios.interceptors.request
  .use
  //   function(config) {
  //     if (config.method == "post") {
  //       config.data = qs.stringify(config.data);
  //     }
  //     return config;
  //   },
  //   function(error) {
  //     console.log(error);

  //     return Promise.reject(error);
  //   }
  ();
window.sessionStorage.setItem("interceptorId", interceptor);
//添加请求拦截器
// axios.interceptors.request.use(
//   function(config) {
//     // 在发送请求之前做些什么
//     return config;
//   },
//   function(error) {
//     console.log(error);
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   },
// );

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // window.history.pushState(null, null, "/login")
    console.log("响应拦截器错误信息");
    console.log(error);
    // if(error.response.data.status==401){
    //   Dialog('会话过期,请重新登录').then(action => {
    //     Router.push({path:'/login'})
    //   });
    // }
    return Promise.reject(error.response);
  }
);

export default axios;
export { interceptor };

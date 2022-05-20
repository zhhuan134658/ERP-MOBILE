/* jshint esversion: 6 */
/* */
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/home")
  },
  {
    path: "/ceshi",
    name: "ceshi",
    component: () => import("@/components/ceshi")
  },

  {
    path: "/details_copy",
    name: "details_copy",
    component: () => import("@/components/project/details_copy")
  },
  {
    path: "/details_copynew",
    name: "details_copynew",
    component: () => import("@/components/project/details_copynew")
  },

  {
    path: "/details",
    name: "details",
    component: () => import("@/components/project/details")
  },
  {
    path: "/projectlist",
    name: "projectlist",
    component: () => import("@/components/project/projectlist")
  },
  {
    path: "/projectindex",
    name: "projectindex",
    component: () => import("@/components/project/projectindex")
  },
  {
    path: "/projectindexnew",
    name: "projectindexnew",
    component: () => import("@/components/project/projectindexnew")
  },
  {
    path: "/oldinfex",
    name: "oldinfex",
    component: () => import("@/components/project/oldinfex")
  },
  //库管
  //资产清单
  {
    path: "/assetList",
    name: "assetList",
    component: () => import("@/components/libraryTube/assetList/index.vue")
  },
  {
    path: "/assetListform", //表单
    name: "assetListform",
    component: () => import("@/components/libraryTube/assetList/form.vue")
  },
  {
    path: "/comassList", //表单
    name: "comassList",
    component: () => import("@/components/common/comassList.vue")
  },
  {
    path: "/lendListindex", //资产借出
    name: "lendListindex",
    component: () => import("@/components/libraryTube/lendList/index.vue"),
    redirect: "/lendListin",
    children: [
      {
        path: "/lendListout", //资产借出
        name: "lendListout",
        component: () => import("@/components/libraryTube/lendList/out.vue")
      },
      {
        path: "/lendListin", //资产归还
        name: "lendListin",
        component: () => import("@/components/libraryTube/lendList/in.vue")
      }
    ]
  },

  {
    path: "/Distributedindex", //资产派发
    name: "Distributedindex",
    component: () =>
      import("@/components/libraryTube/DistributedList/index.vue"),
    redirect: "/DistributedListin",
    children: [
      {
        path: "/DistributedListin", //资产派发
        name: "DistributedListin",
        component: () =>
          import("@/components/libraryTube/DistributedList/in.vue")
      },
      {
        path: "/DistributedListout", //资产退库
        name: "DistributedListout",
        component: () =>
          import("@/components/libraryTube/DistributedList/out.vue")
      }
    ]
  },
  {
    path: "/diaoboform", //资产调拨
    name: "diaoboform",
    component: () => import("@/components/libraryTube/diaoboform/index.vue")
  },
  {
    path: "/InventoryList", //资产维修
    name: "InventoryList",
    component: () => import("@/components/maintain/InventoryList/index.vue")
  },
  {
    path: "/disposalList", //资产处置
    name: "disposalList",
    component: () => import("@/components/maintain/disposalList/index.vue")
  },
  // 项目立项
  {
    path: "/approvalindexcreat",
    name: "approvalindexcreat",
    component: () =>
      import("@/components/application/approval/approvalindexcreat")
  },

  {
    path: "/approvalindex",
    name: "approvalindex",
    component: () => import("@/components/application/approval/approvalindex")
  },

  //应用
  {
    path: "/approval_list",
    name: "approval_list",
    component: () => import("@/components/application/approval_list")
  },

  {
    path: "/application",
    name: "application",
    component: () => import("@/components/application/application")
  },
  {
    path: "/Module",
    name: "Module",
    component: () => import("@/components/application/Module")
  },
  //外部
  {
    path: "/waibu",
    name: "waibu",
    component: () => import("@/components/waibu/waibu")
  },
  {
    path: "/newwaibu",
    name: "newwaibu",
    component: () => import("@/components/waibu/newwaibu")
  },
  //我的  quancode
  {
    path: "/vedio",
    name: "vedio",
    component: () => import("@/components/common/vedio")
  },
  {
    path: "/csupload",
    name: "csupload",
    component: () => import("@/components/common/csupload")
  },
  {
    path: "/dingtaik",
    name: "dingtaik",
    component: () => import("@/components/common/dingtaik")
  },
  {
    path: "/first",
    name: "first",
    component: () => import("@/components/common/first")
  },
  //材料列表
  {
    path: "/approvallist",
    name: "approvallist",
    component: () => import("@/components/common/approvallist")
  },
  //材料列表
  {
    path: "/materiasp",
    name: "materiasp",
    component: () => import("@/components/common/materiasp")
  },

  //项目选择列表
  {
    path: "/projectsp",
    name: "projectsp",
    component: () => import("@/components/common/projectsp")
  },
  {
    path: "/allpeople",
    name: "allpeople",
    component: () => import("@/components/common/allpeoplesp")
  },
  {
    path: "/quancode",
    name: "quancode",
    component: () => import("@/components/common/quancode")
  },
  {
    path: "/wuquanxian",
    name: "wuquanxian",
    component: () => import("@/components/common/wuquanxian")
  },
  {
    path: "/juese",
    name: "juese",
    component: () => import("@/components/member/juese")
  },
  {
    path: "/waring",
    name: "waring",
    component: () => import("@/components/member/waring")
  },
  {
    path: "/xiaoxi",
    name: "xiaoxi",
    component: () => import("@/components/member/xiaoxi")
  },
  {
    path: "/jueselist",
    name: "jueselist",
    component: () => import("@/components/member/jueselist")
  },
  {
    path: "/member",
    name: "member",
    component: () => import("@/components/member/member")
  },
  {
    path: "/SZrenyuan",
    name: "SZrenyuan",
    component: () => import("@/components/member/SZrenyuan")
  },
  {
    path: "/quanxianren",
    name: "quanxianren",
    component: () => import("@/components/member/quanxianren")
  },
  {
    path: "/fuwu",
    name: "fuwu",
    component: () => import("@/components/member/fuwu")
  },
  {
    path: "/gongsi",
    name: "gongsi",
    component: () => import("@/components/member/gongsi")
  },
  {
    path: "/geren",
    name: "geren",
    component: () => import("@/components/member/geren")
  },
  {
    path: "/fankui",
    name: "fankui",
    component: () => import("@/components/member/fankui")
  },
  {
    path: "/yujingindex",
    name: "yujingindex",
    component: () => import("@/components/member/yujingindex")
  },
  {
    path: "/yujlist",
    name: "yujlist",
    component: () => import("@/components/member/yujlist")
  },
  {
    path: "/yujinginfo",
    name: "yujinginfo",
    component: () => import("@/components/member/yujinginfo")
  }
];

const router = new VueRouter({
  routes
});
export default router;

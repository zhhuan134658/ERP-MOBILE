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
  //财务
  {
    path: "/financeindex",
    name: "financeindex",
    component: () => import("@/components/finance/financeindex")
  },
  // 账户信息列表
  {
    path: "/account_info",
    name: "account_info",
    component: () => import("@/components/finance/account/account_info")
  },
  //账户期初列表
  {
    path: "/account_opening",
    name: "account_opening",
    component: () => import("@/components/finance/account/account_opening")
  },
  //费用报销列表
  {
    path: "/expense_reimbursement",
    name: "expense_reimbursement",
    component: () =>
      import("@/components/finance/account/expense_reimbursement")
  },
  {
    path: "/expense_baosement",
    name: "expense_baosement",
    component: () => import("@/components/finance/account/expense_baosement")
  },
  //企业管理费报销
  {
    path: "/fee_reimbursement",
    name: "fee_reimbursement",
    component: () => import("@/components/finance/account/fee_reimbursement")
  },
  //规费报销
  {
    path: "/fee_reimburs",
    name: "fee_reimburs",
    component: () => import("@/components/finance/account/fee_reimburs")
  },
  //税金报销
  {
    path: "/fee_Tax",
    name: "fee_Tax",
    component: () => import("@/components/finance/account/fee_Tax")
  },
  //其他报销
  {
    path: "/fee_other",
    name: "fee_other",
    component: () => import("@/components/finance/account/fee_other")
  },

  //劳务付款列表
  // {
  //   path: "/service_payment",
  //   name: "service_payment",
  //   component: () => import("@/components/finance/account/service_payment")
  // },
  //分包付款列表
  // {
  //   path: "/subcontract_payment",
  //   name: "subcontract_payment",
  //   component: () => import("@/components/finance/account/subcontract_payment")
  // },
  //租赁付款列表
  // {
  //   path: "/lease_payments",
  //   name: "lease_payments",
  //   component: () => import("@/components/finance/account/lease_payments")
  // },
  //材料付款账户列表
  {
    path: "/material_paymentc",
    name: "material_paymentc",
    component: () => import("@/components/finance/account/material_paymentc")
  },
  //材料付款列表
  {
    path: "/payment_list",
    name: "payment_list",
    component: () => import("@/components/finance/account/payment_list")
  },
  //其他付款列表
  {
    path: "/other_payment",
    name: "other_payment",
    component: () => import("@/components/finance/account/other_payment")
  },
  //合同收款列表
  {
    path: "/contract_collection",
    name: "contract_collection",
    component: () => import("@/components/finance/account/contract_collection")
  },
  //其他收款列表
  {
    path: "/other_collection",
    name: "other_collection",
    component: () => import("@/components/finance/account/other_collection")
  },
  //应收款汇总表
  {
    path: "/all_collection",
    name: "all_collection",
    component: () => import("@/components/finance/account/all_collection")
  },
  //开票收款汇总表
  {
    path: "/open_collection",
    name: "open_collection",
    component: () => import("@/components/finance/account/open_collection")
  },
  //中标登记
  {
    path: "/Bid_winning",
    name: "Bid_winning",
    component: () =>
      import("@/components/application/Bid_management/bidWinning/Bid_winning")
  },

  //下属费用报销
  {
    path: "/subordinate_expenses",
    name: "subordinate_expenses",
    component: () => import("@/components/finance/account/subordinate_expenses")
  },
  //质量
  {
    path: "/zhiliangshigu",
    name: "zhiliangshigu",
    component: () => import("@/components/application/jindu/zhiliangshigu")
  },
  {
    path: "/zhiliangzhenggai",
    name: "zhiliangzhenggai",
    component: () => import("@/components/application/jindu/zhiliangzhenggai")
  },
  //进度  ddjindu
  {
    path: "/ddjindu",
    name: "ddjindu",
    component: () => import("@/components/application/jindu/ddjindu")
  },
  {
    path: "/treefile",
    name: "treefile",
    component: () => import("@/components/application/jindu/treefile")
  },
  {
    path: "/chacexm",
    name: "chacexm",
    component: () => import("@/components/application/jindu/chacexm")
  },
  {
    path: "/jinduplanindex", //进度计划
    name: "jinduplanindex",
    component: () => import("@/components/application/jindu/jinduplanindex")
  },
  {
    path: "/jinduplaycreat", //进度计划
    name: "jinduplaycreat",
    component: () => import("@/components/application/jindu/jinduplaycreat")
  },
  {
    path: "/jinduReport", //进度计划
    name: "jinduReport",
    component: () => import("@/components/application/jindu/jinduReport")
  },
  {
    path: "/jinduplayedit", //进度计划
    name: "jinduplayedit",
    component: () => import("@/components/application/jindu/jinduplayedit")
  },
  {
    path: "/lichindex", //里程碑
    name: "lichindex",
    component: () => import("@/components/application/jindu/lichindex")
  },
  {
    path: "/lichcreat", //里程碑
    name: "lichcreat",
    component: () => import("@/components/application/jindu/lichcreat")
  },
  {
    path: "/lichedit", //里程碑
    name: "lichedit",
    component: () => import("@/components/application/jindu/lichedit")
  },
  {
    path: "/lichReport", //里程碑
    name: "lichReport",
    component: () => import("@/components/application/jindu/lichReport")
  },
  {
    path: "/jinduindex",
    name: "jinduindex",
    component: () => import("@/components/application/jindu/shijianindex")
  },
  {
    path: "/finish",
    name: "finish",
    component: () => import("@/components/application/jindu/finish")
  },
  {
    path: "/shijianedit",
    name: "shijianedit",
    component: () => import("@/components/application/jindu/shijianedit")
  },

  {
    path: "/shijiancreat",
    name: "shijiancreat",
    component: () => import("@/components/application/jindu/shijiancreat")
  },
  {
    path: "/jinducreat",
    name: "jinducreat",
    component: () => import("@/components/application/jindu/jinducreat")
  },
  {
    path: "/jinduedit",
    name: "jinduedit",
    component: () => import("@/components/application/jindu/jinduedit")
  },
  {
    path: "/lichengren",
    name: "lichengren",
    component: () => import("@/components/application/jindu/lichengren")
  },
  {
    path: "/lichengtu",
    name: "lichengtu",
    component: () => import("@/components/application/jindu/lichengtu")
  },
  //里程碑  Report
  {
    path: "/Report",
    name: "Report",
    component: () => import("@/components/application/jindu/Report")
  },
  {
    path: "/milepost",
    name: "milepost",
    component: () => import("@/components/application/jindu/milepost")
  },
  {
    path: "/xmlist",
    name: "xmlist",
    component: () => import("@/components/application/jindu/xmlist")
  },
  {
    path: "/steps",
    name: "steps",
    component: () => import("@/components/application/jindu/steps")
  },

  //文件
  {
    path: "/file",
    name: "file",
    component: () => import("@/components/file/file")
  },
  {
    path: "/tuzhi",
    name: "tuzhi",
    component: () => import("@/components/file/tuzhi")
  },
  {
    path: "/BIMview",
    name: "BIMview",
    component: () => import("@/components/file/BIMview")
  },
  {
    path: "/image",
    name: "image",
    component: () => import("@/components/file/image")
  },
  {
    path: "/recycle",
    name: "recycle",
    component: () => import("@/components/file/recycle")
  },
  {
    path: "/dtfile",
    name: "dtfile",
    component: () => import("@/components/file/dtfile")
  },
  {
    path: "/FileJiaGou",
    name: "FileJiaGou",
    component: () => import("@/components/file/FileJiaGou")
  },
  {
    path: "/wenjianguanli",
    name: "wenjianguanli",
    component: () => import("@/components/file/wenjianguanli")
  },
  {
    path: "/wenjianguanli1",
    name: "wenjianguanli1",
    component: () => import("@/components/file/wenjianguanli1")
  },
  {
    path: "/pdfview",
    name: "pdfview",
    component: () => import("@/components/file/pdfview")
  },
  // 任务
  {
    path: "/guidang",
    name: "guidang",
    component: () => import("@/components/task/guidang")
  },
  {
    path: "/tasklist",
    name: "tasklist",
    component: () => import("@/components/task/tasklist")
  },
  {
    path: "/renyuanList",
    name: "renyuanList",
    component: () => import("@/components/task/renyuanList")
  },
  {
    path: "/taskcreat",
    name: "taskcreat",
    component: () => import("@/components/task/taskcreat")
  },
  {
    path: "/taskedit",
    name: "taskedit",
    component: () => import("@/components/task/taskedit")
  },
  {
    path: "/taskindex",
    name: "taskindex",
    component: () => import("@/components/task/taskindex")
  },

  {
    path: "/mubanlist",
    name: "mubanlist",
    component: () => import("@/components/task/mubanlist")
  },
  {
    path: "/projectnewlist",
    name: "projectnewlist",
    component: () => import("@/components/task/projectnewlist")
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
  //投标管理
  // 投标保证金付款
  {
    path: "/Payment_security",
    name: "Payment_security",
    component: () =>
      import(
        "@/components/application/Bid_management/information/Payment_security"
      )
  },
  // 投标保证金退回
  {
    path: "/Payment_black",
    name: "Payment_black",
    component: () =>
      import(
        "@/components/application/Bid_management/information/Payment_black"
      )
  },

  {
    path: "/informationindex",
    name: "informationindex",
    component: () =>
      import(
        "@/components/application/Bid_management/information/informationindex"
      )
  },
  {
    path: "/biddingindex",
    name: "biddingindex",
    component: () =>
      import("@/components/application/Bid_management/bidding/biddingindex")
  },
  {
    path: "/qualificationsindex",
    name: "qualificationsindex",
    component: () =>
      import(
        "@/components/application/Bid_management/qualifications/qualificationsindex"
      )
  },
  {
    path: "/documentsindex",
    name: "documentsindex",
    component: () =>
      import("@/components/application/Bid_management/documents/documentsindex")
  },
  {
    path: "/investigationindex",
    name: "investigationindex",
    component: () =>
      import(
        "@/components/application/Bid_management/investigation/investigationindex"
      )
  },
  {
    path: "/bondindex",
    name: "bondindex",
    component: () =>
      import("@/components/application/Bid_management/bond/bondindex")
  },
  {
    path: "/openingindex",
    name: "openingindex",
    component: () =>
      import("@/components/application/Bid_management/opening/openingindex")
  },
  {
    path: "/bidWinningindex",
    name: "bidWinningindex",
    component: () =>
      import(
        "@/components/application/Bid_management/bidWinning/bidWinningindex"
      )
  },
  {
    path: "/operationindex",
    name: "operationindex",
    component: () =>
      import("@/components/application/Bid_management/operation/operationindex")
  },
  //招标管理
  {
    path: "/materialindex",
    name: "materialindex",
    component: () =>
      import("@/components/application/Bidding/material/materialindex")
  },
  {
    path: "/subcontractindex",
    name: "subcontractindex",
    component: () =>
      import("@/components/application/Bidding/subcontract/subcontractindex")
  },
  {
    path: "/offerindex",
    name: "offerindex",
    component: () => import("@/components/application/Bidding/offer/offerindex")
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
  // 预算管理
  {
    path: "/direct",
    name: "direct",
    component: () => import("@/components/application/budget/direct")
  },
  {
    path: "/indirect",
    name: "indirect",
    component: () => import("@/components/application/budget/indirect")
  },
  //分包质保金结算列表
  {
    path: "/subsettlementdc",
    name: "subsettlementdc",

    component: () => import("@/components/finance/account/subsettlementdc")
  },
  //分包签证变更列表
  {
    path: "/subvisachange",
    name: "subvisachange",

    component: () => import("@/components/finance/account/subvisachange")
  },

  //劳务合同变更签证列表
  {
    path: "/Contract_change",
    name: "Contract_change",

    component: () => import("@/components/finance/account/Contract_change")
  },

  //零星劳务单付款列表
  {
    path: "/start_ling",
    name: "start_ling",

    component: () => import("@/components/finance/account/start_ling")
  },

  //收入合同质保金结算列表
  {
    path: "/Revenue_end",
    name: "Revenue_end",

    component: () => import("@/components/finance/account/Revenue_end")
  },
  // 收入合同
  {
    path: "/Revenue",
    name: "Revenue",
    component: () => import("@/components/application/Revenue/Revenue")
  },
  {
    path: "/progress",
    name: "progress",
    component: () => import("@/components/application/Revenue/progress")
  },
  {
    path: "/collection",
    name: "collection",
    component: () => import("@/components/application/Revenue/collection")
  },
  {
    path: "/finished",
    name: "finished",
    component: () => import("@/components/application/Revenue/finished")
  },
  {
    path: "/change",
    name: "change",
    component: () => import("@/components/application/Revenue/change")
  },

  // 材料管理
  //材料总计划
  {
    path: "/master_plan",
    name: "master_plan",
    component: () => import("@/components/application/Material/master_plan")
  },
  {
    path: "/master_plancreat",
    name: "master_plancreat",
    component: () =>
      import("@/components/application/Material/master_plancreat")
  },
  //采购申请
  {
    path: "/demand_plan",
    name: "demand_plan",
    component: () => import("@/components/application/Material/demand_plan")
  },
  {
    path: "/demand_plancreat",
    name: "demand_plancreat",
    component: () =>
      import("@/components/application/Material/demand_plancreat")
  },
  //采购合同订单
  {
    path: "/material_contract",
    name: "material_contract",
    component: () =>
      import("@/components/application/Material/material_contract")
  },
  //采购订单
  {
    path: "/material_dingdan",
    name: "material_dingdan",
    component: () =>
      import("@/components/application/Material/material_dingdan")
  },
  {
    path: "/material_contractcreat",
    name: "material_contractcreat",
    component: () =>
      import("@/components/application/Material/material_contractcreat")
  },
  {
    path: "/material_acceptance",
    name: "material_acceptance",
    component: () =>
      import("@/components/application/Material/material_acceptance")
  },
  {
    path: "/material_warehousing",
    name: "material_warehousing",
    component: () =>
      import("@/components/application/Material/material_warehousing")
  },
  {
    path: "/material_settlement",
    name: "material_settlement",
    component: () =>
      import("@/components/application/Material/material_settlement")
  },
  {
    path: "/material_payment",
    name: "material_payment",
    component: () =>
      import("@/components/application/Material/material_payment")
  },
  {
    path: "/material_delivery",
    name: "material_delivery",
    component: () =>
      import("@/components/application/Material/material_delivery")
  },
  {
    path: "/material_return",
    name: "material_return",
    component: () => import("@/components/application/Material/material_return")
  },
  {
    path: "/material_inventory",
    name: "material_inventory",
    component: () =>
      import("@/components/application/Material/material_inventory")
  },
  {
    path: "/material_allocation",
    name: "material_allocation",
    component: () =>
      import("@/components/application/Material/material_allocation")
  },
  {
    path: "/material_beginning",
    name: "material_beginning",
    component: () =>
      import("@/components/application/Material/material_beginning")
  },
  //新加保证金
  //履约保证金支出
  {
    path: "/bond_apply",
    name: "bond_apply",
    component: () => import("@/components/application/bondreturn/bond_apply")
  },
  //履约保证金退回
  {
    path: "/bondreturn_apply",
    name: "bondreturn_apply",
    component: () =>
      import("@/components/application/bondreturn/bondreturn_apply")
  },
  //劳务保证金收取
  {
    path: "/bond_expenditure",
    name: "bond_expenditure",
    component: () =>
      import("@/components/application/bondreturn/bond_expenditure")
  },
  //劳务保证金退回
  {
    path: "/bond_return",
    name: "bond_return",
    component: () => import("@/components/application/bondreturn/bond_return")
  },
  //分包保证金收取
  {
    path: "/sub_bond_expenditure",
    name: "sub_bond_expenditure",
    component: () =>
      import("@/components/application/bondreturn/sub_bond_expenditure")
  },
  //分包保证金退回
  {
    path: "/sub_bond_return",
    name: "sub_bond_return",
    component: () =>
      import("@/components/application/bondreturn/sub_bond_return")
  },
  //保证金付款登记
  {
    path: "/bond_payment_register",
    name: "bond_payment_register",
    component: () =>
      import("@/components/application/bondreturn/bond_payment_register")
  },
  //保证金收款登记
  {
    path: "/bond_collection_register",
    name: "bond_collection_register",
    component: () =>
      import("@/components/application/bondreturn/bond_collection_register")
  },
  //备用金申请
  {
    path: "/reserve_fund",
    name: "reserve_fund",
    component: () => import("@/components/finance/account/reserve_fund")
  },
  //备用金归还
  {
    path: "/reserve_return",
    name: "reserve_return",
    component: () => import("@/components/finance/account/reserve_return")
  },
  //报销列表
  {
    path: "/reimbursement_list",
    name: "reimbursement_list",
    component: () => import("@/components/finance/account/reimbursement_list")
  },
  //劳务管理
  //记工统计
  {
    path: "/Record_jie",
    name: "Record_jie",
    component: () =>
      import("@/components/application/Service/Record_work/Record_jie")
  },
  {
    path: "/Record_ji",
    name: "Record_ji",
    component: () =>
      import("@/components/application/Service/Record_work/Record_ji")
  },
  {
    path: "/Record_tongji",
    name: "Record_tongji",
    component: () =>
      import("@/components/application/Service/Record_work/Record_tongji")
  },
  {
    path: "/Record_tongjilist",
    name: "Record_tongjilist",
    component: () =>
      import("@/components/application/Service/Record_work/Record_tongjilist")
  },
  //记工
  {
    path: "/Record_work",
    name: "Record_work",
    component: () =>
      import("@/components/application/Service/Record_work/Record_work")
  },
  {
    path: "/Record_index",
    name: "Record_index",
    component: () =>
      import("@/components/application/Service/Record_work/Record_index")
  },
  //记工审批人
  {
    path: "/Record_spren",
    name: "Record_spren",
    component: () =>
      import("@/components/application/Service/Record_work/Record_spren")
  },
  //记工审批
  {
    path: "/Record_sp",
    name: "Record_sp",
    component: () =>
      import("@/components/application/Service/Record_work/Record_sp"),
    meta: {
      keepAlive: true,
      title: "商品管理"
    }
  },
  //新建记工
  {
    path: "/Record_creat",
    name: "Record_creat",
    component: () =>
      import("@/components/application/Service/Record_work/Record_creat")
  },
  //记工成员
  {
    path: "/Record_ren",
    name: "Record_ren",
    component: () =>
      import("@/components/application/Service/Record_work/Record_ren")
  },
  //添加工人
  {
    path: "/Record_add",
    name: "Record_add",
    component: () =>
      import("@/components/application/Service/Record_work/Record_add")
  },
  //记工列表
  {
    path: "/Record_jlist",
    name: "Record_jlist",
    component: () =>
      import("@/components/application/Service/Record_work/Record_jlist")
  },
  {
    path: "/Record_info",
    name: "Record_info",
    component: () =>
      import("@/components/application/Service/Record_work/Record_info")
  },
  //记工本
  {
    path: "/Record_book",
    name: "Record_book",
    component: () =>
      import("@/components/application/Service/Record_work/Record_book")
  },

  {
    path: "/Issued_behalf",
    name: "Issued_behalf",
    component: () => import("@/components/application/Service/Issued_behalf")
  },
  {
    path: "/service_contract",
    name: "service_contract",
    component: () => import("@/components/application/Service/service_contract")
  },
  {
    path: "/service_progress",
    name: "service_progress",
    component: () => import("@/components/application/Service/service_progress")
  },
  {
    path: "/service_payment",
    name: "service_payment",
    component: () => import("@/components/application/Service/service_payment")
  },
  //完工结算
  {
    path: "/service_settlement",
    name: "service_settlement",
    component: () =>
      import("@/components/application/Service/service_settlement")
  },
  //劳务质保金结算
  {
    path: "/service_deposit",
    name: "service_deposit",
    component: () => import("@/components/application/Service/service_deposit")
  },
  {
    path: "/service_sporadic",
    name: "service_sporadic",
    component: () => import("@/components/application/Service/service_sporadic")
  },
  {
    path: "/service_salary",
    name: "service_salary",
    component: () => import("@/components/application/Service/service_salary")
  },
  {
    path: "/service_system",
    name: "service_system",
    component: () => import("@/components/application/Service/service_system")
  },
  {
    path: "/service_systemcreat",
    name: "service_systemcreat",
    component: () =>
      import("@/components/application/Service/service_systemcreat")
  },
  {
    path: "/service_systemedit",
    name: "service_systemedit",
    component: () =>
      import("@/components/application/Service/service_systemedit")
  },
  // 分包管理
  {
    path: "/subcontract_contract",
    name: "subcontract_contract",
    component: () =>
      import("@/components/application/Subcontract/subcontract_contract")
  },
  {
    path: "/subcontract_progress",
    name: "subcontract_progress",
    component: () =>
      import("@/components/application/Subcontract/subcontract_progress")
  },
  {
    path: "/subcontract_payment",
    name: "subcontract_payment",
    component: () =>
      import("@/components/application/Subcontract/subcontract_payment")
  },
  {
    path: "/subcontract_completion",
    name: "subcontract_completion",
    component: () =>
      import("@/components/application/Subcontract/subcontract_completion")
  },
  // 租赁管理
  {
    path: "/lease_plan",
    name: "lease_plan",
    component: () => import("@/components/application/Lease/lease_plan")
  },
  {
    path: "/lease_contract",
    name: "lease_contract",
    component: () => import("@/components/application/Lease/lease_contract")
  },
  {
    path: "/lease_payments",
    name: "lease_payments",
    component: () => import("@/components/application/Lease/lease_payments")
  },
  {
    path: "/lease_machinery",
    name: "lease_machinery",
    component: () => import("@/components/application/Lease/lease_machinery")
  },
  {
    path: "/lease_settlement",
    name: "lease_settlement",
    component: () => import("@/components/application/Lease/lease_settlement")
  },
  // 质量管理
  {
    path: "/quality_inspection",
    name: "quality_inspection",
    component: () =>
      import("@/components/application/quality/quality_inspection")
  },
  {
    path: "/quality_rectification",
    name: "quality_rectification",
    component: () =>
      import("@/components/application/quality/quality_rectification")
  },
  //质量事故汇报
  {
    path: "/quality_report",
    name: "quality_report",
    component: () => import("@/components/application/quality/quality_report")
  },
  // 安全管理
  {
    path: "/security_log",
    name: "security_log",
    component: () => import("@/components/application/security/security_log")
  },
  {
    path: "/security_check",
    name: "security_check",
    component: () => import("@/components/application/security/security_check")
  },
  //安全事故汇报
  {
    path: "/security_report",
    name: "security_report",
    component: () => import("@/components/application/security/security_report")
  },
  //施工过程管理
  {
    path: "/construction_log",
    name: "construction_log",
    component: () =>
      import("@/components/application/construction/construction_log")
  },
  {
    path: "/construction_change",
    name: "construction_change",
    component: () =>
      import("@/components/application/construction/construction_change")
  },
  {
    path: "/construction_disclose",
    name: "construction_disclose",
    component: () =>
      import("@/components/application/construction/construction_disclose")
  },
  {
    path: "/construction_organization",
    name: "construction_organization",
    component: () =>
      import("@/components/application/construction/construction_organization")
  },
  //设备管理
  {
    path: "/equipment_requirements",
    name: "equipment_requirements",
    component: () =>
      import("@/components/application/equipment/equipment_requirements")
  },
  {
    path: "/equipment_requisition",
    name: "equipment_requisition",
    component: () =>
      import("@/components/application/equipment/equipment_requisition")
  },
  {
    path: "/equipment_inspection",
    name: "equipment_inspection",
    component: () =>
      import("@/components/application/equipment/equipment_inspection")
  },
  {
    path: "/equipment_maintenance",
    name: "equipment_maintenance",
    component: () =>
      import("@/components/application/equipment/equipment_maintenance")
  },
  {
    path: "/equipment_maint",
    name: "equipment_maint",
    component: () =>
      import("@/components/application/equipment/equipment_maint")
  },
  {
    path: "/equipment_Oil",
    name: "equipment_Oil",
    component: () => import("@/components/application/equipment/equipment_Oil")
  },
  {
    path: "/equipment_scrapping",
    name: "equipment_scrapping",
    component: () =>
      import("@/components/application/equipment/equipment_scrapping")
  },
  //开工
  {
    path: "/Commencement_report",
    name: "Commencement_report",
    component: () =>
      import("@/components/application/Schedule/Commencement_report")
  },
  //停工
  {
    path: "/Commencement_stop",
    name: "Commencement_stop",
    component: () =>
      import("@/components/application/Schedule/Commencement_stop")
  },
  //竣工
  {
    path: "/Commencement_completed",
    name: "Commencement_completed",
    component: () =>
      import("@/components/application/Schedule/Commencement_completed")
  },
  //进度管理
  {
    path: "/schedule_output",
    name: "schedule_output",
    component: () => import("@/components/application/Schedule/schedule_output")
  },
  {
    path: "/schedule_construction",
    name: "schedule_construction",
    component: () =>
      import("@/components/application/Schedule/schedule_construction")
  },

  {
    path: "/schedule_list",
    name: "schedule_list",
    component: () => import("@/components/application/Schedule/schedule_list")
  },
  {
    path: "/schedule_value",
    name: "schedule_value",
    component: () => import("@/components/application/Schedule/schedule_value")
  },
  {
    path: "/schedule_maintenance",
    name: "schedule_maintenance",
    component: () =>
      import("@/components/application/Schedule/schedule_maintenance")
  },
  //发票管理
  // 发票开具申请
  {
    path: "/Invoice_opening",
    name: "Invoice_opening",
    component: () => import("@/components/application/invoice/Invoice_opening")
  },

  {
    path: "/invoice_registration",
    name: "invoice_registration",
    component: () =>
      import("@/components/application/invoice/invoice_registration")
  },
  {
    path: "/invoice_registrationcreat",
    name: "invoice_registrationcreat",
    component: () =>
      import("@/components/application/invoice/invoice_registrationcreat")
  },
  {
    path: "/invoice_collection",
    name: "invoice_collection",
    component: () =>
      import("@/components/application/invoice/invoice_collection")
  },
  {
    path: "/invoice_expenditure",
    name: "invoice_expenditure",
    component: () =>
      import("@/components/application/invoice/invoice_expenditure")
  },
  //成本管理
  {
    path: "/cost_operation",
    name: "cost_operation",
    component: () => import("@/components/application/cost/cost_operation")
  },
  {
    path: "/cost_statistical",
    name: "cost_statistical",
    component: () => import("@/components/application/cost/cost_statistical")
  },
  {
    path: "/cost_indirect",
    name: "cost_indirect",
    component: () => import("@/components/application/cost/cost_indirect")
  },
  {
    path: "/cost_table",
    name: "cost_table",
    component: () => import("@/components/application/cost/cost_table")
  },
  {
    path: "/cost_profit",
    name: "cost_profit",
    component: () => import("@/components/application/cost/cost_profit")
  },
  //日志
  {
    path: "/templatel",
    name: "templatel",
    component: () => import("@/components/journal/templatel")
  },
  {
    path: "/loglist",
    name: "loglist",
    component: () => import("@/components/journal/loglist")
  },
  {
    path: "/jixmlist",
    name: "jixmlist",
    component: () => import("@/components/journal/jixmlist")
  },
  {
    path: "/jilog",
    name: "jilog",
    component: () => import("@/components/journal/jilog")
  },
  {
    path: "/gongcheng",
    name: "gongcheng",
    component: () => import("@/components/journal/gongcheng")
  },
  //行政
  //快递登记列表
  {
    path: "/receivingList",
    name: "receivingList",
    component: () => import("@/components/administration/receivingList")
  },
  //案件管理
  {
    path: "/caseList",
    name: "caseList",
    component: () => import("@/components/administration/caseList")
  },
  //案件执行
  {
    path: "/implementList",
    name: "implementList",
    component: () => import("@/components/administration/implementList")
  },
  {
    path: "/implementchect",
    name: "implementchect",
    component: () => import("@/components/administration/implementchect")
  },
  //工资登记
  {
    path: "/wagesList",
    name: "wagesList",
    component: () => import("@/components/administration/wagesList")
  },
  //工伤登记
  {
    path: "/InjuryList",
    name: "InjuryList",
    component: () => import("@/components/administration/InjuryList")
  },
  //付款登记
  {
    path: "/paymentList",
    name: "paymentList",
    component: () => import("@/components/administration/paymentList")
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

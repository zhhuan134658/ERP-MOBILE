import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    userData: {
      plan: "",
      token: "",
      ddtype: "",
      maincorpid: "",
      lcxminfo: "",
      jiitemdata: "",
      ziitemdata: "",
      spanTime: "",
      spmateriadata: { name: "", size: "", unit: "" },
      spprojectdata: { name: "", id: "" },
      spanItem: [], //记工选中人员
      workitemdata: "", //记工班组信息
      worklist: [],
      overlayshow: false,
      eventinfo: "",
      xminfo: "",
      Selecteddata: [],
      shenpiList: [],
      chaosongList: [],
      personnelList: [], //
      itemdata: "",
      taskliststatus: "",
      company: window.sessionStorage.getItem("company"),
      projectData: window.sessionStorage.getItem("projectData"),
      zData: window.sessionStorage.getItem("zData"),
      cid: window.sessionStorage.getItem("cid"), //企业i

      spaceid: window.sessionStorage.getItem("spaceid"),
      username: window.sessionStorage.getItem("username"),
      userid: window.sessionStorage.getItem("userid"),
      avatarurl: window.sessionStorage.getItem("avatarurl"),
      department: window.sessionStorage.getItem("department"),
      statusDtat: [],
      typeDtat: []
    }
  },

  actions: {},
  getters: {},
  mutations: {
    settoken(state, token) {
      state.userData.token = token;
    },
    setplan(state, plan) {
      state.userData.plan = plan;
    },
    setddtype(state, ddtype) {
      state.userData.ddtype = ddtype;
    },
    setmaincorpid(state, maincorpid) {
      state.userData.maincorpid = maincorpid;
    },
    setlcxminfo(state, lcxminfo) {
      state.userData.lcxminfo = lcxminfo;
    },
    setjiitemdata(state, jiitemdata) {
      state.userData.jiitemdata = jiitemdata;
    },
    setziitemdata(state, ziitemdata) {
      state.userData.ziitemdata = ziitemdata;
    },
    setspanTime(state, spanTime) {
      state.userData.spanTime = spanTime;
    },
    setspmateriadata(state, spmateriadata) {
      state.userData.spmateriadata = spmateriadata;
    },
    setspprojectdata(state, spprojectdata) {
      state.userData.spprojectdata = spprojectdata;
    },
    setworklist(state, worklist) {
      state.userData.worklist = worklist;
    },
    setworkitemdata(state, workitemdata) {
      state.userData.workitemdata = workitemdata;
    },
    setoverlayshow(state, overlayshow) {
      state.userData.overlayshow = overlayshow;
    },
    seteventinfo(state, eventinfo) {
      state.userData.eventinfo = eventinfo;
    },
    setxminfo(state, xminfo) {
      state.userData.xminfo = xminfo;
    },
    setpersonnelList(state, personnelList) {
      state.userData.personnelList = personnelList;
    },
    setitemdata(state, itemdata) {
      state.userData.itemdata = itemdata;
    },
    settaskliststatus(state, taskliststatus) {
      state.userData.taskliststatus = taskliststatus;
    },
    setshenpiList(state, shenpiList) {
      state.userData.shenpiList = shenpiList;
    },

    setchaosongList(state, chaosongList) {
      state.userData.chaosongList = chaosongList;
    },
    settypeDtat(state, typeDtat) {
      state.userData.typeDtat = typeDtat;
      // state.userData.typeDtat = typeDtat;
      // sessionStorage.setItem("typeDtat", typeDtat);
    },
    setstatusDtat(state, statusDtat) {
      state.userData.statusDtat = statusDtat;
      // state.userData.statusDtat = statusDtat;
      // sessionStorage.setItem("statusDtat", statusDtat);
    },
    setcompany(state, company) {
      state.userData.company = company;
      sessionStorage.setItem("company", company);
    },
    setSelecteddata(state, Selecteddata) {
      state.userData.Selecteddata = Selecteddata;
      sessionStorage.setItem("Selecteddata", Selecteddata);
    },
    setzData(state, zData) {
      state.userData.zData = zData;
      sessionStorage.setItem("zData", zData);
    },
    setprojectData(state, projectData) {
      state.userData.projectData = projectData;
      sessionStorage.setItem("projectData", projectData);
    },
    setspaceid(state, spaceid) {
      state.userData.spaceid = spaceid;
      sessionStorage.setItem("spaceid", spaceid);
    },
    setCid(state, cid) {
      state.userData.cid = cid;
      sessionStorage.setItem("cid", cid);
    },
    setusername(state, username) {
      state.userData.username = username;
      sessionStorage.setItem("username", username);
    },

    setuserid(state, userid) {
      state.userData.userid = userid;
      sessionStorage.setItem("userid", userid);
    },
    setavatarurl(state, avatarurl) {
      state.userData.avatarurl = avatarurl;
      sessionStorage.setItem("avatarurl", avatarurl);
    },
    setdepartment(state, department) {
      state.userData.department = department;
      sessionStorage.setItem("department", department);
    }

    //
  }
});

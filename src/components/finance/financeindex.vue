<template>
  <!--  -->
  <div id="Module1">
    <div class="collapse1">
      <van-collapse v-model="activeNames" :border="false">
        <van-collapse-item
          :title="item.name"
          v-for="(item, index) in shijianImg"
          :name="index"
          :key="item + index"
        >
          <div
            class="active-item"
            v-for="(item1, index1) in item.itemlist"
            :key="index1"
            @click="addition(item1, index1)"
          >
            <div>
              <img :src="item1.imgsrc" alt />
              <div style="text-align: center">
                {{ item1.name }}
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "",
  components: {},
  data() {
    return {
      activeNames: [0],
      shijianImg: [
        {
          name: "财务",
          itemlist: [
            {
              isselected: "1",
              router: "/account_info",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/fHPftJrPyp1608085784736.png",
              name: "账户信息列表",
            },
            {
              isselected: "1",
              router: "/account_opening",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu/dingea47c602975497f935c2f4657eb6378f/t3ZCtzaa5C1607329629346.png",
              name: "账户期初列表",
            },
            {
              isselected: "1",
              router: "/expense_reimbursement",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/dwT8pKDmxi1608085785423.png",
              name: "费用报销列表",
            },
            {
              isselected: "1",
              router: "/reserve_fund",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/JaySxtWxxc1608085971447.png",
              name: "备用金发放列表",
            },
            {
              isselected: "1",
              router: "/service_payment",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/nKtdkNDWHy1608085972095.png",
              name: "劳务付款列表",
            },
            {
              isselected: "1",
              router: "/subcontract_payment",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/EsTByjDXdh1608085972333.png",
              name: "分包付款列表",
            },
            {
              isselected: "1",
              router: "/lease_payments",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/d7G7rMAKBc1608086068010.png",
              name: "租赁付款列表",
            },
            {
              isselected: "1",
              router: "/material_paymentc",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/d3DkDkHya81608086068737.png",
              name: "材料付款账户列表",
            },
            {
              isselected: "1",
              router: "/payment_list",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/74e5ZG8Sph1608086316209.png",
              name: "材料付款列表",
            },
            {
              isselected: "1",
              router: "/other_payment",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/mDxDQ2rjd51608086069989.png",
              name: "其他付款列表",
            },
            {
              isselected: "1",
              router: "/contract_collection",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/Tw5EhNeS4j1608086154336.png",
              name: "合同收款列表",
            },
            {
              isselected: "1",
              router: "/other_collection",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/JhsCawrReM1608086153864.png",
              name: "其他收款列表",
            },
            {
              isselected: "1",
              router: "/subordinate_expenses",
              imgsrc:
                "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/GNpZDakjwt1608086154009.png",
              name: "下属费用报销",
            },
          ],
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "应用中心", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    addition(tag, value) {
      this.$router.push({ path: tag.router });
    },
  },
  created() {
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
// .collapse1 {
//     margin-bottom: 0.16rem;
//     // background-color: #fff;
//     padding: 0.33rem;
//     box-sizing: border-box;
//     .van-collapse {
//         .van-collapse-item {
//             margin-top: 0.33rem;
//             border-radius: 0.33rem;
//             overflow: hidden;
//             .van-collapse-item__wrapper {
//                 .van-collapse-item__content {
//                     text-align: center;
//                     display: flex;
//                     padding: 0;
//                     flex-direction: row;
//                     flex-wrap: wrap;
//                     .active-item {
//                         border-radius: 0.43rem;
//                         width: 22%;
//                         margin: 1%;
//                         padding: 0.5rem 0px;
//                         display: flex;
//                         // align-items: center; /*定义body的元素垂直居中*/
//                         justify-content: center;
//                         text-align: center;
//                         font-size: 0.83rem;
//                         color: #30333c;
//                         position: relative;
//                         img {
//                             width: 2.33rem;
//                             height: 2.33rem;
//                             margin-bottom: 0.33rem;
//                         }
//                         .jianicon {
//                             width: 1rem;
//                             height: 1rem;
//                             position: absolute;
//                             top: 0.33rem;
//                             right: 0.33rem;
//                         }
//                     }
//                 }
//             }
//             .van-cell {
//                 line-height: 1.75rem;
//                 // border-bottom: 0.06rem solid #f0f0f0;

//                 .van-cell__title {
//                     font-size: 1.17rem;
//                     font-weight: 600;
//                 }
//                 .van-icon {
//                     line-height: 1.75rem;
//                     font-size: 1rem;
//                 }
//             }
//         }
//     }
// }
</style>

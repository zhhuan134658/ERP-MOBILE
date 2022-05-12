<template>
  <!-- 审批列表 -->
  <div id="approvallist">
    <van-tabs v-model="active" sticky>
      <van-tab title="我审批的">
        <div class="inputdiv">
          <van-search
            v-model="Searchname"
            placeholder="请填写搜索条件"
            show-action
            shape="round"
          >
            <div slot="action">
              <van-button type="default">搜索</van-button>
            </div>
          </van-search>
        </div>
        <div class="content">
          <van-checkbox-group v-model="result" @change="checkeddata2">
            <div class="content_item" v-for="item in chexclist1">
              <van-checkbox :name="item" ref="checkboxes">
                <div class="acatac">
                  <img
                    src="https://static-legacy.dingtalk.com/media/lADPDiCpthdU0lfNBaHNBaA_1440_1441.jpg"
                    alt=""
                  />
                </div>
                <div class="neirong">
                  <div class="neirong_item">张华南提交的材料总计划-筑快OA</div>
                  <div class="neirong_item1">计划主题:222</div>
                  <div class="neirong_item1">所属项目:123456</div>
                  <div class="neirong_item1">备注:123456</div>
                  <div class="neirong_item1 neirong_item2">昨天</div>
                  <div class="neirong_item1">审批通过</div>
                </div>
              </van-checkbox>
            </div>
          </van-checkbox-group>
        </div>
      </van-tab>
      <van-tab title="我发起的">
        <div class="inputdiv">
          <van-search
            v-model="Searchname"
            placeholder="请填写搜索条件"
            show-action
            shape="round"
          >
            <div slot="action">
              <van-button type="default">搜索</van-button>
            </div>
          </van-search>
        </div>
        <div class="content">
          <van-checkbox-group v-model="result" @change="checkeddata2">
            <div class="content_item" v-for="item in chexclist2">
              <van-checkbox :name="item" ref="checkboxes">
                <div class="acatac">
                  <img
                    src="https://static-legacy.dingtalk.com/media/lADPDiCpthdU0lfNBaHNBaA_1440_1441.jpg"
                    alt=""
                  />
                </div>
                <div class="neirong">
                  <div class="neirong_item">张华南提交的材料总计划-筑快OA</div>
                  <div class="neirong_item1">计划主题:222</div>
                  <div class="neirong_item1">所属项目:123456</div>
                  <div class="neirong_item1">备注:123456</div>
                  <div class="neirong_item1 neirong_item2">昨天</div>
                  <div class="neirong_item1">审批通过</div>
                </div>
              </van-checkbox>
            </div>
          </van-checkbox-group>
        </div>
      </van-tab>
      <van-tab title="我收到的">
        <div class="inputdiv">
          <van-search
            v-model="Searchname"
            placeholder="请填写搜索条件"
            show-action
            shape="round"
          >
            <div slot="action">
              <van-button type="default">搜索</van-button>
            </div>
          </van-search>
        </div>
        <div class="content">
          <van-checkbox-group v-model="result" @change="checkeddata2">
            <div class="content_item" v-for="item in chexclist3">
              <van-checkbox :name="item" ref="checkboxes">
                <div class="acatac">
                  <img
                    src="https://static-legacy.dingtalk.com/media/lADPDiCpthdU0lfNBaHNBaA_1440_1441.jpg"
                    alt=""
                  />
                </div>
                <div class="neirong">
                  <div class="neirong_item">张华南提交的材料总计划-筑快OA</div>
                  <div class="neirong_item1">计划主题:222</div>
                  <div class="neirong_item1">所属项目:123456</div>
                  <div class="neirong_item1">备注:123456</div>
                  <div class="neirong_item1 neirong_item2">昨天</div>
                  <div class="neirong_item1">审批通过</div>
                </div>
              </van-checkbox>
            </div>
          </van-checkbox-group>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import qs from "qs";
export default {
  name: "approvallist",
  components: {},
  data() {
    return {
      chexclist1: ["1", "2", "3"],
      chexclist2: ["4", "5", "6"],
      chexclist3: ["7", "8", "9"],
      active: 0,
      Searchname: "",
      list: ["a", "b"],
      result: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    setTitle() {
      dd.ready(function () {
        dd.biz.navigation.setTitle({
          title: "审批列表", //控制标题文本，空字符串表示显示默认文本
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
      });
    },
    checkeddata2(e) {
      console.log(e);
    },
  },
  created() {
    this.$utils.checkding();
    this.setTitle();
  },
  mounted() {},
};
</script>
<style lang='less' >
#approvallist {
  .van-tabs {
    .van-tabs__wrap {
      height: 3rem;
      // margin-bottom: 0.5rem;
      .van-tabs__line {
        width: 40%;
        background-color: #1989fa;
      }
      .van-tab {
        font-size: 1.1rem;
        line-height: 3rem;
      }
    }
    .van-tabs__content {
      .van-tab__pane {
        .inputdiv {
          display: flex;
          align-items: center; /*定义body的元素垂直居中*/
          justify-content: center; /*定义body的里的元素水平居中*/
          width: 100%;
          height: 3rem;

          background-color: #e6e6e6;
          position: fixed;
          top: 3rem;
          .van-search {
            width: 100%;
            height: 100%;

            .van-search__action {
              font-size: 0.6rem;
              line-height: 1rem;
              background-color: #fff;
              .van-button {
                height: 1.8rem;
                width: 4rem;

                .van-button__text {
                  font-size: 1rem;
                }
              }
            }
            .van-search__action {
              height: 100%;
              line-height: 2.5rem;
              .van-button--normal {
                border-radius: 0.33rem;
                height: 2rem;
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
                font-size: 1rem;
                .van-field__left-icon {
                  .van-icon {
                    font-size: 1.2rem;
                  }
                }
              }
            }
          }
        }
        .content {
          margin-top: 3rem;
          .van-checkbox-group {
            .content_item {
              border-bottom: 0.1rem solid #f0f0f0;
              background-color: #fff;
              .van-checkbox {
                flex-flow: row-reverse !important;
                justify-content: space-between;
                align-items: inherit;
                padding: 0.5rem;

                .van-checkbox__icon {
                  font-size: 1.33rem;
                  margin-top: 0.16rem;
                }
                .van-checkbox__label {
                  width: 85%;
                  display: block;
                  display: flex;
                  margin-left: 0px;
                  .acatac {
                    padding: 0.33rem;
                    width: 3rem;
                    height: 3rem;

                    overflow: hidden;
                    img {
                      border-radius: 0.5rem;
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .neirong {
                    width: 80%;
                    line-height: inherit;

                    .neirong_item {
                      line-height: 1.67rem;
                      width: 100%;
                      font-size: 1.17rem;
                      font-weight: 600;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      color: #36424c;
                    }
                    .neirong_item1 {
                      width: 100%;
                      color: #7d8184;
                      line-height: 1.33rem;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    .neirong_item2 {
                      line-height: 1.67rem !important;
                      color: #000;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

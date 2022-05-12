<template>
    <!--  -->
    <div id='dingTaik'>
        <img
            @click="tuneUp"
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//SWRSMj5QSW1623894838382.png"
            alt=""
        >
    </div>
</template>

<script>
import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi';
import { Toast } from 'vant';
import openLink from 'dingtalk-jsapi/api/biz/util/openLink';
import close from 'dingtalk-jsapi/api/biz/navigation/close';
import { openTryoutSku } from 'dingtalk-design-libs';
import { contactAdminToUseApp } from 'dingtalk-design-libs';
// import { openTryoutSku } from 'dingtalk-design-libs/biz/openTryoutSku';
export default {
    name: 'dingTaik',
    components: {},
    data() {
        return {};
    },
    computed: {},
    watch: {
        // $route(to, from) {
        //     Toast(from.path); //从哪来
        //     // Toast(to.path); //到哪去
        // }
    },
    methods: {
        setTitle() {
            dd.ready(function () {
                dd.biz.navigation.setTitle({
                    title: '筑快OA', //控制标题文本，空字符串表示显示默认文本
                    onSuccess: function (result) {},
                    onFail: function (err) {}
                });
            });
        },

        tuneUp() {
            const that = this;

            const corpId = that.$route.query.corpId;
            const appId = '58708';
            const token = that.$route.query.purchaseToken;

            dd.ready(() => {
                openTryoutSku({
                    corpId: corpId,
                    appId: appId,
                    token: token
                    // miniAppId
                })
                    .then((res) => {
                        const {
                            // action的值为：
                            // 'ok'，用户执行了开通动作，或将自己加入了已开通的应用的可见范围内
                            // 'cancel', 用户点击了取消按钮
                            // 'unknown'，用户点击空白区域关闭了弹窗，此时可以跟cancel采取同样的处理逻辑
                            action,
                            // 开通了应用的组织的corpId。因为个人开通可能会用钉钉的隐藏组织，所以开通应用的组织的corpId以这里返回的为准。
                            corpId
                        } = res;
                        // action不是ok的情况下，可以不采取任何动作
                        console.log(res);
                        // Toast(res);
                        if (action === 'ok') {
                            const newurl =
                                'https://dingzhukuai.zzdingyun.com/app/mobile/index.html?corpid=' +
                                corpId;

                            // that.$router.replace(newurl);
                            dd.biz.navigation.replace({
                                url: newurl, // 新的页面链接
                                onSuccess: function (result) {},
                                onFail: function (err) {}
                            });
                        }
                    })
                    .catch(() => {
                        // 钉钉侧出现了技术异常，比如打开弹窗失败等，出现概率非常低
                    });
            });
        }
        // verification() {
        //     const that = this;
        //     // const corpId = 'dingea47c602975497f935c2f4657eb6378f';
        //     // dingea47c602975497f935c2f4657eb6378f;
        //     const corpId = that.$route.query.corpId;
        //     const appId = '58708';
        //     dd.ready(() => {
        //         contactAdminToUseApp({
        //             id: appId,
        //             corpId: corpId
        //         }).catch((err) => {
        //             // 入参不正确，或者遇到技术异常时才会进入这个链路
        //             console.error(err);
        //         });
        //     });
        // }
    },
    created() {
        this.setTitle();
        setTimeout(this.tuneUp(), 500);
    },

    mounted() {}
};
</script>
<style lang='less' >
    #dingTaik {
        height: 100vh;
        width: 100%;
        img {
            width: 100%;
        }
    }
</style>

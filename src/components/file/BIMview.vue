<template>
    <!--  -->
    <div id="BIMview">
        <div id="domId" style="width:100%;height:700px"></div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import { Toast } from 'vant';
import qs from 'qs';
export default {
    name: 'BIMview',
    components: {},
    data() {
        return {
            editPeople: [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        getRebort(stype) {
            const _this = this;
            let name, czconten;
            if (stype == 'delete') {
                czconten = '删除人员权限' + JSON.stringify(_this.editPeople);
                name = 6;
            } else if (stype == 'delete2') {
                czconten =
                    '删除人员权限' + JSON.stringify(_this.selectPowerPeople);
                name = 6;
            } else if (stype == 'edit') {
                czconten = '更改人员权限' + JSON.stringify(_this.editPeople);
                name = 6;
            } else if (stype == 'add') {
                czconten = '添加人员权限' + JSON.stringify(_this.editPeople);
                name = 6;
            } else if (stype == 'preview') {
                czconten = '预览文件';
                name = 1;
            }
            _this.$axios
                .post('/cy_xiezhu/CreatedJiLu', {
                    corp_id: _this.$store.state.userData.cid,
                    userid: _this.$store.state.userData.userid,
                    xmid: _this.$store.state.userData.Selecteddata.id,
                    fid: _this.$store.state.userData.managementList[0].id,
                    admin: _this.$store.state.userData.admin,
                    name: 6,
                    czconten: czconten,
                })
                .then((res) => {
                    if (res.data.code == 200) {
                    } else {
                    }
                });
        },
        setTitle() {
            dd.ready(function () {
                dd.biz.navigation.setTitle({
                    title: 'BIM预览', //控制标题文本，空字符串表示显示默认文本
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                });
            });
        },
        //预览BIMFACE
        previewBIM(id) {
            const _this = this;

            _this.$axios
                .post('/cy_xiezhu/BimFileYuLan', {
                    id: id,
                    admin: _this.$store.state.userData.admin,
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        // _this.viewToken = res.data.viewtoken;
                        // 设置BIMFACE JSSDK加载器的配置信息
                        let loaderConfig = new BimfaceSDKLoaderConfig();
                        loaderConfig.viewToken = res.data.viewtoken;
                        // 加载BIMFACE JSSDK加载器
                        BimfaceSDKLoader.load(
                            loaderConfig,
                            _this.successCallback,
                            _this.failureCallback
                        );
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        successCallback(viewMetaData) {
            // 创建WebApplication，直接显示模型或图纸
            let dom4Show = document.getElementById('domId');
            new Glodon.Bimface.Application.WebApplicationDemo(
                viewMetaData,
                dom4Show
            );
        },
        failureCallback(error) {
            console.log(error);
        },
    },
    created() {
        this.$utils.checkding();
        this.setTitle();
        this.previewBIM(this.$route.query.id);
    },
    mounted() {},
};
</script>
<style lang='less' >
#BIMview {
    width: 100%;
    min-height: 100%;
}
</style>

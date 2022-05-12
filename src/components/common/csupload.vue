<template>
    <!--  -->
    <div id='csupload'>
        <hupload></hupload>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import hupload from './hupload.vue';
import { Toast } from 'vant';
import qs from 'qs';
export default {
    name: 'csupload',
    components: { hupload },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {
        setTitle() {
            dd.ready(function () {
                dd.biz.navigation.setTitle({
                    title: '应用中心', //控制标题文本，空字符串表示显示默认文本
                    onSuccess: function (result) {},
                    onFail: function (err) {}
                });
            });
        }
    },
    created() {
        this.utils.checkding();
        this.setTitle();
    },
    mounted() {}
};
</script>
<style lang='less' >
    #csupload {
    }
</style>

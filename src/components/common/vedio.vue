<template>
    <!--  -->
    <div id='viedio'>
        <video
            x5-video-player-fullscreen="true"
            x5-playsinline
            playsinline
            webkit-playsinline
            id="myVideo"
            width="100%"
            height="100%"
            controls
            autoplay
            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/shipin/%E7%AD%91%E5%BF%ABOA%E4%BB%8B%E7%BB%8D%281%29.mp4"
        ></video>
    </div>
</template>

<script>
export default {
    name: 'viedio',
    components: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>
<style lang='less' >
    #viedio {
        height: 100vh;
        position: fixed;
        z-index: 1111143;
        width: 100%;
        top: 0;
        background-color: #000;
    }
</style>

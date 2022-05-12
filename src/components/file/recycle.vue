<template>
    <!--  -->
    <div id="tuzhi">
        <div class="inputdiv">
            <van-search
                v-model="Searchname"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
            >
                <div slot="action">
                    <van-button @click="onLoad" type="default">搜索</van-button>
                </div>
            </van-search>
        </div>

        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="file-content">
                <div
                    style="display: flex; width: 100%"
                    v-for="(item, index) in FilesList"
                >
                    <div
                        class="xiangmu"
                        style="width: 85%"
                        v-if="item.type == 'file'"
                    >
                        <div class="xmdiv xmimg">
                            <img :src="folderurl" alt />
                        </div>
                        <div class="xmdiv xmjindu">
                            <div class="xmjindu-item">
                                <div
                                    class="xmjindu-item-font"
                                    style="
                                        display: flex;
                                        align-items: center;
                                        height: 100%;
                                    "
                                >
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="xiangmu" style="width: 85%" v-else>
                        <div class="xmdiv xmimg">
                            <img :src="item.gurl" alt />
                        </div>
                        <div class="xmdiv xmjindu">
                            <div class="xmjindu-item">
                                <div class="xmjindu-item-font">
                                    {{ item.name }}
                                </div>
                                <div class="xmjindu-item-font1">
                                    {{ item.time }} {{ item.size }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="xmimg-shoucang">
                        <div class="img" @click="infile(item)">恢复</div>
                    </div>
                </div>
            </div>
        </van-list>

        <Empty v-if="Emptyshow"></Empty>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import { Toast } from 'vant';
import Empty from '../common/Empty.vue';
import qs from 'qs';
export default {
    name: 'tuzhi',
    components: { Empty },
    data() {
        return {
            Emptyshow: false,
            folderurl:
                'http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/kPzaQyH4Q21599188211884.png',
            FilesList: [
                {
                    gurl:
                        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png',
                    id: '7',
                    name: '锁.png',
                    size: '5.16 KB',
                    time: '2020-11-12 15:02:46',
                    type: 'OSS',
                },
            ],
            isLoading: false,
            loading: false, // 当loading为true时，转圈圈
            current_page: 1,
            loading: false, // 当loading为true时，转圈圈
            finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -

            typeid: '',
            currentPageid: '',
            typeId: '',
            //
            queryid: '',
            editPeople: [],
        };
    },
    computed: {},
    watch: {
        FilesList: {
            handler(val, oldval) {
                console.log(val.length);
                if (val.length > 0) {
                    this.Emptyshow = false;
                } else {
                    this.Emptyshow = true;
                }
            },
        },
    },
    methods: {
        setTitle() {
            dd.ready(function () {
                dd.biz.navigation.setTitle({
                    title: '回收站', //控制标题文本，空字符串表示显示默认文本
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                });
            });
        },

        onLoad() {
            this.getInfo();
            this.loading = true;
        },
        deunique(arr) {
            const res = new Map();
            return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
        },
        getInfo() {
            axios
                .post('/cy_xiezhu/HuiShouZhan', {
                    type: this.$store.state.userData.typeId,
                    corp_id: this.$store.state.userData.cid,
                    userid: this.$store.state.userData.userid,
                    xmid: this.$store.state.userData.Selecteddata.id,
                    admin: this.$store.state.userData.admin,

                    name: this.Searchname,

                    current_page: this.current_page,
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.loading = false;
                        if (!this.Searchname) {
                            if (res.data.content.list.length > 0) {
                                this.FilesList = this.deunique(
                                    this.FilesList.concat(res.data.content.list)
                                ); //追加数据
                                // this.FilesList.push(...res.data.content.list);
                            } else {
                                this.FilesList = res.data.content.list;
                                // this.Emptyshow = true;
                            }
                        } else {
                            this.FilesList = [];
                            this.FilesListthis.deunique(res.data.content.list); //追加数据
                        }
                        // page
                        if (
                            this.current_page == res.data.content.page ||
                            res.data.content.list.length == 0
                        ) {
                            //数据全部加载完成
                            this.finished = true;
                        } else {
                            this.current_page += 1;
                            this.finished = false;
                        }
                    }
                });
        },
        infile(item) {
            axios
                .post('/cy_xiezhu/HuanYuanFile', {
                    xmid: this.$store.state.userData.Selecteddata.id,
                    type: this.$store.state.userData.typeId,
                    corp_id: this.$store.state.userData.cid,
                    userid: this.$store.state.userData.userid,
                    admin: this.$store.state.userData.admin,
                    fids: [item.id],
                })
                .then((res) => {
                    Toast(res.data.msg);
                    this.FilesList = [];
                    this.current_page = 1;
                    this.loading = false;
                    this.finished = false;

                    this.onLoad();
                });
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
</style>

<template>
    <!-- 公司详情 -->
    <div id="creatxm">
        <van-form
            @submit="onSubmit"
            :colon="true"
        >
            <div class="itemurl">
                <div class="itemurlleft">项目头像</div>
                <div class="itemurlright">
                    <corpUpload
                        ref="myuplod"
                        @listenToChildEvent="showurl"
                        :upImgList="upImgList"
                        :licenceImg="licenceImg"
                        :isShow="isShow"
                    ></corpUpload>
                </div>
            </div>
            <van-field
                class="zh_vant_isprop"
                input-align="right"
                maxlength="50"
                v-model="cropFrom.name"
                name="公司全称"
                label="公司全称"
                placeholder="请填写公司全称"
                :rules="[{ required: true, message: '请填写公司全称' }]"
            />
            <van-field
                class="zh_vant_isprop"
                style="background-color: #f3f6fd"
                input-align="right"
                v-model="cropFrom.sub_name"
                name="公司简称"
                label="公司简称"
                placeholder="请填写公司简称"
                :rules="[{ required: true, message: '请填写公司简称' }]"
            />
            <van-field
                class="zh_vant_isprop"
                style="background-color: #f3f6fd"
                input-align="right"
                v-model="cropFrom.legal_person"
                name="法人"
                label="法人"
                placeholder="请填写法人"
                :rules="[{ required: true, message: '请填写法人' }]"
            />
            <van-field
                class="zh_vant_isprop"
                style="background-color: #f3f6fd"
                input-align="right"
                v-model="cropFrom.registered_capital"
                name="注册资金"
                label="注册资金"
                placeholder="请填写注册资金"
                :rules="[{ required: true, message: '请填写注册资金' }]"
            />
            <van-field
                class="zh_vant_isprop"
                style="background-color: #f3f6fd"
                input-align="right"
                v-model="cropFrom.address"
                name="详细地址"
                label="详细地址"
                placeholder="请填写详细地址"
                :rules="[{ required: true, message: '请填写详细地址' }]"
            />
            <van-field
                class="zh_vant_isprop"
                style="background-color: #f3f6fd"
                input-align="right"
                v-model="cropFrom.telephone"
                name="企业电话"
                label="企业电话"
                placeholder="请填写企业电话"
                :rules="[{ required: true, message: '请填写企业电话' }]"
            />
            <van-field
                class="zh_vant_isprop"
                style="background-color: #f3f6fd"
                input-align="right"
                v-model="cropFrom.organization_code"
                name="组织机构代码"
                label="组织机构代码"
                placeholder="请填写组织机构代码"
                :rules="[{ required: true, message: '请填写组织机构代码' }]"
            />
            <van-field
                class="zh_vant_isprop"
                style="background-color: #f3f6fd"
                input-align="right"
                v-model="cropFrom.business_license_code"
                name="营业执照编码"
                label="营业执照编码"
                placeholder="请填写营业执照编码"
                :rules="[{ required: true, message: '请填写营业执照编码' }]"
            />
            <van-field
                class="zh_vant_isprop"
                style="background-color: #f3f6fd"
                input-align="right"
                v-model="cropFrom.establish_time"
                name="成立时间"
                label="成立时间"
                placeholder="请填写成立时间"
                :rules="[{ required: true, message: '请填写成立时间' }]"
            />
            <van-field
                class="zh_vant_isprop"
                style="background-color: #f3f6fd"
                input-align="right"
                v-model="cropFrom.website"
                name="官网"
                label="官网"
                placeholder="请填写官网"
                :rules="[{ required: true, message: '请填写官网' }]"
            />

            <div class="sureBtn">
                <van-button
                    type="info"
                    native-type="submit"
                >确定</van-button>
                <van-button
                    type="warning"
                    @click="calc"
                >重置</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import corpUpload from '../common/corpUpload.vue';
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import { Toast } from 'vant';
import qs from 'qs';
import toast$ from 'dingtalk-jsapi/api/device/notification/toast';
export default {
    components: { corpUpload },
    name: 'creatxm',
    data() {
        return {
            cropFrom: {},
            isShow: ['1'],
            upImgList: '',
            licenceImg:
                'http://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/J58AFjtkRF1597825191159.png'
        };
    },
    computed: {},
    methods: {
        setTitle() {
            dd.ready(function () {
                dd.biz.navigation.setTitle({
                    title: '个人资料', //控制标题文本，空字符串表示显示默认文本
                    onSuccess: function (result) {},
                    onFail: function (err) {}
                });
            });
        },
        clac() {
            this.shenpinum = 0;
            this.typenum = 0;
            this.typename = '';
            this.shenpival = '';
        },
        showurl(data) {
            console.log(data + '55555');
            this.cropFrom.logo = data;
            this.licenceImg = data;
        },
        getinfo() {
            const _this = this;

            _this.$axios
                .post('/index.php/api/dapplication/companyInformation')
                .then((res) => {
                    if (res.data.code == 1) {
                        _this.cropFrom = res.data.data;
                    } else {
                        Toast(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        onSubmit() {
            const _this = this;

            _this.$axios
                .post('/index.php/api/dapplication/companyDeal', _this.cropFrom)
                .then((res) => {
                    if (res.data.code == 1) {
                        Toast(res.data.msg);
                    } else {
                        Toast(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {},
    created() {
        this.$utils.checkding();
        this.setTitle();
        this.getinfo();
    }
};
</script>
<style lang="less">
    #creatxm {
        .itemurl {
            padding: 0 0.46875rem;
            height: 3.125rem;

            position: relative;

            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            width: 100%;

            overflow: hidden;
            color: #323233;
            font-size: 0.4375rem;
            line-height: 0.75rem;

            background-color: #fff;
            .itemurlleft {
                color: #646566;
                height: 100%;
                line-height: 3.125rem;
                font-size: 1.09375rem;
                padding-left: 0.3125rem;
            }
            .itemurlright {
                position: relative;

                color: #969799;
                text-align: right;
                vertical-align: middle;
                word-wrap: break-word;
                display: flex;
                align-items: center;
                img {
                    height: 100%;
                }
            }
        }
    }
</style>

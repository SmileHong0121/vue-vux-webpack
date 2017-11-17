<template>
    <div class="sponsor-data-contain">
        <x-header :left-options="{showBack: false}">深圳市南山区规划局
            <span slot="left" @click="goBack"><i class="fa fa-angle-left"></i></span>
            <span slot="right" @click="saveData">保存</span>
        </x-header>
        <div class="sponsor-data-title">主办客户经理申请问卷</div>

        <group>
            <span @click="relationDetail = !relationDetail">
              <cell title="Q1.您认识该客户的关系人">
                <i v-show="relationDetail" class="fa fa-angle-up"></i><i v-show="!relationDetail" class="fa fa-angle-down"></i>
              </cell>
            </span>
            <transition name="collapse">
                <div v-show="relationDetail">
                    <div class="relation-detail-list">
                        <div class="relation-detail-list-title">关系人1</div>
                        <div @click="showSelectPost">
                            <cell is-link style="font-family: PingFangSC-Regular; background-color: #ffffff; font-size: 16px; color: #999999">
                                <span slot="title" style="color:#666666;"><span style="vertical-align:middle;"><span>职位</span><span style="color: #FF6500;vertical-align: middle"> *</span></span></span>
                                <span slot="value">{{ postValue }}</span>
                            </cell>
                        </div>
                        <div @click="ActionSheetShow">
                            <cell :value="relationPersonValue" is-link style="font-family: PingFangSC-Regular; background-color: #ffffff; font-size: 16px; color: #999999">
                                <span slot="title" style="color:#666666;"><span style="vertical-align:middle;"><span>关系</span><span style="color: #FF6500;vertical-align: middle"> *</span></span></span>
                            </cell>
                        </div>
                        <cell style="font-family: PingFangSC-Regular; background-color: #ffffff; font-size: 16px; color: #999999;">
                            <span slot="title" style="color:#666666;"><span style="vertical-align:middle;"><span>名片扫描</span><span style="color: #FF6500;vertical-align: middle"> *</span></span></span>
                            <span slot="value"><i class="fa fa-address-card-o"></i></span>
                        </cell>
                        <div class="card-img-contain">
                            <span v-for="(item, index) in cardImg"><img :src="item" /><i class="fa fa-minus-circle"></i></span>
                        </div>

                        <cell style="font-family: PingFangSC-Regular; background-color: #ffffff; font-size: 16px; color: #999999;">
                            <span slot="title" style="color:#666666;"><span style="vertical-align:middle;"><span>证明材料：</span></span></span>
                        </cell>

                        <div @click="showInputDesc">
                            <div v-show="!isRelationDescText" class="relation-desc-text-none">请在此添加文字描述</div>
                            <div v-show="isRelationDescText" class="relation-desc-text-show">{{ relationDescText }}</div>
                        </div>

                        <div class="prove-img-contain">
                            <span v-for="(item, index) in proveImg"><img :src="item" /><i class="fa fa-minus-circle"></i></span>
                            <span class="prove-img-add-btn" style="border: none"><img src="data:image/png;base64,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"/></span>
                        </div>
                    </div>
                    <div class="add-relation-person-btn"><span><i class="fa fa-plus"></i>&nbsp;添加关系人</span></div>
                </div>
            </transition>
        </group>

        <group>
            <span @click="visitDetail = !visitDetail"><cell title="Q2.您是否能在一周内促成双方高层拜访"><i v-show="visitDetail" class="fa fa-angle-up"></i><i v-show="!visitDetail" class="fa fa-angle-down"></i></cell></span>
            <transition name="collapse">
                <div v-show="visitDetail">
                    <div class="is-show-contain">
                        <label class="demo-label">
                            <input class="demo-radio" type="radio" name="isVisit" value="是" v-model="isVisitPicked">
                            <span class="demo-radioInput"></span>是
                        </label>
                        <label class="demo-label">
                            <input class="demo-radio" type="radio" name="isVisit" value="否" v-model="isVisitPicked">
                            <span class="demo-radioInput"></span>否
                        </label>
                    </div>

                    <div class="is-show-desc-contain" v-show="isVisitPicked==='是'">
                        <div v-show="!isVisitDescText" class="relation-desc-text-none">请在此添加文字描述</div>
                        <div v-show="isVisitDescText" class="relation-desc-text-show">{{ visitDescText }}</div>

                        <div class="prove-img-contain">
                            <span v-for="(item, index) in visitImg"><img :src="item" /><i class="fa fa-minus-circle"></i></span>
                            <span class="prove-img-add-btn" style="border: none"><img src="data:image/png;base64,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"/></span>
                        </div>
                    </div>

                </div>
            </transition>
        </group>

        <group>
            <span @click="protocolDetail = !protocolDetail"><cell title="Q3.客户是否与我司签署过战协"><i v-show="protocolDetail" class="fa fa-angle-up"></i><i v-show="!protocolDetail" class="fa fa-angle-down"></i></cell></span>
            <transition name="collapse">
                <div v-show="protocolDetail">
                    <div class="is-show-contain">
                        <label class="demo-label">
                            <input class="demo-radio" type="radio" name="isProtocol" value="是" v-model="isProtocolPicked">
                            <span class="demo-radioInput"></span>是
                        </label>
                        <label class="demo-label">
                            <input class="demo-radio" type="radio" name="isProtocol" value="否" v-model="isProtocolPicked">
                            <span class="demo-radioInput"></span>否
                        </label>
                    </div>

                    <div class="is-show-desc-contain" v-show="isProtocolPicked==='是'">
                        <div v-show="!isProtocolDescText" class="relation-desc-text-none">请在此添加文字描述</div>
                        <div v-show="isProtocolDescText" class="relation-desc-text-show">{{ protocolDescText }}</div>

                        <div class="prove-img-contain">
                            <span v-for="(item, index) in protocolImg"><img :src="item" /><i class="fa fa-minus-circle"></i></span>
                            <span class="prove-img-add-btn" style="border: none"><img src="data:image/png;base64,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"/></span>
                        </div>
                    </div>
                </div>
            </transition>
        </group>

        <group>
            <span @click="insideDetail = !insideDetail" class="inside-detail"><cell title="Q4.您对客户内部关键信息是否了解" inline-desc="(高层人员变动、重大业务决策、财务信息)"><i v-show="insideDetail" class="fa fa-angle-up"></i><i v-show="!insideDetail" class="fa fa-angle-down"></i></cell></span>
            <transition name="collapse">
                <div v-show="insideDetail">
                    <div class="is-show-contain">
                        <label class="demo-label">
                            <input class="demo-radio" type="radio" name="isInside" value="是" v-model="isInsidePicked">
                            <span class="demo-radioInput"></span>是
                        </label>
                        <label class="demo-label">
                            <input class="demo-radio" type="radio" name="isInside" value="否" v-model="isInsidePicked">
                            <span class="demo-radioInput"></span>否
                        </label>
                    </div>

                    <div class="is-show-desc-contain" v-show="isInsidePicked==='是'">
                        <div v-show="!isInsideDescText" class="relation-desc-text-none">请在此添加文字描述</div>
                        <div v-show="isInsideDescText" class="relation-desc-text-show">{{ insideDescText }}</div>

                        <div class="prove-img-contain">
                            <span v-for="(item, index) in insideImg"><img :src="item" /><i class="fa fa-minus-circle"></i></span>
                            <span class="prove-img-add-btn" style="border: none"><img src="data:image/png;base64,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"/></span>
                        </div>
                    </div>
                </div>
            </transition>
        </group>

        <group>
            <span @click="surveyDetail = !surveyDetail"><cell title="Q5.您是否能联合我司在企业内开展调研活动"><i v-show="surveyDetail" class="fa fa-angle-up"></i><i v-show="!surveyDetail" class="fa fa-angle-down"></i></cell></span>
            <transition name="collapse">
                <div v-show="surveyDetail">
                    <div class="is-show-contain">
                        <label class="demo-label">
                            <input class="demo-radio" type="radio" name="isSurvey" value="是" v-model="isSurveyPicked">
                            <span class="demo-radioInput"></span>是
                        </label>
                        <label class="demo-label">
                            <input class="demo-radio" type="radio" name="isSurvey" value="否" v-model="isSurveyPicked">
                            <span class="demo-radioInput"></span>否
                        </label>
                    </div>

                    <div class="is-show-desc-contain" v-show="isSurveyPicked==='是'">
                        <div v-show="!isSurveyDescText" class="relation-desc-text-none">请在此添加文字描述</div>
                        <div v-show="isSurveyDescText" class="relation-desc-text-show">{{ surveyDescText }}</div>

                        <div class="prove-img-contain">
                            <span v-for="(item, index) in surveyImg"><img :src="item" /><i class="fa fa-minus-circle"></i></span>
                            <span class="prove-img-add-btn" style="border: none"><img src="data:image/png;base64,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"/></span>
                        </div>
                    </div>
                </div>
            </transition>
        </group>

        <div class="submit-contain"><p @click="submitBtn">提交</p></div>


        <div v-transfer-dom>
            <loading v-model="showLoading" :text="loadText"></loading>
            <toast v-model="showToast" :text="toastText"></toast>
        </div>

        <actionsheet
                v-model="isActionSheet"
                :menus="ActionSheetList"
                @on-click-menu="clickActionSheet"
                show-cancel
                @on-click-menu-other="clickActionSheetOther">
        </actionsheet>


        <div class="input-name-contain" v-transfer-dom>
            <popup v-model="isShowInputName" position="bottom" height="100%">
                <x-header style="background-color: #ffffff;" :left-options="{showBack: false}"><span slot="left" @click="InputNameCloseBtn"><i class="fa fa-close"></i></span><span style="color: #000000">关系</span><span slot="right" @click="InputNameConfirmBtn">确定</span></x-header>
                <x-input
                        style="background-color: #ffffff; border-top: 0.5px solid rgba(10,9,9,0.31)"
                        placeholder="请输入关系"
                        v-model="InputNameValue">
                </x-input>
            </popup>
        </div>

        <div class="input-desc-contain" v-transfer-dom>
            <popup v-model="isShowInputDesc" position="bottom" height="100%">
                <x-header style="background-color: #ffffff;" :left-options="{showBack: false}">
                    <span slot="left" @click="InputDescCloseBtn"><i class="fa fa-close"></i></span>
                    <span style="color: #000000">输入文字描述</span><span slot="right" @click="InputDescConfirmBtn">确定</span>
                </x-header>
                <group>
                    <x-textarea
                            style="font-size: 16px; color: #999999; font-family: PingFangSC-Regular"
                            :max="1000"
                            :rows="15"
                            v-model="relationDescText"
                            placeholder="请输入文字描述"
                            @on-focus="onEvent('focus')"
                            @on-blur="onEvent('blur')">
                    </x-textarea>
                </group>
            </popup>
        </div>


        <div class="select-post-contain" v-transfer-dom>
            <popup v-model="isShowSelectPost" position="bottom" height="100%" style="background-color: #ffffff">
                <x-header style="background-color: #ffffff;" :left-options="{showBack: false}">
                    <span slot="left" @click="SelectPostCloseBtn"><i class="fa fa-close"></i></span>
                    <span style="color: #000000">选择关系人的职位</span><span slot="right" @click="SelectPostConfirmBtn">确定</span>
                </x-header>
                <div class="checker-post-contain">
                    <checker v-model="PostListValue" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                        <div v-for="(item, index) in PostList">
                            <p class="post-title">{{ item.postTitle }}</p>
                            <checker-item :value="items" v-for="(items, index) in item.postName" :key="index">{{items.value}}</checker-item>
                        </div>
                    </checker>
                    <br>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import {
        XHeader,
        CellBox,
        Cell,
        Group,
        XButton,
        XInput,
        Loading,
        Toast,
        Actionsheet,
        Popup,
        Checker,
        CheckerItem,
        XTextarea,
        TransferDomDirective as TransferDom
    } from 'vux'
    export default {
        data () {
            return {
                relationDetail: false,
                visitDetail: false,
                insideDetail: false,
                protocolDetail: false,
                surveyDetail: false,
                postValue: '请选择职位',
                relationPersonValue: '请选择关系',
                cardImg: [
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png'
                ],
                relationDescText: '',
                isRelationDescText: false,
                proveImg: [
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png'
                ],
                isVisitPicked: '否',
                visitImg: [
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png'
                ],
                visitDescText: '',
                isVisitDescText: false,
                isProtocolPicked: '否',
                protocolImg: [
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png'
                ],
                protocolDescText: '',
                isProtocolDescText: false,
                isInsidePicked: '否',
                insideImg: [
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png'
                ],
                insideDescText: '',
                isInsideDescText: false,
                isSurveyPicked: '否',
                surveyImg: [
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png',
                    'https://vuejs.com.cn/static/img/666.f10de80.png'
                ],
                surveyDescText: '',
                isSurveyDescText: false,
                showLoading: false,
                loadText: '',
                showToast: false,
                toastText: '',
                ActionSheetList: {
                    actionMenu1: '北京烤鸭',
                    actionMenu2: '陕西油泼面',
                    actionMenu3: '西安肉夹馍',
                    actionMenu4: '客家酿豆腐',
                    other: '其他'
                },
                isActionSheet: false,
                isShowInputName: false,
                isShowInputDesc: false,
                isShowSelectPost: false,
                InputNameValue: '',
                SelectPostValue: [],
                PostList: [
                    {
                        postTitle: '决策人',
                        postName: [
                            {
                                key: '1',
                                value: '董事长'
                            },
                            {
                                key: '2',
                                value: '总经理'
                            },
                            {
                                key: '3',
                                value: 'CEO'
                            },
                            {
                                key: '4',
                                value: '大股东'
                            }
                        ]
                    },
                    {
                        postTitle: '关键人',
                        postName: [
                            {
                                key: '1',
                                value: 'CTO'
                            },
                            {
                                key: '2',
                                value: 'CFO'
                            },
                            {
                                key: '3',
                                value: '人事总监'
                            },
                            {
                                key: '4',
                                value: '市场总监'
                            }
                        ]
                    },
                    {
                        postTitle: '其他',
                        postName: [
                            {
                                key: '1',
                                value: '经办人'
                            },
                            {
                                key: '2',
                                value: '负责人'
                            }
                        ]
                    }
                ],
                PostListValue: null,
                InputDescValue: ''
            }
        },
        methods: {
            submitBtn () {
                this.$router.push({path: '/finsh'})
            },
            saveData () {
                this.loadText = '保存中...'
                this.toastText = '保存成功'
                this.showLoading = true
                setTimeout(() => {
                    this.showLoading = false
                }, 2000)
                setTimeout(() => {
                    this.showToast = true
                }, 2000)
            },
            ActionSheetShow () {
                this.isActionSheet = true
            },
            clickActionSheet (key, item) {
                console.log(key, item)
                this.relationPersonValue = item
            },
            clickActionSheetOther () {
                this.isShowInputName = true
            },
            showSelectPost () {
                this.isShowSelectPost = true
            },
            showInputDesc () {
                this.isShowInputDesc = true
            },
            InputNameConfirmBtn () {
                this.isShowInputName = false
                if (this.InputNameValue === '' || this.InputNameValue === null) {
                    this.relationPersonValue = '请选择关系'
                } else {
                    this.relationPersonValue = this.InputNameValue
                }
                console.log(this.InputNameValue)
            },
            InputNameCloseBtn () {
                this.isShowInputName = false
                this.relationPersonValue = '请选择关系'
            },
            SelectPostConfirmBtn () {
                this.isShowSelectPost = false
                if (this.PostListValue === null) {
                    this.postValue = '请选择职位'
                } else {
                    let strPostValue = ''
                    console.log(this.PostListValue.length)
                    for (var i = 0; i < this.PostListValue.length; i++) {
                        if (i === this.PostListValue.length - 1) {
                            strPostValue += this.PostListValue[i].value
                        } else {
                            strPostValue += this.PostListValue[i].value + ','
                        }
                    }
                    this.postValue = strPostValue
                }
            },
            SelectPostCloseBtn () {
                this.isShowSelectPost = false
            },
            InputDescCloseBtn () {
                this.isShowInputDesc = false
            },
            InputDescConfirmBtn () {
                this.isShowInputDesc = false
                console.log(this.relationDescText)
                // this.relationDescText = this.InputDescValue
            },
            onEvent (event) {
                console.log('on', event)
            },
            goBack () {
                console.log('fffff')
            }
        },
        updated () {
            if (this.relationDescText === '') {
                this.isRelationDescText = false
            } else {
                this.isRelationDescText = true
            }

            if (this.visitDescText === '') {
                this.isVisitDescText = false
            } else {
                this.isVisitDescText = true
            }
        },
        directives: {
            TransferDom
        },
        components: {
            XHeader,
            CellBox,
            Cell,
            Group,
            XButton,
            Loading,
            Toast,
            Popup,
            Actionsheet,
            XInput,
            Checker,
            XTextarea,
            CheckerItem
        }
    }
</script>

<style scoped>
    .sponsor-data-contain{
        background-color: #ECECEC;
        height: 100%;
    }
    .vux-header{
        background-color: #FF6500;
    }
    .vux-header .vux-header-right span{
        color: #ffffff;
    }
    .vux-header .vux-header-left,.vux-header .vux-header-left span{
        color: #ffffff;
    }
    .fa-angle-left{
        font-size: 25px;
        vertical-align: top;
        margin-top: -4px;
    }
    .sponsor-data-title{
        width: 100%;
        padding: 0 12px;
        height: 50px;
        line-height: 50px;
        color: #999999;
        font-size: 16px;
        font-family: PingFangSC-Medium;
    }
    .weui-cell{
        padding: 0 12px;
        height: 48px;
        background-color: #F8F8F8;
        color: #151515;
        font-size: 17px;
        font-family: PingFangSC-Medium;
    }
    .input-desc-contain .weui-cell{
        height: auto;
        background-color: #ffffff;
        padding: 12px;
    }
    .inside-detail .weui-cell{
        height: 78px;
    }
    .collapse-enter{
        max-height: 0;
    }
    .collapse-enter-active {
        max-height: 10rem;
        -webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .collapse-leave {
        max-height: 10rem;
    }
    .collapse-leave-active {
        max-height: 0;
        -webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .relation-detail-list-title{
        padding: 0 12px;
        height: 46px;
        line-height: 46px;
        font-family: PingFangSC-Medium;
        color: #333333;
    }
    .relation-detail-list .fa-address-card-o{
        color: #3A8DFF;
        font-size: 16px;
    }
    .card-img-contain,.prove-img-contain{
        padding: 0 12px;
    }
    .card-img-contain span,.prove-img-contain span{
        display: inline-block;
        width: 60px;
        height: 60px;
        border: 0.5px solid #B6BABE;
        margin: 12px 9px 12px 0;
        position: relative;
        box-sizing: border-box;
    }
    .card-img-contain span img,.prove-img-contain span img{
        width: 60px;
        height: 60px;
    }
    .card-img-contain span .fa-minus-circle,.prove-img-contain span .fa-minus-circle{
        color: red;
        position: absolute;
        top: -11px;
        right: -6px;
    }
    .card-img-contain span:nth-child(n+5),.prove-img-contain span:nth-child(n+5){
        margin: 0px 9px 12px 0;
    }
    .prove-img-add-btn{
        width: 61px;
        height: 61px;
    }
    .relation-desc-text-none{
        margin: 0 12px;
        height: 48px;
        line-height: 48px;
        color: #999999;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        border-bottom: 1px solid #B6BABE;
    }
    .relation-desc-text-show{
        margin: 0 12px;
        height: 48px;
        line-height: 48px;
        color: #999999;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        border-bottom: 1px solid #B6BABE;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis
    }
    .weui-cell:before{
        border: none;
    }
    .add-relation-person-btn{
        height: 54px;
        background-color: rgba(58, 141, 255, 0.2);
        text-align: center;
        line-height: 54px;
        font-size: 18px;

    }
    .add-relation-person-btn span{
        display: inline-block;
        width: 100%;
        height: 54px;
        color: #3A8DFF;
    }

    .is-show-contain{
        padding: 0 12px;
        height: 60px;
        line-height: 60px;
    }
    .submit-contain{
        width: 100%;
        padding: 0 27px;
        box-sizing: border-box;
        margin: 40px auto;
    }
    .submit-contain p{
        text-align: center;
        height: 48px;
        line-height: 48px;
        background-color: #FF6500;
        border-radius: 100px;
        font-family: PingFangSC-Medium;
        color: #ffffff;
        font-size: 18px;
    }
    .demo-label{margin:0px 40px 0 0;display:inline-block}
    .demo-radio{display:none}
    .demo-radioInput{background-color:#fff;border:1px solid rgba(0,0,0,0.15);border-radius:100%;display:inline-block;height:16px;margin-right:10px;margin-top:-1px;vertical-align:middle;width:16px;line-height:1}
    .demo-radio:checked + .demo-radioInput:after{background-color:#FF6500;border-radius:100%;content:"";display:inline-block;height:12px;margin:2px;width:12px}
    .demo-checkbox.demo-radioInput,.demo-radio:checked + .demo-checkbox.demo-radioInput:after{border-radius:0}
    .vux-popup-dialog{
        background-color: #ECECEC;
    }
    .input-name-contain .fa-close,.select-post-contain .fa-close,.input-desc-contain .fa-close{
        font-size: 18px;
        color: #000000;
    }
    .input-name-contain .vux-header .vux-header-right span,
    .select-post-contain .vux-header .vux-header-right span,
    .input-desc-contain .vux-header .vux-header-right span{
        color: #000000;
    }
    .checker-post-contain{
        border-top: 0.5px solid rgba(10,9,9,0.31);
        width: 100%;
        padding: 0px 12px;
        box-sizing: border-box;
    }
    .post-title{
        color: #999999;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        height: 22px;
        line-height: 22px;
        margin-bottom: 10px;
        padding-top: 20px;
    }
    .demo1-item {
        border: 1px solid #C4CBD2;
        line-height: 32px;
        border-radius: 64px;
        color: #999999;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        margin-right: 14px;
        width: 25%;
        text-align: center;
        margin-bottom: 16px;
    }

    .demo1-item-selected {
        border: 1px solid #FF6500;
        color: #FF6500;
    }
    .weui-cell__ft{
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
</style>

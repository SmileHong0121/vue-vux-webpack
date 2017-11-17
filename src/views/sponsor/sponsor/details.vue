<template>
    <div class="look-desc-contain">
        <x-header :left-options="{showBack: false}">主办客户经理申请详情
            <span slot="left" @click="goBack"><i class="fa fa-angle-left"></i></span>
            <span slot="right" @click="changeData">修改</span>
        </x-header>
        <div class="look-desc-audit-steps-contain">
            <div class="look-desc-audit-steps">
                <div class="steps-unit-contain">
                    <i v-show="false" class="fa fa-clock-o"></i>
                    <i class="fa fa-check-circle"></i>
                    <p>提交成功</p>
                    <p class="steps-active">提交成功</p>
                </div>
            </div>
            <p class="look-desc-audit-text">正在审核中，预计在 {{dayNumber}} 工作日内反馈结果</p>
        </div>

        <group class="client-name-contain">
            <cell>
                <span slot="title">客户名称</span>
                <span style="color: #333333; font-family:PingFangSC-Regular;font-size: 16px; "  slot="value">{{ clientName }}</span>
            </cell>
        </group>

        <group>
            <span @click="relationDetail = !relationDetail">
              <cell>
                  <span slot="title">Q1.您认识该客户的关系人</span>
                  <span slot="value">
                      <i v-show="relationDetail" class="fa fa-angle-up"></i>
                      <i v-show="!relationDetail" class="fa fa-angle-down"></i>
                  </span>
              </cell>
            </span>
        </group>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib'
    import { XHeader, Cell, Group } from 'vux'
    export default {
        data () {
            return {
                dayNumber: 3,
                clientName: '深圳市人力资源局',
                relationDetail: false
            }
        },
        methods: {
            changeData () {
                console.log('ffff')
            },
            goBack () {
                console.log('ddd')
            }
        },
        components: {
            XHeader,
            Cell,
            Group
        }
    }
</script>

<style scoped>
    .look-desc-contain{
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
        margin-top: -2px;
    }
    .look-desc-audit-steps-contain{
        height: 176px;
        background-color: #ffffff;
    }
    .look-desc-audit-steps{
        height: 122px;
        padding: 30px;
        box-sizing: border-box;
    }
    .look-desc-audit-text{
        text-align: center;
        font-size: 16px;
        color: #333333;
        font-family: PingFangSC-Regular;
    }
    .steps-unit-contain{
        width: 48px;
        height: 63px;
    }
    .steps-unit-contain .fa-clock-o,.steps-unit-contain .fa-check-circle{
        font-size: 45px;
        color: #FF6500;
        margin: 0 auto;
        text-align: center;
        margin-left: 4px;
    }
    .steps-unit-contain .fa-clock-o{
        opacity:0.5;
    }
    .steps-unit-contain .fa-check-circle{
        opacity: 1;
    }
    .steps-unit-contain p{
        font-size: 12px;
        color: #FFA76D;
    }
    .steps-active{
        color: #FF6500;
    }
    .client-name-contain .weui-cell{
        padding: 14px 12px;
        font-family: PingFangSC-Regular;
        color: #333333;
        font-size: 16px;
    }

</style>

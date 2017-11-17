<template>
    <div class="commit-finsh-contain">
        <x-header :left-options="{backText: ''}">深圳市南山区规划局</x-header>
        <div class="finsh-img-contain">
            <img src="data:image/png;base64,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"></div>
        <div class="finsh-text-contain">提交成功</div>
        <div class="finsh-text-hide-contain">在{{ mouth }}月{{ day }}日审核前可修改申请材料<br />预计在 {{ dayNumber }} 工作日内反馈结果</div>
        <div class="finsh-btn-contain">
            <p @click="finshBtn">完成</p>
            <p @click="goLookDesc">查看申请详情</p>
        </div>
    </div>
</template>

<script>
  import Lib from 'assets/js/Lib'
  import { XHeader } from 'vux'
  export default {
      data () {
          return {
              mouth: 12,
              day: 30,
              dayNumber: 3
          }
      },
      methods: {
          finshBtn () {
              console.log('finshBtn')
          },
          goLookDesc () {
//              this.$router.push({path: '/apply/desc'})
              console.log('fffff')
          }
      },
      components: {
          XHeader
      }
  }
</script>
<style scoped>
    .commit-finsh-contain{
        background-color: #ECECEC;
        height: 100%;
    }
    .vux-header{
        background-color: #FF6500;
    }
    .finsh-img-contain{
        text-align: center;
        height: 200px;
    }
    .finsh-img-contain img{
        width: 100px;
        margin-top: 90px;
    }
    .finsh-text-contain{
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;
    }
    .finsh-text-hide-contain{
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        line-height: 20px;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 70px;
    }
    .finsh-btn-contain{
        width: 100%;
        padding: 0 27px;
        box-sizing: border-box;
        margin: 40px auto;
    }
    .finsh-btn-contain p{
        text-align: center;
        height: 48px;
        line-height: 48px;
        border-radius: 100px;
        font-family: PingFangSC-Medium;
        margin-bottom: 20px;
        font-size: 18px;
    }
    .finsh-btn-contain p:nth-child(1){
        background-color: #FF6500;
        color: #ffffff;
    }
    .finsh-btn-contain p:nth-child(2){
        background-color: #ffffff;
        color: #FF6500;
    }
</style>
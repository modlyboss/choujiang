<template>
  <div class="homepage">
    <img :src="homepageUrl" class="homepageBg"/>
    <div v-if="!isWin">
      <img :src="logoUrl" class="logo"/>
      <div class="backgroundDiv"><img :src="bgUrl" class="background"/></div>
      <div :src="btnUrl" class="btn"/>
      <div class="prizeList">
        <img
          v-for="index in 12"
          class="prizeImg"
          :src="currentIndex === index ? coverActiveUrl : coverUrl"
          :key="index"
        />
      </div>
      <img :src="btnUrl" class="btn" @click="clickBtn()"/>
    </div>
    <div v-if="isWin" class="win">
      <img :src="winBg" class="winBg"/>
      <img :src="winItem.url" class="winImg">
      <img v-show="isLucky" :src="luckyBtn" class="tryBtn"/>
      <img v-show="!isLucky" :src="tryBtn" class="tryBtn" @click="tryAgain()"/>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      homepageUrl: require('../assert/image/boy/盲盒男友待抽奖背景.jpg'),
      logoUrl: require('../assert/image/boy/盲盒男友标题.png'),
      bgUrl: require('../assert/image/boy/抽奖机.png'),
      coverUrl: require('../assert/image/boy/盲盒12.png'),
      coverActiveUrl: require('../assert/image/boy/盲盒1.png'),
      btnUrl: require('../assert/image/boy/抽盲盒按钮.png'),
      tryBtn: require('../assert/image/boy/再爱我一次.png'),
      luckyBtn: require('../assert/image/boy/一发入魂.png'),
      winBg: require('../assert/image/girl/盲盒女友射线.png'),
      prizeRate: 50, //中奖率
      prizeCount: 3, //中将次数
      isClick: false,
      isWin: false,
      isLucky: false,
      centerDialogVisible: false,
      winItem: {
        name: '1',
        id: 1,
        url: require('../assert/image/boy/霸总男友.png')
      },
      boyList: [
        '霸总男友',
        '病娇男友',
        '爹系男友',
        '抖S男友',
        '狼狗男友',
        '邻家男友',
        '猫系男友',
        '奶狗男友',
        '年上男友',
        '土味男友',
        '元气男友'
      ],
      currentIndex: -1,
    }
  },
  mounted() {
    console.log('homepage挂载')
  },
  methods:{
    clickBtn () {
      console.log('点击按钮')
      if (this.isClick) return
      this.prizeCount =  this.prizeCount - 1
      console.log(this.prizeCount)
      if (this.prizeCount < 0) {
        const h = this.$createElement;
        this.$notify({
          message: h('i', { style: 'color: teal'}, '抽奖次数为0，请稍后在试')
        });
        return ''
      }
      const length = parseInt(String(Math.random()*15))
      console.log(length)
      let count = 0
      const timer = setInterval(() => {
        this.isClick = true
        this.currentIndex = count > 12 ? count - 12 : count
        count = count + 1
        console.log(this.currentIndex)
        if (this.currentIndex > length) {
          this.isClick = false
          clearInterval(timer)
          this.getWin()
        }
      }, 600)
    },
    getWin () {
      this.currentIndex = -1
      this.isWin = true
      if (Math.random() > this.prizeRate / 100) {
        this.winItem.url = require('../assert/image/boy/欧皇降临 .png')
        this.isLucky = true
        return ''
      }
      console.log(this.isLucky)
      this.isLucky = false
      const index = Math.floor(Math.random() * this.boyList.length)
      this.winItem.url = require('../assert/image/boy/' + this.boyList[index] +'.png')
    },
    tryAgain () {
      this.isWin = false
    }
  }
}

</script>

<style lang="less">
.homepage {
  width: 100%;
  height: 100%;
  .homepageBg {
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
    left: 0;
    top: 0;
  }
  .winBg {
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
    left: 0;
    top: 0;
  }
  .box-card {
    margin: 10%;
    font-size: 16px;
  }
  .logo {
    position: relative;
    margin: 10% 0 5% 0;
    width: 90%;
    height: 10%;
  }
  .backgroundDiv {
    position: absolute;
    left: 50%;
    width: 83%;
    .background {
      position: relative;
      top: -50%;
      left: -50%;
      width: 100%;
    }
  }
  .prizeList {
    width: 60%;
    margin-left: 20%;
    position: relative;
    .prizeImg {
      width: 25%;
      margin: 3%;
    }
  }
  .btn {
    position: relative;
    margin-top: 10%;
    width: 40%;
    margin-right: 20%;
    background-color: #fff;
    font-size: 16px;
  }
  .win {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .winImg {
      margin-top: 30%;
      width: 70%;
    }
    .tryBtn{
      margin-top: 10%;
      width: 20%;
      background-color: #F9CDAD;
    }
  }
}

</style>

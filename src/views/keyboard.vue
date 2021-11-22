
<template>
  <div v-show="keyShow" :class="close ? 'hide' : '' " class="keyboard">
    <div v-if="(type === 'money' || type === 'number')&&!isShowABC" class="moeny">
      <div class="money-right">
        <div
          v-for="item in moneyKeyR"
          :key="item"
          class="money-key key-item"
          @click.stop="handleClick(item)">
          <img v-if="item === 'back'" src="@/assets/key-back.png" class="key-icon" alt="">
          <span v-else>{{item}}</span>
        </div
          v-for="item in moneyKeyR">
      </div>
      <div class="money-left">
        <div
          v-for="item in moneykeyL"
          :key="item"
          class="money-btn key-item"
          :class="{'red-confirm':item === 'confirm', 'clear':item === 'clear'}"
          @click.stop="handleClick(item)">
          <img v-if="item === 'delete'" src="@/assets/key-delete.png" class="key-icon" alt="">
          <span v-else>{{item === 'clear' ? '清空' : '确定'}}</span>
        </div>
      </div>
    </div>
    <div v-if="type==='code'&&!isShowABC" class="code">
      <div
        v-for="item in codeKey"
        :key="item"
        class="code-key key-item"
        @click.stop="handleClick(item)">
        <img v-if="item === 'back'" src="@/assets/key-back.png" class="key-icon" alt=""/>
        <img v-else-if="item === 'delete'" src="@/assets/key-delete.png" class="key-icon" alt=""/>
        <span v-else>{{item}}</span>
      </div>
    </div>
    <div v-if="isShowABC" class="code-abc">
      <div class="abcLine">
        <div
          v-for="item in abcKeyLine1"
          :key="item"
          class="abc-key1 key-item"
          @click.stop="handleClick(item)">
          {{item}}
        </div>
        <div
          v-for="item in abcKeyLine2"
          :key="item"
          :class="['key-item', item === 'delete' ? 'abc-delete' : 'abc-key2']"
          @click.stop="handleClick(item)">
          <img v-if="item === 'delete'" src="@/assets/key-delete.png" class="key-icon" alt=""/>
          <span v-else>{{item}}</span>
        </div>
        <div
          v-for="item in abcKeyLine3"
          :key="item"
          class="key-item"
          :class="{'abc-123': item === '123', 'abc-confirm': item === 'confirm', 'abc-back': item === 'back'}"
          @click.stop="handleClick(item)">
          <img v-if="item === 'back'" src="@/assets/key-back.png" class="key-icon" alt=""/>
          <span v-else>{{item === 'confirm' ? '确定' : item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyBoard',
  props: {
    type: {
      type: String,
      default: 'money'
    },
    value: {
      type: String,
      default: ''
    },
    maxLength: {
      type: String,
      default: '15'
    }
  },
  data () {
    return {
      moneyKeyR: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'],
      moneykeyL: ['clear', 'delete', 'confirm'],
      codeKey: ['600', '1', '2', '3', '300', '4', '5', '6', '00', '7', '8', '9', 'ABC', '0', 'delete', 'back'],
      abcKeyLine1: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      abcKeyLine2: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'delete'],
      abcKeyLine3: ['123', 'back', 'confirm'],
      isShowABC: false,
      innerValue: '',
      keyShow: '',
      close: false,
      keyEnter: false,
      inputFocus: false,
      cursorIndex: 0
    }
  },
  watch: {
    value (val) {
      this.innerValue = val
    },
    type (val) {
      this.moneyKeyR[9] = val === 'number' ? '000' : '.'
      this.isShowABC = false
    }
  },
  mounted () {
    this.innerValue = this.value
  },
  methods: {
    keyboardBlur() {
      this.keyEnter = false
      !this.inputFocus && this.closekeyboard()
    },
    handleClick (item) {
      this.keyEnter = true
      console.log('你点击了： ' + item)
      let length = this.innerValue.length
      switch (item) {
        case 'back':
        case 'confirm':
          this.closekeyboard()
          return ''
        case 'ABC':
          this.isShowABC = true
          return ''
        case '123':
          this.isShowABC = false
          return ''
        case 'delete':
          length !== 0 && (this.innerValue = this.innerValue.slice(0, length - 1))
          break
        case 'clear':
          this.innerValue = ''
          break
        case '.':
          if (this.innerValue.length >= Number(this.maxLength)) { return '' }
          if (length === 0) {
            this.innerValue = '0.'
          } else if (this.innerValue.split('.').length > 1) {
            this.innerValue = this.innerValue[length - 1] === '.' ? this.innerValue.slice(0, length - 1) : this.innerValue
          } else {
            this.innerValue = this.innerValue + item
          }
          break
        case '600':
          if (this.innerValue.length + 3 > Number(this.maxLength)) { return '' }
          this.innerValue = this.innerValue + item
          break
        case '300':
          if (this.innerValue.length + 3 > Number(this.maxLength)) { return '' }
          this.innerValue = this.innerValue + item
          break
        case '000':
          if (this.innerValue.length + 3 > Number(this.maxLength)) { return '' }
          if (!(this.type === 'number' && length === 0)) {
            this.innerValue = this.innerValue + item
          }
          break
        case '00':
          if (this.innerValue.length + 2 > Number(this.maxLength)) { return '' }
          this.innerValue = this.innerValue + item
          break
        case '0':
          if (this.innerValue.length >= Number(this.maxLength)) { return '' }
          if (!(this.type === 'number' && length === 0)) {
            this.innerValue = this.innerValue + item
          }
          break
        default:
          if (this.innerValue.length >= Number(this.maxLength)) { return '' }
          this.innerValue = this.innerValue.slice(0, this.cursorIndex) + item + this.innerValue.slice(this.cursorIndex, length)
          this.cursorIndex = this.cursorIndex + 1
      }
      console.log(this.innerValue)
      this.$emit('change', this.innerValue)
      this.$emit('changeCursor', this.cursorIndex)
    },
    openKeyboard  (index) {
      this.cursorIndex = index
      this.keyShow = true
      this.innerValue = this.value
      this.close = false
    },
    closekeyboard () {
      this.isShowABC = false
      this.keyEnter = false
      this.close = true
      this.$emit('close')
      setTimeout(() => {
        this.keyShow = false
      }, 300)
    }
  }
}
</script>

<style lang='less' scoped>
.key-item {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.5px solid #e2e4ea;
  font-size: 52px;
  font-weight: 500;
  color: #111a34;
  background-color: #fff;
}
.key-item:active {
  background-color: #e2e4ea
}
.key-icon {
  height: 45px;
  width: 65px;
}
.clear {
  font-size: 36px
}
.red-confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.5px solid #e2e4ea;
  background-color: #E8302E;
  color: #fff;
  font-size: 36px;
}
.keyboard {
  width: 100%;
  background-color: #fff;
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  animation: animate 0.4s;
  overflow: hidden;
  .moeny {
    display: flex;
    .money-right {
      width: 75%;
      display: flex;
      flex-wrap: wrap;
      .money-key {
        width: 33.3%;
        height: 100px;
      }
    }
    .money-left {
      width: 25%;
      display: flex;
      flex-direction: column;
      .money-btn {
        width: 100%;
        height: 100px;
      }
      .money-btn:last-child {
        height: 200px;
      }
    }
  }
  .code {
    display: flex;
    flex-wrap: wrap;
    .code-key {
      height: 100px;
      width: 25%;
    }
  }
  .code-abc {
    display: flex;
    .abcLine {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      .abc-key1 {
        width: 10%;
        height: 100px;
      }
      .abc-key2 {
        width: 12%;
        height: 100px;
      }
      .abc-delete {
        width: 16%;
        height: 100px;
      }
      .abc-123 {
        width: 24%;
        height: 100px;
      }
      .abc-back {
        width: 52%;
        height: 100px;
      }
      .abc-confirm {
        width: 24%;
        height: 100px;;
        font-size: 36px;
        color: #fff;
        background-color: #E8302E;
      }
    }
  }
}
@keyframes animate {
  from {
    bottom: -400px;
  }
  to {
    bottom: 0px;
  }
}
.hide {
  animation: hide 0.3s;
}
@keyframes hide {
  from {
    bottom: 0px;
  }
  to {
    bottom: -400px;
  }
}
</style>

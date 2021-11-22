<template>
  <div class="cb-keyboard-example">
    <input
      class="input"
      ref="input1"
      v-model="value1"
      @click="focus1()"
      v-on:blur="inputBlur1()"
      placeholder="11111111111111"
    />
    <input
      class="input"
      ref="input2"
      v-model="value2"
      @click="focus2()"
      v-on:blur="inputBlur2()"
      placeholder="11111111111111"
    />
    <CbKeyboard
      ref="CbKeyboard1"
      v-model="value1"
      type="money"
      maxLength="15"
      @changeCursor="changeCursor1(arguments)"/>
    <CbKeyboard
      ref="CbKeyboard2"
      v-model="value2"
      type="code"
      maxLength="6"
      @changeCursor="changeCursor2(arguments)"/>
  </div>
</template>

<script>
import CbKeyboard from '../../src/views/keyBoard'
export default {
  name: 'example',
  components: {
    CbKeyboard
  },
  data() {
    return {
      focusIndex: 0,
      value1: '',
      value2: ''
    }
  },
  methods: {
    focus1() {
      this.$refs.input1.setAttribute('readonly', 'readonly')
      setTimeout(() => {
        this.$refs.input1.removeAttribute('readonly')
      }, 100)
      this.focusIndex = 1
      this.$refs.CbKeyboard1.inputFocus = false
      this.$refs.CbKeyboard1 && this.$refs.CbKeyboard1.openKeyboard(this.$refs.input1.selectionStart)
    },
    inputBlur1() {
      setTimeout(() => {
        if (this.focusIndex === 1 && this.$refs.CbKeyboard1.keyEnter) {
          this.$refs.input1.setAttribute('readonly', 'readonly')
          setTimeout(() => {
            this.$refs.input1.removeAttribute('readonly')
          }, 100)
          this.$refs.input1.focus()
        } else {
          this.$refs.CbKeyboard1.inputFoucs = false
          this.$refs.CbKeyboard1.closekeyboard()
        }
      }, 100)
    },
    changeCursor1(args) {
      setTimeout(()=>{
        this.$refs.input1.setSelectionRange(args[0], args[0])
      })
    },
    focus2() {
      this.$refs.input2.setAttribute('readonly', 'readonly')
      setTimeout(() => {
        this.$refs.input2.removeAttribute('readonly')
      }, 10)
      this.focusIndex = 2
      this.$refs.CbKeyboard2.inputFocus = false
      this.$refs.CbKeyboard2 && this.$refs.CbKeyboard2.openKeyboard(this.$refs.input2.selectionStart)
    },
    inputBlur2() {
      setTimeout(() => {
        if (this.focusIndex === 2 && this.$refs.CbKeyboard2.keyEnter) {
          this.$refs.input2.focus()
        } else {
          this.$refs.CbKeyboard2.inputFoucs = false
          this.$refs.CbKeyboard2.closekeyboard()
        }
      }, 100)
    },
    changeCursor2(args) {
      setTimeout(()=>{
        this.$refs.input2.setSelectionRange(args[0], args[0])
      })
    },
  }
}
</script>

<template>
  <div id="app">
    <router-view class="main"/>
  </div>
</template>

<script>

export default {
  components: {},
  name: 'App'
}
</script>

<style>
body{font-size:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
*{
  margin: 0;
  padding: 0;
}
.main{
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>

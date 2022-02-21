<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  created() {
    // 1. 브라우저에서 직접 요청
    this.corsRequest() 
    // 2. 개발 서버를 이용해서 프록시 요청
    // this.proxyRequest()
  },
  methods: {
    corsRequest() {
      axios.get("/api/users")
      .then((res) => {
        console.log('corsRequest res', res)
      })
      .catch((error) => {
        console.log('corsRequest error', error)
      })
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

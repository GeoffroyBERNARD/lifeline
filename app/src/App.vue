<template>
  <div id="app">
    <VerticalLifeline />
  </div>
</template>

<script>
import VerticalLifeline from './components/VerticalLifeline.vue'

export default {
  name: 'app',
  components: {
    VerticalLifeline
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

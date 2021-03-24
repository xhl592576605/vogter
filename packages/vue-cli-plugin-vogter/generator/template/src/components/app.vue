<template>
  <div id="logo">
    <img alt="Vue logo"
         src="resource/assets/logo.png">
    <component v-if="asymcComp"
               :is="asymcComp"
               msg="Welcome to Your Vue.js Umd-App" />
  </div>
</template>

<script>
/**
 * app 程序主入口
 * @displayName app
 */
export default {
  name: 'App',
  data () {
    return {
      asymcComp: null
    }
  },
  components: {

  },
  mounted () {
    window.require(['/views/hello-word/index.js'], module => {
      const helloWorld = (module.__esModule === true ? module.default : module)
      this.asymcComp = helloWorld
    })
  }
}
</script>

<style>
#logo {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

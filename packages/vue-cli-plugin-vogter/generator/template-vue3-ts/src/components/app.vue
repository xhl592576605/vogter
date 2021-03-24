<template>
  <img alt="Vue logo"
       src="resource/assets/logo.png">
  <component v-if="asymcComp"
             :is="asymcComp"
             msg="Welcome to Your Vue3.js TypeScript-Umd-App" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
export default defineComponent({
    name: 'App',
    setup() {
        const asymcComp = defineAsyncComponent(
            () =>
                new Promise((resolve) => {
                    window.require(['/views/hello-word/index.js'], (module) => {
                        const helloWorld =
                            module.__esModule === true ? module.default : module
                        resolve(helloWorld)
                    })
                })
        )
        return {
            asymcComp,
        }
    },
})
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

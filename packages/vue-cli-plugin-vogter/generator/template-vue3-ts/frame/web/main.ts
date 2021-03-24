import { createApp, h } from 'vue'

window.require(['/views/app/index.js'], module => {
  const app = (module.__esModule === true ? module.default : module)
  createApp({
    render: () => {
      return h('div',
        { attrs: { id: 'app' }, class: `app--theme` },
        [
          h(app)
        ])
    }
  }).mount('#app')
})


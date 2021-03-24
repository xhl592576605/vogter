# vue-cli-umd-plugin-demo
> 一个将入口搬移，组件分模块，全局umd加载组件的vue3框架

### 特点
1. 分离了官方vue的基础机制，将main.js，route.js，store.js 分离出来，根据多页面的形式，单独一套出来。具体查看**frame**文件夹
2. **frame**是框架核心，与页面组件，通用组件分离，可以单独发布，单独运行
3. **views**内的组件，或者**compenents**内的组件，都可以单独单独，单独运行
4. 框架采用了异步组件的形式，均可以编译成单个的umd文件，发布时不必要项目全部发布
5. 多种命令，一定有你的菜

### 命令
- 检查代码  
``` "lint": "vue-cli-service lint" ```
- 编译框架，运行views的组件   
``` "serve": "run-p \"build:frame -- --watch\" serve:views" ```
- 编译项目  
``` "build": "npm run build:frame  && npm run build:views" ```
- 运行框架  
``` "serve:frame": "vue-cli-service serve -c ./frame/entry.conf.js -d ```
- 编译框架    
``` "build:frame": "vue-cli-service build -c ./frame/entry.conf.js --no-clean" ```
- 运行views   
``` "serve:views": "vue-cli-service serve -v ./views -d" ```
- 编译views   
``` "build:views": "vue-cli-service build -v ./views --no-clean --report"```
- 运行views.local   
``` "serve:local": "vue-cli-service serve -v ./views.local -d" ```
- 编译view.local  
```  "build:local": "vue-cli-service build -v ./views.local --no-clean" ```
- 调试  
``` node --inspect-brk=9229  ./node_modules/@vue/cli-service/bin/vue-cli-service.js serve -v ./views -d --debug ```


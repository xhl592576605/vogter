# guradian

## 框架特点
  1. 将框架与业务分开，框架为frame 业务为各组件
  2. 采用模块化，将配置好的模块（业务，通用）组件编译成js，动态加载组件，达到随时替换，无需修改个bug，就要编译整个项目
  3. 多命令，形成本地开发，业务开发，框架开发，组件示例多个命令，总有一款你想要的
## 框架命令
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
  - 运行views.styleguidist   
  ``` "serve:styleguidist": "vue-cli-service styleguidist -v ./views.styleguidist -d" ```
  - 编译view.styleguidist  
  ```  "build:styleguidist": "vue-cli-service styleguidist:build -v ./views.styleguidist --no-clean" ```
  - 调试  
  ``` node --inspect-brk=9229  ./node_modules/@vue/cli-service/bin/vue-cli-service.js serve -v ./views -d --debug ```


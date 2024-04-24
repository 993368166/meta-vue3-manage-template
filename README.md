# 玛特宇宙vue3后台管理模板

该模板应该可以帮助您开始在VITE中使用Vue 3进行开发。

## node版本

推荐node版本 20.0.0+ npm版本 9.8.0

## 自定义配置

查看 [Vite Configuration Reference](https://vitejs.dev/config/).

### 下载依赖

```sh
npm install
```

### 启动开发模式

```sh
npm run dev
```

### 生产环境打包

```sh
npm run build-prd
```

### 预发环境打包

```sh
npm run build-release
```

### 测试环境打包

```sh
npm run build-test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 目录结构
    |-- .env.development            // 开发环境变量
    |-- .env.production             // 生产环境变量
    |-- .env.release                // 预发环境变量
    |-- .env.test                   // 测试环境变量
    |-- .eslintrc.cjs
    |-- .gitignore
    |-- .prettierrc.json
    |-- index.html
    |-- jsconfig.json
    |-- package.json
    |-- README.md
    |-- vite.config.js
    |-- vitest.config.js
    |-- yarn.lock
    |-- public
    |   |-- favicon.ico
    |-- src
        |-- App.vue
        |-- main.js
        |-- api                     // 通用接口
        |   |-- index.js    
        |-- assets
        |   |-- styles
        |       |-- global.scss
        |       |-- reset.scss
        |-- components              // 通用组件
        |   |-- wangEditor          // 富文本组件
        |       |-- index.vue
        |-- layout                  // 布局文件
        |   |-- index.module.scss
        |   |-- index.vue
        |   |-- components
        |       |-- SubMenuRender
        |           |-- index.vue
        |-- router
        |   |-- index.js
        |-- service
        |   |-- axios.js
        |   |-- qiniuRequest.js     // 七牛云请求拦截
        |   |-- request.js          // 通用请求拦截
        |-- static                  // 静态资源
        |   |-- logo.png
        |   |-- 401_images
        |   |   |-- 401.gif
        |   |-- 404_images
        |       |-- 404.png
        |       |-- 404_cloud.png
        |-- store                   // 状态管理
        |   |-- index.js
        |   |-- loading.store.js
        |   |-- routes.store.js
        |   |-- staticData.store.js
        |   |-- user.store.js
        |-- util                    // 工具
        |   |-- enumerate.js        // 通用枚举
        |-- views                   // 页面
            |-- 404.vue
            |-- login
                |-- index.vue

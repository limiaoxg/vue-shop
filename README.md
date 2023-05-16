# 商城项目

## 一、项目的初始化

### 01-项目主要的技术栈

​	vue3 + typescript + vite + pinia + vant

### 02-项目的必要配置

如果是vite3的版本，需要进行这些配置

配置shims-vue.d.ts 

```ts
/* eslint-disable */
//这样才能引入.vue文件，并且自动的定义引入defineComponent
declare module '*.vue' {
    //声明默认引入 defineComponent 类型
    import type { DefineComponent } from 'vue';
    //声明该模块默认定一个vueComponent变量
    const vueComponent: DefineComponent<{}, {}, any>;
    //声明默认暴露一个vueComponent
    export default vueComponent;
}
```

### 03-重置样式

为了解决浏览器之间的初始样式差异，我们需要使用到重置css，把一切样式重置为标准状态。我们可以使用现成的第三方库-normalize.css 

```
npm install normalize.css 
```

全局引入

### 04-自适应的支持

我们可以获取宽度然后设置body的大小

```
    let deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
    document.querySelector('html').style.fontSize = deviceWidth / 7.5 + 'px';
```

然后我们根据设计图的比例，去换算。比如我们设计图的是750px的宽度，一个div在设计图上是50px，那么我们就给他设计为50/（750/7.5）=0.5rem

借助一个库

```js
npm i postcss-px-to-viewport -D
```

编写一个.postcssrc.js来配置

```js
module.exports = {
    plugins: {
        "postcss-px-to-viewport": {
            unitToConvert: "px", // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
        }
    }
};
```

### 05-安装组件库

vant安装

#### 组件引入（按需引入）

利用插件来实现：

```
npm install -D unplugin-vue-components
```

然后配置vite.config.js

```js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import { VantResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

#### 工具函数组件引入

Vant 中有个别组件是以函数的形式提供的，包括 `Toast`，`Dialog`，`Notify` 和 `ImagePreview` 组件。在使用函数组件时，`unplugin-vue-components` 无法自动引入，因此需要手动引入 

```js
// Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';
// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';
// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';
// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';
```

#### 自定义组件样式

直接利用style修改

```js
<van-button :style="{ width: '120px', height: '30px' }" type="success" @click="f1">按钮</van-button>
```

也可以通过class修改，不过如果scope下记得穿透

```js
<script setup lang="ts">
 
</script>

<template>
  <div class="content">
    <van-button class="mybutton" type="success" @click="f1">按钮</van-button>
  </div>
  <div class="test"> </div>
</template>
<style scoped>
 
.mybutton {
  width: 120px;
  height: 30px;
}
/*如果是组件深层次class，要通过deep穿透覆盖*/
:deep.mybutton .van-button__text {
  color: red;
}
</style>
```

### 06-配置路由

#### 创建404页面
在路由中配置重定向到404页面
#### 编写路由

### 07-配置请求层
前端是静态的，我们页面最终展示的数据必然要从后端接口请求过来，所以我们要通过请求接口去获取数据

项目接口地址：http://121.89.205.189:3000/

接口文档：http://121.89.205.189:3000/apidoc/#api-Banner-GetBannerList
#### axios
#### axios基本使用
```js
// 1. 基本语法, config 请求配置
axios(config)

// 2. url - 请求地址
// 	  config - 请求配置
axios(url, config)

// 3. 请求方式别名
axios.get(url, config)
axios.post(url, data, config)
axios.delete(url, config)
axios.put(url, data, config)
axios.patch(url, data, config)
// ...
```
conif的配置内容
```js
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认值

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // 自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)
      
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值
      
  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值
  },
}
```

#### 进一步封装axios
创建一个utils文件夹
在request中进一步封装axios
```js
const request = axios.create({
    baseURL:'http://121.89.205.189:3000/',
    timeout:3000*5
})
```
//请求拦截
```JS
request.interceptors.request.use(config => {
    //加上一个标记，让后端知道这个请求时合法的-token
    //token-用户登录之后，后端会返回给你一个token
    //取出存在localstorage中的token
    let token = localStorage.getItem('token')
    //如果有token则在请求头上加上token
    if (token) {
        config.headers.token = token
    }
    return config
}, error => {
    return Promise.reject(error)
})
```
//响应拦截
```js
request.interceptors.response.use(response => {
    //响应默认处理，兜底处理
    //这里时请求成功了，当时后端认为不合理
    //如果请求不是成功，就提示错误信息
    if (response.data?.code !== "200") {
        showNotify(response.data.msg)
    }
    if (response.data?.code === "10119") {
        router.push("/login")
    }
    return response;
}, (error) => {
    //这里请求直接没发过去
    let {
        response
    } = error
    if (response) {
        showNotify(response.status)
    }
    return Promise.reject(error)
})
```
#### 进一步封装请求的api
1，创建api文件夹

2，按接口模块创建文件

3，把该模块url地址都写成方法，如下-**pro.ts文件**
```js
import request from "../server/axios"
type paramsType = {
    id: number
}
type listParams = {
    count?: number,
    limitNum?: number
}
export function hotword(params?: paramsType) {
    return request({
        url: "/pro/hotword",
        method: "get",
        params: {
            ...params
        }
    })
}

export function list(params?: listParams) {
    return request({
        url: "/pro/list",
        method: "get",
        params: {
            ...params
        }
    })
}
```



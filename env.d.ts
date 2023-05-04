/// <reference types="vite/client" />
//项目用ts必须要有的配置
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
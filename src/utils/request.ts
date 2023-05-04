import axios from 'axios'
import {showNotify} from 'vant'
import router from  '@/router/index'
const request = axios.create({
    baseURL: 'http://121.89.205.189:3000/api',
    timeout: 3000 * 5
})
//请求拦截
request.interceptors.request.use(config => {
    //加上一个标记，让后端知道这个请求时合法的-token
    //token-用户登录之后，后端会返回给你一个token
    //取出存在localstorage中的token
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.token = token
    }
    return config
}, error => {
    return Promise.reject(error)
})
//响应拦截
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
    //这里的错误是指请求没有发送到货单
    let {
        response
    } = error
    if (response) {
        showNotify(response.status)
    }
    return Promise.reject(error)
})
export default request;
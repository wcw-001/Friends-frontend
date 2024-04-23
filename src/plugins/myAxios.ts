// Set config defaults when creating the instance

import axios from "axios";

const myAxios = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:8081/api' : 'http://friend.wcw231407.cn/api',
});
myAxios.defaults.withCredentials = true
//请求头携带cookie
myAxios.defaults.timeout = 25000;
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求了")
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
let token = sessionStorage.getItem("token");
// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {

    //未登录跳转到登录页
    if(response?.data.code === 40100){
        console.log("我收到响应了"+response)
        const redirectUrl = window.location.href;
        window.location.href =  `/user/login?redirect=${redirectUrl}`;
    }
    //对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
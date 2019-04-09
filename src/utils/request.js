import axios from 'axios';
import { Message } from 'element-react';

const service = axios.create({
  //  baseURL: 'http://image.baidu.com/channel//listjson?pn=0&rn=30&tag1=壁纸&tag2=全部',
    baseURL: 'https://gank.io/api/data/',
    timeout: 5000
})

service.interceptors.request.use(req => {
    return req;
}, err => {
    Message({
        message: err.message,
        type: 'error',
        duration: 3 * 1000
    })
})

service.interceptors.response.use(res=>{
    return res.data
}, err => {
    Message({
        message: err.message,
        type: 'error',
        duration: 3 * 1000
    })
})

export default service;

import {getPic} from "../api/pic";
import {Message} from "element-react";
import {store} from '../redux/index';
import {addPirUrl} from "../redux/actions";

let flag = 0;
export function getPicUrl (req) {
    let res =  req.results;
    let urls = [];
    if(res) {
        for( let index in res ) {
            // 防止遍历到可枚举的继承属性
            // 之所以用Object的prototype上的hasOwnProperty是因为hasOwnProperty没有被JS保护，自定义的属性可以命名为hasOwnProperty
            if(Object.prototype.hasOwnProperty.call(res, index)) urls[index] = res[index].url
        }
    }
    return urls
}

// 滑动请求的逻辑
export function scrollGet(html) {
    console.log('再次请求');
    getPic().then(req => {
        clearTimeout(window.timer);
        window.timer = void 0;
        const urls= getPicUrl(req);
        let pics = this.state.pics.map((item)=>{return item});
        pics = [...pics, ...urls];
        if(pics.length > 20) {
            let part = pics.splice(0, urls.length);
            let key = ++ flag + '';
            window.sessionStorage.setItem(key, JSON.stringify(part));
        }
        store.dispatch(addPirUrl(pics));
        this.setState({
            pics: store.getState().pitUrl
        })
    }).catch(err => {
        Message({
            message: err.message,
            type: 'error',
            duration: 3 * 1000
        })
    })
}

export function rollBack() {
    if(flag) {
        let part = window.sessionStorage.getItem(flag + '');
        let pics = this.state.pics.map((item)=> item);
        pics = [...JSON.parse(part), ...pics];
        this.setState({
            pics
        })
    }
}

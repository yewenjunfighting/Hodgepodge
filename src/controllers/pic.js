import {getPic} from "../api/pic";
import {Message} from "element-react";
import {store} from '../redux/index';
import {addPirUrl} from "../redux/actions";

export function getPicUrl (req) {
    let res =  req.results
    let urls = []
    if(res) {
        for( let index in res ) urls[index] = res[index].url
    }
    return urls
}

export function scrollGet(html) {
    console.log('再次请求')
    getPic().then(req => {
        const urls= getPicUrl(req)
        let pics = this.state.pics.map((item)=>{return item})
        pics = [...pics, ...urls]
        store.dispatch(addPirUrl(pics))
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

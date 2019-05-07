import React, { Component, Fragment, Suspense } from "react"
import { Message } from 'element-react'
import ErrorBoundary from '../../ErrorBoundary/index'

import './index.css'
import { getPic, setIndex } from '../../../api/pic.js'
import { getPicUrl, scrollGet, rollBack} from "../../../controllers/pic";
import { HomePage } from '../../PageTitle/index.js'
import { store } from '../../../redux/index'
import { addPirUrl } from '../../../redux/actions'

const PicItem = React.lazy(() => import ('../../Pic/PicItem'))

class Pics extends Component {
    constructor (props) {
        super(props);
        this.state = {
            pics: [],
        };
        this.deletePic = this.deletePic.bind(this);
        this.scrollReq = this.scrollReq.bind(this)
    }

    scrollReq(){
        const html = document.querySelector('html');
        let scrollTop = html.scrollTop;
        const clientHeight = html.clientHeight;
        let scrollHeight = html.scrollHeight;
        // 用节流来防止scrollGet函数被频繁的触发
        if(scrollHeight === clientHeight + scrollTop) {
            if(!window.timer){
                window.timer = setTimeout(scrollGet.bind(this, html), 1000);
            }
            // 当scrollTop为0时, 要把sessionStorage存储的picture url加入到pics中
        }else if(scrollTop === 0) rollBack.call(this)
    }

    componentDidMount() {
        window.addEventListener('resize', (function(){
                let timeStamp = 0;
                let timer = void 0;
                let run = (wait)=>{
                    timer = setTimeout(()=>{
                        let time = new Date().getTime();
                        if(time - timeStamp < wait) {
                            timeStamp = time;
                            run(wait)
                        }else {
                            console.log('执行');
                            timer = void 0;
                        }
                    }, wait);
                };
                return function() {
                    timeStamp = new Date().getTime();
                    if(!timer) {
                        run(1000);
                    }
                }
        }()), false);
        window.addEventListener('scroll', this.scrollReq, false);
        // 输出初始的store
        console.log(store.getState());
        getPic().then(req => {
            const urls =  getPicUrl(req);
            console.log(urls);
            // 创建reducer
            store.dispatch(addPirUrl(urls));
            // 输出dispatch后的store
            console.log(store.getState());
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

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollReq);
        delete window.a;
        // 重置请求位
        setIndex();
        // 删除存储的picture url
        window.sessionStorage.clear();
    }

    deletePic(url) {
        let index = this.state.pics.indexOf(url);
        if(index !== -1) {
            this.setState((state) => {
                state.pics.splice(index, 1);
                console.log(state.pics);
                return {
                    pics: state.pics
                }
            })
        }
    }

    render() {
        const pics = this.state.pics;
        const deletePic = this.deletePic;
        return (
            <ErrorBoundary>
                <Fragment>
                    <HomePage></HomePage>
                    <div className="grid">
                        <div className="grid-sizer"></div>
                       {
                           pics.map((item, index)=>{
                                return (
                                    <Suspense fallback={<div>Loading...</div>} key={index}>
                                        <PicItem picUrl={item} deletePic={deletePic} />
                                    </Suspense>
                                )
                           })
                       }
                   </div>
                </Fragment>
            </ErrorBoundary>
        )
    }

}

export  default Pics  ;

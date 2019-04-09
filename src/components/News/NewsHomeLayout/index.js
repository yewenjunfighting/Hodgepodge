import React, { Component } from 'react';
import Lantern from '../Lantern'
import { getNews } from '../../../api/news'
import NewsLink from '../NewsLink'

import './index.css'
class NewsHomeLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lanternImgUrl: [],
            link: [],
            title: []
        }
    }
    componentDidMount() {
        getNews().then(res=>{
            let news = res.showapi_res_body.pagebean.contentlist
            let link = []
            let title = []
            let lanternImgUrl = []
            news.forEach((value)=>{
                // 取出图片的url
                if(value.havePic) {
                    lanternImgUrl.push({
                        url: value.imageurls[0].url,
                        link: value.link
                    })
                }
                link.push(value.link)
                title.push(value.title)
            })
            this.setState({
                lanternImgUrl: lanternImgUrl,
                link: link,
                title: title
            })
            console.log(this.state)
        }).catch(()=>{
            console.log('接口异常')
        })

        // getPic().then((res)=>{
        //     console.log(res)
        // }).catch(err=>{
        //     alert(err)
        //     console.log(err)
        // })
    }

    render() {
        let imgUrls = this.state.lanternImgUrl
        let link = this.state.link
        let title = this.state.title
        return (
            <div id="new">
                <div id="newLan">
                    <Lantern  imgs={imgUrls}/>
                </div>
                <div id="newTitle">
                    <NewsLink link={link.slice(0, 10)} title={title.slice(0, 10)} />
                    <NewsLink link={link.slice(10, 20)} title={title.slice(10, 20)}/>
                </div>
            </div>
        )
    }
}

export default NewsHomeLayout;

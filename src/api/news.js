import $ from "jquery";
import formatterDateTime from "../controllers/news";

export function getNews() {
    return new Promise((res, rej)=>{
        $.ajax({
            type: 'post',
            url: 'http://route.showapi.com/109-35',
            dataType: 'json',
            data: {
                "showapi_timestamp": formatterDateTime(),
                "showapi_appid": '78816', //这里需要改成自己的appid
                "showapi_sign": '71cbafa11053462da0e3433b63420b12',  //这里需要改成自己的应用的密钥secret
                "channelId":"",
                "channelName":"",
                "title":"足球",
                "page":"1",
                "needContent":"0",
                "needHtml":"0",
                "needAllList":"0",
                "maxResult":"20",
                "id":""

            },

            error: function(XmlHttpRequest, textStatus, errorThrown) {
                alert('请查看网络是否连接或者新闻接口是否异常')
                rej()
            },
            success: function(result) {
                res(result)
            }
        });
    })
}

export function picDisable(url) {
    let xhr = new XMLHttpRequest()
    //console.log('请求')
    try {
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.response)
                return true
            }else {
                return false
            }
        }
        xhr.open('head', url)
        xhr.send()
    }catch(error) {
        return false
    }
}

export async function getImg(urls) {
    let img = []
    let flag = false
    //console.log(urls)
    for(let i = 0; i < urls.length; i ++) {
        flag = await picDisable(urls[i].url)
        //console.log(flag)
        if(flag) {
            img.push(urls[i])
        }
    }
    return []
}

export function getPic() {
    const url = 'http://bing.ioliu.cn'
    return new Promise((res, rej)=>{
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4) {
                if(xhr.status === 200) res(res.response)
                else rej('请求出错')
            }
        }
        xhr.open('get', url)
        xhr.send()
    })
}

export function changeLanImgSize() {
    let lan = document.querySelector('#lan')
    // let lanImg = document.querySelector('.lanImg')
    // lan.style.width = lanImg.offsetWidth + 'px'
    // lan.style.height = lanImg.offsetHeight + 'px'
    console.log(lan.offsetWidth, lan.offsetHeight)
}

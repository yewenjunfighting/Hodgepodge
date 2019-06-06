import { Message } from 'element-react'
import default_avatar from '../assets/default_avatar.jpg'

export function chooseFile(event) {
    // 获取用户所选文件
    let file = event.target.files[0]
    // 如果用户选取的时图片的话
    console.log(file.type)
    if(file.type.indexOf('image') === 0) {
       //let reader = new FileReader()
       //reader.readAsDataURL(file)
       // reader.onload = function() {
       //      // newUrl可以作为图片的url
       //     console.log(reader.result)
       //     let blob = new Blob([reader.result], {type: reader.type})
       //     console.log(URL.createObjectURL(blob))
       //  }
        // let formData = new FormData()
        // formData.append('avatar', file)
        // console.log(file, formData)
        let url = URL.createObjectURL(file)
        console.log(url)
        changeUrl(url)
        // 存储头像信息
        window.localStorage.setItem('avatar', url)
    }else {
        // 如果用户没有选择图片
        Message({
            message: '请选择图片',
            type: 'error',
            duration: 3 * 1000
        })
        console.log('没有选择图片')
        alert('请选择图片')
    }
}

function changeUrl(newUrl) {
    // 实际开发中, 我们会把用户选择的头像数据传给后端, 后端会返回一个新的url
    // 前端设置input type=file的父级元素的背景为新的url，达到头像上传的目的
    // 如果图片加载失败, 就启用默认的背景图片
    let img = new Image()
    img.src = newUrl
    let avatar = document.querySelector('.avatar')
    // 加载成功
    img.addEventListener('load', ()=>{
        console.log('success load')
        avatar.style.backgroundImage = `url(${newUrl})`
        img = null
    })
    // 加载失败
    img.addEventListener('error', ()=>{
        console.log('failed load')
        avatar.style.backgroundImage = `url(${default_avatar})`
        img = null
    })
}

export function haveAvatar() {
    let imgUrl = window.localStorage.getItem('avatar')
    if(imgUrl) {
        changeUrl(imgUrl)
    }
}

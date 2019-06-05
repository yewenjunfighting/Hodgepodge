import { Message } from 'element-react'

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

    }else {
        // 如果用户没有选择图片
        // Message({
        //     message: '请选择图片',
        //     type: 'error',
        //     duration: 3 * 1000
        // })
        console.log('没有选择图片')
        alert('请选择图片')
    }
}

function changeUrl(newUrl) {

    let avatar = document.querySelector('.avatar')
    avatar.style.backgroundImage = 'url(' + newUrl +  ')'
    console.log(avatar)
}


import request from '../utils/request'

let number = 0;
export function getPic() {
    number = number + 1  === 8 ? 1 : ++ number
    return request({
        url: '/福利/10/' + number,
        method: 'get'
    })
}

export  function setIndex() {
    number = 0
}

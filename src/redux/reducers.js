import { combineReducers } from 'redux'
import { ADD_PITURL } from './actions'

// 一个reducer对应一个store的属性,属性名位reducer的函数名,值为该函数的返回值
function pitUrl(state = [], action) {
    switch(action.type) {
        case ADD_PITURL:
            return action.pitUrl
        default:
            return state
    }
}

const pitApp = combineReducers({
    pitUrl
})

// 与上面的pitApp等价
// function pitApp(state = {}, action) {
//     return {
//         pitUrl: pitUrl(state.pitUrl, action)
//     }
// }

export default pitApp

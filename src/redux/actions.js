export const ADD_PITURL = 'ADD_PITURL'

// 增加照片url的action
export function addPirUrl(pitUrl = []) {
    return {
        type: ADD_PITURL,
        pitUrl
    }
}

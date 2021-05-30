import { fromJS } from 'immutable'

const defaultState = fromJS({
    bjTy:0, // 0文 1图 2视频 3声音转文字 4画板，
    thisBj:{name:'编辑中'} // 正在编辑或添加的步骤信息
})
export const ContentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'setBjTy':
            return state.set('bjTy', action.data)
        default:
            return state
    }
}
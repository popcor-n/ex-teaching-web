import { fromJS } from 'immutable'

const defaultState = fromJS({
    bjList:[],
    thisIndex:0,
    thisTy:1,    // 对于content类型做分离，1为预览 2为编辑
    thisBj:{name:'编辑中'} // 正在编辑或添加的步骤信息
})

export const InnerReducer = (state = defaultState , action) => {
    switch (action.type) {
        case 'changebjList':
            return state.set('bjList', action.data)
        case 'setThisIndex':
            return state.set('thisIndex',action.data)
        case 'setThisTy':
            return state.set('thisTy',action.data)
        case 'addBjItem':
            return state.set('bjList', state.get('bjList').concat(action.data))
        default:
            return state;
    }
}
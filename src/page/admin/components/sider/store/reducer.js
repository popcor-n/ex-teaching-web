import { fromJS } from 'immutable'

const defaultState = fromJS({
    queIndex: 0,
    queInfo: '',
    kcIsEmp: true,
    queList:[],
    thiskcDes:''
})

export const SiderReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'changeQue':
            return state.set('queIndex', action.data)
        case 'changekcEmp':
            return state.set('kcIsEmp', action.data)
        case 'setQueInfo':
            return state.set('queInfo',action.data)
        case 'setQueList':
            return state.set('queList', action.data)
        case 'setThiskcDes':
            return state.set('thiskcDes', action.data)
        default:
            return state
    }
}
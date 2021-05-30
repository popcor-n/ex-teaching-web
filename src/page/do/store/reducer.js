import { fromJS } from 'immutable'

const defaultState = fromJS({
    qList:[],
    queName:'',
    queDes:'',
    qIndex:'',
    que:{},
    steps:[]
})

export const DoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'setQList':
            return state.set('qList',action.data)
        case 'setQueName':
            return state.set('queName',action.data)
        case 'setQueDes':
            return state.set('queDes',action.data)
        case 'setqIndex':
            return state.set('qIndex',action.data)
        case 'setque':
            return state.set('que',action.data)
        case 'setSteps':
            return state.set('steps',action.data)
        default:
            return state
    }
}
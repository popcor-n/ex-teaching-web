import { fromJS } from 'immutable'
import * as constants from './constants'
const defaultState = fromJS({
    nick:'',
    pass:''
})
export const SignupReducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.SetNickChange:
            return state.set('nick', action.data);
        case constants.SetPassChange:
            return state.set('pass', action.data);
        default:
            return state
    }
}
import { fromJS } from 'immutable'
import * as constants from './constants.js'

const defaultState = fromJS({
    login:false,
    name:'',
    id:'',
    Type: ''
})
export const LoginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.ChangeLogState:
           if (state.get('login')){
               return state.merge({
                   'login': false,
                   'name':'',
                   'id':'',
                   'Type': ''
                })
            }else return state.merge({
                'login': true,
                'name': action.name,
                'id':action.id,
                'Type': action.Type
            });
        case constants.SetUserId:
            return state.set('name', action.id);
        default:
            return state
    }
}
import { combineReducers } from 'redux-immutable';
import { SiderReducer } from '../page/admin/components/sider/store/reducer'
import { InnerReducer } from '../page/admin/components/inner/store/reducer'
import {LoginReducer} from '../page/login/store/reducer'
import { SignupReducer } from '../page/signup/store/reducer'
import { ContentReducer } from "../page/admin/components/content/store/reducer";
import { DoReducer } from '../page/do/store/reducer'
const reducer = combineReducers({
    sider: SiderReducer,
    inner: InnerReducer,
    login: LoginReducer,
    signup: SignupReducer,
    content: ContentReducer,
    do:DoReducer
});
export default reducer;
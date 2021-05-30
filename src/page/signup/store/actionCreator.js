import axios from 'axios'
import * as constants from './constants'
import *as loginAction from '../../login/store/actionCreator'
export const getCode = (number)=> {
    return(dispatch)=> {
        const reg = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+.)+[A-Za-z]{2,6}$/;
        if(reg.test(number)){
            axios.get(`http://47.94.91.9:8080/mail/getCheckCode?email=${number}`).then((data)=> {
                console.log(data);
            })
        }else{
            alert('请填写合法邮箱地址');
        }
        
    }
}
export const signUp = (nick, pass, ty)=>{
    return(dispatch)=> {
        const data = {
            "username": nick,
            "password":pass,
            "type":ty
        };

        axios.post('http://39.99.252.237:9999/edu/user/sign-up',data).then((res)=> {
            console.log(res.data)
        })
    
       
    }
}
export const setNumberChange = (data)=> ({
    type:constants.SetNumberChange,
    data
})
export const setCodeChange = (data)=> ({
    type:constants.SetCodeChange,
    data
})
export const setNickChange = (data)=> ({
    type:constants.SetNickChange,
    data
})
export const setPassChange = (data)=> ({
    type:constants.SetPassChange,
    data
})
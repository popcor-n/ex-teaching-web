import axios from 'axios'
import * as constants from './constants.js'

export const changeLogState = (name,id, type)=> ({
    type:constants.ChangeLogState,
    name,
    id,
    Type:type
})
export const setLoginData = (number, pass)=> {
    return(dispatch)=> {
        const data = {
            "username": number,
            "password": pass,
        }
        axios.post('http://39.99.252.237:9999/edu/user/sign-in',data).then((res) => {
            // axios.get(`http://47.94.91.9:8080/user/getuserinfo?email=${number}`).then((ress) => {
            // })
            console.log(res);
            const mes = res.data, user = mes.data.user;
            console.log(mes)
            if(mes.success === true) {
                dispatch(changeLogState(user.username, user.id, user.type))
                window.localStorage.setItem('name',user.username)
                window.localStorage.setItem('id',user.id)
                window.localStorage.setItem('type',user.type)
                window.location.reload()
            }
        })
    }
}

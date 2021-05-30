import axios from 'axios'
import {changebjList,changeBjList} from '../../inner/store/actionCreator'
export const changeQue = (data) => ({
    type:'changeQue',
    data
})
export const changekcEmp = (data) => ({
    type:'changekcEmp',
    data
})
export const setQueInfo = (data) => ({
    type:'setQueInfo',
    data
})
export const setQueList = (data) => ({
    type:'setQueList',
    data
})
export const setThiskcDes = (data) => ({
    type:'setThiskcDes',
    data
})
// export const getbjList = () => {
//     return (dispatch) => {
//         axios.get('http://localhost:3000/api/mockbjlist.json').then((res)=> {
//             console.log(res.data)
//             dispatch(changebjList(res.data.list))
//         })
//     }
// }
export const getItBz = (id) => {
    return (dispatch) => {
        axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${id}`).then((res) => {
            console.log(res.data.data.steps);
            dispatch(changeBjList(res.data.data.steps));
            dispatch(setThiskcDes(res.data.data.question.description));
        })
    }
}
import {setBjTy} from '../../content/store/actionCreator'
import axios from 'axios'

export const changebjList = (data) => ({
    type: 'changebjList',
    data
})
export const setThisIndex = (data) => ({
    type: 'setThisIndex',
    data
})
export const setThisTy = (data) => ({
    type: 'setThisTy',
    data
})
export const addBjItem = (data) => ({
    type: 'addBjItem',
    data
})
export const delBj = (id, queId) => {
    return(dispatch) => {
        axios.delete(`http://39.99.252.237:9999/edu/cd-step/delete/${id}`).then((res) => {
            console.log(res.data);
            axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${queId}`).then((res) => {
                console.log(res.data.data.steps);
                dispatch(changeBjList(res.data.data.steps))
            })
        })
    }
    
}
export const addBj = (id, len) => {
    // 1. 追加步骤并进入该步骤
    
    // 2. 进入编辑模式
    return (dispatch) => {
        dispatch(addBjItem({name:'编辑中'}))
        dispatch (setThisTy(2))
    }
}
export const changeBjList = (data) => {
    return (dispatch) => {
        for(let i = 0; i < data.length; i++) {
            if(data[i].isVideo) {
                axios.get(`http://39.99.252.237:9999/edu/vod/getVideoUrl/${data[i].videoSourceId}`).then((res) => {
                    const url = res.data.data.videoUrl
                    data[i].url = url;
                })
            }
        }
        setTimeout(() => {
            dispatch(changebjList(data))
        }, 1000);
    }
}
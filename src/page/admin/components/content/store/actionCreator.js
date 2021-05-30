import axios from 'axios'
import { setThisTy, setThisIndex, changeBjList } from '../../inner/store/actionCreator'
import { getItBz } from '../../sider/store/actionCreator'
export const setBjTy = (data) => ({
    type: 'setBjTy',
    data
})
export const addSubmit = (len,queId,bjTy, thisDes,vID) => {
    const sendData = {
        "description": "string",
        "hasPuzzle": false,
        "isVideo": false,
        "name": `第${len}步`,
        "puzzle": "string",
        "questionId": queId,
        "rightAnswer": "string",
        "videoOriginalName": "string",
        "videoSourceId": "string",
        "sort": len-1
    }
    return(dispatch) => {
        if(bjTy === 0 || bjTy === 3 || bjTy === 4) {
            sendData.description = thisDes;
            
        } else if(bjTy === 2) {
            sendData.isVideo = true;
            sendData.videoSourceId = vID
        }
        axios.post('http://39.99.252.237:9999/edu/cd-step/add',sendData).then((res) => {
                console.log(res.data)
                axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${queId}`).then((res) => {
                    console.log(res.data.data.steps);
                    dispatch(changeBjList(res.data.data.steps))
                })
            })
        dispatch(setThisTy(1));
        // axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${queId}`).then((res) => {
        //     console.log(res.data.data.steps);
        //     dispatch(changebjList(res.data.data.steps))
        // })
        // dispatch(setThisIndex(0))
        
        
    }
}

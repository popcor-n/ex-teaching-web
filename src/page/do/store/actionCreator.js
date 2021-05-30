import axios from 'axios'
export const setQList = (data) => ({
    type: 'setQList',
    data
})
export const setQueName = (data) => ({
    type: 'setQueName',
    data
})
export const setQueDes = (data) => ({
    type: 'setQueDes',
    data
})
export const setqIndex = (data) => ({
    type: 'setqIndex',
    data
})
export const setque = (data) => ({
    type: 'setque',
    data
})
export const setSteps = (data) => ({
    type: 'setSteps',
    data
})
export const processSteps = (data) => {
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
            dispatch(setSteps(data))
        }, 1000);
    }
}
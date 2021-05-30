import React,{useRef,useEffect, useState}  from 'react'
import axios from 'axios'
import {  useSelector, useDispatch } from 'react-redux'
import ReactWEditor from 'wangeditor-for-react';
import VedioPlay from '../../../admin/components/vedio-play/index';
import { Input, Modal,Button, Empty } from 'antd';

export const Content = (props) => {
    const steps = useSelector(state => state.getIn(['do','steps']))
    const current = props.current;
    const setI = props.setI
    let editorRef = useRef(null)
    const [que, setQue] = useState('')
    const qIndex = useSelector(state => state.getIn(['do','qIndex']))
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMes, setModalMes] = useState('')
    const [modalTit, setModalTit] = useState('')
    const showModal = () => {
      if(que === steps[current].rightAnswer) {
          setModalTit('恭喜答对啦,正确答案为')
      } else {
          setModalTit('再接再厉，正确答案如下')
      }
      setModalMes(steps[current].rightAnswer)
      setIsModalVisible(true);

    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const onchange = (e) => {
        setQue(e.target.value)
    }
    useEffect(()=> {
        if(editorRef.current) {
            axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${qIndex}`).then((res)=> {
                const mes = res.data.data.steps[current]?.description;
                editorRef.current?.editor.txt.html(mes)
                if(!res.data.data.steps.length) {
                    editorRef.current?.editor.txt.html('')
                }
            })
        }
        // editorRef.current?.editor.txt.html(steps[current]?.description)
    },[current,qIndex])
    useEffect(()=> {
        editorRef.current?.editor.disable();
        
    })
    let ques = null;
    if(steps.length === 0) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    if(steps[current]?.hasPuzzle) {
        ques = (
            <div style={{marginTop:'100px'}}>
                <Input.TextArea defaultValue={steps[current].puzzle} readOnly style={{marginBottom:'20px'}}></Input.TextArea>
                <Input.TextArea onChange = {onchange} value = {que} placeholder='请输入样例问题答案'></Input.TextArea>
                <Button type='primary' onClick={showModal} style={{
                    position:'absolute',
                    bottom:'-258px',
                    right:'50px',
                    textAlign:'center',
                    lineHight:'17px'
                }}>
                    评判
                </Button>
                <Modal title={modalTit} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>{modalMes}</p>
                </Modal>
            </div>
        )
    }
    if(steps[current]?.isVideo) {
        return (
            <>
            <div style={{position:'relative','bottom':'80px',marginLeft:'100px',left:'-80px'}}>
                {/* 待接入视频播放器 */}
                <VedioPlay url={steps[current]?.url} width='800px' id="vedio_1" style={{height:'500px'}} />
            </div>
            {ques}
            </>
        )
    }
     else {
        return (
            <>
                {/* <TextArea rows={10} style={{width:'600px'}} value={props.item?.description} /> */}
                {/* <Input style={{width:'600px'}} onChange={e => this.setState({ value: e.target.value })} /> */}
                    <ReactWEditor ref={editorRef} 
                        defaultValue={steps[current]?.description}
                        >
                        </ReactWEditor>,
                        {ques}
                        
            </>
        )
    }
    

}
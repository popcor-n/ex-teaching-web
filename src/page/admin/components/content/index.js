import React,{useRef,useEffect, useState}  from 'react'
import axios from 'axios'
import {  useSelector, useDispatch } from 'react-redux'
import * as action from './store/actionCreator'
import { render } from '@testing-library/react'
import { Radio, Input, Space, Divider, Button, message,Upload, Modal, Empty } from 'antd';
import ReactWEditor from 'wangeditor-for-react';
import E from 'wangeditor'
import { Record, update } from 'immutable'
import * as innerAction from '../inner/store/actionCreator'
import { InboxOutlined } from '@ant-design/icons';
import Recorders from '../recorder/index';
import VedioPlay from '../vedio-play/index';
import { Link } from 'react-router-dom'

const { Dragger } = Upload;
const { TextArea } = Input;

export const Content = (props) => {
    const setI = props.setI;
    const ty = useSelector(state => state.getIn(['inner', 'thisTy'])); // 预览/编辑
    const bjTy = useSelector(state => state.getIn(['content', 'bjTy'])); // 步骤选择类型
    const queId = useSelector(state => state.getIn(['sider', 'queInfo']))
    const bjList = useSelector(state => state.getIn(['inner', 'bjList']));
    const thisIndex = useSelector(state => state.getIn(['inner', 'thisIndex']))
    const [ques,setQues] = useState('');
    const [answer,setAnswer] = useState('');
    let url;
    const dispatch = useDispatch()
    let editorRef = useRef(null)
    const [thisDes, setThisDes] = React.useState('')
    const [vId, setVId] = React.useState('')
    const [vUrl, setVUrl] = React.useState('')
    const [visible, setVisible] = React.useState(false)
    const [puzzle, setP] = React.useState({})
    const onChange = e => {
        console.log('radio checked', e.target.value);
        dispatch(action.setBjTy(e.target.value))
      };
    const onDesChange = (e) => {
        // console.log(e.target?.value)
        setThisDes(e)
        console.log(thisDes)
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
    const onqueOk = () => {
        setP({
            hasPuzzle: true,
            puzzle:ques,
            rightAnswer: answer
        })
        setVisible(false)
    }
    const onqueCancel = ()=> {
        setQues('');
        setAnswer('');
        setP({})
        setVisible(false)
    }
    useEffect(()=> {
        if(editorRef.current) {
            console.log('update',queId)
            axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${queId}`).then((res)=> {
                const mes = res.data.data.steps[props.current]?.description;
                editorRef.current?.editor.txt.html(mes)
            })
        }
    },[queId,thisIndex])
    useEffect(()=> {
        editorRef.current?.editor.disable();
        
    })
    const onQueChange = (e) => {
        setQues(e.target.value)
    }
    const onAnswerChange = (e)=> {
        setAnswer(e.target.value)
    }
    // ty 类型 1为预览 2 为编辑

    if(!props.item) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    if(ty === 1) {
        // editorRef.current.destroy()
        console.log(url)
        if(props.item?.isVideo) {
            return (
                <div style={{position:'relative','bottom':'80px',marginLeft:'100px'}}>
                    {/* 待接入视频播放器 */}
                    <VedioPlay url={props.item?.url} width='900px' id="vedio_1" style={{height:'500px'}} />
                </div>
            )
        }
         else {
            return (
                <>
                    {/* <TextArea rows={10} style={{width:'600px'}} value={props.item?.description} /> */}
                    {/* <Input style={{width:'600px'}} onChange={e => this.setState({ value: e.target.value })} /> */}
                        <ReactWEditor ref={editorRef}
                            defaultValue={props.item?.description}
                            >
                            </ReactWEditor>
                            
                </>
            )
        }
        
    } else if(ty === 2 || ty === 3) {
        let contentInfo;
        if(bjTy === 0) {
            contentInfo = (
                <>
                    {/* <TextArea rows={10} style={{width: '600px',
                            position: 'relative',
                            top: '20%'}} 
                        value={thisDes} onChange={onDesChange}/> */}
                        <Input onChange={e => this.setState({ value: e.target.value })} />
                        <ReactWEditor
                            defaultValue={bjList[thisIndex].description}
                            linkImgCallback={(src,alt,href) => {
                                // 插入网络图片的回调事件
                                console.log('图片 src ', src)
                                console.log('图片文字说明',alt)
                                console.log('跳转链接',href)
                            }}
                            onlineVideoCallback={(video) => {
                                // 插入网络视频的回调事件
                                console.log('插入视频内容', video)
                            }}
                            onChange={(html) => {
                                console.log('onChange html:', html)
                                onDesChange(html)
                            }}
                            onBlur={(html) => {
                                console.log('onBlur html:', html)
                            }}
                            onFocus={(html) => {
                                console.log('onFocus html:', html)
                            }}
                            config={{
                                customUploadImg: function (resultFiles, insertImgFn) {
                                    console.log(resultFiles);
                                    const file = new FormData();
                                    file.append("file",resultFiles[0])
                                    axios.post('http://39.99.252.237:9999/eduoss/uploadFile',file).then((res) => {
                                        console.log(res.data);
                                        insertImgFn(res.data.data.url)
                                    })
                                }
                            }}
                        />
                </>
            )
        } else if(bjTy === 2) {
            // 视频选择器 支持拖拽
            const params = {
                name: 'file',
                multiple: true,
                action: 'http://39.99.252.237:9999/edu/vod/uploadVideo',
                onChange(info) {
                  const { status,response } = info.file;
                  if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                  }
                  if (status === 'done') {
                    console.log(response)
                    setVId(response.data.videoId)

                    message.success(`${info.file.name} 视频上传成功.`);
                  } else if (status === 'error') {
                    message.error(`${info.file.name} 视频上传失败.`);
                  }
                },
              };
            contentInfo = (
                <>
                     <Dragger {...params}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽上传视频</p>
                    </Dragger>
                </>
            )
        } else if(bjTy === 3) {
            // 加载声音转文字组件
            contentInfo = (
                <>
                    {/* <TextArea rows={10} style={{width: '600px',
                            position: 'relative',
                            top: '20%'}} 
                        value={thisDes} onChange={onDesChange}/> */}
                        <Input onChange={e => this.setState({ value: e.target.value })} />
                        <ReactWEditor
                            defaultValue={bjList[thisIndex].description}
                            linkImgCallback={(src,alt,href) => {
                                // 插入网络图片的回调事件
                                console.log('图片 src ', src)
                                console.log('图片文字说明',alt)
                                console.log('跳转链接',href)
                            }}
                            onlineVideoCallback={(video) => {
                                // 插入网络视频的回调事件
                                console.log('插入视频内容', video)
                            }}
                            onChange={(html) => {
                                console.log('onChange html:', html)
                                onDesChange(html)
                            }}
                            onBlur={(html) => {
                                console.log('onBlur html:', html)
                            }}
                            onFocus={(html) => {
                                console.log('onFocus html:', html)
                            }}
                            config={{
                                customUploadImg: function (resultFiles, insertImgFn) {
                                    console.log(resultFiles);
                                    const file = new FormData();
                                    file.append("file",resultFiles[0])
                                    axios.post('http://39.99.252.237:9999/eduoss/uploadFile',file).then((res) => {
                                        console.log(res.data);
                                        insertImgFn(res.data.data.url)
                                    })
                                }
                            }}
                        />
                        <Button type="primary" onClick={showModal} style={{position:'relative',left:'200px',top:'30px'}}>
                            声音转文字
                        </Button>
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={600}>
                            <Recorders />
                        </Modal>
                    </>
            )
        } else {
            contentInfo = (
                <>
                    {/* <TextArea rows={10} style={{width: '600px',
                            position: 'relative',
                            top: '20%'}} 
                        value={thisDes} onChange={onDesChange}/> */}
                        <Input onChange={e => this.setState({ value: e.target.value })} />
                        <ReactWEditor
                            defaultValue={bjList[thisIndex].description}
                            linkImgCallback={(src,alt,href) => {
                                // 插入网络图片的回调事件
                                console.log('图片 src ', src)
                                console.log('图片文字说明',alt)
                                console.log('跳转链接',href)
                            }}
                            onlineVideoCallback={(video) => {
                                // 插入网络视频的回调事件
                                console.log('插入视频内容', video)
                            }}
                            onChange={(html) => {
                                console.log('onChange html:', html)
                                onDesChange(html)
                            }}
                            onBlur={(html) => {
                                console.log('onBlur html:', html)
                            }}
                            onFocus={(html) => {
                                console.log('onFocus html:', html)
                            }}
                            config={{
                                customUploadImg: function (resultFiles, insertImgFn) {
                                    console.log(resultFiles);
                                    const file = new FormData();
                                    file.append("file",resultFiles[0])
                                    axios.post('http://39.99.252.237:9999/eduoss/uploadFile',file).then((res) => {
                                        console.log(res.data);
                                        insertImgFn(res.data.data.url)
                                    })
                                }
                            }}
                        />
                        <Link target = "_blank" to='/drawing'>
                        <Button type="primary"  style={{position:'relative',left:'200px',top:'30px'}}>
                            加载画板
                        </Button>
                        </Link>
                        
                    </>
            )
        }
        return (
            <div>
                <Radio.Group onChange={onChange} value={bjTy} style={{float:'left',textAlign:'left',margin:'10px'}}>
                    <Space direction="vertical">
                        <Radio style={{margin:'20px'}} value={0}>图文</Radio>
                        <Radio style={{margin:'20px'}} value={2}>视频</Radio>
                        <Radio style={{margin:'20px'}} value={3}>声音转文字</Radio>
                        <Radio style={{margin:'20px'}} value={4}>画板</Radio>
                    </Space>
                </Radio.Group>
                <Button type="primary" onClick={() => setVisible(true)} style={{    
                    position: 'relative',
                    right: '535px',
                    top: '70px',}}>
                    设置问题
                </Button>
                <Modal
                    title="编辑问题及答案"
                    centered
                    visible={visible}
                    onOk={onqueOk}
                    onCancel={onqueCancel}
                    width={1000}
                    cancelText='取消'
                    okText='确认'
                >
                    <Input.TextArea value={ques} placeholder='请输入问题' style={{marginBottom:'20px'}} onChange= {onQueChange}/>
                    <Input.TextArea value={answer} placeholder='请输入正确答案'onChange= {onAnswerChange} />
                </Modal>
                <Divider type="vertical" 
                    style={{     height: '500px',
                    position: 'relative',
                    // borderColor:'#1890ff',
                    right: '450px',
                    top: '-80px'
                    }} 
                dashed />
                <div className='content' style={{
                    height: '500px',
                    width: '900px',
                    position: 'relative',
                    top: '-581px',
                    left: '163px',
                }}>
                    {contentInfo}
                    { ty === 2 ? 
                        <>
                            <Button type="primary" 
                                style={{position:'relative',top:'30px',left:'300px'}}
                                onClick={()=>{
                                    dispatch(action.addSubmit(bjList.length,queId,bjTy,thisDes,vId));
                                    setI(0)
                                    
                                    }}
                            >
                                确认
                            </Button> 
                            <Button type="primary" 
                                style={{position:'relative',top:'30px',left:'330px'}}
                                onClick={()=>{
                                    axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${queId}`).then((res) => {
                                        console.log(res.data.data.steps);
                                        dispatch(innerAction.changeBjList(res.data.data.steps))
                                        dispatch(innerAction.setThisTy(1))
                                        setI(0)
                                    })
                                    
                                    }}
                            >
                                取消
                            </Button> 
                        </>   
                        : 
                        <>
                        <Button type="primary" 
                            style={{position:'relative',top:'30px',left:'300px'}}
                            onClick={()=>{
                                const data = bjList[thisIndex];

                                if(bjTy === 0 || bjTy === 3 || bjTy === 4) {
                                    data.description = thisDes;
                                    data.isVideo = false;
                                } else if(bjTy === 2) {
                                    data.isVideo = true;
                                    data.videoSourceId = vId;
                                }
                                data.hasPuzzle = puzzle.hasPuzzle;
                                data.puzzle = puzzle.puzzle;
                                data.rightAnswer = puzzle.rightAnswer;
                                console.log(data)
                                axios.put('http://39.99.252.237:9999/edu/cd-step/update',data).then((res) => {
                                    if(res.data.success) {
                                        message.success('修改成功')
                                    }
                                    
                                    axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${queId}`).then((res) => {
                                        console.log(res.data.data.steps);
                                        dispatch(innerAction.changeBjList(res.data.data.steps))
                                        dispatch(innerAction.setThisTy(1))
                                        setI(0)
                                    })
                                })
                                
                            }}
                        >
                            确认
                        </Button>
                        <Button type="primary" 
                            style={{position:'relative',top:'30px',left:'330px'}}
                            onClick={()=>{
                                dispatch(innerAction.setThisTy(1))
                                setI(0)
                                
                                }}
                        >
                            取消
                        </Button>
                        </>
                    }
                </div>
            </div>
        )
    } else return null
    
}


import React, { Component,useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Wrapper, Stepsaction, Stepscontent } from './style'
import axios from 'axios'
import { Steps, Button, message } from 'antd';
import { HighlightOutlined, DeleteOutlined } from '@ant-design/icons';
import { setQueList } from '../sider/store/actionCreator'
import * as action from './store/actionCreator'
import { Content } from '../content/index';
const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];
const { Step } = Steps;

const Inner = () => {
    const queIndex = useSelector(state => state.getIn(['sider', 'queIndex']));
    const bjList = useSelector(state => state.getIn(['inner', 'bjList']));
    const kcEmpty = useSelector(state => state.getIn(['sider', 'kcIsEmp']));
    const queId = useSelector(state=> state.getIn(['sider', 'queInfo']))
    const thisIndex = useSelector(state=> state.getIn(['sider', 'thisIndex']))
    const thiskcDes = useSelector(state=> state.getIn(['sider','thiskcDes']))
    const ty = useSelector(state => state.getIn(['inner', 'thisTy']));
    const [current, setCurrent] = React.useState(0);
    const [isEmpty, setEmpty] = React.useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        setI(0);
        console.log(thisIndex)
    }, [queId])
    const next = () => {
        setCurrent(current + 1);
        console.log(current)
        dispatch(action.setThisIndex(current+1))
    };
    const setI = (index) => {
        setCurrent(index);
        dispatch(action.setThisIndex(index))
        // dispatch(action.setThisIndex(current))
    }
    const prev = () => {
        setCurrent(current - 1);
        dispatch(action.setThisIndex(current-1))

    };
    const isTrue = () => {
        setEmpty(true)
    };
    const isFalse = () => {
        setCurrent(false)
    }
    const addBjItem = () => {
        dispatch(action.addBj(queId,bjList.length))
        setI(bjList.length)
    }
    const delBjItem = () => {
        dispatch(action.delBj(bjList[current].id, queId))
        setI(0)
    }
    const handleDelQue = (id) => {
        axios.delete(`http://39.99.252.237:9999/edu/cd-question/delete/${id}`).then((res)=> {
            console.log(res.data)
            message.success('删除成功')
            axios.get('http://39.99.252.237:9999/edu/cd-course/findAllQuestions').then((data) => {
                dispatch(setQueList(data.data.data.courses))
            })
        })
    }
    // const judgeNoque = () => {
    //     if (isEmpty === true) {
    //         return (
    //             <Empty
    //                 image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    //                 imageStyle={{
    //                     height: 200,
    //                 }}
    //                 description={
    //                     <span>
    //                         目前还没有课程，创建一个吧
    //               </span>
    //                 }
    //             >
    //                 <Button type="primary" onClick={this.showDrawer}>立即创建</Button>
    //             </Empty>
    //         )
    //     }
    // }
    return (
        <Wrapper>
            <div>
                {thiskcDes}
            </div>
            <div style={{float:'right'}}>
                
                <Button type="primary" danger icon={<DeleteOutlined /> }
                    style={{marginRight:'20px'}}
                    onClick={()=>handleDelQue(queId)}
                >
                    删除题目
                </Button>
            </div>
            {/* 创建题目 */}

            <div style={{position:'relative',top:'20px'}}>
                <Steps current={current}>
                    {bjList.map(item => (
                        <Step key={item.id} title={item.name} />
                    ))}
                </Steps>
                <Stepscontent style={{ display: kcEmpty ? 'none' : 'block' }}>
                    {bjList[current]?.content}
                    <Content item={bjList[current]} ty={1} current = {current} setI={setI}/>
                </Stepscontent>
                <Stepsaction style={{display: ty === 1? 'block' : 'none'}}>
                    {current < bjList.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            下一步
                        </Button>
                    )}
                    {current === bjList.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            当前最后一步
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            上一步
                        </Button>
                    )}
                </Stepsaction>

            </div>
            <div style={{float:'right',display: ty === 1? 'block' : 'none'}}>
                <Button type="primary" icon={<HighlightOutlined /> }
                    style={{marginRight:'20px'}}
                    onClick={addBjItem}
                >
                    增加步骤
                </Button>
                <Button type="primary" icon={<HighlightOutlined /> }
                    style={{marginRight:'20px'}}
                    onClick={()=>dispatch (action.setThisTy(3))}
                    disabled={bjList[current]? false: true}
                >
                    编辑步骤
                </Button>
                <Button danger type="primary" icon={<DeleteOutlined /> }
                    style={{marginRight:'20px'}}
                    onClick={delBjItem}
                    disabled={bjList[current]? false: true}
                >
                    删除步骤
                </Button>
            </div>
        </Wrapper>
        
    );
}
export default Inner;


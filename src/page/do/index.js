import React, { Component,useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Empty, PageHeader } from 'antd';
import { Form, Input, Button, Checkbox, Drawer, Carousel, Steps,message } from 'antd';
import axios from 'axios'
import * as action from './store/actionCreator'
// import * as action from './store/actionCreator'
import { Menu } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {Content} from './components/content'
import { Stepsaction, Stepscontent } from './style'

const contentStyle = {
    height: '400px',
    color: '#fff',
    width:'770px',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
const { Step } = Steps;

class Do extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            visible:false,
            current:0
        }
    }
    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
    tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
      
    onFinish = (values) => {
        console.log('Success:', values);
    };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    showDraw= ()=>{
        this.setState({
            visible:true
        })
    }
    onClose = ()=> {
        this.setState({
            visible:false
        })
        this.setI(0)
    }
    setI = (data) => {
        this.setState({current:data})
    }
    render() {
        
        return (
            <>
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={this.props.queName}
                    // subTitle="This is a subtitle"
                />,
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['0']}
                    mode="inline"
                    style={{height: '667px',width:'200px'}}
                >
                    
                        {/* <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
            
                    
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item> */}
    
                    {
                        this.props.qList.map((item, index) => {
                            return (
                                <Menu.Item 
                                    onClick={()=>{
                                        this.props.setqIndex(item.id)
                                        axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${item.id}`).then((res)=> {
                                            this.props.setque(res.data.data.question);
                                            this.props.setSteps(res.data.data.steps);

                                        })  
                                    }}
                                    key={index}>{item.title? item.title: item.description}</Menu.Item>
                            )
                        })
                    }
                    
                </Menu>
                <div className='wrapper' style={{
                        position: 'absolute',
                        width: '1300px',
                        height: '700px',
                        backgroundColor: '#f1f0f0',
                        border: '1px solid #f9f1f1',
                        borderRadius: '10px',
                        top: '20px',
                        left: '220px'
                }}>
                    {this.props.qList[0] ? 
                    <>
                    <Input.TextArea value={this.props.que.description} style={{
                            width: '600px',
                            height: '170px',
                            position: 'relative',
                            top: '100px',
                            left: '300px',
                    }} readOnly />
                    <Input.TextArea  style={{
                            width: '600px',
                            height: '200px',
                            position: 'relative',
                            top: '350px',
                            left: '-300px',
                    }} placeholder='你的答案记录在这' />
                     <Button onClick={this.showDraw} type="primary" style={{
                            position: 'relative',
                            top: '450px',
                            right: '360px'
                     
                     }}>
                        获取提示
                    </Button>
                    {/* <Button onClick={this.showDraw} type="primary" style={{
                            float: 'right',
                            position: 'relative',
                            top: '418px',
                            right: '475px',
                     
                     }}>
                        获取提示
                    </Button> */}
                    </>: <Empty style={{position:'relative',top:'200px'}}/>
                    }
                    
                </div>

                <Drawer
                    title="步骤提示"
                    width={1000}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    placement='right'
                    footer={
                        <div
                        style={{
                            textAlign: 'right',
                        }}
                        >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button onClick={this.onClose} type="primary">
                            确认
                        </Button>
                        </div>
                    }
                    >
                      <div style={{position:'relative',top:'20px'}}>
                        <Steps current={this.state.current}>
                            {this.props.steps.map(item => (
                                <Step key={item.id} title={item.name} />
                            ))}
                        </Steps>
                        <Stepscontent>
                            {this.props.steps[this.state.current]?.content}
                            <Content current = {this.state.current} setI={this.setI}/>
                        </Stepscontent>
                        <Stepsaction>
                            {this.state.current < this.props.steps.length - 1 && (
                                <Button type="primary" onClick={()=>this.setState({current:this.state.current + 1})}>
                                    下一步
                                </Button>
                            )}
                            {this.state.current === this.props.steps.length - 1 && (
                                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                    当前最后一步
                                </Button>
                            )}
                            {this.state.current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={()=>this.setState({current:this.state.current - 1})}>
                                    上一步
                                </Button>
                            )}
                        </Stepsaction>

                    </div>
                    {/* <UpOutlined style={{    
                        right: '50px',
                        fontSize: '35px',
                        position: 'absolute',
                        top: '173px',}} ref='up' />
                    <DownOutlined style={{
                        fontSize: '35px',
                        position: 'absolute',
                        top: '300px',
                        right: '50px',
                    }}/> */}
                </Drawer>
            </>
        )
    }
    componentDidMount() {
        this.setState({
            id:this.props.match.params.id
        })
        axios.get(`http://39.99.252.237:9999/edu/cd-question/findByCourseId/${this.props.match.params.id}`).then((res) => {
            console.log(res.data.data.questions)
            this.props.setQList(res.data.data.questions)
            this.props.setqIndex( this.props.qList[0]?.id)
            if(this.props.qList[0]) {
                axios.get(`http://39.99.252.237:9999/edu/cd-question/findStepsById/${ this.props.qList[0].id}`).then((res)=> {
                    this.props.setque(res.data.data.question);
                    this.props.setSteps(res.data.data.steps);
    
                }) 
            }
            
        })

    }
    handleClick = e => {
        console.log('click ', e);
      };
}

const mapStateToProps = (state)=> ({
    queName: state.getIn(['do','queName']),
    qList:state.getIn(['do','qList']),
    que:state.getIn(['do','que']),
    steps:state.getIn(['do','steps'])
})
const mapDispatchToProps = (dispatch)=> ({
    setQList(data) {
        dispatch(action.setQList(data))
    },
    setqIndex(data) {
        dispatch(action.setqIndex(data))
    },
    setque(data) {
        dispatch(action.setque(data))
    },
    setSteps(data) {
        dispatch(action.processSteps(data))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Do))
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import *as actionCreator from './store/actionCreator'
import *as inneracCreator from '../inner/store/actionCreator'
import { Empty, Menu, Button, Drawer, Form, Col, Row, Input, InputNumber  } from 'antd';
import { AppstoreOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Provider } from 'react-redux';
import inner from '../inner';
import { act } from 'react-dom/test-utils'
import Item from 'antd/lib/list/Item'
const { SubMenu } = Menu;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const onFinish = values => {
  console.log('Received values of form:', values);
};
class Sider extends Component {
  state = {
    quelist: [],
    visible: false,
    addqueVis:false,
    isEmpty: true,
    addclassName:'',
    addclassDes:'',
    addQueDes:'',
    addQueTitle:'',
    addqueNum: 0,
    thisKcId:''
  }
  handleClick = item => {
    console.log(item)
    this.setState({
      thisKcId:item.id
    })
  };
  handleAddQueOpen = () => {
    this.setState({
      addqueVis:true
    })
  }
  handleAddQueClose = () => {
    this.setState({
      addqueVis:false
    })
  }
  handleconsole = (item) => {
    console.log(item)
  }
  judgeEmp = () => {
    if(this.state.isEmpty) {
      return (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 200,
          }}
          description={
            <span>
              目前还没有课程，创建一个吧
            </span>
          }
        >
          <Button type="primary" onClick={this.showDrawer}>立即创建</Button>
        </Empty>
      )
    } else {
      return (
        <>
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={[this.state.quelist[0].questions[0].id]}
            defaultOpenKeys={['sub0']}
            mode="inline"
            // onSelect={({item, key})=>{this.props.setQueIndex(item);console.log(item)}}
            onSelect={({item, key})=>{console.log(item)}}

          >
            {
              this.props.queList.map((item, index) => {
                  return (
                      <SubMenu 
                        key = {'sub'+index} 
                        icon = {<AppstoreOutlined />} 
                        title = { item.name }
                      >

                          {
                            item.questions?.map((val, indexx) => {
                                return (
                                  <Menu.Item key={val.id}
                                  onClick={()=>{this.setQueIndex(val.id)}}>{val.title!== ''? val.title : val.description}</Menu.Item>
                                )
                            }) 
                            
                          }
                          <Menu.Item key={index} onClick={()=>{this.handleClick(item)}}><a onClick={this.handleAddQueOpen}>添加题目</a></Menu.Item>
                      </SubMenu>

                  )
                })
            }
            
              <Menu.Item onClick={this.showDrawer}>添加课程</Menu.Item>
            
            </Menu>
            {/* <inner item={this.props.index}>
            
            </inner> */}
          </>
        
      )
    }
  }
  componentDidMount() {
    // axios.get('http://localhost:3000/api/queList.json').then((data) => {
    axios.get('http://39.99.252.237:9999/edu/cd-course/findAllQuestions').then((data) => {
      this.setState({
        quelist: data.data.data.courses
      })
      this.props.setQueList(data.data.data.courses);
      console.log(this.state.quelist)
      if(data.data) {
        this.setState({
          isEmpty: false
        })
        this.props.changekcEmp(false);
        this.props.setQueIndex(this.state.quelist[0].id)
      }
      this.setQueIndex(this.state.quelist[0].questions[0].id)
      
    })  
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  // 创建课程表单
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  
  onnumChange = (value) =>{
    this.setState({
      addqueNum:value
    })
  }

  onnameChange = (e) => {
    this.setState({
      addclassName:e.target.value
    })
  }
  ondesChange = (e) => {
    this.setState({
      addclassDes:e.target.value
    })
  }

  onQueChange = (e) => {
    this.setState({
      addQueDes:e.target.value
    })
  }
  onQueTitChange = (e) => {
    this.setState({
      addQueTitle:e.target.value
    })
  }
  onsubmit = () => {
    axios.post('http://39.99.252.237:9999/edu/cd-course/add',{
      name: this.state.addclassName,
      description:this.state.addclassDes
    }).then((data) => {
      console.log(data)
      axios.get('http://39.99.252.237:9999/edu/cd-course/findAllQuestions').then((data) => {
        this.setState({
          quelist: data.data.data.courses,
        })
        this.props.setQueList(data.data.data.courses)
        this.onClose()

      })

    })
  }
  onAddQueSubmit = () => {
    // console.log(this.state.thisKcId,this.state.addQueDes)
    axios.post('http://39.99.252.237:9999/edu/cd-question/add',{
      courseId:this.state.thisKcId,
      description:this.state.addQueDes,
      title:this.state.addQueTitle
    }).then((res)=> {
      console.log(res.data)
      axios.get('http://39.99.252.237:9999/edu/cd-course/findAllQuestions').then((data) => {
      this.setState({
        quelist: data.data.data.courses,
      })
      this.props.setQueList(data.data.data.courses)
      this.handleAddQueClose()
    })
    })
  }
  setQueIndex = (data) => {
    this.props.setQueInfo(data);
    this.props.getItBz(data)
  }
  render() {
  const {setQueIndex,kcIsEmp} = this.props;
    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    );
    return (
      <>
        
        {this.judgeEmp()}
        {/* 创建课程 */}
        <Drawer
          title="创建课程"
          width={720}
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
              <Button onClick={this.onsubmit} type="primary">
                确认
              </Button>
            </div>
          }
        >
          <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish} layout="vertical" hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="课程名"
                    rules={[{ required: true, message: '请输入课程名' }]}
                  >
                    <Input placeholder="请输入课程名" 
                      value={this.state.addclassName}
                      onChange={(event)=>{this.onnameChange(event)}}
                    />
                  </Form.Item>

                  <Form.Item
                    name="des"
                    label='请输入课程描述'
                    rules={[{ required: true, message: '请输入课程描述' }]}
                  >
                   <Input placeholder="请输入课程描述" 
                      value={this.state.addclassDes}
                      onChange={(event)=>{this.ondesChange(event)}}
                    />
                  </Form.Item>
                </Col>
                {/*  */}
            </Row>
            
          </Form>
        </Drawer>
        <Drawer
          title="添加题目"
          width={720}
          onClose={this.handleAddQueClose}
          visible={this.state.addqueVis}
          bodyStyle={{ paddingBottom: 80 }}
          placement='right'
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.handleAddQueClose} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={this.onAddQueSubmit} type="primary">
                确认
              </Button>
            </div>
          }
        >
          <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish} layout="vertical" hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="title"
                    label="问题概述"
                    rules={[{ required: true, message: '请输入问题' }]}
                  >
                    <Input.TextArea placeholder="请输入问题名称" 
                      value={this.state.addQueTitle}
                      onChange={(event)=>{this.onQueTitChange(event)}}
                      rows={3}
                      size={'large'}
                    />
                    
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="问题题干"
                    rules={[{ required: true, message: '请输入问题' }]}
                  >
                  <Input.TextArea placeholder="请输入问题内容" 
                      value={this.state.addQueDes}
                      onChange={(event)=>{this.onQueChange(event)}}
                      rows={10}
                      size={'large'}
                    />
                  </Form.Item>

                </Col>
                {/*  */}
            </Row>
            
          </Form>
        </Drawer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
   return {
     index:state.get('sider').get('queIndex'),
     kcIsEmp:state.getIn(['sider','kcIsEmp']),
     id:state.getIn(['sider', 'queInfo']),
     queList:state.getIn(['sider','queList'])
   }
};
const mapDispatchToProps = (dispatch) => ({
    setQueIndex(data) {
      dispatch(actionCreator.changeQue(data))
      // dispatch(actionCreator.getItBz())
    },
    changekcEmp(data) {
      dispatch(actionCreator.changekcEmp(data))
    },
    setQueInfo(data) {
      dispatch(actionCreator.setQueInfo(data))
    },
    getItBz(id) {
      dispatch(actionCreator.getItBz(id))
    },
    setQueList(data) {
      dispatch(actionCreator.setQueList(data))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Sider)
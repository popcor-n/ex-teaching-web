import React, { Component } from 'react'
import axios from 'axios'
import { Table, Input, Tag, Space, Modal, message, InputNumber } from 'antd';


const { Search } = Input;
const onSearch = value => {
  console.log(value);
  
}

export default class Stu extends Component {
  state = {
    stuList: [],
    showdia: false,
    chosStu: [],
    showEdiDia: false,
    ipName: '',
    ipAge: 0,
    ipAd: '',
    ipid:''
  }
  onSearch = (v) => {
    this.showModal();
    axios.get('http://localhost:3000/api/chosStu.json').then((data) => {
      axios.get(`http://39.99.252.237:9999/edu/user/findByName/${v}`).then((res) => {
        console.log(res.data.data.items)
        this.setState({
          chosStu:res.data.data.items
        })
      })
      
    })

    
  }
  showModal = () => {

    this.setState({
      showdia: true
    })
  };

  handleOk = () => {
    this.setState({
      showdia: false
    })
  };

  handleCancel = () => {
    this.setState({
      showdia: false,
      showEdiDia:false
    })
  };
  handleDelete = (id) => {
    axios.delete(`http://39.99.252.237:9999/edu/user/${id}`).then(res => {
      message.success('删除成功');
      axios.get('http://39.99.252.237:9999/edu/user/page/1/100').then((data) => {
        let items = data.data.data.rows;
        this.setState({
          stuList: items,
        })
      })
    })
  }
  handleEdit = (id) => {
    axios.get(`http://39.99.252.237:9999/edu/user/findById/${id}`).then((res)=> {
      this.setState({
        showEdiDia:true,
        ipName:res.data.data.user.username,
        ipAge:res.data.data.user.age,
        ipAd:res.data.data.user.address,
        ipid:id
      })
  })
  }
  handleName = (e) => {
    this.setState({
      ipName:e.target.value
    })
  }
  handleAge = (e) => {
    this.setState({
      ipAge: e
    })
  }
  handleAd = (e) => {
    this.setState({
      ipAd:e.target.value
    })
  }
  handleSub = () => {
    this.handleCancel();
    const user = {
      username:this.state.ipName,
      age:this.state.ipAge,
      address:this.state.ipAd,
      id:this.state.ipid
  }
  axios.put('http://39.99.252.237:9999/edu/user/update',user).then((res) => {
      console.log(res.data);
      message.success('修改成功')
      axios.get('http://39.99.252.237:9999/edu/user/page/1/100').then((data) => {
        let items = data.data.data.rows;
        this.setState({
          stuList: items,
        })
      })
  })
  }
  componentDidMount() {
    axios.get('http://39.99.252.237:9999/edu/user/page/1/100').then((data) => {
    let items = data.data.data.rows;
      this.setState({
        stuList: items,
      })
    })
  }

  render() {
    const data = this.state.stuList;
    const { Column, ColumnGroup } = Table;
    return (
      <>
        <Search
          placeholder="请输入学生名"
          allowClear
          enterButton="Search"
          size="medium"
          onSearch={this.onSearch}
          style={{ margin: '20px', width: '400px' }}
          // onClick={this.showModal}
        />
        <Table dataSource={data}
          style={{display:'block',margin:'20px'}}
        >
          {/* <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup> */}
          <Column title="Name" dataIndex="username" key="name" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Types"
            dataIndex="type"
            key="tags"
            render={type => (
              <>
                  <Tag color="blue" key={type}>
                    {type === 0 ? '管理员' :
                    (type === 1 ?  '教师' : '学生')}
                  </Tag>
              </>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={()=>this.handleEdit(record.id)}>修改</a>
                <a onClick={()=>this.handleDelete(record.id)}>删除</a>
              </Space>
            )}
          />
        </Table>,

        <Modal title="Basic Modal" visible={this.state.showdia} onOk={this.handleOk} onCancel={this.handleCancel} cancelText='取消' okText='确定'>
        <Table dataSource={this.state.chosStu}
          style={{display:'block',margin:'20px'}}
        >
           <Column title="Name" dataIndex="username" key="name" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Types"
            dataIndex="type"
            key="tags"
            render={type => (
              <>
                  <Tag color="blue" key={type}>
                    {type === 0 ? '管理员' :
                    (type === 1 ?  '教师' : '学生')}
                  </Tag>
              </>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={()=>this.handleEdit(record.id)}>修改</a>
                <a onClick={()=>this.handleDelete(record.id)}>删除</a>
              </Space>
            )}
          />
        </Table>
        </Modal>
        <Modal title='修改信息' visible={this.state.showEdiDia}  onCancel={this.handleCancel} onOk={this.handleSub} cancelText='取消' okText='确定'>
            <div style={{position:'absolute',top:'84px'}}>
              <p style={{marginBottom:'30px'}}>年龄</p>
              <p>地址</p>
            </div>
            
            <InputNumber placeholder='待修改年龄' onChange={this.handleAge} value={this.state.ipAge} style={{width:'300px',marginBottom:'20px',position:'relative',left:'50px'}} />
            <Input placeholder='待修改地址' onChange={this.handleAd} value={this.state.ipAd} style={{width:'300px',marginBottom:'20px',position:'relative',left:'50px'}}></Input>
        </Modal>
      </>
    )

  }
}
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import  * as action from './store/actionCreator'
import { Button, Card } from 'antd'
import Sider from './components/sider'
import Inner from './components/inner'
import Stu from './components/stu'
import { Menu } from 'antd';
import { Avatar,Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom'
import * as loginAction from '../login/store/actionCreator'
const { SubMenu } = Menu;
const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
class Admin extends Component {
    state = {
        current: 'mail',
        visible: 0
    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };
    judgewrapper = () => {
        switch (this.state.current) {
            case 'app':
                return (
                    <>
                        <Sider />
                        <Inner />
                    </>
                );
            case 'mail':
                return(<Stu />)

            default:
                return null;
        }
    }
    componentDidMount() {
       
        // if(this.props.type === 2 || this.props.type === '2') {
        //     this.props.history.replace('/student')
        // }
    }
    render() {
        // const {} = this.props;
        const { current } = this.state;
        const { isLogin, type } = this.props;
        
        
        if(type === '0' || type === '1') {
            return (
                <>
                    <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                        <Menu.Item key="mail" icon={<MailOutlined />}>
                        学生名单
                        </Menu.Item>
                        <Menu.Item key="app"  icon={<AppstoreOutlined />}>
                        题目列表
                        </Menu.Item>
                        {/* <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
                        <Menu.ItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                        </SubMenu> */}
                        {/* <Menu.Item key="alipay">
                        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                            Navigation Four - Link
                        </a>
                        </Menu.Item> */}
                        
                    </Menu>
                    {  isLogin? 
                            <>  
                                <Avatar icon={<UserOutlined />}  style= {{position:'absolute',right:'200px',top:'10px'}}
                                    onClick={()=>{
                                        this.setState({visible:this.state.visible+1})

                                    }}
                                />
                                <Card style={{ width: '150px', position:'absolute',right:'30px',top:'13px',display:this.state.visible %2 ===0 ? 'none': 'block' }}  >
                                    <Link to='/login'>
                                        <p onClick={()=> {
                                            this.props.changeLogState('','','');
                                            window.localStorage.clear()
                                        }}>退出登录</p>
                                    </Link>
                                    
                                </Card>
                            </>  
                             :
                            <Link to= '/login'>
                                <Button type="link" style= {{position:'absolute',right:'100px',lineHeight:'46.7px'}}>登录</Button>
                            </Link>
                        }    
                    {this.judgewrapper()}
                    
                    
                    
                </>
            );
        } 
            // return <Redirect to ='/login' />
        return null
        
    }
}
const mapStateToProps = (state) => ({
   isLogin:state.getIn(['login', 'login']),
   type:state.getIn(['login','Type'])
});
const mapDispatchToProps = (dispatach) => ({
    changeLogState(name,id, type) {
        dispatach(loginAction.changeLogState(name,id,type))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
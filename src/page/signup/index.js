import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as style from './style'
import { connect } from 'react-redux'
import * as action from './store/actionCreator'
import { Radio } from 'antd';

class Signup extends Component {
    state = {
        ty:1
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            ty: e.target.value
        });
    };
    render() {
        if(!this.props.login){
            const { code, email, nick, pass, getCode, handleNumberChange, handleCodeChange, handleNickChange,handlePassChange, signUp } = this.props;
            return (
                <style.LoginWrapper>
                    <style.Logo>
                        <Link to='/'>
                            <style.LogoPic />
                        </Link>
                    </style.Logo>
                    <style.Main>
                        <h4 className='title'>
                            <Link to='/login' className='login'>登录</Link>
                            <b>.</b>
                            <Link className='active' to='/signup'>注册</Link>
                        </h4>
                       
                        <style.Input>
                            {/* <span className="iconfont">
                            <svg t="1571316725083" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3489" width="200" height="200"><path d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" p-id="3490"></path></svg>
                            </span> */}
                            <input placeholder='用户名' type='text' id='nick' 
                                onChange={handleNickChange}
                             />
                        </style.Input>
                        <style.Input>
                            {/* <span className="iconfont">&#xe620;</span> */}
                            <input placeholder='密码' type='password' id='password' 
                                onChange={handlePassChange}
                             />
                        </style.Input>
                        <style.Input>
                        <Radio.Group onChange={this.onChange} value= {this.state.ty} defaultValue="1" buttonStyle="solid" size='large' style={{marginTop:'10px'}}>
                            <Radio.Button value={1}>教师</Radio.Button>
                            <Radio.Button value={2}>学生</Radio.Button>
                        </Radio.Group>
                        </style.Input>
                        <style.Button onClick= {()=>signUp( nick, pass, this.state.ty)}>注册</style.Button>
                    </style.Main>
                </style.LoginWrapper>
            )
        }else{
            return(
                <Redirect to= '/' />
            )
        }

    }
}
const mapStateToProps = (state) => ({
    nick: state.getIn(['signup', 'nick']),
    pass: state.getIn(['signup', 'pass']),
    login:state.getIn(['login', 'login']),
});
const mapDispatchToProps = (dispatch) => ({
    handleNickChange: (e) => {
        dispatch(action.setNickChange(e.target.value))
    },
    handlePassChange: (e) => {
        dispatch(action.setPassChange(e.target.value))
    },
    signUp:(nick, pass, ty)=> {
        dispatch(action.signUp(nick, pass, ty))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Signup)



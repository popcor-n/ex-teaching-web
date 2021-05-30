import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as loginAction from './login/store/actionCreator'
class Empty extends Component {
    componentDidMount() {
        console.log(this.props.type);
        if(!this.props.isLogin){
            if(window.localStorage.getItem('id')) {
                this.props.changeLogState(window.localStorage.getItem('name'), window.localStorage.getItem('id'), window.localStorage.getItem('type'))
            } else {
                this.props.history.push('/login')
            }
        }
        console.log(this.props.type)
        // window.location.reload()

         
        // if(!this.props.isLogin) {
        //     this.props.history.replace('/login')
        // }
    }
    render() {
        if(this.props.type === '1' || this.props.type === '0' || this.props.type === 1 || this.props.type === 0 ) {
        // if(this.props.type=== 0  || this.props.type === '0') {
            if(window.location.pathname === '/drawing') {
                return <Redirect to = '/drawing' />
            }
            return <Redirect to ='/admin' />

        }
        if(this.props.type === '2' || this.props.type === 2) {

            return <Redirect to ='/st' />
        }
        return(<></>)
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
 export default connect(mapStateToProps, mapDispatchToProps)(Empty)
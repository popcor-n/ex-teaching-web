import React, { Component,useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Wrapper } from './style'
// import * as action from './store/actionCreator'
import { Link } from 'react-router-dom'
import *as doAction from '../do/store/actionCreator'
import './student.css'
import { Card, Avatar,Input, InputNumber, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined,CheckOutlined } from '@ant-design/icons';

const { Meta } = Card;
const Student = (props) => {
    const name = useSelector(state=> state.getIn(['login', 'name']))
    const [isYl, setIsyl] = useState(true)
    const [ipName,setName] = useState('')
    const [ipAge,setAge] = useState(0)
    const [ipAd,setAd] = useState('')
    const [user,setUser] = useState({})
    useEffect(()=> {
        const id = props.match.params.id;
        console.log(id)
        // axios.get('http://39.99.252.237:9999/edu/cd-course/findAll').then((res)=> {
        //     setkcList(res.data.data.items)
        // })
        axios.get(`http://39.99.252.237:9999/edu/user/findById/${id}`).then((res)=> {
            console.log(res.data.data)
            setName(res.data.data.user.username);
            setAge(res.data.data.user.age);
            setAd(res.data.data.user.address);
        })
    },[])
    const setIsYl = () => {
        setIsyl(!isYl)
    }
    const handleName = (e)=> {
        console.log(e.target.value)
        setName(e.target.value)
    }
    const handleAge = (e)=> {
        console.log(e)
        setAge(e)
    }
    const handleAd = (e)=> {
        console.log(e.target.value)
        setAd(e.target.value)
    }
    const handleSubmit = (e) => {
        setIsYl();
        const user = {
            username:ipName,
            age:ipAge,
            address:ipAd,
            id:props.match.params.id
        }
        axios.put('http://39.99.252.237:9999/edu/user/update',user).then((res) => {
            console.log(res.data);
            message.success('修改成功')
        })
    }
    const dispatch = useDispatch()
    return(
        <>
            <div className='wrapper'>
            <Card
                style={{ width: 400, position: 'relative', left:'100px',top:'100px'}}
                cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
                }
                actions={isYl?[
                // <SettingOutlined key="setting" />,
                
                <EditOutlined key="edit" onClick={setIsYl}/>,
                <EllipsisOutlined key="ellipsis" />,
                ]:[
                <CheckOutlined key="edit" onClick={handleSubmit}/>,
                <EllipsisOutlined key="ellipsis" />]
                }
            >
                <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={ipName}
                // description="This is the description"
                />
            </Card>
            <p style={{position:'absolute', position: 'absolute',
                left: '810px',
                /* top: -54px, */
                top: '223px',}}>姓名</p>
            <p style={{position:'absolute',left:'810px',top:'324px'}}>年龄</p>
            <p style={{position:'absolute',left:'810px'}}>地址</p>
            <Input style={{    
                position: 'relative',
                width: '300px',
                top: '-200px',
                left: '800px'}} value={ipName} disabled={isYl} onChange={handleName}></Input>
            <InputNumber style={{    
                position: 'relative',
                width: '300px',
                top: '-100px',
                left: '500px'}} min={0} max={100} value={ipAge} disabled={isYl} onChange={handleAge}>

            </InputNumber>
            <Input style={{    
                position: 'relative',
                width: '300px',
                top: '0px',
                left: '200px'}} value={ipAd} disabled={isYl} onChange={handleAd}></Input>
            </div>
        </>
    )
}
export default Student
import React from 'react'
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import {CloseOutlined,UserOutlined} from '@ant-design/icons';
import './style.css'
import axios from 'axios'
import *as doAction from '../do/store/actionCreator'
import *as loginAction from '../login/store/actionCreator'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Avatar,Popover} from 'antd'


const textData = {
  content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
  ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
  ' Asia known as motorcycles.',
  title: 'Motorcycle',
};
let dataArray = [
  { image: 'muban1.png' },
  { image: 'muban1.png' },
  { image: 'muban1.png' },
  { image: 'muban1.png' },
  { image: 'muban1.png' },
  { image: 'muban1.png' },
  { image: 'muban1.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/BXJNKCeUSkhQoSS.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/SDLiKqyfBvnKMrA.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/UcVbOrSDHCLPqLG.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/QJmGZYJBRLkxFSy.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/PDiTkHViQNVHddN.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/beHtidyjUMOXbkI.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/vJcpMCTaSKSVWyH.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/QqWQKvgLSJaYbpr.png' },
  // { image: 'https://zos.alipayobjects.com/rmsportal/pTfNdthdsUpLPLJ.png' },
];
dataArray = dataArray.map(item => ({ ...item, ...textData }));
class St extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'pic-details-demo',
  };

  content = (
    <div>
      <Link to={`stu/${this.props.id}`}>
        <p>个人主页</p>
      </Link>
      <a onClick={() => {
        this.props.changeLogState('','','');
        window.localStorage.clear();
        window.location.reload()

      }}>退出登录</a>
    </div>
  );
  constructor(props) {
    super(props);
    this.state = {
      picOpen: {},
      kcList:[]

    };
  }
  componentDidMount() {
    axios.get('http://39.99.252.237:9999/edu/cd-course/findAll').then((res)=> {
      let list = res.data.data.items
      for(let i = 0; i < list.length; i++) {
        list[i].image = dataArray[i].image
      }
      this.setState({kcList:list})
      console.log(this.state.kcList)
    })
  }
  onImgClick = (e, i) => {
    const { picOpen } = this.state;
    Object.keys(picOpen).forEach((key) => {
      if (key !== i && picOpen[key]) {
        picOpen[key] = false;
      }
    });
    picOpen[i] = true;
    this.setState({
      picOpen,
    });
  };

  onClose = (e, i) => {
    const { picOpen } = this.state;
    picOpen[i] = false;
    this.setState({
      picOpen,
    });
  };

  onTweenEnd = (i) => {
    const { picOpen } = this.state;
    delete picOpen[i];
    this.setState({
      picOpen,
    });
  };

  getDelay = (e) => {
    const i = e.index + this.state.kcList.length % 4;
    return (i % 4) * 100 + Math.floor(i / 4) * 100 + 200;
  };

  getLiChildren = () => {
    const imgWidth = 180;
    const imgHeight = 110;
    const imgBoxWidth = 230;
    const imgBoxHeight = 130;
    return this.state.kcList.map((item, i) => {
      const { image, name, description } = item;
      const isEnter = typeof this.state.picOpen[i] === 'boolean';
      const isOpen = this.state.picOpen[i];

      const left = isEnter ? 0 : imgBoxWidth * (i % 4);
      const imgLeft = isEnter ? imgBoxWidth * (i % 4) : 0;
      const isRight = Math.floor((i % 4) / 2);
      const isTop = Math.floor(i / 4);
      let top = isTop ? (isTop - 1) * imgBoxHeight : 0;
      top = isEnter ? top : imgBoxHeight * isTop;
      let imgTop = isTop ? imgBoxHeight : 0;
      imgTop = isEnter ? imgTop : 0;

      const liStyle = isEnter ? { width: '100%', height: 175, zIndex: 1 } : null;
      const liAnimation = isOpen ?
        ({ boxShadow: '0 2px 8px rgba(140, 140, 140, .35)' }) :
        ({ boxShadow: '0 0px 0px rgba(140, 140, 140, 0)' });
      let aAnimation = isEnter ?
        ({
          delay: 400,
          ease: 'easeInOutCubic',
          width: imgWidth,
          height: imgHeight,
          onComplete: this.onTweenEnd.bind(this, i),
          left: imgBoxWidth * (i % 4),
          top: isTop ? imgBoxHeight : 0,
        }) : null;
      aAnimation = isOpen ?
        ({
          ease: 'easeInOutCubic',
          left: isRight ? (imgBoxWidth * 2) - 10 : 0,
          width: '50%',
          height: 175,
          top: 0,
        }) : aAnimation;

      // 位置 js 控制；
      return (
        <TweenOne
          key={i}
          style={{
            left,
            top,
            ...liStyle,
          }}
          component="li"
          className={isOpen ? 'open' : ''}
          animation={liAnimation}
        >
          <TweenOne
            component="a"
            onClick={e => this.onImgClick(e, i)}
            style={{
              left: imgLeft,
              top: imgTop,
            }}
            animation={aAnimation}
          >
            <img src={image} width="100%" height="100%" />
            <p style={{
              position:'relative',
              top:'-67px',
              left:'85px',
              fontSize:'large',
              fontFamily:'fantasy',
              color:'#736060'
    
            }}>{name.length > 5 ? name.slice(0,5)+ '...': name}</p>
          </TweenOne>
          <TweenOneGroup
            enter={[
              {
                opacity: 0, duration: 0, type: 'from', delay: 400,
              },
              { ease: 'easeOutCubic', type: 'from', left: isRight ? '50%' : '0%' },
            ]}
            leave={{ ease: 'easeInOutCubic', left: isRight ? '50%' : '0%' }}
            component=""
          >
            {isOpen && (
              <div
                className={`${this.props.className}-text-wrapper`}
                key="text"
                style={{
                  left: isRight ? '0%' : '50%',
                }}
                onClick={()=>{
                          this.props.setQueName(name);
                          this.props.setQueDes(description);
                          
                }}
              >
                <Link to={`/course/${item.id}`}>
                <h1>{name}</h1>
                
                <em />
                <p style={{color:'black'}}>{description}</p>
                </Link>
                <CloseOutlined type="cross" onClick={e => this.onClose(e, i)} 
                  style={{position: 'relative',
                  color: 'black',
                  left: '390px'}}
                />
              </div>
            )}
          </TweenOneGroup>
        </TweenOne>
      );
    });
  };

  render() {
    return (
      <div>
      <Popover content={this.content} title={this.props.name}>
        <Avatar icon={<UserOutlined />}  style= {{position:'absolute',right:'200px',top:'10px'}}></Avatar>
      </Popover>
        <div className={`${this.props.className}-wrapper`}>
          <div className={this.props.className} >
            <div className={`${this.props.className}-header`}>
              <ul>
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
            </div>
            <div>
              <QueueAnim type="bottom" className={`${this.props.className}-title`}>
                <h1 key="h1" style={{color:'#fbefef'}}>欢迎使用</h1>
                <p key="p" style={{fontSize:'medium'}}>选个课程吧</p>
              </QueueAnim>
              <QueueAnim
                delay={this.getDelay}
                component="ul"
                className={`${this.props.className}-image-wrapper`}
                interval={0}
                type="bottom"
              >
                {this.getLiChildren()}
              </QueueAnim>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name:state.getIn(['login','name']),
  id:state.getIn(['login','id'])
});
const mapDispatchToProps = (dispatch) => ({
  setQueName(name) {
    dispatch(doAction.setQueName(name));
  },
  setQueDes(des) {
    dispatch(doAction.setQueDes(des))
  },
  changeLogState(name,id, type) {
    dispatch(loginAction.changeLogState(name,id,type))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(St)
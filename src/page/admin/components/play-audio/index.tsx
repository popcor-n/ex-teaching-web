import React, {Component} from 'react';
import './index.css';
import axios from 'axios';
import {Button, Slider, Popover, Spin, Typography} from 'antd';
import {PlayCircleTwoTone, PauseCircleTwoTone} from '@ant-design/icons';
const {Paragraph} = Typography;

interface AudioProps {
  audioType: any;
}
interface AudioState {
  url: string;
  current: string;
  allTime: string;
  sliderLengthNow: number;
  sliderLength: number;
  isPlay: boolean;
  audioBase: any;
  translate: string;
  isTranslate: boolean;
  transOpen: boolean;
}

class Audio extends Component<AudioProps, AudioState> {
  audio: React.RefObject<any>;
  constructor(props: AudioProps) {
    super(props);
    this.state = {
      url: '', //歌曲地址
      current: '00:00', //当前时间
      allTime: '00:00', //当前歌曲时长
      sliderLengthNow: 0,
      sliderLength: 0,
      isPlay: false,
      audioBase: '', // base64录音
      translate: '', // 翻译内容
      isTranslate: false,
      transOpen: false,
    };
    this.audio = React.createRef();
  }
  componentDidMount() {
    // 将wav视频转为base64
    const that = this;
    const reader = new FileReader();
    reader.readAsDataURL(this.props.audioType);
    reader.onload = function() {
      that.setState({
        audioBase: reader.result,
      });
    };

    // 初始化audio的url
    const blob = this.props.audioType;
    const audioURL = window.URL.createObjectURL(blob);
    this.setState({
      url: audioURL,
    });

    // 为audio添加onchange的时间带动进度条进度
    this.canplay();
    this.timeUpdate();
  }

  componentWillUnmount() {
    // 清除该方法，防止删除组件后该方法还在进行，会报错
    this.audio.current.ontimeupdate = null;
  }
  //在音频可以播放时就显示总时长
  canplay() {
    this.audio.current.oncanplay = () => {
      const sliderLength = this.audio.current.duration;
      var allTime =
        (Math.floor(sliderLength / 60) + '').padStart(2, '0') +
        ':' +
        (Math.floor(sliderLength % 60) + '').padStart(2, '0');
      this.setState({
        allTime,
        sliderLength: parseInt(sliderLength),
      });
    };
  }
  audioWaiting() {
    this.audio.current.onwaiting = () => {
      alert('加载中');
    };
  }
  //在音频播放时当前时间也跟着变化
  timeUpdate() {
    this.audio.current.ontimeupdate = () => {
      const sliderLengthNow = this.audio.current.currentTime;
      var currentTime =
        (Math.floor(sliderLengthNow / 60) + '').padStart(2, '0') +
        ':' +
        (Math.floor(sliderLengthNow % 60) + '').padStart(2, '0');
      this.setState({
        current: currentTime,
        sliderLengthNow: parseInt(sliderLengthNow),
      });
      console.log(this.state.sliderLengthNow);
    };
  }
  //播放速度
  audioPlayBackRate(str: string) {
    this.audio.current.playbackRate = str;
  }
  //播放开始
  audioPlay() {
    this.audio.current.play();
    this.setState({
      isPlay: true,
    });
  }
  //播放暂停
  audioStop() {
    console.log('diaodaole');
    this.audio.current.pause();
    this.setState(
      {
        isPlay: false,
      },
      () => console.log(this.state),
    );
  }
  //快进
  audioGo() {
    this.audio.current.currentTime += 3;
  }
  //快退
  audioBack() {
    this.audio.current.currentTime -= 3;
  }

  sliderChange(sliderNumber: number) {
    this.audio.current.currentTime = sliderNumber;
  }

  audioEnd() {
    this.setState({
      isPlay: false,
    });
  }

  toTranslate() {
    this.setState({
      transOpen: true,
    });
    if (this.state.isTranslate) return;
    this.setState({
      isTranslate: true,
    });
    const params = {
      audio: this.state.audioBase,
    };
    axios.post('http://39.104.50.157/audio_text', params).then(res => {
      console.log(res.data);
      let transResult = res.data.result.translate;
      if (!transResult) transResult = '说了什么没听清';
      this.setState({
        translate: transResult,
      });
    });
  }

  content() {
    if (!this.state.transOpen) return <div>点击翻译</div>;
    return (
      <div>
        {this.state.translate && (
          <div style={{width: '300px', padding: '15px'}}>
            <Paragraph copyable>{this.state.translate}</Paragraph>
          </div>
        )}
        {!this.state.translate && (
          <div
            style={{
              height: '80px',
              width: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            正在翻译,请等待（一般不超过10s
            <Spin />
          </div>
        )}
      </div>
    );
  }

  render() {
    const {url, current, allTime, isPlay} = this.state;
    return (
      <div style={{height: '125px', width: '100%', paddingTop: '10px'}}>
        <div className="slider_box">
          {current}
          <div
            style={{
              width: '300px',
            }}
          >
            <Slider
              value={this.state.sliderLengthNow}
              max={this.state.sliderLength}
              onChange={(slider: number) => this.sliderChange(slider)}
            />
          </div>
          {allTime}
        </div>
        <audio ref={this.audio} src={url} onEnded={() => this.audioEnd()}>
          你的浏览器不支持音频播放哦！
        </audio>
        <div className="audio_option">
          <Button onClick={() => this.audioBack()}> 快退三秒</Button>
          <div className="play_audio">
            <PlayCircleTwoTone
              className="play_icon"
              style={isPlay ? {display: 'none'} : {}}
              onClick={() => this.audioPlay()}
            />
            <PauseCircleTwoTone
              className="play_icon"
              style={isPlay ? {} : {display: 'none'}}
              onClick={() => this.audioStop()}
            />
          </div>
          <Button onClick={() => this.audioGo()}>快进三秒</Button>
          <Popover content={this.content()}>
            <div className="translate" onClick={() => this.toTranslate()}>
              译
            </div>
          </Popover>
        </div>
      </div>
    );
  }
}

export default Audio;

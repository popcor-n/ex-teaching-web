import react from 'react';
import './index.css';
import Audio from '../play-audio/index';
import {Button, message} from 'antd';
import {CloseCircleOutlined} from '@ant-design/icons';
import Recorder from 'js-audio-recorder';
import recordering from './image/recordering.gif';
import recorderStatic from './image/recorderStatic.gif';

interface AudioProps {}
interface AudioState {
  recorderImage: string;
  isPauseRecorder: boolean;
  isRecorder: boolean;
  RecorderSuccess: boolean;
  strikes: number;
  hou: number;
  second: number;
  minutes: number;
}

class Recorders extends react.Component<AudioProps, AudioState> {
  recorder: Recorder;
  timeOut: any;

  constructor(props: AudioProps) {
    super(props);
    // this.audioStops = react.createRef();
    this.state = {
      recorderImage: recorderStatic,
      isPauseRecorder: false,
      isRecorder: false,
      RecorderSuccess: false,
      hou: 0,
      second: 0,
      minutes: 0,
      strikes: 0,
    };
    this.recorder = new Recorder({
      sampleBits: 8, // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1,
    });
    this.timeOut = null;
    this.timer = this.timer.bind(this);
  }

  // 开始录音
  startRecording() {
    this.setState({
      hou: 0,
      second: 0,
      minutes: 0,
      strikes: 0,
    });
    this.timeOut = setInterval(this.timer, 50);
    this.recorder.start().then(
      () => {
        this.setState({
          recorderImage: recordering,
          isRecorder: true,
          RecorderSuccess: false,
        });
      },
      error => {
        console.log(`${error.name} : ${error.message}`);
      },
    );
  }

  //录音完毕
  stopRecording() {
    console.log('end');
    window.clearInterval(this.timeOut);
    this.recorder.stop();
    if (this.recorder.duration > 1) {
      this.setState({
        recorderImage: recorderStatic,
        isPauseRecorder: false,
        isRecorder: false,
        RecorderSuccess: true,
      });

      return;
    }
    message.warning('录音时间小于一秒请重新录音~');
    this.setState({
      recorderImage: recorderStatic,
      isPauseRecorder: false,
      isRecorder: false,
    });
  }

  // 暂停录音
  pauseRecoder() {
    window.clearInterval(this.timeOut);
    this.recorder.pause();
    this.setState({
      recorderImage: recorderStatic,
      isPauseRecorder: true,
    });
  }

  // 继续录音
  resumeRecorder() {
    this.timeOut = setInterval(this.timer, 50);
    this.recorder.resume();
    this.setState({
      recorderImage: recordering,
      isPauseRecorder: false,
    });
  }

  // 删除录音
  clearRecorder() {
    this.setState({
      hou: 0,
      second: 0,
      minutes: 0,
      strikes: 0,
    });
    this.recorder.stop();
    this.recorder.destroy();
    this.setState({
      RecorderSuccess: false,
    });
  }

  // 计时器
  timer() {
    const nextstrikes: number = this.state.strikes + 50;
    this.setState({
      hou: parseInt((nextstrikes / 3600000).toString()) % 24,
      minutes: parseInt((nextstrikes / 60000).toString()) % 60,
      second: parseInt((nextstrikes / 1000).toString()) % 60,
      strikes: this.state.strikes + 50,
    });
  }

  render() {
    const {recorderImage, isRecorder, isPauseRecorder} = this.state;
    return (
      <div>
        <div className="recorder_father">
          <div className="start_control">
            <Button
              disabled={this.state.isRecorder ? true : false}
              onClick={() => this.startRecording()}
              type="primary"
            >
              开始录制
            </Button>
            <Button
              disabled={isRecorder && !isPauseRecorder ? false : true}
              onClick={() => this.pauseRecoder()}
              type="primary"
            >
              暂停录制
            </Button>
            <Button
              disabled={isRecorder && isPauseRecorder ? false : true}
              onClick={() => this.resumeRecorder()}
              type="primary"
            >
              继续录制
            </Button>
            <Button disabled={this.state.isRecorder ? false : true} onClick={() => this.stopRecording()}>
              停止录制
            </Button>
          </div>
          <h2 style={{textAlign: 'center'}}>
            {this.state.hou / 10 >= 1 ? '' : 0}
            {this.state.hou}:{this.state.minutes / 10 >= 1 ? '' : 0}
            {this.state.minutes}:{this.state.second / 10 >= 1 ? '' : 0}
            {this.state.second}
          </h2>
          <div className="recordering">
            <img src={recorderImage} alt="" style={{borderRadius: '19px', height: '100px'}} />
            <img src={recorderImage} alt="" style={{borderRadius: '19px', height: '100px'}} />
          </div>
          {this.state.RecorderSuccess && (
            <div
              style={{
                width: '100%',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <Audio audioType={this.recorder.getWAVBlob() ? this.recorder.getWAVBlob() : null} />
              <div style={{width: '100%'}}>
                <Button danger type="primary" style={{width: '100%'}} onClick={() => this.clearRecorder()}>
                  <CloseCircleOutlined style={{color: 'white'}} />
                  删除
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Recorders;

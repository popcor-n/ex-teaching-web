import react from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import {Slider, Tooltip} from 'antd';
import {
  PlayCircleOutlined,
  BackwardOutlined,
  ForwardOutlined,
  ExpandOutlined,
  PauseCircleOutlined,
  SoundOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './index.css';

interface VedioPlayProps {
  width: string;
  url: any;
  id: any;
}
interface VedioPlayState {
  isPlay: boolean;
  current: string; // 转为字符串的00：00的当前时长
  allTime: string; // 转为字符串的00：00的视频时长
  sliderLengthNow: number; // 当前播放的时长，number
  sliderLength: number; // 视频的时长number
  volume: number;
  isFullScreen: boolean;
  width: string;
}

class VedioPlay extends react.Component<VedioPlayProps, VedioPlayState> {
  player: any;
  constructor(props: VedioPlayProps) {
          /* eslint-disable */

    super(props);
    this.state = {
      isPlay: false,
      current: '00:00', //当前时间
      allTime: '00:00', //当前歌曲时长
      sliderLengthNow: 0,
      sliderLength: 0,
      volume: 0,
      isFullScreen: false,
      width: '',
    };
    this.player;
          /* eslint-disable */

  }

  componentDidMount() {
    this.setState({
      width: this.props.width,
    });
    this.player = videojs(
      this.props.id,
      {
        autoplay: false,
        controls: false,
        notSupportedMessage: '该视频暂时不能播放',
        width: this.props.width,
      },
      function onPlayerReady() {
        // console.log('onPlayerReady', this);
      },
    );
    this.player.src({
      src: this.props.url,
    });
    this.timeUpdate();
  }

  componentWillUnmount() {
    this.player.dispose(); //清理-销毁
  }

  getVedioTime() {
    const sliderLength = this.player.duration();
    console.log(sliderLength);
    var allTime =
      (Math.floor(sliderLength / 60) + '').padStart(2, '0') +
      ':' +
      (Math.floor(sliderLength % 60) + '').padStart(2, '0');
    this.setState({
      allTime,
      sliderLength: parseInt(sliderLength),
    });
  }

  timeUpdate() {
    const that = this;
    // 视频事件改变时候触发的回调函数
    this.player.on('timeupdate', () => {
      const sliderLengthNow = that.player.currentTime();
      var currentTime =
        (Math.floor(sliderLengthNow / 60) + '').padStart(2, '0') +
        ':' +
        (Math.floor(sliderLengthNow % 60) + '').padStart(2, '0');
      that.setState({
        current: currentTime,
        sliderLengthNow: parseInt(sliderLengthNow),
      });
    });

    // 视频加载完毕触发的回调函数
    this.player.on('loadedmetadata', () => {
      this.getVedioTime();
    });
    this.player.off(this.player, 'ended', function() {
      console.log('end');
      that.setState({
        isPlay: false,
      });
    });
    const volume = this.player.volume() * 10;
    this.setState({
      volume: volume,
    });
  }

  sliderChange(slider: number) {
    this.player.currentTime(slider);
  }

  vedioPlay() {
    console.log(this.player.duration());
    this.setState({
      isPlay: true,
    });
    this.player.play();
  }

  vedioPause() {
    this.setState({
      isPlay: false,
    });
    this.player.pause();
  }

  volumeChange(volume: number) {
    this.setState({
      volume: volume,
    });
    this.player.volume(volume * 0.1);
  }

  FullScreen() {
    // this.player.requestFullscreen();
    // var a = document.getElementsByClassName("video-js");
    document.querySelector('video')?.requestFullscreen();
    // if (!this.state.isFullScreen) {
    //   document.querySelector("video").requestFullscreen();
    //   this.setState({
    //     isFullScreen: true,
    //   });
    // } else {
    //   // a.requestPointerLock();
    //   document.exitFullscreen();
    //   this.setState({
    //     isFullScreen: false,
    //   });
    // }
  }

  keyDown(num: any) {
    switch (num.keyCode) {
      case 32:
        this.state.isPlay ? this.vedioPause() : this.vedioPlay();
        break;
      case 39:
        this.sliderChange(this.player.currentTime() + 3);
        break;
      case 37:
        this.sliderChange(this.player.currentTime() - 3);
        break;
      case 38:
        this.volumeChange(this.state.volume + 1 > 10 ? 10 : this.state.volume + 1);
        break;
      case 40:
        this.volumeChange(this.state.volume - 1 < 0 ? 0 : this.state.volume - 1);
        break;
    }
  }

  render() {
    const {isPlay, current, allTime, isFullScreen, width} = this.state;

    return (
      <div
        id="vedio_player"
        style={
          /* eslint-disable */
          this.state.isFullScreen
            ? {
                position: 'fixed',
                height: '500px',
                width: '100px',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }
            : {
                width: this.state.width,
                position: 'relative',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }
          /* eslint-enable */
        }
      >
        <video
          onKeyDown={(num: any) => this.keyDown(num)}
          onClick={isPlay ? () => this.vedioPause() : () => this.vedioPlay()}
          id={this.props.id}
          className="video-js vjs-default-skin vjs-big-play-centered"
          data-setup
          style={{height:'508px'}}
        />
        <div className="vedio_control_father">
          <div className="vedio_controls">
            <Slider
              value={this.state.sliderLengthNow}
              max={this.state.sliderLength}
              onChange={(slider: number) => this.sliderChange(slider)}
            />
          </div>
          <div className="vedio_controls_box" style={{backgroundColor:'black'}}>
            <div className="vedio_controls_button">
              {this.state.isPlay ? (
                <PauseCircleOutlined className="play_icon" onClick={() => this.vedioPause()} />
              ) : (
                <PlayCircleOutlined className="play_icon" onClick={() => this.vedioPlay()} />
              )}
              {current}/{allTime}
              <Tooltip title="快退三秒">
                <BackwardOutlined
                  className="play_back"
                  onClick={() => this.sliderChange(this.player.currentTime() - 3)}
                />
              </Tooltip>
              <Tooltip title="快进三秒">
                <ForwardOutlined
                  className="play_forward"
                  onClick={() => this.sliderChange(this.player.currentTime() + 3)}
                />
              </Tooltip>
            </div>
            <div className="vedio_controls_volumns">
              {this.state.volume === 0 ? (
                <NotificationOutlined style={{color: '#fff'}} />
              ) : (
                <SoundOutlined style={{color: '#fff'}} />
              )}
              <div style={{width: '80px'}}>
                <Slider value={this.state.volume} max={10} onChange={(slider: number) => this.volumeChange(slider)} />
              </div>

              <ExpandOutlined className="all_veiw" onClick={() => this.FullScreen()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VedioPlay;

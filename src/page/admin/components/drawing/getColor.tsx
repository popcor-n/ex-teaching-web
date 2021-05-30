import {SketchPicker} from 'react-color';
import react from 'react';

interface GetColorProp {
  style: any;
  color: any;
  objKey: any;
  updateColor: any;
}
interface GetColorState {
  color: any;
  key: any;
  isColorPicker: any;
}
export default class GetColor extends react.Component<GetColorProp, GetColorState> {
  constructor(props: GetColorProp) {
    super(props);
    this.state = {
      color: 'red',
      key: '',
      isColorPicker: 'none',
    };
  }

  componentDidMount() {
    console.log(this.props.objKey);
    this.setState({
      color: this.props.color,
      key: this.props.objKey,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.color !== this.state.color && this.state.key !== this.props.objKey)
      this.setState({
        color: this.props.color,
        key: this.props.objKey,
      });
  }

  handleClick = () => {
    let {isColorPicker, key, color} = this.state;
    isColorPicker = isColorPicker === 'none' ? 'block' : 'none';
    this.setState({isColorPicker});
    if (isColorPicker) {
      this.props.updateColor(key, color);
    }
  };

  handleChange = value => {
    let color = value.hex;
    this.setState({color});
  };

  render() {
    let {color, isColorPicker} = this.state;
    return (
      <div>
        <div
          onClick={() => this.handleClick()}
          style={{
            background: color,
            border: 'none',
            lineHeight: '31px',
            height: 31,
            width: 45,
            borderRadius: '5px',
            verticalAlign: 'middle',
          }}
        />
        {isColorPicker === 'block' ? (
          <div style={{position: 'absolute', zIndex: 66}}>
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}

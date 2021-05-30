import react from 'react';
import Drawing from './index';

interface DrawingFatherProps {}
interface DrawingFatherState {}

class DrawingFather extends react.Component<DrawingFatherProps, DrawingFatherState> {
  constructor(props: DrawingFatherProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <Drawing />;
  }
}

export default DrawingFather;

import react from "react";
import VedioPlay from "./index";

interface VedioFatherProps {
  vedio: string
}
interface VedioFatherState {}

class VedioFather extends react.Component<VedioFatherProps, VedioFatherState> {
  constructor(props: VedioFatherProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("vedioUrl", this.props.vedio);
  }

  render() {
    return (
      <div>
        <VedioPlay url={this.props.vedio} id="vedio_1" width="1000px" />
      </div>
    );
  }
}

export default VedioFather;

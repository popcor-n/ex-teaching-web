import GetColor from './getColor';
import react from 'react';
import {Button, Input, InputNumber} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import circle from './image/circle.png';
import circleDotted from './image/circleDotted.png';
import line from './image/line.png';
import lineDotted from './image/lineDotted.png';
import ellipse from './image/ellipse.png';
import ellipseDotted from './image/ellipseDotted.png';
import rect from './image/rect.png';
import rectDotted from './image/rectDotted.png';
import sector from './image/sector.png';
import sectorDotted from './image/sectorDotted.png';
import droplet from './image/droplet.png';
import dropletDotted from './image/dropletDotted.png';
import arc from './image/arc.png';
import arcDotted from './image/arcDotted.png';
import triangle from './image/triangle.png';
import triangleDotted from './image/triangleDotted.png';
import polygon from './image/polygon.png';
import polygonDotted from './image/polygonDotted.png';
import star from './image/star.png';
import starDotted from './image/starDotted.png';
import root from './image/root.png';
import text from './image/text.png';
import './index.css';
const zrender = require('zrender');

interface DrawingProps {}
interface DrawingState {
  drawingId: number;
  controlLine: any;
  controlRoot: any;
  controlArc: any;
  controlTriangle: any;
  controlRect: any;
  controlCircle: any;
  controlEllipse: any;
  controlSector: any;
  controlDroplet: any;
  controlPolygon: any;
  controlStar: any;
  controlText: any;
  textFont: number[];
  isControl: boolean;
}

class Drawing extends react.Component<DrawingProps, DrawingState> {
  drawingArray: any = {};
  drawingCanvas: any;
  canvasInit: any;
  constructor(props: DrawingProps) {
    super(props);
    this.state = {
      drawingId: 0,
      // 修改线段的数据
      controlLine: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        rotation: 0,
      },
      // 修改点的数据
      controlRoot: {
        r: 0,
        rotation: 0,
      },
      // 修改曲线的数据
      controlArc: {
        cx: 0,
        cy: 0,
        startAngle: 0,
        endAngle: 0,
        r: 0,
        rotation: 0,
      },
      // 修改正三角形的数据
      controlTriangle: {
        r: 0,
        x: 0,
        t: 0,
        rotation: 0,
      },
      controlRect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotation: 0,
      },
      controlCircle: {
        r: 0,
        roation: 0,
      },
      controlEllipse: {
        cx: 0,
        cy: 0,
        rx: 0,
        ry: 0,
        rotation: 0,
      },
      controlSector: {
        cx: 0,
        cy: 0,
        startAngle: 0,
        endAngle: 0,
        r: 0,
        rotation: 0,
      },
      controlDroplet: {
        cx: 0,
        cy: 0,
        width: 0,
        height: 0,
        rotation: 0,
      },
      controlPolygon: {
        x: 0,
        y: 0,
        r: 0,
        n: 0,
        rotation: 0,
      },
      controlStar: {
        cx: 0,
        cy: 0,
        r: 0,
        n: 0,
        r0: 0,
        rotation: 0,
      },
      controlText: {
        text: '',
        textFontSize: 0,
        rotation: 0,
      },
      textFont: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
      isControl: false,
    };
  }

  componentDidMount() {
    this.drawingInit();
  }

  // 初始化画板
  drawingInit() {
    this.drawingCanvas = document.getElementById('drawing_canvas');
    var context = this.drawingCanvas.getContext('2d');
    context.fillStyle = 'green';
    context.fillRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
    this.canvasInit = zrender.init(this.drawingCanvas);
  }

  // 清除画板
  redrawing() {
    zrender.dispose(this.canvasInit);
    this.drawingInit();
    this.setState({
      isControl: false,
    });
  }

  // 点
  drawingRoot() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Circle({
      id: key,
      shape: {
        cx: 100,
        cy: 100,
        r: 3,
        type: 'root',
      },
      style: {
        fill: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlRoot: {
          r: shape.r,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 点操作台
  controlRoot() {
    const {r} = this.state.controlRoot;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">点半径</span>
        <Input
          size="small"
          value={isNaN(r) ? 0 : r}
          onChange={value => {
            const {controlRoot} = this.state;
            controlRoot.r = parseInt(value.target.value);
            this.setState({
              controlRoot: controlRoot,
            });
          }}
        />
        <div className="pic_submit">
          <Button size="small" onClick={() => this.controlRootInfo()}>
            确认
          </Button>
        </div>
      </div>
    );
  }

  // 更新点的数据重新渲染视图
  controlRootInfo() {
    const {controlRoot} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        r: controlRoot.r,
      },
      draggable: true,
    });
  }

  // 线段
  drawingLine() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Line({
      id: key,
      shape: {
        x1: 100,
        y1: 100,
        x2: 400,
        y2: 100,
        type: 'line',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlLine: {
          x1: shape.x1,
          y1: shape.y1,
          x2: shape.x2,
          y2: shape.y2,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 线段操作台
  controlLine() {
    const {x1, y1, x2, y2, rotation} = this.state.controlLine;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">初始X坐标</span>
        <Input
          size="small"
          value={isNaN(x1) ? '' : x1}
          onChange={value => {
            const {controlLine} = this.state;
            controlLine.x1 = parseInt(value.target.value);
            this.setState({
              controlLine: controlLine,
            });
          }}
        />
        <span className="pic_font_size">初始Y坐标</span>
        <Input
          size="small"
          value={isNaN(y1) ? '' : y1}
          onChange={value => {
            const {controlLine} = this.state;
            controlLine.y1 = parseInt(value.target.value);
            this.setState({
              controlLine: controlLine,
            });
          }}
        />
        <span className="pic_font_size">终点X坐标</span>
        <Input
          size="small"
          value={isNaN(x2) ? '' : x2}
          onChange={value => {
            const {controlLine} = this.state;
            controlLine.x2 = parseInt(value.target.value);
            this.setState({
              controlLine: controlLine,
            });
          }}
        />
        <span className="pic_font_size">终点Y坐标</span>
        <Input
          size="small"
          value={isNaN(y2) ? '' : y2}
          onChange={value => {
            const {controlLine} = this.state;
            controlLine.y2 = parseInt(value.target.value);
            this.setState({
              controlLine: controlLine,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlLineInfo()}>确认</Button>
        </div>
        <br />
        <span className="pic_font_size">旋转角度</span>
        <Input
          size="small"
          value={isNaN(rotation) ? '' : rotation}
          onChange={value => {
            const {controlLine} = this.state;
            controlLine.rotation = parseInt(value.target.value);
            this.setState({
              controlLine: controlLine,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlLine)}>确认</Button>
        </div>
      </div>
    );
  }

  // 更新线段视图
  controlLineInfo() {
    const {controlLine} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        x1: controlLine.x1,
        y1: controlLine.y1,
        x2: controlLine.x2,
        y2: controlLine.y2,
      },
      draggable: true,
    });
  }

  // 虚线
  drawingLineDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Line({
      id: key,
      shape: {
        x1: 100,
        y1: 200,
        x2: 400,
        y2: 200,
        type: 'line',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlLine: {
          x1: shape.x1,
          y1: shape.y1,
          x2: shape.x2,
          y2: shape.y2,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 曲线
  drawingArc() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Arc({
      id: key,
      shape: {
        cx: 80,
        cy: 80,
        r: 30,
        startAngle: Math.PI * 1.25,
        endAngle: Math.PI + (Math.PI * 125) / 180,
        clockwise: true,
        type: 'arc',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlArc: {
          isControl: true,
          cx: shape.cx,
          cy: shape.cy,
          r: shape.r,
          startAngle: parseInt((((shape.startAngle - Math.PI) * 180) / Math.PI).toString()),
          endAngle: parseInt((((shape.endAngle - Math.PI) * 180) / Math.PI).toString()),
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 虚线曲线
  drawingArcDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Arc({
      id: key,
      shape: {
        cx: 120,
        cy: 120,
        r: 30,
        startAngle: Math.PI * 1.25,
        endAngle: Math.PI + (Math.PI * 125) / 180,
        clockwise: true,
        type: 'arc',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlArc: {
          isControl: true,
          cx: shape.cx,
          cy: shape.cy,
          r: shape.r,
          startAngle: parseInt((((shape.startAngle - Math.PI) * 180) / Math.PI).toString()),
          endAngle: parseInt((((shape.endAngle - Math.PI) * 180) / Math.PI).toString()),
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 曲线操作台
  controlArc() {
    const {cx, cy, startAngle, endAngle, rotation, r} = this.state.controlArc;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">圆心横坐标</span>
        <Input
          size="small"
          value={isNaN(cx) ? '' : cx}
          onChange={value => {
            const {controlArc} = this.state;
            controlArc.cx = parseInt(value.target.value);
            this.setState({
              controlArc: controlArc,
            });
          }}
        />
        <span className="pic_font_size">圆心纵坐标</span>
        <Input
          size="small"
          value={isNaN(cy) ? '' : cy}
          onChange={value => {
            const {controlArc} = this.state;
            controlArc.cy = parseInt(value.target.value);
            this.setState({
              controlArc: controlArc,
            });
          }}
        />
        <span className="pic_font_size">曲线半径</span>
        <Input
          size="small"
          value={isNaN(r) ? '' : r}
          onChange={value => {
            const {controlArc} = this.state;
            controlArc.r = parseInt(value.target.value);
            this.setState({
              controlArc: controlArc,
            });
          }}
        />
        <span className="pic_font_size">起始角度</span>
        <Input
          size="small"
          value={isNaN(startAngle) ? '' : startAngle}
          onChange={value => {
            const {controlArc} = this.state;
            controlArc.startAngle = parseInt(value.target.value);
            this.setState({
              controlArc: controlArc,
            });
          }}
        />
        <span className="pic_font_size">终点角度</span>
        <Input
          size="small"
          value={isNaN(endAngle) ? '' : endAngle}
          onChange={value => {
            const {controlArc} = this.state;
            controlArc.endAngle = parseInt(value.target.value);
            this.setState({
              controlArc: controlArc,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlArcInfo()}>确认</Button>
        </div>
        <br />
        <span className="pic_font_size">旋转角度</span>
        <Input
          size="small"
          value={isNaN(rotation) ? 0 : rotation}
          onChange={value => {
            const {controlArc} = this.state;
            controlArc.rotation = parseInt(value.target.value);
            this.setState({
              controlArc: controlArc,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlArc)}>确认</Button>
        </div>
      </div>
    );
  }

  // 更新曲线视图
  controlArcInfo() {
    const {controlArc} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        cx: controlArc.cx,
        cy: controlArc.cy,
        r: controlArc.r,
        startAngle: Math.PI + (Math.PI * controlArc.startAngle) / 180,
        endAngle: Math.PI + (Math.PI * controlArc.endAngle) / 180,
      },
      draggable: true,
    });
  }

  // 正三角形
  drawingTriangle() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Isogon({
      id: key,
      shape: {
        x: 80,
        y: 80,
        r: 50, // 外切圆半径
        n: 3,
        type: 'triangle',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlTriangle: {
          r: shape.r,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 虚线正三角形
  drawingTriangleDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Isogon({
      id: key,
      shape: {
        x: 120,
        y: 120,
        r: 50, // 外切圆半径
        n: 3,
        type: 'triangle',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlTriangle: {
          r: shape.r,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 正三角形操作台
  controlTriangle() {
    const {r, rotation} = this.state.controlTriangle;
    return (
      <div className="pic_controls">
        正三角形半径
        <Input
          size="small"
          value={isNaN(r) ? '' : r}
          onChange={value => {
            const {controlTriangle} = this.state;
            controlTriangle.r = parseInt(value.target.value);
            this.setState({
              controlTriangle: controlTriangle,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlTriangleInfo()}>确认</Button>
        </div>
        <br />
        旋转角度
        <Input
          size="small"
          value={isNaN(rotation) ? 0 : rotation}
          onChange={value => {
            const {controlTriangle} = this.state;
            controlTriangle.rotation = parseInt(value.target.value);
            this.setState({
              controlTriangle: controlTriangle,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlTriangle)}>确认</Button>
        </div>
      </div>
    );
  }

  // 更新正三角形视图
  controlTriangleInfo() {
    const {controlTriangle} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        r: controlTriangle.r,
      },
      draggable: true,
    });
  }

  // 正四边形
  drawingRect() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Rect({
      id: key,
      shape: {
        r: [0, 0, 0, 0],
        x: 80,
        y: 80,
        width: 130,
        height: 65,
        type: 'rect',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlRect: {
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 虚线四边形
  drawingRectDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Rect({
      id: key,
      shape: {
        r: [0, 0, 0, 0],
        x: 120,
        y: 120,
        width: 130,
        height: 65,
        type: 'rect',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlRect: {
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  controlRect() {
    const {x, y, width, height, rotation} = this.state.controlRect;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">正四边形左上角横坐标</span>
        <Input
          size="small"
          value={isNaN(x) ? '' : x}
          onChange={value => {
            const {controlRect} = this.state;
            controlRect.x = parseInt(value.target.value);
            this.setState({
              controlRect: controlRect,
            });
          }}
        />
        <span className="pic_font_size">正四边形左上角纵坐标</span>
        <Input
          size="small"
          value={isNaN(y) ? '' : y}
          onChange={value => {
            const {controlRect} = this.state;
            controlRect.y = parseInt(value.target.value);
            this.setState({
              controlRect: controlRect,
            });
          }}
        />
        <span className="pic_font_size">正四边形宽度</span>
        <Input
          size="small"
          value={isNaN(width) ? '' : width}
          onChange={value => {
            const {controlRect} = this.state;
            controlRect.width = parseInt(value.target.value);
            this.setState({
              controlRect: controlRect,
            });
          }}
        />
        <span className="pic_font_size">正四边形高度</span>
        <Input
          size="small"
          value={isNaN(height) ? '' : height}
          onChange={value => {
            const {controlRect} = this.state;
            controlRect.height = parseInt(value.target.value);
            this.setState({
              controlRect: controlRect,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRectInfo()}>确认</Button>
        </div>

        <br />
        <span className="pic_font_size">旋转角度</span>
        <Input
          size="small"
          value={isNaN(rotation) ? '' : rotation}
          onChange={value => {
            const {controlRect} = this.state;
            controlRect.rotation = parseInt(value.target.value);
            this.setState({
              controlRect: controlRect,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlRect)}>确认</Button>
        </div>
      </div>
    );
  }

  controlRectInfo() {
    const {controlRect} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        x: controlRect.x,
        y: controlRect.y,
        width: controlRect.width,
        height: controlRect.height,
      },
      draggable: true,
    });
  }

  // 圆
  drawingCircle() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Circle({
      shape: {
        cx: 150,
        cy: 50,
        r: 80,
        type: 'circle',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      id: key,
      draggable: true,
    });
    this.drawingArray[key].on(
      'click',
      (e: any) => {
        const {shape} = e.target;
        this.setState({
          isControl: true,
          drawingId: e.target.id,
          controlCircle: {
            r: shape.r,
          },
        });
      },
      this.context,
    );
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 虚线圆
  drawingCircleDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Circle({
      shape: {
        cx: 200,
        cy: 50,
        r: 80,
        type: 'circle',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      id: key,
      draggable: true,
    });
    this.drawingArray[key].on(
      'click',
      (e: any) => {
        const {shape} = e.target;
        this.setState({
          isControl: true,
          drawingId: e.target.id,
          controlCircle: {
            r: shape.r,
          },
        });
      },
      this.context,
    );
    this.canvasInit.add(this.drawingArray[key]);
  }

  controlCircle() {
    const {r} = this.state.controlCircle;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">圆半径</span>
        <Input
          size="small"
          value={isNaN(r) ? '' : r}
          onChange={value => {
            const {controlCircle} = this.state;
            controlCircle.r = parseInt(value.target.value);
            this.setState({
              controlCircle: controlCircle,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlCircleInfo()}>确认</Button>
        </div>
      </div>
    );
  }

  controlCircleInfo() {
    const {controlCircle} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        r: controlCircle.r,
      },
      draggable: true,
    });
  }

  //椭圆
  drawingEllipse() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Ellipse({
      id: key,
      shape: {
        cx: 200,
        cy: 200,
        rx: 120,
        ry: 50,
        type: 'ellipse',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlEllipse: {
          cx: shape.cx,
          cy: shape.cy,
          rx: shape.rx,
          ry: shape.ry,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  //虚线椭圆
  drawingEllipseDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Ellipse({
      id: key,
      shape: {
        cx: 150,
        cy: 200,
        rx: 120,
        ry: 50,
        type: 'ellipse',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlEllipse: {
          cx: shape.cx,
          cy: shape.cy,
          rx: shape.rx,
          ry: shape.ry,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  controlEllipse() {
    const {cx, cy, rx, ry, rotation} = this.state.controlEllipse;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">椭圆心横坐标</span>
        <Input
          size="small"
          value={isNaN(cx) ? '' : cx}
          onChange={value => {
            const {controlEllipse} = this.state;
            controlEllipse.cx = parseInt(value.target.value);
            this.setState({
              controlEllipse: controlEllipse,
            });
          }}
        />
        <span className="pic_font_size">椭圆心纵坐标</span>
        <Input
          size="small"
          value={isNaN(cy) ? '' : cy}
          onChange={value => {
            const {controlEllipse} = this.state;
            controlEllipse.cy = parseInt(value.target.value);
            this.setState({
              controlEllipse: controlEllipse,
            });
          }}
        />
        <span className="pic_font_size">椭圆横半径</span>
        <Input
          size="small"
          value={isNaN(rx) ? '' : rx}
          onChange={value => {
            const {controlEllipse} = this.state;
            controlEllipse.rx = parseInt(value.target.value);
            this.setState({
              controlEllipse: controlEllipse,
            });
          }}
        />
        <span className="pic_font_size">椭圆纵半径</span>
        <Input
          size="small"
          value={isNaN(ry) ? '' : ry}
          onChange={value => {
            const {controlEllipse} = this.state;
            controlEllipse.ry = parseInt(value.target.value);
            this.setState({
              controlEllipse: controlEllipse,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlEllipseInfo()}>确认</Button>
        </div>
        <br />
        <span className="pic_font_size">旋转角度</span>
        <Input
          size="small"
          value={isNaN(rotation) ? '' : rotation}
          onChange={value => {
            const {controlEllipse} = this.state;
            controlEllipse.rotation = parseInt(value.target.value);
            this.setState({
              controlEllipse: controlEllipse,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlEllipse)}>确认</Button>
        </div>
      </div>
    );
  }

  controlEllipseInfo() {
    const {controlEllipse} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        cx: controlEllipse.cx,
        cy: controlEllipse.cy,
        rx: controlEllipse.rx,
        ry: controlEllipse.ry,
      },
      draggable: true,
    });
  }

  // 扇形
  drawingSector() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Sector({
      id: key,
      shape: {
        cx: 150,
        cy: 150,
        r: 120,
        startAngle: Math.PI,
        endAngle: Math.PI + (Math.PI * 90) / 180,
        clockwise: true,
        type: 'sector',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlSector: {
          cx: shape.cx,
          cy: shape.cy,
          r: shape.r,
          startAngle: parseInt((((shape.startAngle - Math.PI) * 180) / Math.PI).toString()),
          endAngle: parseInt((((shape.endAngle - Math.PI) * 180) / Math.PI).toString()),
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 虚线扇形
  drawingSectorDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Sector({
      id: key,
      shape: {
        cx: 250,
        cy: 250,
        r: 120,
        startAngle: Math.PI,
        endAngle: Math.PI + (Math.PI * 90) / 180,
        clockwise: true,
        type: 'sector',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlSector: {
          cx: shape.cx,
          cy: shape.cy,
          r: shape.r,
          startAngle: parseInt((((shape.startAngle - Math.PI) * 180) / Math.PI).toString()),
          endAngle: parseInt((((shape.endAngle - Math.PI) * 180) / Math.PI).toString()),
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  controlSector() {
    const {cx, cy, startAngle, endAngle, rotation, r} = this.state.controlSector;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">圆心横坐标</span>
        <Input
          size="small"
          value={isNaN(cx) ? '' : cx}
          onChange={value => {
            const {controlSector} = this.state;
            controlSector.cx = parseInt(value.target.value);
            this.setState({
              controlSector: controlSector,
            });
          }}
        />
        <span className="pic_font_size">圆心纵坐标</span>
        <Input
          size="small"
          value={isNaN(cy) ? '' : cy}
          onChange={value => {
            const {controlSector} = this.state;
            controlSector.cy = parseInt(value.target.value);
            this.setState({
              controlSector: controlSector,
            });
          }}
        />
        <span className="pic_font_size">扇形半径</span>
        <Input
          size="small"
          value={isNaN(r) ? '' : r}
          onChange={value => {
            const {controlSector} = this.state;
            controlSector.r = parseInt(value.target.value);
            this.setState({
              controlSector: controlSector,
            });
          }}
        />
        <span className="pic_font_size">起始角度</span>
        <Input
          size="small"
          value={isNaN(startAngle) ? '' : startAngle}
          onChange={value => {
            const {controlSector} = this.state;
            controlSector.startAngle = parseInt(value.target.value);
            this.setState({
              controlSector: controlSector,
            });
          }}
        />
        <span className="pic_font_size">终点角度</span>
        <Input
          size="small"
          value={isNaN(endAngle) ? '' : endAngle}
          onChange={value => {
            const {controlSector} = this.state;
            controlSector.endAngle = parseInt(value.target.value);
            this.setState({
              controlSector: controlSector,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlSectorInfo()}>确认</Button>
        </div>
        <br />
        <span className="pic_font_size">旋转角度</span>
        <Input
          size="small"
          value={isNaN(rotation) ? '' : rotation}
          onChange={value => {
            const {controlSector} = this.state;
            controlSector.rotation = parseInt(value.target.value);
            this.setState({
              controlSector: controlSector,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlSector)}>确认</Button>
        </div>
      </div>
    );
  }

  controlSectorInfo() {
    const {controlSector} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        cx: controlSector.cx,
        cy: controlSector.cy,
        r: controlSector.r,
        startAngle: Math.PI + (Math.PI * controlSector.startAngle) / 180,
        endAngle: Math.PI + (Math.PI * controlSector.endAngle) / 180,
      },
      draggable: true,
    });
  }

  // 水滴
  drawingDroplet() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Droplet({
      id: key,
      shape: {
        cx: 120,
        cy: 120,
        width: 50,
        height: 90,
        type: 'droplet',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlDroplet: {
          cx: shape.cx,
          cy: shape.cy,
          width: shape.width,
          height: shape.height,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 虚线水滴
  drawingDropletDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Droplet({
      id: key,
      shape: {
        cx: 220,
        cy: 220,
        width: 50,
        height: 90,
        type: 'droplet',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlDroplet: {
          cx: shape.cx,
          cy: shape.cy,
          width: shape.width,
          height: shape.height,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  controlDroplet() {
    const {width, height, rotation} = this.state.controlDroplet;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">水滴横向半径</span>
        <Input
          size="small"
          value={isNaN(width) ? '' : width}
          onChange={value => {
            const {controlDroplet} = this.state;
            controlDroplet.width = parseInt(value.target.value);
            this.setState({
              controlDroplet: controlDroplet,
            });
          }}
        />
        <span className="pic_font_size">水滴纵向半径</span>
        <Input
          size="small"
          value={isNaN(height) ? '' : height}
          onChange={value => {
            const {controlDroplet} = this.state;
            controlDroplet.height = parseInt(value.target.value);
            this.setState({
              controlDroplet: controlDroplet,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlDropletInfo()}>确认</Button>
        </div>
        <br />
        <span className="pic_font_size">旋转角度</span>
        <Input
          size="small"
          value={isNaN(rotation) ? '' : rotation}
          onChange={value => {
            const {controlDroplet} = this.state;
            controlDroplet.rotation = parseInt(value.target.value);
            this.setState({
              controlDroplet: controlDroplet,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlDroplet)}>确认</Button>
        </div>
      </div>
    );
  }

  controlDropletInfo() {
    const {controlDroplet} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        width: controlDroplet.width,
        height: controlDroplet.height,
      },
      draggable: true,
    });
  }

  // 正多边形
  drawingPolygon() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Isogon({
      id: key,
      shape: {
        x: 80,
        y: 80,
        r: 80, // 外切圆半径
        n: 5,
        type: 'polygon',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlPolygon: {
          x: shape.x,
          y: shape.y,
          r: shape.r,
          n: shape.n,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 虚线正多边形
  drawingPolygonDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Isogon({
      id: key,
      shape: {
        x: 130,
        y: 80,
        r: 80, // 外切圆半径
        n: 5,
        type: 'polygon',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlPolygon: {
          x: shape.x,
          y: shape.y,
          r: shape.r,
          n: shape.n,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  controlPolygon() {
    const {r, n, rotation} = this.state.controlPolygon;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">多边形外切圆半径</span>
        <Input
          size="small"
          value={isNaN(r) ? '' : r}
          onChange={value => {
            const {controlPolygon} = this.state;
            controlPolygon.r = parseInt(value.target.value);
            this.setState({
              controlPolygon: controlPolygon,
            });
          }}
        />
        <span className="pic_font_size">多边形边数</span>
        <Input
          size="small"
          value={isNaN(n) ? '' : n}
          onChange={value => {
            const {controlPolygon} = this.state;
            controlPolygon.n = parseInt(value.target.value);
            this.setState({
              controlPolygon: controlPolygon,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlPolygonInfo()}>确认</Button>
        </div>

        <br />
        <span className="pic_font_size">旋转角度</span>
        <Input
          size="small"
          value={isNaN(rotation) ? '' : rotation}
          onChange={value => {
            const {controlPolygon} = this.state;
            controlPolygon.rotation = parseInt(value.target.value);
            this.setState({
              controlPolygon: controlPolygon,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlPolygon)}>确认</Button>
        </div>
      </div>
    );
  }

  controlPolygonInfo() {
    const {controlPolygon} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        r: controlPolygon.r,
        n: controlPolygon.n,
      },
      draggable: true,
    });
  }

  // 星星
  drawingStar() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Star({
      id: key,
      shape: {
        cx: 80,
        cy: 80,
        r: 80,
        n: 5,
        r0: 32,
        type: 'star',
      },
      style: {
        fill: 'none',
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlStar: {
          cx: shape.cx,
          cy: shape.cy,
          r: shape.r,
          r0: shape.r0,
          n: shape.n,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  // 虚线星星
  drawingStarDotted() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Star({
      id: key,
      shape: {
        cx: 200,
        cy: 80,
        r: 80,
        n: 5,
        r0: 32,
        type: 'star',
      },
      style: {
        fill: 'none',
        lineDash: [5, 5],
        stroke: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {shape} = e.target;
      this.setState({
        isControl: true,
        drawingId: e.target.id,
        controlStar: {
          cx: shape.cx,
          cy: shape.cy,
          r: shape.r,
          r0: shape.r0,
          n: shape.n,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  controlStar() {
    const {r, r0, n, rotation} = this.state.controlStar;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">多角形外切圆半径</span>
        <Input
          size="small"
          value={isNaN(r) ? '' : r}
          onChange={value => {
            const {controlStar} = this.state;
            controlStar.r = parseInt(value.target.value);
            this.setState({
              controlStar: controlStar,
            });
          }}
        />
        <span className="pic_font_size">多角形内切圆半径</span>
        <Input
          size="small"
          value={isNaN(r0) ? '' : r0}
          onChange={value => {
            const {controlStar} = this.state;
            controlStar.r0 = parseInt(value.target.value);
            this.setState({
              controlStar: controlStar,
            });
          }}
        />
        <span className="pic_font_size">角数</span>
        <Input
          size="small"
          value={isNaN(n) ? '' : n}
          onChange={value => {
            const {controlStar} = this.state;
            controlStar.n = parseInt(value.target.value);
            this.setState({
              controlStar: controlStar,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlStarInfo()}>确认</Button>
        </div>
        <br />
        <span className="pic_font_size">旋转角度</span>
        <Input
          size="small"
          value={isNaN(rotation) ? '' : rotation}
          onChange={value => {
            const {controlStar} = this.state;
            controlStar.rotation = parseInt(value.target.value);
            this.setState({
              controlStar: controlStar,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlStar)}>确认</Button>
        </div>
      </div>
    );
  }

  controlStarInfo() {
    const {controlStar} = this.state;
    this.drawingArray[this.state.drawingId].attr({
      shape: {
        r: controlStar.r,
        r0: controlStar.r0,
        n: controlStar.n,
      },
      draggable: true,
    });
  }

  // 文本
  drawingText() {
    const key = new Date().getTime().toString();
    this.drawingArray[key] = new zrender.Text({
      id: key,
      textFontSize: 3,
      shape: {
        type: 'text',
      },
      style: {
        text: '文本',
        fontSize: 20,
        fill: 'black',
      },
      draggable: true,
    });
    this.drawingArray[key].on('click', e => {
      const {style, parent} = e.target;
      this.setState({
        isControl: true,
        drawingId: parent.id,
        controlText: {
          text: style.text,
          textFontSize: parent.textFontSize,
        },
      });
    });
    this.canvasInit.add(this.drawingArray[key]);
  }

  controlText() {
    const {text, rotation} = this.state.controlText;
    return (
      <div className="pic_controls">
        <span className="pic_font_size">文本内容</span>
        <Input
          size="small"
          value={text}
          onChange={value => {
            console.log(value);
            const {controlText} = this.state;
            controlText.text = value.target.value;
            this.setState({
              controlText: controlText,
            });
          }}
        />
        <span className="pic_font_size">文本大小</span>
        <br />
        <InputNumber
          min={1}
          max={10}
          value={this.state.controlText.textFontSize}
          onChange={value => {
            const {controlText} = this.state;
            controlText.textFontSize = value;
            this.setState({
              controlText: controlText,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlTextInfo()}>确认</Button>
        </div>

        <br />
        <span className="pic_font_size">旋转角度</span>
        <Input
          size="small"
          value={isNaN(rotation) ? '' : rotation}
          onChange={value => {
            const {controlText} = this.state;
            controlText.rotation = parseInt(value.target.value);
            this.setState({
              controlText: controlText,
            });
          }}
        />
        <div className="pic_submit">
          <Button onClick={() => this.controlRotaion(this.state.controlText)}>确认</Button>
        </div>
      </div>
    );
  }

  controlTextInfo() {
    const {controlText} = this.state;
    const font = this.state.textFont[this.state.controlText.textFontSize - 1] + 'px';
    this.drawingArray[this.state.drawingId].attr({
      style: {
        text: controlText.text,
        fontSize: font,
      },
      draggable: true,
    });
  }

  control() {
    const zr = this.drawingArray[this.state.drawingId];
    let color;
    if (zr.shape.type === 'root' || zr.shape.type === 'text') color = zr.style.fill;
    else color = zr.style.stroke;
    return (
      <div className="controls">
        <div className="control_top">
          <GetColor
            style={{verticalAlign: 'middle'}}
            color={color} //编辑的时候，用于颜色的回显
            objKey={this.drawingArray[this.state.drawingId].id} //因页面多次使用，传入key值，用于区分色块更新，因key是关键字，这里使用了objKey作为属性名
            updateColor={(e, value) => this.updateColor(e, value)}
          />
          <Button danger onClick={() => this.deleteDrawing(this.state.drawingId)}>
            删除
          </Button>
        </div>

        {this.controlMain()}
      </div>
    );
  }

  // 根据当前图形返回相应的操作台
  controlMain() {
    switch (this.drawingArray[this.state.drawingId].shape.type) {
      case 'root':
        return this.controlRoot();
      case 'line':
        return this.controlLine();
      case 'arc':
        return this.controlArc();
      case 'triangle':
        return this.controlTriangle();
      case 'rect':
        return this.controlRect();
      case 'circle':
        return this.controlCircle();
      case 'ellipse':
        return this.controlEllipse();
      case 'sector':
        return this.controlSector();
      case 'droplet':
        return this.controlDroplet();
      case 'polygon':
        return this.controlPolygon();
      case 'star':
        return this.controlStar();
      case 'text':
        return this.controlText();
    }
  }

  // 图形旋转
  controlRotaion(control) {
    let xSize: number, ySize: number;
    switch (this.drawingArray[this.state.drawingId].shape.type) {
      case 'line':
        xSize = 100;
        ySize = 100;
        break;

      case 'arc':
        const {cx, cy} = this.drawingArray[this.state.drawingId].shape;
        xSize = cx;
        ySize = cy;
        break;
      case 'triangle':
        const {x, y} = this.drawingArray[this.state.drawingId].shape;
        xSize = x;
        ySize = y;
        break;
      case 'rect':
        const {shape} = this.drawingArray[this.state.drawingId];
        xSize = shape.x;
        ySize = shape.y;
        break;
      case 'ellipse':
        const shape1 = this.drawingArray[this.state.drawingId].shape;
        xSize = shape1.cx;
        ySize = shape1.cy;
        break;
      case 'sector':
        const shape2 = this.drawingArray[this.state.drawingId].shape;
        xSize = shape2.cx;
        ySize = shape2.cy;
        break;
      case 'droplet':
        const shape3 = this.drawingArray[this.state.drawingId].shape;
        xSize = shape3.cx;
        ySize = shape3.cy;
        break;
      case 'polygon':
        const shape4 = this.drawingArray[this.state.drawingId].shape;
        xSize = shape4.x;
        ySize = shape4.y;
        break;
      case 'star':
        const shape5 = this.drawingArray[this.state.drawingId].shape;
        xSize = shape5.cx;
        ySize = shape5.cy;
        break;
      case 'text':
        this.drawingArray[this.state.drawingId].attr({
          rotation: (Math.PI * control.rotation) / 180,
        });
        return;
    }

    this.drawingArray[this.state.drawingId].attr({
      rotation: (Math.PI * control.rotation) / 180,
      origin: [xSize, ySize],
    });
  }

  // 更新颜色
  updateColor(key, value) {
    switch (this.drawingArray[key].shape.type) {
      case 'root':
        this.drawingArray[key].attr({
          style: {
            fill: value,
          },
        });
        break;
      case 'text':
        this.drawingArray[key].attr({
          style: {
            fill: value,
          },
        });
        break;
      default:
        this.drawingArray[key].attr({
          style: {
            stroke: value,
          },
        });
    }
  }

  deleteDrawing(key) {
    this.drawingArray[key].hide();
    this.setState({
      isControl: false,
    });
  }

  // 下载画布
  getCanvasImg() {
    const canvas: HTMLCanvasElement = document.querySelector('#drawing_canvas');
    if (canvas) {
      var save_url = canvas.toDataURL('image/png');
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.href = save_url;
      a.download = 'canvasPicture';
      a.click();
    }
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div className="geometry">
          <div className="clear_drawing">
            <Button onClick={() => this.redrawing()}>清除所有图形</Button>
          </div>
          <img className="geometry_image" onClick={() => this.drawingRoot()} src={root} title="点" alt="" />
          <img className="geometry_image" onClick={() => this.drawingLine()} src={line} title="直线" alt="" />
          <img className="geometry_image" onClick={() => this.drawingArc()} src={arc} title="曲线" alt="" />
          <img
            className="geometry_image"
            onClick={() => this.drawingTriangle()}
            src={triangle}
            title="正三角形"
            alt=""
          />
          <img className="geometry_image" onClick={() => this.drawingRect()} src={rect} title="正四边形" alt="" />
          <img className="geometry_image" onClick={() => this.drawingCircle()} src={circle} title="圆" alt="" />
          <img className="geometry_image" onClick={() => this.drawingEllipse()} src={ellipse} title="椭圆" alt="" />
          <img className="geometry_image" onClick={() => this.drawingSector()} src={sector} title="扇形" alt="" />
          <img className="geometry_image" onClick={() => this.drawingDroplet()} src={droplet} title="水滴" alt="" />
          <img className="geometry_image" onClick={() => this.drawingPolygon()} src={polygon} title="正多边形" alt="" />
          <img className="geometry_image" onClick={() => this.drawingStar()} src={star} title="多角星" alt="" />
          <img
            className="geometry_image"
            onClick={() => this.drawingLineDotted()}
            src={lineDotted}
            title="虚线"
            alt=""
          />
          <img
            className="geometry_image"
            onClick={() => this.drawingArcDotted()}
            src={arcDotted}
            title="虚线曲线"
            alt=""
          />
          <img
            className="geometry_image"
            onClick={() => this.drawingTriangleDotted()}
            src={triangleDotted}
            title="虚线正三角形"
            alt=""
          />
          <img
            className="geometry_image"
            onClick={() => this.drawingRectDotted()}
            src={rectDotted}
            title="虚线正四边形"
            alt=""
          />
          <img
            className="geometry_image"
            onClick={() => this.drawingCircleDotted()}
            src={circleDotted}
            title="虚线圆"
            alt=""
          />
          <img
            className="geometry_image"
            onClick={() => this.drawingEllipseDotted()}
            src={ellipseDotted}
            title="虚线椭圆"
            alt=""
          />
          <img
            className="geometry_image"
            onClick={() => this.drawingSectorDotted()}
            src={sectorDotted}
            title="虚线扇形"
            alt=""
          />
          <img
            className="geometry_image"
            onClick={() => this.drawingDropletDotted()}
            src={dropletDotted}
            title="虚线水滴"
            alt=""
          />
          <img
            className="geometry_image"
            onClick={() => this.drawingPolygonDotted()}
            src={polygonDotted}
            title="虚线正多边形"
            alt=""
          />
          <img
            className="geometry_image"
            onClick={() => this.drawingStarDotted()}
            src={starDotted}
            title="虚线多角星"
            alt=""
          />
          <img className="geometry_image" onClick={() => this.drawingText()} src={text} title="文本" alt="" />
          <div className="dowload_img">
            <Button type="primary" icon={<DownloadOutlined />} onClick={() => this.getCanvasImg()}>
              Download
            </Button>
          </div>
        </div>
        <div className="drawing_box">
          <div
            style={{
              marginTop: '10px',
              height: '600px',
              width: '700px',
              border: '1px solid #888888',
              boxShadow: '10px 10px 5px #888888',
            }}
          >
            <canvas id="drawing_canvas" height="600px" width="700px" />
          </div>
        </div>
        <div className="control_box">
          {this.state.isControl ? (
            this.control()
          ) : (
            <p style={{textAlign: 'center', marginTop: '20px '}}>点击创建图形进行编辑</p>
          )}
        </div>
      </div>
    );
  }
}

export default Drawing;

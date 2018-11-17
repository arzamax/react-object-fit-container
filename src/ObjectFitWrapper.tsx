import * as React from 'react';

export type verticalAlignType = 'top'| 'bottom';
export type horizontalAlignType = 'left' | 'right';
type positionAbsoluteParamType = number | 'auto' | null;

interface ObjectFitWrapperProps {
  children: React.ReactNode;
  ratio: number | null;
  verticalAlign?: verticalAlignType;
  horizontalAlign?: horizontalAlignType;
}

interface ObjectFitWrapperState {
  width: number | null;
  height: number | null;
  left: positionAbsoluteParamType;
  top: positionAbsoluteParamType;
}

export class ObjectFitWrapper extends React.PureComponent<ObjectFitWrapperProps, ObjectFitWrapperState> {

  public container = React.createRef<HTMLDivElement>();

  public state = {
    width: null,
    height: null,
    left: null,
    top: null,
  };

  public componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  public componentDidUpdate(prevProps: ObjectFitWrapperProps) {

    if (prevProps.ratio !== this.props.ratio) {
      this.handleResize();
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  public getContainerDims() {
    const { clientHeight, clientWidth } = this.container.current as { clientHeight: number, clientWidth: number };

    return {
      containerWidth: clientWidth,
      containerHeight: clientHeight,
    };
  }

  public handleResize = () => {
    const { ratio, verticalAlign, horizontalAlign } = this.props;

    if (ratio) {
      const containerDims = this.getContainerDims();
      const { containerWidth, containerHeight } = containerDims;
      const containerRatio = containerWidth / containerHeight;

      if (ratio > containerRatio) {
        const newElementWidth = containerHeight * ratio;
        const newElementLeft = horizontalAlign === 'left'
          ? 0
          : (containerWidth - newElementWidth) / 2;

        this.setState({
          width: newElementWidth,
          height: containerHeight,
          top: 0,
          left: horizontalAlign === 'right'
            ? 'auto'
            : newElementLeft,
          ...(
            horizontalAlign
              ? { [horizontalAlign]: 0 }
              : {}
          ),
        });
      } else {
        const newElementHeight = containerWidth / ratio;
        const newElementTop = verticalAlign === 'top'
          ? 0
          : (containerHeight - newElementHeight) / 2;
        const newStyle = {
          width: containerWidth,
          height: newElementHeight,
        };

        this.setState({
          ...newStyle,
          top: verticalAlign === 'bottom'
            ? 'auto'
            : newElementTop,
          left: 0,
          ...(
            verticalAlign
              ? { [verticalAlign]: 0 }
              : {}
          ),
        });
      }
    }
  }

  public renderElement() {
    const { children } = this.props;
    const style = {
      position: 'absolute',
      ...this.state,
    };

    return React.Children.map(children, (child: React.ReactElement<any>) =>
      React.cloneElement(child, {
        ...child.props,
        style,
      }),
    );
  }

  public render() {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
        ref={this.container}
      >
        {this.renderElement()}
      </div>
    );
  }
}

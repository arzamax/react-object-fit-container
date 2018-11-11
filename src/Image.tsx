import * as React from 'react';

import { ObjectFitWrapper, verticalAlignType, horizontalAlignType } from "./ObjectFitWrapper";

interface ImageState {
  ratio: number | null
}

export class Image extends React.PureComponent<any, ImageState> {

  public image  = React.createRef<HTMLImageElement>();

  public state = {
    ratio: null
  };

  public componentDidMount() {
    const image = this.image.current as HTMLImageElement;

    image.addEventListener('load', () => {
      const { width, height } = image;

      this.setState({
        ratio: width / height
      })
    })
  }

  public render() {
    const { ratio } = this.state;
    const { verticalAlign, horizontalAlign } = this.props;

    return (
      <ObjectFitWrapper ratio={ratio} verticalAlign={verticalAlign} horizontalAlign={horizontalAlign}>
        <img {...this.props} ref={this.image} />
      </ObjectFitWrapper>
    )
  }
}
import * as React from 'react';

import { ObjectFitWrapper, verticalAlignType, horizontalAlignType } from "./ObjectFitWrapper";

interface VideoState {
  ratio: number | null;
}

export class Video extends React.PureComponent<any, VideoState> {

  public video = React.createRef<HTMLVideoElement>();

  public state = {
    ratio: null,
  };

  public componentDidMount() {
    const video = this.video.current as HTMLVideoElement;

    video.addEventListener('loadedmetadata', () => {
      const { videoWidth, videoHeight } = video;

      this.setState({
        ratio: videoWidth / videoHeight,
      });
    });
  }

  public render() {
    const { ratio } = this.state;
    const { verticalAlign, horizontalAlign, children } = this.props;

    return (
      <ObjectFitWrapper ratio={ratio} verticalAlign={verticalAlign} horizontalAlign={horizontalAlign}>
        <video {...this.props} ref={this.video}>
          {children}
        </video>
      </ObjectFitWrapper>
    );
  }
}

## "object-fit: cover" polyfill for react

Image or Video takes 100% height and width of container;

## Install

#### yarn add react-object-fit-container 
#### npm install react-object-fit-container

```javascript
import { Image, Video } from "react-object-fit-container";

render() {
  const { 
    verticalAlign, // unnecessary attribute, vertilcalAlign can be: 'top' or 'bottom', default is 'center'
    horizontalAlign, // unnecessary attribute, horizontalAlign can be: 'left' or 'right', default is 'center'
    data 
  } = this.props; 

  return (
    <Image src={data.image} verticalAlign={verticalAlign} horizontalAlign={horizontalAlign}/>
  )
}
```

You can manually use ObjectFitWrapper, just take ratio from child image/video and set to ObjecFitWrapper's prop <b>ratio</b>:

```javascript
import { ObjectFitWrapper } from "react-object-fit-container";

render() {
  const { ratio } = this.state; 
  const { 
    verticalAlign, // unnecessary attribute, vertilcalAlign can be: 'top' or 'bottom', default is 'center'
    horizontalAlign, // unnecessary attribute, horizontalAlign can be: 'left' or 'right', default is 'center'
    data 
  } = this.props; 

  return (
    <ObjectFitWrapper ratio={ratio} verticalAlign={verticalAlign} horizontalAlign={horizontalAlign}>
      <img src={data.image} />
    </ObjectFitWrapper>
  )
}
```

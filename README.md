### "object-fit: cover" polyfill for react

```javascript
import { Image, Video } from "object-fit-container";

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

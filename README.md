"# react-rss" 

## RSS / Reactive Style Sheets
---

#### SASS in a JS environment, super dynamic CSS!

##### Features:
- Variables
- Mixins
- Inheritance
- Nesting / Grouping
- Media Queries

##### What?
Making CSS 'reactive' means dynamically declaring & modifying CSS at runtime using Javascript. This does not mean using inline styles, instead it means using the browser's ability to evaluate stylesheets on the fly. This gives back the use of all features available to CSS, but inside Javascript. And better yet, using Javascript to give CSS SASS-like features.

##### Why?
With the rise of component-based architecture in website & application development, the need to encapsulate CSS into components is becoming more apparent. With the major features of SASS/LESS used ontop of regular CSS inside of (React/Angular) components, you can gain greater control and flexibilty.

##### How?

The following examples will use React to demonstrate RSS features, although RSS could be used with any Framework, or by itself.

Include via stript tag
```html
  <script src="../dist/rss.js"></script>
```
Include via Browserify or ES6
```javascript
// browserify
const RSS = require('rss');
// es6
import { RSS } from 'path/rss.js';
```

Instantiate:
```javascript
const component = new RSS.Component();
```

Simple component:
```javascript
class MessageBox{
  constructor(){
    this.styles = new RSS.Component();
  }
  render(){
    this.styles.set({
      BASE:{ // BASE is the class bound to the component's root div
        padding: '10px',
        'background-color': '#BBE3F0'
      },
      '#title': {
        width: '100%',
        'background-color': 'rgba(40,80,255)'
      }
    });
    return (
      <div className={this.styles.className()}> // this div has the optional BASE class
        <div id="title"> { this.props.title } </div>
        <div id="body"> { this.props.children } </div>
      </div>
    )
  }
}
```
Every selector defined in a component is scoped only to the component. If the id of '#title' was used anywhere outside the component, it will not conflict with the one defined in the component.

###### Nesting

Keeping within the same example, now giving the '#body' some nested and grouped styles:

```javascript
'#body': {
  '> h1': {
    'color': '#4FABC9',
    '# font': {
      family: 'serif',
      weight: 'bold',
      size: '1.8em'
    }
  },
  '> a': {
    color: '#73DED7',
    '> :hover': {
      color: '#95DE73'
    }
  }
}
```

To next just prefix the selector with '> ', and to group just prefix '# '.

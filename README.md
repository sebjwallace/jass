"# react-rss" 

![logo](https://raw.githubusercontent.com/sebjwallace/rss/master/logo500.png)
---

#### SASS in a JS environment, super dynamic CSS!

##### Codepen examples:
[user input styles](http://codepen.io/anon/pen/wGKOGR?editors=1010)

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

To nest just prefix the selector with '> ', and to group just prefix '# '.

###### Inheritance

The links in the body might have several states: hover, visited, active. And these styles might also apply to other components too - in an article component, for example. So it would be best to abstract these styles into a parent selector.

```javascript
// global parent selectors, mixins and variables are usually kept in separate files. In this case we keep them in separate abstract RSS components (which too can be kept in separate files, if they preceed the components that consume them)

let parentSelectors = new RSS.Component({
  '.links': {
    '> a': {
      color: '#73DED7',
      '> :hover': { color: '#95DE73' },
      '> :visited': { color: '#DEDA73' },
      '> :active': { color: '#EBAD5B' }
    }
  }
});

// the MessageBox component '#body' selector can now just inherit from the '.links' parent selector

'#body': {
  '@extend': '.links',
  '> h1': {
    'color': '#4FABC9',
    '# font': {
      family: 'serif',
      weight: 'bold',
      size: '1.8em'
    }
  }
}
```

Because the styles are reactive, if values in the parent selector changes then all the child selector values also change. So if the link colors were to change during runtime, all the changes will be propigated down through all the child selectors.

###### Mixins

If the Message component were to have rounded corners it would also need vendor prefixes. Mixins are useful because they accept inputs that determine the output.

```javascript
let mixins = new RSS.Component({
  '@mixin rounded-corners': function(radius){
    return {
      '-webkit-border-radius': radius,
	 '-moz-border-radius': radius,
	  '-ms-border-radius': radius,
	      'border-radius': radius
    }
  }
});

// this mixin can be applied to the root element of the component using the BASE selector

BASE: {
  '@mixin rounded-corners': '5px',
  // other styles...
}

// if any buttons in the MessageBox '#body' need rounded corners too

'#body': {
  '> button': {
    '@mixin rounded-corners': '2px'
  },
  // other styles...
}
```

Unlike inheritance, mixins are not reactive. So if styles are shared but desired to remain static then a mixin is a better alternative.

###### Variables

Although regular Javascript variables are useful within the local scope of the render function, variables might also need to be global so they can be used across other components, like parent selectors and mixins.

```javascript
let variables = new RSS.Component({
	$headingColor: '#4FABC9',
	$borderRadius: '5px'
});

// in the MessageBox component the '#body' selector could use the $headingColor variable

'#body': {
	'> h1': {
		color: '$headingColor'
	},
	'> button': {
		'@mixin rounded-corners': '$borderRadius'
	},
	// other styles...
}
```

The local Javascript variables are useful when reacting to state change:

```javascript
class MessageBox{
  constructor(){
  	this.styles = new RSS.Component();
  	this.state = { visibility: 'block' }
  }
  handleClick(){
  	this.state.visibile = 'hidden'
  }
  render(){
    this.styles.set({
      BASE:{
        display: this.state.visibility
      },
      // other declarations...
    });
    return (
      <div className={this.styles.className()} onClick={this.handleClick}>
        // component structures...
      </div>
    )
  }
}
```

###### Media Queries

The same as usual, just declare them as you would in usual CSS.

```javascript
this.styles.set({
	BASE: {
		width: '50%'
	},
	'@media only screen and (max-width: 960px)': {
		BASE: {
			width: '100%'
		}
	}
});
```

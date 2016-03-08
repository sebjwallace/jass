
![logo](https://raw.githubusercontent.com/sebjwallace/rss/master/logo500.png)
---
"# rss" 
#### SASS in the JS environment, super dynamic CSS!

##### Codepen examples:
- <a href="http://codepen.io/sebjwallace/pen/yOYwbN?editors=1010" target="_blank">user control styles</a>
- <a href="http://codepen.io/sebjwallace/pen/RarbBg?editors=1010" target="_blank">vanilla HTML/JS</a>
- <a href="http://codepen.io/sebjwallace/pen/GZogLZ?editors=1010" target="_blank">click event </a>
- <a href="http://codepen.io/sebjwallace/pen/mPVpgJ?editors=1010" target="_blank">nav menu - events and bindings</a>

##### Features:
- Variables
- Mixins
- Inheritance
- Nesting / Grouping
- Media Queries

###### RSS-Specific Features
- Events
- Bindings

##### What?
RSS gives the developer the ability to declare and modify CSS at runtime using emulated core features of SASS - essentially giving CSS a powerful Javascript interface. This removes the need to manipulate CSS directly through the DOM or use inline styles. Just use the CSS syntax you're familiar with but using object literals.

##### Why?
With the rise of component-based architecture in website & application development, the need to encapsulate CSS into components is becoming more apparent. With the major features of SASS emulated ontop of regular CSS inside of (React/Angular) components, you can gain greater control and flexibilty. With RSS, CSS can react to events, eliminating tedious bloat code.

##### How?
Simply include RSS, instantiate a RSS.Component, and use the Component instance method setStyles({ /* styles declared as object literal */ }). All of the API is inside the setStyles method using object literal syntax. The only additional (and optional) method is RSS.Event().

Explore the Codepen exmaples and the ones below for more detail.

The following examples will use React to demonstrate RSS features, although RSS could be used with any Framework, or simply using vanilla Javascript.

Include via stript tag
```html
  <script src="path.../dist/rss.js"></script>
```

<a href="https://www.npmjs.com/package/rss-js">NPM | rss-js</a>

Include via Browserify or ES6
```javascript
// browserify
const RSS = require('rss-js');
// es6
import { RSS } from 'rss-js';
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

###### Events

Styles can be modified on events within the project. All that's needed is a listener and a trigger. The listener is defined within a selector, and a trigger is used anywhere within the project where the RSS object is available.

```javascript
render(){
    this.styles.set({

      BASE:{
        opacity: 1,
        // an event listener, listening to 'hide'
        // when that event triggers the opacity will be set to 0
        '@event hide': { opacity: 0 }
      },
      // ...
    });
    return (
      <div className={this.styles.className()} onClick={this.handleClick}>
        // ...
        // the trigger is bound to the click event
        <button onClick={ RSS.Event('hide') }>Hide</button>
      </div>
    )
  }
```

Multiple selectors can listen to a single event, and a single selector can listen to multiple events. Its important to note that the event is only scoped to the selector its defined in - in the above example it was BASE.

Toggling is quite a common task, so there's a bit of syntax sugar for that.

```javascript
  display: 'block',
  '@event toggle': { display: ['block','none'] }
```

If an array of two values is assigned to a style attribute each value will be compared to the current value. The value that doesn't match will be assigned the new value. In the above example, if this was the first 'toggle' event to be fired the new 'display' will be 'none'.

Note, the 'toggle' id is not required for this event. It could be any event handle '@event messageToggle', for example.

###### Bindings

A selector can do more than just listen for events, it can trigger them too. Like a listener, a trigger is defined within a selector.

```javascript
  '#hide-button': {
    // the 'hide' event is bound to the 'onclick' callback of the '#hide-button' element
    '@bind onclick': '@event hide',
    // any DOM events on the element can be bound
    // any function can also be assigned (instead of an '@event')
    '@bind onmouseover': function(){ console.log('hovering...') }
  }
```

Bindings can be useful if RSS.Event cannot be called from HTML (like the above example for Events).

<a href="http://codepen.io/sebjwallace/pen/mPVpgJ?editors=1010">Example of events and bindings</a>

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

"# react-rss" 

## RSS / Reactive Style Sheets
#### CSS for React.js
---

When encapsulating HTML, CSS & JS into a React component, the CSS is usually defined inline the element's style tag. The limitations of this approach is the inability for styles to react to browser events and media queries. RSS brings back the ability to write style sheets inside the component.

RSS is also SASSy, in that you can write your styles similar to SASS or LESS. Being that RSS exists in a JS environment, most of the features come free out-the-box. But RSS impliments the following features: mixins, nesting and inheritance.

####The Basics

```javascript
var defaultWidth = 50;

setStyles({
  '.myClass': {
    position: 'relative',
    width: defaultWidth + '%', // variable
    '> hover': { // nesting
        'background-color': 'rgb(240,120,180)',
        '@bordered-blue': '2px' // mixin
    }
  },
  '@media screen and (max-width: 960px)':{ // media query
    '.myClass': {
      width: defaultWidth * 2 + '%' // use regular JS expressions
    }
  }
});
```

RSS becomes reactive when using JS varibles in the style properties.

```javascript
setStyles({
  '.myClass':{
    width: this.state.width * 2 + "px"
  }
});
```

When using ES6 you can always just use template strings.

```javascript
setStyles(`
  .myClass{
    width: ${ this.state.width * 2 }px
  }
`);
```

Either require or link ReactRSS.js then just extend it like you would with React.Component

```javascript
  let RSS = require('./ReactRSS');
  
  class MyComponent extends ReactRSS{
    constructor(props){
  		super(props);
  		this.state = {
  			size: 20,
  		};
  		// set the non-reactive styles
  		this.setStyles({
  			'#myComponent':{
  			  display: 'block';
  				transition: 'all 0.5s'
  			}
  		});
  	}
  	resize(){
  	  this.setState({
  	    size: 40
  	  });
  	}
  	render(){
  	  // set the reactive styles
  	  this.setStyles({
  			'#myComponent':{
  			  width: this.state.size + "px",
  			  height: this.state.size * 2 + "px"
  			}
  		});
  		return <div id="myComponent" onClick={ this.resize }>Click me!</div>
  	}
  }
```
#### Mixins

If you want to use mixins declare them wherever you have access to RSS.

*note: mixins must be declared before they are mixed-in! This is important to note when sharing across components.*

```javascript
let RSS = require('./ReactRSS');

RSS.mixin('border-radius',function(radius){
return {
  '-webkit-border-radius': radius,
     '-moz-border-radius': radius,
      '-ms-border-radius': radius,
          'border-radius': radius
    }
});
```

Then include them by prefixing the attribute with @ and supplying the variable value.

```javascript
.myClass: {
  '@border-radius': '5px'
}
```

#### Nesting

To nest selectors just prefix the selector with '> ':

```javascript
.myClass: {
    '> li': {
    	'padding' : '10px',
    	'> :hover': {
    	    border: '2px solid red'
    	}
    }
}
```

#### Inheritance

To import styles use a '@import' attribute and the name of the selector as the value.

*note: exports must be declared before they are imported! This is important to note when sharing across components.*

```javascript
    let RSS = require('./ReactRSS');
    
    RSS.export('.success', {
        color: '#fff',
    	'background-color': '#5cb85c',
    	'border-color': '#4cae4c'
    });
    
    // ...then inside the setStyles() call in a component somewhere
    
    '#message': {
    	'@import': '.success',
    	'font-size': 1.2 + 'em'
    }
```


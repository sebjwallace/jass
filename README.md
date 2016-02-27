"# react-rss" 

## RSS / Reactive Style Sheets
#### CSS for React.js
---

When encapsulating HTML, CSS & JS into a React component, the CSS is usually defined inline the element's style tag. The limitations of this approach is the inability for styles to react to browser events and media queries. RSS brings back the ability to write style sheets inside the component using a single method.

```
setStyles({
  '.myClass': {
    position: 'relative',
    width: '50%'
  },
  '.myClass :hover': {
    'background-color': 'rgb(240,120,180)'
  },
  "@media screen and (max-width: 960px)":{
    '.myClass': {
      width: '100%'
    }
  }
});
```

RSS becomes reactive when using JS varibles in the style properties.

```
setStyles({
  '.myClass':{
    width: this.state.width * 2 + "px"
  }
});
```

When using ES6 you can always just use template strings.

```
setStyles(`
  .myClass{
    width: ${ this.state.width * 2 }px
  }
`);
```

Either require or link ReactRSS.js then just extend it like you would with React.Component

```
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

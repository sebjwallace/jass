"# react-rss" 

## Reactive Style Sheets
#### for react.js
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


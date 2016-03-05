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
Making CSS 'reactive' means dynamically declaring & modifying CSS at runtime using Javascript. This does not mean using inline styles, instead it means using the browser's ability to evaluate stylesheets on the fly.

##### Why?
With the rise of component-based architecture in website & application development, the need to encapsulate CSS into components is becoming more apparent. With the major features of SASS/LESS used ontop of regular CSS inside of (React/Angular) components, you can gain greater control and flexibilty.

##### How?

The following examples will use React to demonstrate RSS features, although RSS could be used with anything, or by itself.

```javascript
render(){
  this.styles.set({
    // i'll do this later...
  });
}
```

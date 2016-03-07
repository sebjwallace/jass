import { Style } from './Style';
import { RSS } from './RSS';

export class PreCompiler{
	constructor(Store,component){
		this.Store = Store;
		this.component = component;
	}
	parse(obj,key){

		let level = 0;
		let activeStyle = {};
		let selector = null;

		const extract = (obj) => {
			level ++;

			for(const prop in obj){

				if(level == 1){
					selector = prop;
					this.Store.styles[selector] = new Style(key, selector, obj[selector]);
					activeStyle = this.Store.styles[selector];
					if (!this.Store.tokenIndex[key]) this.Store.tokenIndex[key] = {};
						this.Store.tokenIndex[key][activeStyle.selector] = (activeStyle);
					if (!this.Store.styleIndex[key]) this.Store.styleIndex[key] = {};
						this.Store.styleIndex[key][activeStyle.selector] = (activeStyle.body);
				}

				if(prop.match(/^\@extend($|[0-9])/)){
					const parent = this.Store.styles[obj[prop]];
					if(!parent) console.log( `'${obj[prop]}' cannot be extended because it does not exist!`);
					else{
						activeStyle.parents[obj[prop]] = obj[prop];
						parent.children['.' + activeStyle.token + '&' + activeStyle.selector] = true;
						this.Store.renderStack[parent.token] = parent.token;
					}
				}

				else if(prop.match(/^\$[a-z,A-Z]+$/)){
					this.Store.variables[prop] = obj[prop];
				}

				else if(prop.match(/^\@mixin\s+[^]+$/) && typeof obj[prop] === 'function'){
					this.Store.mixins[prop.replace(/^\@mixin\s/,'')] = obj[prop];
				}

				else if(prop.match(/^\@event\s+[^]+$/)){
					const id = prop.replace(/^\@event\s+/,'');
					const event = { component: this.component, selector: selector, styles: obj[prop] };
					if(!this.Store.events[id]) this.Store.events[id] = {};
					if(!this.Store.events[id][selector]) this.Store.events[id][selector] = event;
				}

				else if(prop.match(/^\@bind\s+[^]+$/)){
					let el = null;
					if(selector == 'BASE'){ el = document.getElementByClassName(key)[0] }
					else{ el = document.getElementById(selector.replace('#','')) }
					const event = prop.replace(/^\@bind\s+/,'');
					const fn = obj[prop];
					if(typeof fn == 'string'){
						const eventId = fn.replace(/^\@event\s+/,'');
						el[event] = () => { RSS.Event(eventId); };
					}
					else el[event] = fn;
				}

				if(typeof obj[prop] === 'object'){
					extract(obj[prop]);
				}
			}
			level --;
		}
		extract(obj);
		this.Store.renderStack[key] = key;
		//console.log(this);
	}
}
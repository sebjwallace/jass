import { Style } from './Style';

export class PreCompiler{
	constructor(Store){
		this.Store = Store;
	}
	parse(obj,key){

		let level = 0;
		let activeStyle = {};

		const extract = (obj) => {
			level ++;

			for(const prop in obj){

				if(level == 1){
					this.Store.styles[prop] = new Style(key, prop, obj[prop]);
					activeStyle = this.Store.styles[prop];
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

				else if(prop.match(/^\@mixin\s[^]/) && typeof obj[prop] === 'function'){
					this.Store.mixins[prop.replace(/^\@mixin\s/,'')] = obj[prop];
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
import { Style } from './Style';
import { Compiler } from './Compiler';

class StoreSingleton{
	constructor(){
		this.styles = [];
		this.tags = {};
		this.mixins = {};
		this.mediaQueries = [];
		this.tokenIndex = {};
		this.styleIndex = {};
		this.renderStack = {};
	}
	setStyles(styles,token,tag){
		this.tags[token.key] = tag;
		this.preCompile(styles,token);
		this.compile();
	}

	preCompile(obj,token){

		let level = 0;
		let activeStyle = {};

		const extract = (obj) => {
			level ++;

			for(const prop in obj){

				if(level == 1){
					this.styles[prop] = new Style(token.key, prop, obj[prop]);
					activeStyle = this.styles[prop];
					if (!this.tokenIndex[token.key]) this.tokenIndex[token.key] = {};
						this.tokenIndex[token.key][activeStyle.selector] = (activeStyle);
					if (!this.styleIndex[token.key]) this.styleIndex[token.key] = {};
						this.styleIndex[token.key][activeStyle.selector] = (activeStyle.body);
				}

				if(prop.match(/^\@extend($|[0-9])/)){
					const parent = this.styles[obj[prop]];
					if(!parent) console.log( `'${obj[prop]}' cannot be extended because it does not exist!`);
					else{
						activeStyle.parents[obj[prop]] = obj[prop];
						parent.children['.' + activeStyle.token + '&' + activeStyle.selector] = true;
						this.renderStack[parent.token] = parent.token;
					}
				}

				else if(prop.match(/^\@mixin\s[^]/) && typeof obj[prop] === 'function'){
					this.mixins[prop.replace(/^\@mixin\s/,'')] = obj[prop];
				}

				if(typeof obj[prop] === 'object'){
					extract(obj[prop]);
				}
			}
			level --;
		}
		extract(obj);
		this.renderStack[token.key] = token.key;
		//console.log(this);
	}
	compile(){
		for(let item in this.renderStack){
			const compiler = new Compiler(this);
			const result = compiler
				.parse(this.styleIndex[this.renderStack[item]],this.renderStack[item]);
			//console.log(result);
			this.tags[item].update(result);
		}
		this.renderStack = {};
	}
}

export const Store = new StoreSingleton;

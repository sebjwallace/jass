import { Compiler } from './Compiler';
import { PreCompiler } from './PreCompiler';

class StoreSingleton{
	constructor(){
		this.styles = {};
		this.tags = {};
		this.mixins = {};
		this.variables = {};
		this.tokenIndex = {};
		this.styleIndex = {};
		this.renderStack = {};
	}
	setStyles(styles,token,tag){
		this.tags[token.key] = tag;
		this.compile(styles,token);
	}
	compile(styles,token){
		const preCompiler = new PreCompiler(this);
		preCompiler.parse(styles,token);
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

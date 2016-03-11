import { Compiler } from './Compiler';
import { PreCompiler } from './PreCompiler';

export class Component{
	constructor({Store,token,tag,stylesheet,styles}){
		this.token = token;
		this.tag = tag;
		this.stylesheet = stylesheet;
		this.Store = Store;
		this.Store.registerTag(this.token.key,this.tag);
	}
	setStyles(obj){
		this.stylesheet.set(obj);

		const preCompiler = new PreCompiler(this.Store,this);
		const compiler = new Compiler(this.Store);
		preCompiler.parse(this.stylesheet.get(),this.token.key);

		const renderStack = this.Store.getRenderStack();
		const styleIndex = this.Store.getStyleIndex();

		for(const item in renderStack){
			const result = compiler.parse(styleIndex[item],item);
			this.Store.updateTag(item,result);
		}

		this.Store.emptyRenderStack();
	}
	set(obj){
		this.setStyles(obj);
	}
	getStyleTag(){
		return this.tag.getTag();
	}
	remove(){
		this.tag.remove();
	}
	scope(){
		return '.' + this.token.key + ' ';
	}
	className(){
		return this.token.key;
	}
}
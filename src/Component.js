import { Token } from './Token';
import { Tag } from './Tag';
import { Compiler } from './Compiler';
import { PreCompiler } from './PreCompiler';

export class Component{
	constructor(Store,styles){
		this.token = new Token();
		this.tag = new Tag(this.token.key);
		this.Store = Store;
		this.Store.setTag(this.token.key,this.tag);
		if (styles) this.setStyles(styles);
	}
	setStyles(obj){
		const preCompiler = new PreCompiler(this.Store);
		const compiler = new Compiler(this.Store);
		preCompiler.parse(obj,this.token.key);

		const renderStack = this.Store.getRenderStack();
		const styleIndex = this.Store.getStyleIndex();

		for(const item in renderStack){
			const renderItem = renderStack[item];
			const result = compiler.parse(styleIndex[renderItem],renderItem);
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
	getScope(){
		return '.' + this.token.key;
	}
	className(){
		return this.token.key;
	}
}
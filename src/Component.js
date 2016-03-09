import { Token } from './Token';
import { Tag } from './Tag';
import { Compiler } from './Compiler';
import { PreCompiler } from './PreCompiler';
import { StyleSheet } from './StyleSheet';

export class Component{
	constructor(Store,styles){
		this.token = new Token;
		this.tag = new Tag(this.token.key);
		this.stylesheet = new StyleSheet;

		this.Store = Store;
		this.Store.registerTag(this.token.key,this.tag);
		if (styles) this.setStyles(styles);
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
	scope(){
		return '.' + this.token.key + ' ';
	}
	className(){
		return this.token.key;
	}
}
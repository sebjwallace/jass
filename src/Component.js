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
		this.styles = null;
		if (styles) this.setStyles(styles);
	}
	setStyles(obj){
		this.assign(obj);

		const preCompiler = new PreCompiler(this.Store,this);
		const compiler = new Compiler(this.Store);
		preCompiler.parse(this.styles,this.token.key);

		const renderStack = this.Store.getRenderStack();
		const styleIndex = this.Store.getStyleIndex();

		for(const item in renderStack){
			const result = compiler.parse(styleIndex[item],item);
			this.Store.updateTag(item,result);
		}

		this.Store.emptyRenderStack();
	}
	assign(obj){
		if (!this.styles)
			this.styles = obj;
		else
			for(const selector in obj){
				for(const attr in obj[selector]){
					this.styles[selector][attr] = obj[selector][attr];
				}
			}
	}
	trigger(event){

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
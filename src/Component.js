import {Token} from './Token';
import {Store} from './Store';
import {Tag} from './Tag';

export class Component{
	constructor(){
		this.token = new Token();
		this.tag = new Tag(this.token.key);
	}
	setStyles(obj){
		Store.setStyles(obj,this.token,this.tag);
	}
	getStyleTag(){
		return this.tag.getTag();
	}
	getScope(){
		return '.' + this.token.key;
	}
	getToken(){
		return this.token.key;
	}
}
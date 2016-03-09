
export class Style{
	constructor(token,selector,body){
		this.token = token;
		this.selector = selector;
		this.body = body;
		this.parents = {};
		this.children = {};
	}
	addChild(signature){
		this.children[signature] = true;
	}
	addParent(selector){
		this.parents[selector] = selector;
	}
	getChildren(){
		return this.children;
	}
	hasChild(signature){
		return this.children[signature];
	}
}

export class Style{
	constructor(token,selector,body){
		this.token = token;
		this.selector = selector;
		this.body = body;
		this.parents = {};
		this.children = {};
	}
}
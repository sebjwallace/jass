export class Tag{
	constructor(id,document){
		this.document = document;
		this.id = 'rss-' + id;
		this.tag = this.generateTag(this.id);
	}
	generateTag(id){
		let el = this.document.createElement('style');
		el.id = id;
		var container = this.document.getElementById('rss-container');
		container.appendChild(el);
		return el;
	}
	remove(){
		const el = this.document.getElementById(this.id);
		el.parentNode.removeChild(el);
	}
	getTag(){
		return this.tag;
	}
	update(stringified){
		this.tag.innerHTML = stringified;
	}
}
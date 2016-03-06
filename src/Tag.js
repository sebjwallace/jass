export class Tag{
	constructor(id){
		this.tag = this.generateTag('rss-' + id);
	}
	generateTag(id){
		let el = document.createElement('style');
		el.id = id;
		var container = document.getElementById('rss-container');
		container.appendChild(el);
		return el;
	}
	getTag(){
		return this.tag;
	}
	update(stringified){
		this.tag.innerHTML = stringified;
	}
}
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
		// console.log(stringified);
		// for (var i=0; i < document.styleSheets.length; i++){
		// 	if(document.styleSheets[i].ownerNode ==  this.tag){
		// 		document.styleSheets[i].insertRule(stringified,0);
		// 	}
		// }
	}
}
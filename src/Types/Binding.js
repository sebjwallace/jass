export class Binding{
	constructor(selector,key,name,fn){
		this.el = null;
		if(selector == 'BASE'){ this.el = document.getElementByClassName(key)[0] }
		else{ this.el = document.getElementById(selector.replace('#','')) }

		this.domEvent = name.replace(/^\@bind\s+/,'');
		this.createEvent(fn);
	}
	createEvent(fn){
		if(typeof fn == 'string'){
			const eventId = fn.replace(/^\@event\s+/,'');
			this.fn = () => { RSS.Event(eventId); };
		}
		else this.fn = fn;
		this.el[this.domEvent] = this.fn;
	}
	static isBinding(check){
		if(check.match(/^\@bind\s+[^]+$/))
			return true;
		else return false;
	}
}
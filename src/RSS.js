import { Component as _Component } from './Component';
import { Store } from './Store';

class ComponentFacade{
	constructor(initial,styles){
		const comp = new _Component(RSS.Store);
		if(typeof initial == 'string')
			document.getElementById(initial).className = comp.className();
		else if(typeof initial == 'object')
			comp.setStyles(initial);
		if(styles)
			comp.setStyles(styles);
		return comp;
	}
}

const _Event = (id) => {
	const comp = RSS.Store.events[id].component;
	const selector = RSS.Store.events[id].selector;
	const styles = {};
	styles[selector] = RSS.Store.events[id].styles
	comp.setStyles(styles);
};

class _RSS{
	constructor(store){
		this.Store = store;
		this.Component = ComponentFacade;
		this.Event = _Event;
		if(!document.getElementById('rss-container')){
			let el = document.createElement('div');
			el.id = 'rss-container';
			document.body.appendChild(el);
		}
	}
}

export const RSS = new _RSS(new Store);
export const Component = ComponentFacade;
export const Event = _Event;
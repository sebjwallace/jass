import { Component as _Component } from './Component';
import { Store } from './Store';

class RSS{
	constructor(store){
		this.store = store;
		if(!document.getElementById('rss-container')){
			let el = document.createElement('div');
			el.id = 'rss-container';
			document.body.appendChild(el);
		}
	}
}

export const RSSSingleton = new RSS(new Store);

class ComponentFacade{
	constructor(initialStyles){
		return new _Component(RSSSingleton.store,initialStyles);
	}
}


export const Component = ComponentFacade;
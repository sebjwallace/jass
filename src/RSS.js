import { Component as _Component } from './Component';

class RSS{
	constructor(){
		if(!document.getElementById('rss-container')){
			let el = document.createElement('div');
			el.id = 'rss-container';
			document.body.appendChild(el);
		}
	}
}

export const RSSSingleton = new RSS();

export const Component = _Component;
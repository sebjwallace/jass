import { Component as _Component } from './Component';
import { Store } from './Store';
import { Token } from './Token';
import { Tag } from './Tag';
import { StyleSheet } from './StyleSheet';

class ComponentFactory{
	constructor(el,styles){
		const Store = RSS.Store,
		token = new Token(),
		tag = new Tag(token.key,document),
		stylesheet = new StyleSheet

		const comp = new _Component({
			Store, token, tag, stylesheet
		});

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
	const event = RSS.Store.events[id];
	for(const listener in event){
		const comp = event[listener].component;
		const selector = event[listener].selector;
		const styles = {};
		styles[selector] = event[listener].styles
		comp.setStyles(styles);
	}
};

class _RSS{
	constructor(store){
		this.Store = store;
		this.Component = ComponentFactory;
		this.Event = _Event;
		if(!document.getElementById('rss-container')){
			let el = document.createElement('div');
			el.id = 'rss-container';
			document.body.appendChild(el);
		}
	}
}

export const RSS = new _RSS(new Store);
export const Component = ComponentFactory;
export const Event = _Event;
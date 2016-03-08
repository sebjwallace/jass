import { Style } from './Style';

export class Store{
	constructor(){
		this.styles = {};
		this.tags = {};
		this.mixins = {};
		this.variables = {};
		this.events = {};
		this.bindings = {};
		this.tokenIndex = {};
		this.styleIndex = {};
		this.renderStack = {};

		this.registerTag = (id,tag) => {
			this.tags[id] = tag;
		}
		this.updateTag = (id,content) => {
			this.tags[id].update(content);
		}
		this.addVariable = (name,value) => {
			this.variables[name] = value;
		}
		this.getVariable = (name) => {
			return this.variables[name];
		}
		this.addMixin = (name,fn) => {
			this.mixins[name] = fn;
		}
		this.getMixin = (id) => {
			return this.mixins[id];
		}
		this.addEvent = (id,selector,event) => {
			if(!this.events[id]) this.events[id] = {};
			if(!this.events[id][selector]) this.events[id][selector] = event;
		}
		this.addBinding = (id,binding) => {
			this.bindings[id] = binding;
		}
		this.addToRenderStack = (key) => {
			this.renderStack[key] = key;
		}
		this.getRenderStack = () => {
			return this.renderStack;
		}
		this.getStyleIndex = () => {
			return this.styleIndex;
		}
		this.emptyRenderStack = () => {
			this.renderStack = {};
		}
		this.addStyle = (key,selector,styleBody) => {
			this.styles[selector] = new Style(key, selector, styleBody);
		}
		this.getStyle = (selector) => {
			if(!this.styles[selector])
				console.log( `'${selector}' does not exist!`);
			else
				return this.styles[selector];
		}
		this.registerToken = (key,selector,style) => {
			if (!this.tokenIndex[key]) this.tokenIndex[key] = {};
			this.tokenIndex[key][selector] = style;
		}
		this.registerStyle = (key,selector,styleBody) => {
			if (!this.styleIndex[key]) this.styleIndex[key] = {};
			this.styleIndex[key][selector] = styleBody;
		}
	}
}

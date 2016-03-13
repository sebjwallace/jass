import * as Types from './Types/Module';

export class PreCompiler{
	constructor(Store,component){
		this.Store = Store;
		this.component = component;
	}
	parse(obj,key){

		let level = 0;
		let activeStyle = {};
		let selector = null;

		const extract = (obj) => {
			level ++;

			for(const prop in obj){

				if(level == 1){
					selector = prop;
					this.Store.addStyle(key, selector, obj[selector]);
					activeStyle = this.Store.getStyle(selector);
					this.Store.registerToken(key,activeStyle.selector,activeStyle);
					this.Store.registerStyle(key,activeStyle.selector,activeStyle.body);
				}

					if(Types.Extend.isExtend(prop)){
						const parent = this.Store.getStyle(obj[prop]);
						if(parent){
							activeStyle.addParent(obj[prop]);
							const signature = '.' + activeStyle.token + '&' + activeStyle.selector;
							if(!parent.hasChild(signature))
								parent.addChild(signature);
								this.Store.addToRenderStack(parent.token);
						}
					}

					else if(Types.Variable.isVariable(prop)){
						this.Store.addVariable(prop,obj[prop]);
					}

					else if(Types.Mixin.isMixin(prop) && typeof obj[prop] === 'function'){
						this.Store.addMixin(Types.Mixin.format(prop),obj[prop]);
					}

					else if(Types.Event.isEvent(prop)){
						const id = Types.Event.format(prop);
						const event = { component: this.component, selector: selector, styles: obj[prop] };
						this.Store.addEvent(id,selector,event);
					}

					else if(Types.Binding.isBinding(prop)){
						const binding = new Types.Binding(selector,key,prop,obj[prop]);
						this.Store.addBinding(binding);
					}

				if(typeof obj[prop] === 'object'){
					extract(obj[prop]);
				}
			}
			level --;
		}
		extract(obj);
		this.Store.addToRenderStack(key);
	}
}

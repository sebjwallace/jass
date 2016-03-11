import * as Types from './Types/Module';

export class Compiler{
	constructor(Store){
		this.Store = Store;
	}
	isMediaQuery(check){
		return check.match(/\@media\s+/);
	}
	isVariableScope(check){
		return check.match(/^\$/);
	}
	generateSelector(selector,scope){
		let children = '';
		const check = selector.match(/^[^\s]+/)[0];
		const postfixes = selector.replace(/^[^\s]+/,'');
		const style = this.Store.getStyle(check);
		if (style)
			for(const child in style.children){
					children += child.replace('&',' ') + ' ' + postfixes + ', ';
			}
		return (children + ' ' + '.' + scope + ' ' + selector)
			.replace(/\s+\:/,':')
			.replace('BASE','');
	}
	generateValue(isString){
		const variable = Types.Variable.retrieve(isString);
		if(variable){
				const value = this.Store.getVariable(variable);
				return isString.replace(variable,value);
		}
		else return isString;
	}

	parse(obj,scope){

		let parentID = '';
		let parentOBJ = {};
		let groupingID = '';

		let stack = [];
		let sum = "";
		let level = 0;

		const stitch = (obj) => {

			level++;

			for(const props in obj){

				if( this.isVariableScope(props)
					|| Types.Event.isEvent(props)
					|| Types.Binding.isBinding(props)
					|| Types.Extend.isExtend(props)
				) continue;

				if(level == 1 && !this.isMediaQuery(props)){
					parentID = props;
					parentOBJ = obj[props];
				}

				if(Types.Mixin.isMixin(props)){
					const mixin = this.Store.getMixin(Types.Mixin.format(props));
					if(typeof obj[props] == 'string')
						stitch( mixin(obj[props]) );
					else if(Array.isArray(obj[props]))
						stitch( mixin.apply(this,obj[props]) );
					else continue;
				}
				else if(Types.Group.isGroup(props)){
					groupingID = Types.Group.format(props);
						stitch(obj[props]);
					groupingID = '';
				}
				else if (Types.Nesting.isNesting(props)){
					const item = { [parentID + " " + Types.Nesting.format(props)] : obj[props] };
					stack.push(item);
				}
				else{
					if(typeof obj[props] === 'object'){
						if(this.isMediaQuery(props))
							sum += props;
						else
							sum += this.generateSelector(props,scope);
						sum += "{";
							stitch(obj[props]);
						sum += "}";
					} else{
						sum += groupingID + props;
						sum += ":" + this.generateValue(obj[props],scope,parentID,props) + ";";
					}
				}
			}

			level--;
		}

		stitch(obj);

		let len = stack.length;
		for(let i=0; i<len; i++){
			stitch(stack[i]);
			len = stack.length;
		}

		return sum;
	}
}
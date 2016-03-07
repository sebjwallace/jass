
export class Compiler{
	constructor(Store){
		this.Store = Store;
	}
	isMediaQuery(check){
		return check.match(/\@media/);
	}
	isEvent(check){
		return check.match(/^\@event\s+[^]+$/);
	}
	isBind(check){
		return check.match(/^\@bind\s+[^]+$/);
	}
	isExtend(check){
		return check.match(/^\@extend($|[0-9])/);
	}
	isVariableScope(check){
		return check.match(/^\$/);
	}
	isVariable(check){
		if(typeof check != 'string')
			return false;
		return check.match(/^\$[a-z,A-Z]+$/);
	}
	isMixin(check){
		return check.match(/^\@mixin\s/);
	}
	isNesting(check){
		return check.match(/^\>[^]/);
	}
	isGrouping(check){
		return check.match(/^\#\s[a-z,A-Z]+$/);
	}
	generateSelector(selector,scope){
		let children = '';
		const check = selector.match(/^[^\s]+/)[0];
		const postfixes = selector.replace(/^[^\s]+/,'');
		if (this.Store.styles[check])
			for(const child in this.Store.styles[check].children){
					children += child.replace('&',' ') + ' ' + postfixes + ', ';
			}
		return (children + ' ' + '.' + scope + ' ' + selector)
			.replace(/\s+\:/,':')
			.replace('BASE','');
	}
	generateValue(value,scope,selector,attr){
		if(this.isVariable(value))
			return this.Store.variables[value];
		else return value;
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

				if(this.isVariableScope(props) || this.isEvent(props) || this.isBind(props)) continue;

				if(level == 1 && !this.isMediaQuery(props)){
					parentID = props;
					parentOBJ = obj[props];
				}

				if(this.isMixin(props)){
					const mixin = this.Store.mixins[props.replace('@mixin ','')];
					if(typeof obj[props] == 'string')
						stitch( mixin(obj[props]) );
					else if(Array.isArray(obj[props]))
						stitch( mixin.apply(this,obj[props]) );
					else continue;
				}
				else if(this.isGrouping(props)){
					groupingID = props.replace('# ','') + '-';
					stitch(obj[props]);
					groupingID = '';
				}
				else if (this.isNesting(props)){
					const item = { [parentID + " " + props.replace('> ','')] : obj[props] };
					stack.push(item);
				}
				else if(this.isExtend(props)) continue;
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
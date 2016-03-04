
export class Compiler{
	constructor(Store){
		this.Store = Store;
	}
	isMediaQuery(check){
		return check.match(/\@media/);
	}
	isExtend(check){
		return check.match(/^\@extend($|[0-9])/);
	}
	isMixin(check){
		return check.match(/^\@mixin\s/);
	}
	isNesting(check){
		return check.match(/^\>\s[^]+$/);
	}
	generateSelector(selector,scope){
		//if (this.isMediaQuery(selector)) return selector;
		var children = '';
		let check = selector.match(/^[^\s]+/)[0];
		let postfixes = selector.replace(/^[^\s]+/,'');
		if (this.Store.styles[check])
			for(let child in this.Store.styles[check].children){
					children += this.Store.styles[check].children[child] + ' ' + postfixes + ', ';
			}
		return children + ' ' + '.' + scope + ' ' + selector;
	}

	parse(obj,scope){

		var scope = scope;
		var parentID = '';
		var parentOBJ = {};
		var stack = [];

		var sum = "";
		var extensions = {};

		// keep track of recursion level
		// level 1 keys are selectors
		var level = 0;

		var stitch = (obj) => {

			level++;

			for(var props in obj){

				if(level == 1 && !this.isMediaQuery(props)){
					parentID = props;
					parentOBJ = obj[props];
				}

				if(this.isMixin(props)){
					if(typeof obj[props] == 'string'){
						const key = this.Store.mixins[props.replace('@mixin ','')];
						stitch(key(obj[props]));
					}
				}
				else if (this.isNesting(props)){
					var item = { [parentID + " " + props.replace('> ','')] : obj[props] };
					stack.push(item); // the item could have children + parentId with a keyword to replace with the postfixes
				}
				else if(this.isExtend(props)) continue;
				else{
					if(typeof obj[props] === 'object'){
						sum += this.generateSelector(props,scope);
						sum += "{";
							stitch(obj[props]);
						sum += "}";
					} else{
						sum += props;
						sum += ":" + obj[props] + ";";
					}
				}
			}

			level--;
		}

		stitch(obj);

		var len = stack.length;
		for(var i=0; i<len; i++){
			stitch(stack[i]);
			len = stack.length;
		}

		return sum;
	}
}
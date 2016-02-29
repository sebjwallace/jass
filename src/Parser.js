module.exports = function(store){

	this.store = store;

	this.isMediaQuery = function(check){
		return check.match(/\@media/);
	}

	this.isImport = function(check){
		return check.match(/\@import/);
	}

	this.isMixin = function(check){
		return check.match(/^\@[a-z&\-]+$/);
	}

	this.isNesting = function(check){
		return check.match(/^\>\s[a-z]+$/);
	}

	this.parse = function(obj){
		var self = this;

		var stack = [];
		var parentID = '';
		var parentOBJ = {};
		var sum = "";

		// keep track of recursion level
		// level 1 keys are selectors
		var level = 0;

		var stitch = function(obj){

			level++;

			for(var props in obj){

				if(level == 1 && !self.isMediaQuery(props)){
					parentID = props;
					parentOBJ = obj[props];
				}

				if(self.isImport(props)){
					var item = { [obj[props] + ", " + parentID] : self.store.getSelector(obj[props]) };
					stack.push(item);
				}
				else if(self.isMixin(props)){
					stitch(self.store.getMixin(props.replace('@',''),obj[props]));
				}
				else if (self.isNesting(props)){
					var item = { [parentID + " " + props.replace('> ','')] : obj[props] };
					stack.push(item);
				}
				else{
					sum += props;
					if(typeof obj[props] === 'object'){
						sum += "{";
							stitch(obj[props]);
						sum += "}";
					} else{
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

	return this;
}
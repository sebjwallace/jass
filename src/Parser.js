module.exports = function(store){

	this.store = store;

	this.isSelector = function(check){
		return check.match(/^(\#|\.)[a-z&\-]+$/);
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

		var post = {};
		var parentID = '';
		var parentOBJ = {};
		var sum = "";

		var stitch = function(obj){
			for(var props in obj){

				if(self.isSelector(props)){
					parentID = props; parentOBJ = obj[props];
				}

				if(self.isImport(props)){
					post[obj[props] + ", " + parentID] = self.store.getSelector(obj[props]);
				}
				else if(self.isMixin(props)){
					stitch(self.store.getMixin(props.replace('@',''),obj[props]));
				}
				else if (self.isNesting(props)){
					post[parentID + " " + props.replace('> ','')] = obj[props];
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
		}

		stitch(obj);
		stitch(post);

		return sum;
	}

	return this;
}
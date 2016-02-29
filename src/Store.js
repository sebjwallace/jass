module.exports = function(){
	var self = this;

	var selectors = {};
	var mixins = {};

	this.setSelector = function(id,obj){
		selectors[id] = obj;
	}

	this.getSelector = function(id){
		return selectors[id];
	}

	this.setMixin = function(id,fn){
		mixins[id] = fn;
	}

	this.getMixin = function(id,params){
		return mixins[id](params);
	}

}
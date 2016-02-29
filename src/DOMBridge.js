module.exports = function(){

	this.createStyleTag = function(id,content){
		var el = window.document.createElement('style');
		el.id = id;
		if(content)
			el.innerHTML = content;
		window.document.body.insertBefore(el,window.document.body.lastChild);
	}

	this.updateStyleTag = function(id,content){
		var el = window.document.getElementById(id);
		el.innerHTML = content;
	}

}
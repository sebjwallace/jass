module.exports = function(){
	this.generate = function(length){
		var key = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for( var i=0; i < length; i++ )
	        key += possible.charAt(Math.floor(Math.random() * possible.length));
	    return key;
	}
	return this;
}
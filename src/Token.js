export class Token{
	constructor(){
		this.key = this.generateKey(4);
		this.current = false;
	}
	generateKey(length){
		var key = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for( var i=0; i < length; i++ )
	        key += possible.charAt(Math.floor(Math.random() * possible.length));
	    return key;
	}
}
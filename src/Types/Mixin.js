export class Mixin{
	constructor(){

	}
	static isMixin(check){
		if(check.match(/^\@mixin\s+/))
			return true;
		return false;
	}
	static format(fromString){
		return fromString.replace(/^\@mixin\s/,'');
	}
}
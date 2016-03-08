export class Group{
	constructor(){

	}
	static isGroup(check){
		return check.match(/^\#\s+[a-z,A-Z]+$/);
	}
	static format(fromString){
		return fromString.replace(/\#\s+/,'') + '-';
	}
}
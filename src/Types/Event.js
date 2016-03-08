export class Event{
	constructor(){

	}
	static isEvent(check){
		if(check.match(/^\@event\s+[^]+$/))
			return true;
		else return false;
	}
	static format(fromString){
		return fromString.replace(/^\@event\s+/,'');
	}
}
export class Nesting{
	static isNesting(check){
		return check.match(/^\>[^]/);
	}
	static format(fromString){
		return fromString.replace('> ','')
	}
}
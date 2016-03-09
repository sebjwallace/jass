export class Variable{
	constructor(){

	}
	static isVariable(check){
		if(typeof check != 'string') return false;
		if(check.match(/^\$[a-z,A-Z,-]+$/))
			return true;
		return false;
	}
	static retrieve(isString){
		if(typeof isString != 'string') return false;
		const match = isString.match(/\$[a-z,A-Z,-]+/);
		if(match)
			return match[0];
	}
}
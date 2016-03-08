export class Variable{
	constructor(){

	}
	static isVariable(check){
		if(typeof check != 'string') return false;
		if(check.match(/^\$[a-z,A-Z]+$/))
			return true;
		return false;
	}
}
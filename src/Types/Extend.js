export class Extend{
	constructor(){

	}
	static isExtend(check){
		return check.match(/^\@extend($|[0-9])/);
	}
}
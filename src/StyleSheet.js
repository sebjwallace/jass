export class StyleSheet{
	constructor(){
		this.styles = null;
	}
	set(obj){
		if (!this.styles)
			this.styles = obj;
		else{
			for(const selector in obj){
				for(const attr in obj[selector]){
					let existing = this.styles[selector][attr];
					const override = obj[selector][attr];
					if(Array.isArray(override)){
						if(override[0] == existing)
							this.styles[selector][attr] = override[1];
						else this.styles[selector][attr] = override[0];
					}
					else{
						this.styles[selector][attr] = override;
					}
				}
			}
		}
	}
	get(){
		return this.styles;
	}
}
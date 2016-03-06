
export class Store{
	constructor(){
		this.styles = {};
		this.tags = {};
		this.mixins = {};
		this.variables = {};
		this.events = {};
		this.tokenIndex = {};
		this.styleIndex = {};
		this.renderStack = {};

		this.setTag = (id,tag) => {
			this.tags[id] = tag;
		}
		this.updateTag = (id,content) => {
			this.tags[id].update(content);
		}
		this.getRenderStack = () => {
			return this.renderStack;
		}
		this.getStyleIndex = () => {
			return this.styleIndex;
		}
		this.emptyRenderStack = () => {
			this.renderStack = {};
		}
	}
}

var RSS = require('./RSS');

class ReactRSS extends React.Component{
	constructor(props){
		super(props)
		this.RSS = new RSS();
	}
	setStyles(styles){
		this.RSS.setStyles(styles);
	}
};

ReactRSS.mixin = (id,fn) => {
	RSS.mixin(id,fn);
}

ReactRSS.export = (id,obj) => {
	RSS.export(id,obj);
}

module.exports = ReactRSS;